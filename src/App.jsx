import React, { Component } from 'react';
// import '@babel/polyfill';
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
  cleanUp,
  getFilterSort
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
    sortBy: '',
    filterBy: 'All Subscriptions',
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
    loadingServicesFailed: false,
    showLoadMoreButton: false
  };

  componentDidMount() {
    this.getServicesAndItems();
    cleanUp();
  }

  filterSubscriptions = (selectedFilter = '', selectedSort = '') => {
    const [filterBy, sort] = getFilterSort(selectedFilter, selectedSort);

    this.setState(
      { filterBy, sortBy: sort ? sort.trim() : '', filtering: true },
      () => {
        const {
          activeAndCancelledServices,
          sortBy,
          activeServices,
          cancelledServices
        } = this.state;

        // sort/filter services only
        if (
          filterBy === 'Services' ||
          filterBy === 'Services-Active' ||
          filterBy === 'Services-Cancelled'
        ) {
          let servicesToShow = [];
          let toastMessage = '';
          if (filterBy === 'Services') {
            servicesToShow = activeAndCancelledServices;
            toastMessage = 'Showing All Services';
          }

          if (filterBy === 'Services-Active') {
            servicesToShow = activeServices;
            toastMessage = 'Showing Active Services';
          }

          if (filterBy === 'Services-Cancelled') {
            servicesToShow = cancelledServices;
            toastMessage = 'Showing Cancelled Services';
          }

          if (sortBy === 'Purchase Date') {
            if (filterBy === 'Services-Active') {
              servicesToShow = activeServices.sort(
                (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
              );
            } else if (filterBy === 'Services-Cancelled') {
              servicesToShow = cancelledServices.sort(
                (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
              );
            } else {
              servicesToShow = activeAndCancelledServices.sort(
                (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
              );
            }
            toastMessage = 'Showing Services sorted by purchase date';
          }
          if (sortBy === 'Billing Frequency') {
            if (filterBy === 'Services-Active') {
              servicesToShow = activeServices.sort(
                (a, b) => a.sortByFreq - b.sortByFreq
              );
            } else if (filterBy === 'Services-Cancelled') {
              servicesToShow = cancelledServices.sort(
                (a, b) => a.sortByFreq - b.sortByFreq
              );
            } else {
              servicesToShow = activeAndCancelledServices.sort(
                (a, b) => a.sortByFreq - b.sortByFreq
              );
            }
            toastMessage = 'Showing Services sorted by billing frequency';
          }
          this.setState(
            {
              subscriptionsToShow: servicesToShow,
              filtering: false,
              showLoadMoreButton: false
            },
            () => {
              toast.success(toastMessage);
            }
          );
        } else {
          this.getItems();
        }
      }
    );
  };

  sortItemsAndSubs = async (
    { responseObject },
    subscriptionsToShow,
    itemUpdates = false
  ) => {
    let itemSkus = [];
    let itemsAndServices = [];
    let products = [];
    const {
      activeAndCancelledServices,
      localAPI,
      sortBy,
      filterBy
    } = this.state;
    const { jsonObjectResponse } = responseObject;
    const { GetSubListDetail } = jsonObjectResponse;
    // const showLoadMoreButton = jsonObjectResponse.MoreFlag === '1';
    const showLoadMoreButton = true;
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
        sortDate: item.NextDlvDt,
        reactKeyId: item.RecordKey
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
      itemsAndServices = [...beautifiedItemsWithImages, ...subscriptionsToShow];

      // when we want to show only products
      products = beautifiedItemsWithImages;
    } catch (error) {
      if (subscriptionsToShow) {
        itemsAndServices = [...beautifiedItems, ...subscriptionsToShow];
      } else {
        itemsAndServices = [...beautifiedItems, ...activeAndCancelledServices];
      }
    }

    let sortedByDate = [];
    if (sortBy === 'Delivery Frequency' || filterBy === 'All Subscriptions') {
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
        showLoadMoreButton,
        products
      },
      () => {
        if (filterBy && !itemUpdates) {
          toast.success(`Showing ${filterBy}.`);
        }
      }
    );
  };

  getItems = (itemUpdates = false, loadMore = false) => {
    this.setState({ filtering: true }, async () => {
      let subscriptionsToShow = null;
      const {
        localAPI,
        activeServices,
        cancelledServices,
        activeAndCancelledServices,
        filterBy: filterStatus,
        sortBy
      } = this.state;

      if (filterStatus === 'Active') {
        subscriptionsToShow = activeServices;
      } else if (filterStatus === 'Cancelled') {
        subscriptionsToShow = cancelledServices;
      } else if (
        filterStatus === 'Products' ||
        filterStatus === 'Products-Active' ||
        filterStatus === 'Products-Cancelled'
      ) {
        subscriptionsToShow = [];
      } else {
        subscriptionsToShow = activeAndCancelledServices;
      }

      const itemsSubs = await getItemSubscriptions(
        localAPI,
        filterStatus,
        sortBy,
        loadMore ? 'F' : 'T'
      );
      if (!itemsSubs || itemsSubs.hasErrorResponse === undefined) {
        this.setState({ envDown: true });
      } else if (itemsSubs.hasErrorResponse === 'true') {
        this.setState({
          itemsAndServices: activeAndCancelledServices,
          subscriptionsToShow: activeAndCancelledServices,
          filtering: false,
          initialAppLoading: false,
          envDown: false,
          loadingProductsFailed: true
        });
      } else {
        this.sortItemsAndSubs(itemsSubs, subscriptionsToShow, itemUpdates);
      }
    });
  };

  getServicesAndItems = async () => {
    const { localAPI } = this.state;
    await getServiceSubscriptions(localAPI).then((response) => {
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

  handleLoadMore = () => {
    const { filterBy, sortBy } = this.state;
    this.filterSubscriptions(filterBy, sortBy, true);
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
          getItems: this.getItems,
          reloadApp: this.reloadApp,
          handleLoadMore: this.handleLoadMore
        }}
      >
        <SnackBar>
          <Header />
          {enableNotifications && !envDown ? <Notifications /> : null}
          {subscriptionsToShow && !envDown ? <Subscriptions /> : null}
          {subscriptionsToShow === null ||
          (subscriptionsToShow &&
            !subscriptionsToShow.length &&
            !initialAppLoading &&
            !envDown) ? (
            <div className="no__subs">No subscriptions found.</div>
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
