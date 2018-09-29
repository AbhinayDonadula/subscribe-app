import React from "react";
import SubscriptionFilters from "./SubscriptionFilters";
import SubscriptionItemsContainer from "./SubscriptionItemsContainer";

class Subscriptions extends React.Component {
  render() {
    return (
      <section className="detail_sec">
        <div className="container-fluid">
          <SubscriptionFilters />
          <div className="space50" />
          <SubscriptionItemsContainer />
        </div>
      </section>
    );
  }
}

export default Subscriptions;
