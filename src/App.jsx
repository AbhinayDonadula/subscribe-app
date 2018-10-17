import React, { Component } from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header/Header';
import Notifications from './components/Notifications/Notifications';
import content from './content';
import AppContext from './components/Context/AppContext';
import Subscriptions from './components/Subscriptions/Subscriptions';
import {
  beautifyGetSubListResponse,
  FireFetch,
  createGetItemsURL,
  FireGetItems
} from './components/utils';

class App extends Component {
  state = {
    content,
    userName: 'John Doe',
    isMobile: window.innerWidth <= 750,
    initialAppLoading: true,
    enableNotifications: false,
    enableEmailCampaign: false,
    subscriptions: null,
    subscriptionsAndItems: null,
    localAPI: true
  };

  componentDidMount() {
    this.getSubscriptionsAndItemsList();
    if (document.getElementById('actualContent')) {
      document.getElementById('actualContent').className = 'col-md-9 col-sm-12';
    }
  }

  handleGetItemsListSuccess = (response) => {
    const sortedByDate = this.sortItemsAndSubs(response);
    this.setState({
      initialAppLoading: false,
      subscriptionsAndItems: sortedByDate
    });
  };

  handleGetItemsListFailure = (error) => {
    this.setState({ getItemsError: error });
  };

  handleGetSubListSuccess = (response) => {
    const { localAPI } = this.state;
    const {
      data: { getSubscriptionDetailsListResponse }
    } = response;
    const subscriptions = beautifyGetSubListResponse(
      getSubscriptionDetailsListResponse
    );
    this.setState(
      {
        userName: getSubscriptionDetailsListResponse.customer.fullName,
        subscriptions,
        // subscriptionsAndItems: subscriptions,
        subscriptionsAndItems: null,
        initialAppLoading: false
      },
      () => {
        FireGetItems(
          localAPI ? 'http://localhost:3004/getItems' : createGetItemsURL(),
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
      localAPI ? 'http://localhost:3004/getItems' : createGetItemsURL(),
      this.handleGetItemsListSuccess,
      this.handleGetItemsListFailure
    );
  };

  getSubscriptionsAndItemsList = () => {
    const { localAPI } = this.state;
    FireFetch(
      localAPI ? 'http://localhost:3004/data' : content.apiUrls.getSubList,
      this.handleGetSubListSuccess,
      this.handleGetSubListFailure
    );
  };

  handleAllFilter = (selected) => {
    this.setState({ initialAppLoading: true }, () => {
      window.setTimeout(() => {
        this.setState({ initialAppLoading: false, selectedFilter: selected });
      }, 3000);
    });
  };

  handleSortFilter = (selected) => {
    this.setState({ sortFilter: selected });
  };

  sortItemsAndSubs(response) {
    const { subscriptions } = this.state;
    const itemsList =
      response.responseObject.jsonObjectResponse.GetSubListDetail;
    const itemsArray = Object.values(itemsList).filter(
      (each) => each.RecordKey.length > 0
    );
    const beautifiedItems = itemsArray.map((item) => {
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
    const itemsAndServices = [...beautifiedItems, ...subscriptions];
    const sortedByDate = itemsAndServices.sort(
      (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
    );
    return sortedByDate;
  }

  render() {
    const { enableNotifications } = this.state;
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleAllFilter: this.handleAllFilter,
          handleSortFilter: this.handleSortFilter
        }}
      >
        <div>
          <Header />
          {enableNotifications ? <Notifications /> : null}
          <Subscriptions />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
