import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../Context/AppContext';
import SubscriptionContext from '../../Context/SubscriptionContext';
import { formatPrice, formatDate, getContractNumber } from '../../utils';

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
    const { showSubDetailsMobile, isMobile } = this.state;
    const { itemInfo } = this.props;
    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => (
              // console.log(subscription);
              <React.Fragment>
                <h3
                  className="head_txt sub_txt"
                  onClick={this.showSubDetailsSection}
                >
                  {appData.content.SubscriptionDetails}
                  <img
                    src="img/down.jpg"
                    className="img-resp down_img1"
                    alt=""
                  />
                </h3>
                <hr className="d-block d-md-none d-lg-none" />
                {(showSubDetailsMobile || !isMobile) && (
                  <ul
                    className={`list-inline list-unstyled list_price ${
                      isMobile ? 'show' : ''
                    } ${
                      itemInfo
                        ? 'sub__details--section-item'
                        : 'sub__details--section-sub'
                    }`}
                  >
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>
                          {itemInfo
                            ? appData.content.ItemPrice
                            : appData.content.TotalPrice}
                        </h3>
                        <p>
                          {formatPrice(
                            itemInfo
                              ? itemInfo.Price
                              : subscription.unitPrice || '00'
                          )}
                        </p>
                      </div>
                    </li>

                    {/* discount, item service only */}
                    {itemInfo ? (
                      <li className="list-inline-item">
                        <div className="total_box">
                          <h3>{appData.content.SubscriptionDiscount}:</h3>
                          <p>
                            <span>Subscribing saves you ##%</span>
                            <span>Discount Expires, 12/12/2018</span>
                          </p>
                        </div>
                      </li>
                    ) : null}

                    {/* Subscription start date, sub service and item service */}
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>{appData.content.SubscriptionStart}:</h3>
                        <p>
                          {itemInfo &&
                            itemInfo.CreateDt &&
                            formatDate(itemInfo.CreateDt)}
                          {!itemInfo &&
                            subscription &&
                            formatDate(subscription.startDate)}
                        </p>
                      </div>
                    </li>

                    {/* Subscription End date, sub service only */}
                    {!itemInfo ? (
                      <li className="list-inline-item">
                        <div className="total_box">
                          <h3>{appData.content.SubscriptionEnd}:</h3>
                          <p>
                            {subscription && subscription.endDate
                              ? formatDate(subscription.endDate)
                              : 'N/A'}
                          </p>
                        </div>
                      </li>
                    ) : null}

                    {/* last Shipment date, item service only */}
                    {itemInfo ? (
                      <li className="list-inline-item">
                        <div className="total_box">
                          <h3>{appData.content.LastShipmentDate}:</h3>
                          <p>{formatDate(itemInfo.LastDlvDt)}</p>
                        </div>
                      </li>
                    ) : null}

                    {/* Fee to cancel, sub service only */}
                    {!itemInfo ? (
                      <li className="list-inline-item">
                        <div className="total_box">
                          <h3>{appData.content.FeeToCancel}</h3>
                          <p>N/A</p>
                        </div>
                      </li>
                    ) : null}

                    {/* Order Number, sub service only */}
                    {!itemInfo ? (
                      <li className="list-inline-item">
                        <div className="total_box">
                          <h3>{appData.content.OrderNumber}</h3>
                          <p>
                            {subscription && subscription.orderNumber
                              ? subscription.orderNumber
                              : 'N/A'}
                          </p>
                        </div>
                      </li>
                    ) : null}

                    {/* Item Number, sub service and Item service */}
                    <li className="list-inline-item">
                      <div className="total_box">
                        <h3>{appData.content.ItemNumber}</h3>
                        <p>
                          {itemInfo && itemInfo.SKU}
                          {!itemInfo && subscription && subscription.itemNumber}
                        </p>
                      </div>
                    </li>

                    {/* Contract Number, sub service only */}
                    {!itemInfo ? (
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
                    ) : null}
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

DetailsSection.propTypes = {
  itemInfo: PropTypes.object
};

DetailsSection.defaultProps = {
  itemInfo: {}
};

export default DetailsSection;
