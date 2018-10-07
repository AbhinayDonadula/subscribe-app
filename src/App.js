import React, { Component } from "react";
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
    initialAppLoading: true
  };

  componentDidMount() {
    this.getSubscriptionsList();
  }

  handleSuccess = response => {
    const {
      data: { getSubscriptionDetailsListResponse }
    } = response;
    const subscriptions = beautifyGetSubListResponse(
      getSubscriptionDetailsListResponse
    );
    this.setState({
      initialAppLoading: false,
      userName: getSubscriptionDetailsListResponse.customer.fullName,
      subscriptions
    });
  };

  handleFailure = (error, isJWTFailed) => {
    if (error) {
      console.log(error.status, isJWTFailed);
    }
    this.setState({ initialAppLoading: false });
  };

  getSubscriptionsList = async () => {
    // params(url, token, success, failure), get subscriptions list
    FireFetch(
      content.apiUrls.getSubList,
      this.handleSuccess,
      this.handleFailure
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
