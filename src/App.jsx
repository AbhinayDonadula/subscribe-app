import React, { Component } from 'react';
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
  filterActiveCancel
} from './components/utils';
import getImageInfoBySku from './apiCalls/getImageInfoBySku';
import SnackBar from './components/SharedComponents/SnackBar';
import getItemSubscriptions from './apiCalls/getItemSubscriptions';
import SpinnerPortal from './components/SharedComponents/SpinnerPortal';
import getServiceSubscriptions from './apiCalls/getServiceSubscriptions';

class App extends Component {
  state = {
    content,
    userName: '',
    isMobile: window.innerWidth <= 750,
    initialAppLoading: true,
    enableNotifications: false,
    enableEmailCampaign: false,
    services: [],
    subscriptionsToShow: null,
    itemsAndServices: null,
    localAPI: true
  };

  componentDidMount() {
    if (document.getElementById('actualContent')) {
      document.getElementById('actualContent').className = 'col-md-9 col-sm-12';
    }
    this.getServicesAndItems();
  }

  sortItemsAndSubs = async (
    { responseObject },
    subscriptionsToShow,
    status
  ) => {
    let itemSkus = [];
    let itemsAndServices = [];
    const { services, localAPI } = this.state;
    const {
      jsonObjectResponse: { GetSubListDetail }
    } = responseObject;
    const itemsList = GetSubListDetail || [];

    // filter out just item services from the response which has non-empty record key
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

    // remove duplicate skus
    itemSkus = Array.from(new Set(itemSkus));

    try {
      // below call will give image info for a given sku or array of skus
      const response = await getImageInfoBySku(localAPI, itemSkus);

      // go through each item and find the relevant sku from response above and merge obj
      const beautifiedItemsWithImages = beautifiedItems.map((eachItem) => {
        // take the sku from response and find the same item inside items array
        const itemWithSku = Object.values(response).find(
          (el) =>
            el.skuId.replace(/^0+/, '') === eachItem.SKU.replace(/^0+/, '')
        );
        // once we find the item, merge with all the needed properties with item as below
        if (itemWithSku) {
          return {
            smallImageUrl: itemWithSku.imageUrl + itemWithSku.smallImageUrl,
            mediumImageUrl: itemWithSku.imageUrl + itemWithSku.mediumImageUrl,
            shortDescription: itemWithSku.shortDescription,
            skuUrl: itemWithSku.skuUrl,
            ...eachItem
          };
        }
        return eachItem;
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

  getItems = (status) => {
    this.setState({ filtering: true }, async () => {
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

      const itemsSubs = await getItemSubscriptions(localAPI, status);
      if (itemsSubs.hasErrorResponse === 'true') {
        this.setState({
          itemsAndServices: services,
          subscriptionsToShow: subscriptionsToShow || services,
          filtering: false,
          initialAppLoading: false
        });
      } else {
        this.sortItemsAndSubs(itemsSubs, subscriptionsToShow, status);
      }
    });
  };

  getServicesAndItems = () => {
    const { localAPI } = this.state;
    getServiceSubscriptions(localAPI).then((response) => {
      // console.log(response);
      if (response.hasErrorResponse === 'true') {
        // if get services call failed then get items
        this.getItems();
      } else {
        const servicesFromEAI = response.responseObject.jsonObjectResponse;
        const services = beautifyGetSubListResponse(servicesFromEAI);
        const [activeServices, cancelledServices] = filterActiveCancel(
          services
        );
        this.setState(
          {
            // userName: servicesFromEAI.customer.fullName,
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
      }
    });
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
    const {
      enableNotifications,
      filtering,
      initialAppLoading,
      subscriptionsToShow
    } = this.state;
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleAllFilter: this.filterSubscriptions,
          handleSortFilter: this.sortSubscriptions,
          getItems: this.getItems
        }}
      >
        <SnackBar>
          <Header />
          {enableNotifications ? <Notifications /> : null}
          {subscriptionsToShow ? <Subscriptions /> : null}
          {subscriptionsToShow === null && !initialAppLoading ? (
            <div className="no__subs">You have no subscriptions to view.</div>
          ) : null}
          {!initialAppLoading && filtering ? <SpinnerPortal filtering /> : null}
          {initialAppLoading && !filtering ? <SpinnerPortal /> : null}
        </SnackBar>
      </AppContext.Provider>
    );
  }
}

export default App;
