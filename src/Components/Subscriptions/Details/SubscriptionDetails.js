import React from "react";
import AppContext from "../../Context/AppContext";
// import Dropdown from "../../SharedComponents/Dropdown";
import DetailsSection from "./DetailsSection";
import DownloadServiceSection from "./DownloadServiceSection";
import BillingInfoSection from "./BillingInfoSection";
import PaymentSection from "./PaymentSection";
import SubscriptionContext from "../../Context/SubscriptionContext";
import { formatDate, FireFetch } from "../../utils";

class SubscriptionDetails extends React.Component {
  state = {
    itemInfo: null
  };

  componentDidMount() {
    if (this.subscription.isItem) {
      FireFetch(
        // content.apiUrls.getSubList,
        "http://localhost:3004/getItemInfo",
        this.handleGetItemInfoSuccess,
        this.handleGetItemInfoFailure
      );
    }
  }

  handleGetItemInfoSuccess = response => {
    console.log(response.data.responseObject.jsonObjectResponse);
    this.setState({
      itemInfo: response.data.responseObject.jsonObjectResponse
    });
  };

  handleGetItemInfoErr = error => {
    console.log(error);
  };

  handleFrequencyDropDown = selected => {
    this.setState({ frequencySelected: selected });
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <SubscriptionContext.Consumer>
            {subscription => {
              // console.log(subscription);
              this.subscription = subscription;
              const {
                status = "",
                serviceType = "SS",
                billingFrequency,
                vendorNumber,
                isItem
              } = subscription;

              // show billing section only only for SS type and Monthly frequency
              const showBillingSection =
                serviceType === "SS" && billingFrequency === "MON";

              // show/hide download section
              const showDownloadSection =
                !isItem &&
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
                        {subscription.quantity.replace(/^0+/, "")}
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
                  <DetailsSection itemInfo={this.state.itemInfo} />
                  {showDownloadSection ? <DownloadServiceSection /> : null}
                  {showBillingSection ? <BillingInfoSection /> : null}
                  <PaymentSection itemInfo={this.state.itemInfo} />
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
