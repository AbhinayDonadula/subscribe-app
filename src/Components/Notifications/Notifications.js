import React from "react";
import NotificationNuggets from "./NotificationNuggets";
import RecentNotifications from "./RecentNotifications";

class Notifications extends React.Component {
  state = {};

  render() {
    return (
      <section className="subscript_sec">
        <div className="container-fluid">
          <NotificationNuggets />
          <div className="space40 d-none d-md-block d-lg-block" />
          <RecentNotifications />
        </div>
      </section>
    );
  }
}

export default Notifications;
