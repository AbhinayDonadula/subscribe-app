import React from "react";
import AppContext from "../../Context/AppContext";
import Dropdown from "../../SharedComponents/Dropdown";
import DetailsSection from "./DetailsSection";
import DownloadServiceSection from "./DownloadServiceSection";
import BillingInfoSection from "./BillingInfoSection";
import PaymentSection from "./PaymentSection";

class SubscriptionDetails extends React.Component {
  state = {};

  handleFrequencyDropDown = selected => {
    this.setState({ frequencySelected: selected });
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <div className="expand_box" style={{ display: "block" }}>
            <div className="d-block d-md-none d-lg-none status_box">
              <ul className="list-unstyled">
                <li>
                  <label>STATUS </label> Subscribed until:08/03/19{" "}
                </li>
                <li>
                  <label>{appData.content.Quantity}</label> 1
                </li>
                <li>
                  <label>{appData.content.Frequency}</label>
                  <Dropdown
                    frequencyDropDown
                    options={appData.content.FrequencyOptions}
                    updateParentState={this.handleFrequencyDropDown}
                  />
                </li>
              </ul>
            </div>
            <DetailsSection />
            <div className="space30 d-none d-md-block d-lg-block" />
            <DownloadServiceSection />
            <hr />
            <BillingInfoSection />
            <div className="space20" />
            <PaymentSection />
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionDetails;
