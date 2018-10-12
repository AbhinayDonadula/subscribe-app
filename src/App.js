import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Header from "./Components/Header/Header";
import Notifications from "./Components/Notifications/Notifications";
import content from "./content";
import AppContext from "./Components/Context/AppContext";
import "./App.css";
import Subscriptions from "./Components/Subscriptions/Subscriptions";
import Loader from "./Components/SharedComponents/Loader";
import { beautifyGetSubListResponse, FireFetch } from "./Components/utils";

class App extends Component {
  state = {
    content,
    userName: "John Doe",
    isMobile: window.innerWidth <= 750,
    initialAppLoading: true,
    subscriptions: null,
    subscriptionsAndItems: []
  };

  componentDidMount() {
    this.getSubscriptionsAndItemsList();
  }

  handleGetItemsListSuccess = response => {
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
    console.log(beautifiedItems);
    const itemsAndServices = [...beautifiedItems, ...this.state.subscriptions];
    const sortedByDate = itemsAndServices.sort(
      (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
    );
    console.log(sortedByDate);
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
        subscriptionsAndItems: subscriptions
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
      console.log(error.status, isJWTFailed);
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

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        {this.state.initialAppLoading ? (
          <Loader />
        ) : (
          <div className="app-container">
            <Header />
            <Notifications />
            <Subscriptions />
          </div>
        )}
      </AppContext.Provider>
    );
  }
}

export default App;
