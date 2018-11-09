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
  filterActiveCancel,
  cleanUp
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
    sortBy: 'Next Delivery Date',
    filterBy: 'Active',
    isMobile: window.innerWidth <= 750,
    initialAppLoading: true,
    filtering: true,
    enableNotifications: false,
    enableEmailCampaign: false,
    envDown: false,
    services: [],
    subscriptionsToShow: [],
    itemsAndServices: [],
    localAPI: true,
    loadingServicesFailed: false
  };

  componentDidMount() {
    this.getServicesAndItems();
    cleanUp();
  }

  sortSubscriptions = (selected) => {
    this.setState({ sortBy: selected, filtering: true }, () => {
      const { filterBy, sortBy } = this.state;
      this.getItems(filterBy, sortBy);
    });
  };

  filterSubscriptions = (selected) => {
    this.setState({ filterBy: selected, filtering: true }, () => {
      const {
        filterBy,
        sortBy,
        products,
        activeAndCancelledServices
      } = this.state;

      if (selected === 'Products') {
        this.setState(
          { subscriptionsToShow: products, filtering: false },
          () => {
            toast.success('Showing Product subscriptions.');
          }
        );
      } else if (selected === 'Services') {
        this.setState(
          {
            subscriptionsToShow: activeAndCancelledServices,
            filtering: false
          },
          () => {
            toast.success('Showing Service subscriptions.');
          }
        );
      } else if (selected === 'All') {
        this.setState(
          {
            subscriptionsToShow: [...products, ...activeAndCancelledServices],
            filtering: false
          },
          () => {
            toast.success('Showing All subscriptions.');
          }
        );
      } else {
        this.getItems(filterBy, sortBy);
      }
    });
  };

  sortItemsAndSubs = async (
    { responseObject },
    subscriptionsToShow,
    status,
    sortBy
  ) => {
    let itemSkus = [];
    let itemsAndServices = [];
    let products = [];
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
      products = beautifiedItemsWithImages;
    } catch (error) {
      if (subscriptionsToShow) {
        itemsAndServices = [...beautifiedItems, ...subscriptionsToShow];
      } else {
        itemsAndServices = [...beautifiedItems, ...services];
      }
    }

    let sortedByDate = [];
    if (sortBy === 'Frequency') {
      sortedByDate = itemsAndServices;
    } else {
      sortedByDate = itemsAndServices.sort(
        (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
      );
    }

    this.setState(
      {
        initialAppLoading: false,
        filtering: false,
        envDown: false,
        loadingProductsFailed: false,
        itemsAndServices: sortedByDate,
        subscriptionsToShow: sortedByDate,
        products
      },
      () => {
        if (status) {
          toast.success(`Showing ${status} Subscriptions.`);
        }
      }
    );
  };

  getItems = (filterStatus, sortBy, itemUpdates = false) => {
    this.setState({ filtering: true }, async () => {
      let subscriptionsToShow = null;
      const {
        localAPI,
        services,
        activeServices,
        cancelledServices,
        itemsAndServices
      } = this.state;

      if (filterStatus === 'Active' || itemUpdates) {
        subscriptionsToShow = activeServices;
      } else if (filterStatus === 'Cancelled') {
        subscriptionsToShow = cancelledServices;
      } else {
        subscriptionsToShow = itemsAndServices;
      }

      const itemsSubs = await getItemSubscriptions(
        localAPI,
        filterStatus,
        sortBy
      );
      if (!itemsSubs || itemsSubs.hasErrorResponse === undefined) {
        this.setState({ envDown: true });
      } else if (itemsSubs.hasErrorResponse === 'true') {
        this.setState({
          itemsAndServices: services,
          subscriptionsToShow: subscriptionsToShow || services,
          filtering: false,
          initialAppLoading: false,
          envDown: false,
          loadingProductsFailed: true
        });
      } else {
        this.sortItemsAndSubs(
          itemsSubs,
          subscriptionsToShow,
          filterStatus,
          sortBy
        );
      }
    });
  };

  getServicesAndItems = () => {
    const { localAPI } = this.state;
    getServiceSubscriptions(localAPI).then((response) => {
      // console.log(response);
      if (
        response.hasErrorResponse === undefined ||
        response.hasErrorResponse === 'true'
      ) {
        // if get services call failed then get items
        this.setState({ loadingServicesFailed: true }, () => {
          this.getItems();
        });
      } else {
        const servicesFromEAI = response.responseObject.jsonObjectResponse;
        const services = beautifyGetSubListResponse(servicesFromEAI);
        const [activeServices, cancelledServices] = filterActiveCancel(
          services
        );
        this.setState(
          {
            activeAndCancelledServices: services,
            subscriptionsToShow: activeServices,
            services: activeServices,
            activeServices,
            cancelledServices,
            itemsAndServices: null,
            loadingServicesFailed: false
          },
          () => {
            this.getItems();
          }
        );
      }
    });
  };

  reloadApp = () => {
    this.setState({ filtering: true }, () => {
      this.getServicesAndItems();
    });
  };

  render() {
    const {
      enableNotifications,
      filtering,
      initialAppLoading,
      subscriptionsToShow,
      envDown
    } = this.state;
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleAllFilter: this.filterSubscriptions,
          handleSortFilter: this.sortSubscriptions,
          getItems: this.getItems,
          reloadApp: this.reloadApp
        }}
      >
        <SnackBar>
          <Header />
          {enableNotifications && !envDown ? <Notifications /> : null}
          {subscriptionsToShow && !envDown ? <Subscriptions /> : null}
          {subscriptionsToShow === null && !initialAppLoading && !envDown ? (
            <div className="no__subs">You have no subscriptions to view.</div>
          ) : null}
          {envDown ? (
            <div className="no__subs">
              We are experiencing some techinal difficulties, Please refresh
              page to try again.
            </div>
          ) : null}
          {!initialAppLoading && filtering && !envDown ? (
            <SpinnerPortal filtering />
          ) : null}
          {initialAppLoading && !filtering && !envDown ? (
            <SpinnerPortal />
          ) : null}
        </SnackBar>
      </AppContext.Provider>
    );
  }
}

export default App;
