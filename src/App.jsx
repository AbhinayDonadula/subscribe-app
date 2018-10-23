import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { toast } from 'react-toastify';
import Header from './components/Header/Header';
import Notifications from './components/Notifications/Notifications';
import content from './content';
import AppContext from './components/Context/AppContext';
import Subscriptions from './components/Subscriptions/Subscriptions';
import { beautifyGetSubListResponse, FireFetch } from './components/utils';
import getImageInfoBySku from './apiCalls/getImageInfoBySku';
import SnackBar from './components/SharedComponents/SnackBar';
import getItemSubscriptions from './apiCalls/getItemSubscriptions';
import SpinnerPortal from './components/SharedComponents/SpinnerPortal';

class App extends Component {
  state = {
    content,
    userName: '',
    isMobile: window.innerWidth <= 750,
    initialAppLoading: true,
    enableNotifications: false,
    enableEmailCampaign: false,
    services: null,
    subscriptionsToShow: null,
    itemsAndServices: null,
    localAPI: true
  };

  componentDidMount() {
    if (document.getElementById('actualContent')) {
      document.getElementById('actualContent').className = 'col-md-9 col-sm-12';
    }
    this.getSubscriptionsAndItemsList();
  }

  sortItemsAndSubs = async (
    { responseObject },
    subscriptionsToShow,
    status
  ) => {
    const { services, localAPI } = this.state;
    const itemSkus = [];
    const {
      jsonObjectResponse: { GetSubListDetail }
    } = responseObject;
    const itemsList = GetSubListDetail || [];

    // sort out just item services from the response
    const itemsArray = Object.values(itemsList).filter(
      (each) => each.RecordKey.length > 0
    );

    // add sortDate/isItem for sorting/filtering purposes
    const beautifiedItems = itemsArray.map((item) => {
      itemSkus.push(item.SKU.replace(/^0+/, ''));
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

      // filter cancel/active subscriptions
      if (subscriptionsToShow) {
        itemsAndServices = [
          ...beautifiedItemsWithImages,
          ...subscriptionsToShow
        ];
      } else {
        itemsAndServices = [...beautifiedItemsWithImages, ...services];
      }
    } catch (error) {
      if (subscriptionsToShow) {
        itemsAndServices = [...beautifiedItems, ...subscriptionsToShow];
      } else {
        itemsAndServices = [...beautifiedItems, ...services];
      }
    }

    // console.log(itemsAndServices);
    const sortedByDate = itemsAndServices.sort(
      (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
    );

    this.setState(
      {
        initialAppLoading: false,
        filtering: false,
        itemsAndServices: sortedByDate,
        subscriptionsToShow: sortedByDate
      },
      () => {
        if (status) {
          toast.success(`Showing ${status} Subscriptions.`);
        }
      }
    );
  };

  handleGetSubListSuccess = (response) => {
    const {
      data: { getSubscriptionDetailsListResponse }
    } = response;
    const services = beautifyGetSubListResponse(
      getSubscriptionDetailsListResponse
    );

    // filter all active
    const activeServices = services.filter(
      (each) => !each.isItem && !each.closeDate
    );

    // filter all cancelled
    const cancelledServices = services.filter(
      (each) => !each.isItem && each.closeDate
    );

    this.setState(
      {
        userName: getSubscriptionDetailsListResponse.customer.fullName,
        // subscriptionsToShow: services,
        subscriptionsToShow: activeServices,
        services: activeServices,
        activeServices,
        cancelledServices,
        itemsAndServices: null
      },
      () => {
        this.getItems();
      }
    );
  };

  getItems = async (status) => {
    let subscriptionsToShow = null;
    const {
      localAPI,
      services,
      activeServices,
      cancelledServices,
      itemsAndServices
    } = this.state;

    if (status === 'Active') {
      subscriptionsToShow = activeServices;
    } else if (status === 'Cancelled') {
      subscriptionsToShow = cancelledServices;
    } else {
      subscriptionsToShow = itemsAndServices;
    }

    try {
      const itemsSubs = await getItemSubscriptions(localAPI, status);
      if (
        (itemsSubs.success !== undefined && !itemsSubs.success) ||
        !itemsSubs.responseObject.success
      ) {
        this.setState({
          itemsAndServices: services,
          subscriptionsToShow: subscriptionsToShow || services,
          filtering: false,
          initialAppLoading: false
        });
      } else {
        this.sortItemsAndSubs(itemsSubs, subscriptionsToShow, status);
      }
    } catch (error) {
      this.setState({ itemsAndServices: services });
    }
  };

  handleGetSubListFailure = (error) => {
    this.setState({ getSubListError: error });
    this.getItems();
  };

  getSubscriptionsAndItemsList = () => {
    const { localAPI } = this.state;
    FireFetch(
      localAPI,
      this.handleGetSubListSuccess,
      this.handleGetSubListFailure
    );
  };

  sortSubscriptions = (selected) => {
    this.setState({ selectedFilter: selected });
  };

  filterSubscriptions = (selected) => {
    this.setState({ sortFilter: selected, filtering: true }, () => {
      this.getItems(selected);
    });
  };

  render() {
    const { enableNotifications, filtering, initialAppLoading } = this.state;
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
          {!initialAppLoading && filtering ? <SpinnerPortal filtering /> : null}
        </SnackBar>
      </AppContext.Provider>
    );
  }
}

export default App;
