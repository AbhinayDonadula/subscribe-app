import React from 'react';
import SubscriptionContext from '../../Context/SubscriptionContext';
import Img from '../../SharedComponents/Img';
import { formatDate, beautifyBillingHistoryResponse } from '../../utils';
import AppContext from '../../Context/AppContext';
import getBillingHistoryAPI from '../../../apiCalls/getBillingHistory';
import AnimatedArrow from '../../SharedComponents/AnimatedArrow';

class BillingInfoSection extends React.Component {
  state = {
    show: false,
    isMobile: window.innerWidth <= 750,
    billingHistory: null
  };

  componentDidMount() {
    this.getBillingHistory();
  }

  getBillingHistory = async () => {
    const billingHistory = await getBillingHistoryAPI(
      this.localAPI,
      this.contractId
    );
    if (
      !billingHistory ||
      billingHistory.hasErrorResponse === undefined ||
      billingHistory.hasErrorResponse === 'true'
    ) {
      this.setState({ billingHistoryFailed: true, billingHistory: [] });
    } else {
      let newBillingHistory = [];
      if (
        Object.keys(billingHistory.responseObject.jsonObjectResponse).length ===
        0
      ) {
        newBillingHistory = [];
      } else {
        const data = billingHistory.responseObject.jsonObjectResponse;
        if (
          data.billingHistoryResponse &&
          data.billingHistoryResponse.billingHistoryRecord &&
          data.billingHistoryResponse.billingHistoryRecord.length > 0
        ) {
          newBillingHistory = beautifyBillingHistoryResponse(data);
        }
        if (
          data.billingHistoryResponse &&
          data.billingHistoryResponse.billingHistoryRecord &&
          data.billingHistoryResponse.billingHistoryRecord.length === 0
        ) {
          newBillingHistory = [];
        }
      }
      this.setState({
        billingHistoryFailed: false,
        billingHistory: newBillingHistory
      });
    }
  };

  toggleShowHide = () => {
    this.setState(({ show }) => ({
      show: !show,
      isMobile: window.innerWidth <= 750
    }));
  };

  render() {
    const { billingHistory, billingHistoryError } = this.state;
    const showBillingTable =
      (billingHistory && billingHistory.length === 0) ||
      billingHistory === null;
    const { isMobile, show } = this.state;

    const isLoading = billingHistory === null;
    const noBillingHistory = billingHistory && billingHistory.length === 0;

    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => {
              this.billingHistoryUrl =
                appData.content.apiUrls.getBillingHistory +
                subscription.contractId;
              this.localAPI = appData.localAPI;
              this.contractID = subscription.contractId;
              return (
                <div className="full__width-mob">
                  <div
                    className="head_txt sub_txt"
                    onClick={this.toggleShowHide}
                  >
                    <span className="section__title-mob">
                      {appData.content.BillingSection.BillingInfoSectionHeader}
                    </span>
                    {isMobile ? (
                      <span>
                        <AnimatedArrow
                          clicked={show}
                          handleClick={this.toggleShowHide}
                        />
                      </span>
                    ) : null}
                  </div>
                  {(show || !isMobile) && (
                    <div className="bill_Div show">
                      {!showBillingTable ? (
                        <p className="pay_txt nxt__billing-mob">
                          <label>
                            {
                              appData.content.BillingSection
                                .NextScheduledPayment
                            }
                          </label>{' '}
                          <span className="nxt__billing-date">
                            {billingHistory.items[0]
                              ? formatDate(
                                  billingHistory.items[0].nextBillingDate
                                )
                              : 'N/A'}
                          </span>
                        </p>
                      ) : null}
                      {/* <a
                        href="/"
                        className="view_txt d-block d-md-none d-lg-none"
                      >
                        {appData.content.BillingSection.ViewAllBillingHistory}
                        <i className="fa fa-angle-right" aria-hidden="true" />
                      </a> */}
                      <div
                        className="pos_rel"
                        style={{ height: !showBillingTable ? '100%' : 'auto' }}
                      >
                        <div className="clearfix" />
                        <div className="table-responsive zui-scroller">
                          <table
                            className="table table2 table-striped zui-table"
                            id="invoice_table"
                          >
                            <thead>
                              <tr>
                                <th>
                                  {appData.content.BillingSection.InvoiceDate}
                                </th>
                                <th>
                                  {appData.content.BillingSection.InvoiceNumber}
                                </th>
                                <th>
                                  {appData.content.BillingSection.PaymentMethod}
                                </th>
                                <th>
                                  {appData.content.BillingSection.ServicePeriod}
                                </th>
                                <th className="zui-sticky-col mob">
                                  {appData.content.BillingSection.TaxAndTotal}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading && (
                                <tr>
                                  <td />
                                  <td />
                                  <td>
                                    <Img
                                      spinner
                                      styles={{ width: '15%' }}
                                      src="https://wwwsqm.officedepot.com/images/od/v2/loading.gif"
                                    />
                                  </td>
                                  <td />
                                  <td className="zui-sticky-col mob" />
                                </tr>
                              )}
                              {showBillingTable && !isLoading ? (
                                <tr>
                                  <td className="billing__err" colSpan="5">
                                    {noBillingHistory && billingHistoryError
                                      ? 'Billing History unavailable'
                                      : 'Your first recurring bill has not been generated'}
                                  </td>
                                </tr>
                              ) : (
                                <React.Fragment>
                                  {billingHistory &&
                                    billingHistory.items.map((each) => {
                                      const { invoiceNumber, date } = each;
                                      return (
                                        <tr key={invoiceNumber}>
                                          <td>{date}</td>
                                          <td>{invoiceNumber}</td>
                                          <td>
                                            {each.paymentCardType}{' '}
                                            {each.paymentCardNumber.slice(-4)}
                                          </td>
                                          <td>
                                            {each.servicePeriodStart} -{' '}
                                            {each.servicePeriodEnd}
                                          </td>
                                          <td className="zui-sticky-col mob">
                                            ${each.total}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </React.Fragment>
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div
                          className="fix d-mob1"
                          style={{
                            height: !showBillingTable ? '100%' : 'auto'
                          }}
                        >
                          <table
                            className="table table2 table-striped zui-table"
                            id="invoice_table"
                          >
                            <thead>
                              <tr>
                                <th>
                                  {appData.content.BillingSection.TaxAndTotal}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {!showBillingTable ? (
                                <React.Fragment>
                                  {billingHistory &&
                                    billingHistory.items.map((each) => {
                                      return (
                                        <tr key={each.invoiceNumber}>
                                          <td>{each.total}</td>
                                        </tr>
                                      );
                                    })}
                                </React.Fragment>
                              ) : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  <hr />
                </div>
              );
            }}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default BillingInfoSection;
