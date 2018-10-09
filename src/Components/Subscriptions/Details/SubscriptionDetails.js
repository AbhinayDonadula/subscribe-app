import React from "react";
import AppContext from "../../Context/AppContext";
// import Dropdown from "../../SharedComponents/Dropdown";
import DetailsSection from "./DetailsSection";
import DownloadServiceSection from "./DownloadServiceSection";
import BillingInfoSection from "./BillingInfoSection";
import PaymentSection from "./PaymentSection";
import SubscriptionContext from "../../Context/SubscriptionContext";
import { formatDate } from "../../utils";

class SubscriptionDetails extends React.Component {
  state = {};

  handleFrequencyDropDown = selected => {
    this.setState({ frequencySelected: selected });
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <SubscriptionContext.Consumer>
            {subscription => {
              console.log(subscription);
              const {
                status = "",
                serviceType = "SS",
                billingFrequency,
                vendorNumber
              } = subscription;

              // show billing section only only for SS type and Monthly frequency
              const showBillingSection =
                serviceType === "SS" && billingFrequency === "MON";

              // show/hide download section
              const showDownloadSection =
                status.toLowerCase() !== "closed" &&
                vendorNumber !== "01242135" &&
                (serviceType === "SS" && vendorNumber !== "01306234");

              return (
                <div className="expand_box" style={{ display: "block" }}>
                  <div className="d-block d-md-none d-lg-none status_box">
                    <ul className="list-unstyled">
                      <li>
                        <label>STATUS </label> Subscribed until:{" "}
                        {formatDate(subscription.endDate)}
                      </li>
                      <li>
                        <label>{appData.content.Quantity}</label>{" "}
                        {subscription.quantity}
                      </li>
                      {/* <li>
                        <label>{appData.content.Frequency}</label>
                        <Dropdown
                          options={appData.content.FrequencyOptions}
                          updateParentState={this.handleFrequencyDropDown}
                        />
                      </li> */}
                    </ul>
                  </div>
                  <DetailsSection />
                  {showDownloadSection ? <DownloadServiceSection /> : null}
                  {showBillingSection ? <BillingInfoSection /> : null}
                  {/* {true ? <BillingInfoSection /> : null} */}
                  <PaymentSection />
                </div>
              );
            }}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionDetails;
