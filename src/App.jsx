import React, { Component } from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { toast } from 'react-toastify';
import Header from './components/Header/Header';
import Notifications from './components/Notifications/Notifications';
import content from './content';
import AppContext from './components/Context/AppContext';
import Subscriptions from './components/Subscriptions/Subscriptions';
import {
  beautifyGetSubListResponse,
  FireFetch,
  FireGetItems,
  getServiceSubscriptionsURL
} from './components/utils';
import getImageInfoBySku from './apiCalls/getImageInfoBySku';
import SnackBar from './components/SharedComponents/SnackBar';

class App extends Component {
  state = {
    content,
    userName: '',
    isMobile: window.innerWidth <= 750,
    initialAppLoading: true,
    enableNotifications: false,
    enableEmailCampaign: false,
    subscriptions: null,
    itemsAndServices: null,
    localAPI: true
  };

  componentDidMount() {
    if (document.getElementById('actualContent')) {
      document.getElementById('actualContent').className = 'col-md-9 col-sm-12';
    }
    this.getSubscriptionsAndItemsList();
  }

  handleGetItemsListSuccess = (response) => {
    const { subscriptions } = this.state;
    if (!response.responseObject) {
      this.setState({ itemsAndServices: subscriptions });
    } else {
      this.sortItemsAndSubs(response);
    }
  };

  sortItemsAndSubs = async ({ responseObject }) => {
    const { subscriptions, localAPI } = this.state;
    const itemSkus = [];
    const {
      jsonObjectResponse: { GetSubListDetail }
    } = responseObject;
    const itemsList = GetSubListDetail;

    // sort out just item subscriptions from the response
    const itemsArray = Object.values(itemsList).filter(
      (each) => each.RecordKey.length > 0
    );

    // add sortDate/isItem for sorting/filtering purposes
    const beautifiedItems = itemsArray.map((item) => {
      itemSkus.push(item.SKU);
      return {
        ...item,
        isItem: true,
        itemDescription: item.Desc,
        billingFrequency: item.Freq,
        quantity: item.QtyOrd,
        status: item.Status,
        sortDate: item.NextDlvDt
      };
    });
    let itemsAndServices = [];
    try {
      // below call will give image info for a given sku or array of skus
      const response = await getImageInfoBySku(localAPI, itemSkus);

      // go through each item and find the relevant sku from response above and merge obj
      const beautifiedItemsWithImages = beautifiedItems.map((eachItem) => {
        // take the sku from repsonse and find the same item inside items array
        const itemWithSku = Object.values(response).find((el) => {
          return (
            el.skuId.replace(/^0+/, '') === eachItem.SKU.replace(/^0+/, '')
          );
        });
        // once we found the item, merge with all the needed properties with item as below
        return {
          smallImageUrl: itemWithSku.imageUrl + itemWithSku.smallImageUrl,
          mediumImageUrl: itemWithSku.imageUrl + itemWithSku.mediumImageUrl,
          shortDescription: itemWithSku.shortDescription,
          skuUrl: itemWithSku.skuUrl,
          ...eachItem
        };
      });
      itemsAndServices = [...beautifiedItemsWithImages, ...subscriptions];
    } catch (error) {
      itemsAndServices = [...beautifiedItems, ...subscriptions];
    }
    const sortedByDate = itemsAndServices.sort(
      (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
    );
    this.setState({
      initialAppLoading: false,
      itemsAndServices: sortedByDate
    });
  };

  handleGetItemsListFailure = (error) => {
    const { subscriptions } = this.state;
    this.setState({
      getItemsError: error,
      itemsAndServices: subscriptions
    });
  };

  handleGetSubListSuccess = (response) => {
    const { localAPI } = this.state;
    const {
      data: { getSubscriptionDetailsListResponse }
    } = response;
    const subscriptions = beautifyGetSubListResponse(
      getSubscriptionDetailsListResponse
    );

    // const activeServiceSubscriptions = subscriptions.filter(
    //   (each) => each.status === 'Active' && !each.isItem
    // );
    // const cancelledServiceSubscriptions = subscriptions.filter(
    //   (each) =>
    //     each.status === 'Closed' && each.closeDate && each.closeDate.length
    // );

    this.setState(
      {
        userName: getSubscriptionDetailsListResponse.customer.fullName,
        subscriptions,
        itemsAndServices: null,
        initialAppLoading: false
      },
      () => {
        FireGetItems(
          localAPI,
          this.handleGetItemsListSuccess,
          this.handleGetItemsListFailure
        );
      }
    );
  };

  handleGetSubListFailure = (error, isJWTFailed) => {
    const { localAPI } = this.state;
    if (error) {
      this.setState({ getSubListError: error, isJWTFailed });
    }
    FireGetItems(
      localAPI,
      this.handleGetItemsListSuccess,
      this.handleGetItemsListFailure
    );
  };

  getSubscriptionsAndItemsList = () => {
    const { localAPI } = this.state;
    FireFetch(
      getServiceSubscriptionsURL(localAPI),
      this.handleGetSubListSuccess,
      this.handleGetSubListFailure
    );
  };

  sortSubscriptions = (selected) => {
    this.setState({ selectedFilter: selected });
    toast.success('Quantity is updated.');
  };

  filterSubscriptions = (selected) => {
    this.setState({ sortFilter: selected });
  };

  render() {
    const { enableNotifications } = this.state;
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleAllFilter: this.filterSubscriptions,
          handleSortFilter: this.sortSubscriptions
        }}
      >
        <SnackBar>
          <Header />
          {enableNotifications ? <Notifications /> : null}
          <Subscriptions />
        </SnackBar>
      </AppContext.Provider>
    );
  }
}

export default App;
