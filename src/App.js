import React, { Component } from "react";
import axios from "axios";
import Header from "./Components/Header/Header";
import Notifications from "./Components/Notifications/Notifications";
import content from "./content";
import AppContext from "./Components/Context/AppContext";
import "./App.css";
import Subscriptions from "./Components/Subscriptions/Subscriptions";
// import { getTokenFromCookie } from "./Components/utils";

class App extends Component {
  state = { content, userName: "Abhinay", isMobile: window.innerWidth <= 750 };

  componentDidMount() {
    console.log(">>------> Abhinay <------<<");
    this.getSubscriptionsList();
  }

  getSubscriptionsList = async () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3004/getSubscriptionDetailsListResponse"
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

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    try {
      const response = await axiosInstance.get();
      console.log("success", response);
    } catch (error) {
      console.error("error", error);
    }
  };

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        <div className="app-container">
          <Header />
          <Notifications />
          <Subscriptions />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
