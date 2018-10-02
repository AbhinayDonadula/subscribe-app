import React from "react";
import AppContext from "../../Context/AppContext";
import SubscriptionContext from "../../Context/SubscriptionContext";
import { formatPrice, formatDate, getContractNumber } from "../../utils";

class DetailsSection extends React.Component {
  state = {
    showSubDetailsMobile: false,
    isMobile: window.innerWidth <= 750
  };

  showSubDetailsSection = () => {
    this.setState(({ showSubDetailsMobile }) => ({
      showSubDetailsMobile: !showSubDetailsMobile,
      isMobile: window.innerWidth <= 750
    }));
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <SubscriptionContext.Consumer>
            {subscription => (
              <React.Fragment>
                <h3
                  className="head_txt sub_txt"
                  onClick={this.showSubDetailsSection}
                  role="presentation"
                >
                  {appData.content.SubscriptionDetails}
                  <img
                    src="img/down.jpg"
                    className="img-resp down_img1"
                    alt=""
                  />
                </h3>
                <hr className="d-block d-md-none d-lg-none" />
                {(this.state.showSubDetailsMobile || !this.state.isMobile) && (
                  <ul
                    className={`list-inline list-unstyled list_price ${
                      this.state.isMobile ? "show" : ""
                    }`}
                  >
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>{appData.content.TotalPrice}</h3>
                        <p>{formatPrice(subscription.unitPrice || "00")}</p>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>{appData.content.SubscriptionStart}:</h3>
                        <p>
                          {subscription && subscription.startDate
                            ? formatDate(subscription.startDate)
                            : "N/A"}
                        </p>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>{appData.content.SubscriptionEnd}:</h3>
                        <p>
                          {subscription && subscription.endDate
                            ? formatDate(subscription.endDate)
                            : "N/A"}
                        </p>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>{appData.content.FeeToCancel}</h3>
                        <p>$103.50</p>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>{appData.content.OrderNumber}</h3>
                        <p>
                          {subscription && subscription.orderNumber
                            ? subscription.orderNumber
                            : "N/A"}
                        </p>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>{appData.content.ItemNumber}</h3>
                        <p>
                          {subscription && subscription.itemNumber
                            ? subscription.itemNumber
                            : "N/A"}
                        </p>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>{appData.content.ContractNumber}</h3>
                        <p>
                          <a href="/">
                            {getContractNumber(
                              subscription.contractId,
                              subscription.lineNumber
                            )}
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                )}
                <div className="space30 d-none d-md-block d-lg-block" />
              </React.Fragment>
            )}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default DetailsSection;
