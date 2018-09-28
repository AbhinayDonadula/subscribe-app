import React from "react";
import SubscriptionFilters from "./SubscriptionFilters";

class Subscriptions extends React.Component {
  render() {
    return (
      <section className="detail_sec">
        <div className="container-fluid">
          <SubscriptionFilters />
        </div>
      </section>
    );
  }
}

export default Subscriptions;
