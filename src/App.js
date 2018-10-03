import React, { Component } from "react";
import axios from "axios";
import Header from "./Components/Header/Header";
import Notifications from "./Components/Notifications/Notifications";
import content from "./content";
import AppContext from "./Components/Context/AppContext";
import "./App.css";
import Subscriptions from "./Components/Subscriptions/Subscriptions";
import Loader from "./Components/SharedComponents/Loader";
import { beautifyGetSubListResponse } from "./Components/utils";
// import { getTokenFromCookie } from "./Components/utils";

class App extends Component {
  state = {
    content,
    userName: "Abhinay",
    isMobile: window.innerWidth <= 750,
    initialAppLoading: true
  };

  componentDidMount() {
    this.getSubscriptionsList();
  }

  getSubscriptionsList = async () => {
    const axiosInstance = axios.create({
      baseURL: content.apiUrls.getSubList
    });

    const token = "abhinay";
    // const token = getTokenFromCookie();
    if (token && !token.length > 0) {
      const axiosJWTInstance = axios.create({
        baseURL: "/json/jwtSubscription.do"
      });
      // axiosJWTInstance.defaults.headers.common.credentials = "same-origin";
      try {
        const response = await axiosJWTInstance.get();
        console.log("success", response);
      } catch (error) {
        console.error("error", error);
      }
    }

    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    axiosInstance.defaults.headers.common.Authorization = content.apiUrls.token;
    try {
      const {
        data: { getSubscriptionDetailsListResponse }
      } = await axiosInstance.get();
      const subscriptions = beautifyGetSubListResponse(
        getSubscriptionDetailsListResponse
      );
      this.setState({
        initialAppLoading: false,
        userName: getSubscriptionDetailsListResponse.customer.fullName,
        subscriptions
      });
    } catch (error) {
      this.setState({ initialAppLoading: false });
      console.error("error", error);
    }
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
