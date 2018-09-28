import React, { Component } from "react";
import Header from "./Components/Header/Header";
import Notifications from "./Components/Notifications/Notifications";
import content from "./content";
import AppContext from "./Components/Context/AppContext";
import "./App.css";
import Subscriptions from "./Components/Subscriptions/Subscriptions";

class App extends Component {
  state = { content, userName: "Abhinay" };

  componentDidMount() {
    console.log("make an api call to get all subscriptions");
  }

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
