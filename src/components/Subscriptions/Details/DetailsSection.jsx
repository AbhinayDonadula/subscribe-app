import React from 'react';
import {
  formatPrice,
  formatDate,
  getContractNumber,
  getProductErrorMsg
} from '../../utils';
import AnimatedArrow from '../../SharedComponents/AnimatedArrow';
import SubDetailsContext from '../../Context/SubDetailsContext';
import getCancellationFee from '../../../apiCalls/getCancellationFee';
import AlertBox from '../../SharedComponents/AlertBox';

class DetailsSection extends React.Component {
  state = {
    showSubDetailsMobile: false,
    isMobile: window.innerWidth <= 750,
    cancelFees: 'N/A'
  };

  componentDidMount() {
    if (!this.subscription.isItem) {
      this.getCancelFees();
    }
  }

  getCancelFees = async () => {
    const { contractId, lineNumber } = this.subscription;
    const cancelFeeResponse = await getCancellationFee(
      this.appData.localAPI,
      contractId,
      lineNumber
    );

    if (
      !cancelFeeResponse ||
      cancelFeeResponse.hasErrorResponse === undefined ||
      cancelFeeResponse.hasErrorResponse === 'true' ||
      cancelFeeResponse.responseObject.jsonObjectResponse
        .terminationFeeResponse === null
    ) {
      this.setState({ cancellationFeeFailed: true });
    } else {
      this.setState({
        cancellationFeeFailed: false,
        response: cancelFeeResponse.responseObject.jsonObjectResponse,
        cancelFees:
          cancelFeeResponse.responseObject.jsonObjectResponse
            .terminationFeeResponse &&
          cancelFeeResponse.responseObject.jsonObjectResponse
            .terminationFeeResponse.CancellationFee === undefined
            ? '0'
            : cancelFeeResponse.responseObject.jsonObjectResponse
                .terminationFeeResponse.CancellationFee
      });
    }
  };

  showSubDetailsSection = () => {
    const { showSubDetailsMobile } = this.state;
    this.setState({
      showSubDetailsMobile: !showSubDetailsMobile,
      isMobile: window.innerWidth <= 750
    });
  };

  render() {
    const { showSubDetailsMobile, isMobile, cancelFees } = this.state;
    return (
      <SubDetailsContext.Consumer>
        {({ itemInfo = {}, subscriptionId, appData, subscription }) => {
          this.subscription = subscription;
          this.appData = appData;
          const showAlertBox =
            !subscription.isItem &&
            subscription.status === 'Under amendment' &&
            subscription.userStatusCode &&
            subscription.userStatusCode.toLowerCase() === 'hold';

          return (
            <div
              className={
                isMobile ? 'sub__details--container-mob full__width-mob' : ''
              }
            >
              <div
                className="head_txt sub_txt"
                onClick={this.showSubDetailsSection}
              >
                <span className="section__title-mob">
                  {appData.content.SubscriptionDetails}
                </span>
                {isMobile ? (
                  <span>
                    <AnimatedArrow
                      clicked={showSubDetailsMobile}
                      handleClick={this.showSubDetailsSection}
                    />
                  </span>
                ) : null}
              </div>
              {(showSubDetailsMobile || !isMobile) && (
                <React.Fragment>
                  {(subscription.ActionCode &&
                    subscription.ActionCode !== '' &&
                    subscription.status === 'A') ||
                  showAlertBox ? (
                    <AlertBox
                      error
                      errMsg="payment error"
                      errDesc={
                        showAlertBox
                          ? 'There is an issue processing your payment.'
                          : getProductErrorMsg(subscription.ActionCode)
                      }
                    />
                  ) : null}
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
                          {itemInfo
                            ? `$${itemInfo.Price.replace(/^0+/, '')}`
                            : formatPrice(subscription.unitPrice)}
                        </p>
                      </div>
                    </li>

                    {/* discount, item service only */}
                    {itemInfo &&
                    Number(itemInfo.IncPercent) > 0 &&
                    subscription.fixedPriceFlag === '' ? (
                      <li className="list-inline-item">
                        <div className="total_box">
                          <h3>{appData.content.SubscriptionDiscount}</h3>
                          <p className="sub__discount">
                            <span className="subscribing__txt">
                              Subscribing saves you {itemInfo.IncPercent}%
                            </span>
                            {isMobile ? null : <br />}
                            <span>
                              {' '}
                              Discount Expires: {itemInfo.IncEndDate}
                            </span>
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
                          <p style={{ color: '#b30000' }}>
                            {cancelFees === '0' ? cancelFees : `$${cancelFees}`}
                          </p>
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
                            {getContractNumber(
                              subscription.contractId,
                              subscription.lineNumber
                            )}
                          </p>
                        </div>
                      </li>
                    ) : null}

                    {/* last Shipment date, item service only */}
                    {itemInfo ? (
                      <li className="list-inline-item">
                        <div className="total_box">
                          <h3>Subscription ID:</h3>
                          <p>{subscriptionId}</p>
                        </div>
                      </li>
                    ) : null}
                  </ul>
                </React.Fragment>
              )}
              {isMobile ? <hr /> : null}
            </div>
          );
        }}
      </SubDetailsContext.Consumer>
    );
  }
}

export default DetailsSection;
