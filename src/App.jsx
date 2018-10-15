import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./Components/Header/Header";
import Notifications from "./Components/Notifications/Notifications";
import content from "./content";
import AppContext from "./Components/Context/AppContext";
import "./App.css";
import Subscriptions from "./Components/Subscriptions/Subscriptions";
import { beautifyGetSubListResponse, FireFetch } from "./Components/utils";

class App extends Component {
  state = {
    content,
    userName: "John Doe",
    isMobile: window.innerWidth <= 750,
    initialAppLoading: true,
    enableNotifications: true,
    subscriptions: null,
    subscriptionsAndItems: null
  };

  componentDidMount() {
    this.getSubscriptionsAndItemsList();
  }

  handleGetItemsListSuccess = response => {
    const sortedByDate = this.sortItemsAndSubs(response);
    this.setState({
      initialAppLoading: false,
      subscriptionsAndItems: sortedByDate
    });
  };

  handleGetItemsListFailure = error => {
    console.log(error);
  };

  handleGetSubListSuccess = response => {
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
        subscriptionsAndItems: null
      },
      () => {
        FireFetch(
          // content.apiUrls.getSubList,
          "http://localhost:3004/getItems",
          this.handleGetItemsListSuccess,
          this.handleGetItemsListFailure
        );
      }
    );
  };

  handleGetSubListFailure = (error, isJWTFailed) => {
    if (error) {
      // console.log(error.status, isJWTFailed);
      this.setState({ getSubListError: error, isJWTFailed });
    }
    FireFetch(
      // content.apiUrls.getSubList,
      "http://localhost:3004/getItems",
      this.handleGetItemsListSuccess,
      this.handleGetItemsListFailure
    );
    // this.setState({ initialAppLoading: false });
  };

  getSubscriptionsAndItemsList = () => {
    FireFetch(
      // content.apiUrls.getSubList,
      "http://localhost:3004/data",
      this.handleGetSubListSuccess,
      this.handleGetSubListFailure
    );
  };

  handleAllFilter = selected => {
    // console.log(selected);
    this.setState({ initialAppLoading: true }, () => {
      window.setTimeout(() => {
        this.setState({ initialAppLoading: false, selectedFilter: selected });
      }, 3000);
    });
  };

  handleSortFilter = selected => {
    console.log(selected);
  };

  sortItemsAndSubs(response) {
    const { subscriptions } = this.state;
    const itemsList =
      response.data.responseObject.jsonObjectResponse.GetSubListDetail;
    const beautifiedItems = Object.values(itemsList).map(item => ({
      ...item,
      isItem: true,
      itemDescription: item.Desc,
      billingFrequency: item.Freq,
      quantity: item.QtyOrd,
      status: item.Status,
      sortDate: item.NextDlvDt
    }));
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
        <div className="app-container">
          <Header />
          {enableNotifications ? <Notifications /> : null}
          <Subscriptions />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
