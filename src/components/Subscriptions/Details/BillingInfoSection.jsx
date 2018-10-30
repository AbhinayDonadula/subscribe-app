import React from 'react';
import SubscriptionContext from '../../Context/SubscriptionContext';
import Img from '../../SharedComponents/Img';
import {
  formatDate,
  beautifyBillingHistoryResponse,
  getBillingHistory
} from '../../utils';
import AppContext from '../../Context/AppContext';
import getBillingHistoryAPI from '../../../apiCalls/getBillingHistory';

class BillingInfoSection extends React.Component {
  state = {
    show: false,
    isMobile: window.innerWidth <= 750,
    billingHistory: null
  };

  componentDidMount() {
    getBillingHistory(
      this.localAPI
        ? 'http://localhost:3004/billingHistory'
        : this.billingHistoryUrl,
      this.handleSuccess,
      this.handleFailure
    );

    this.getBillingHistory();
  }

  getBillingHistory = async () => {
    const billingHistory = await getBillingHistoryAPI(
      this.localAPI,
      this.contractId
    );
    if (
      (billingHistory.success !== undefined && !billingHistory.success) ||
      (billingHistory.responseObject && !billingHistory.responseObject.success)
    ) {
      this.setState({ billingHistoryFailed: true });
    } else {
      this.setState({
        billingHistoryFailed: false,
        newBillingHistory: billingHistory
      });
    }
  };

  handleSuccess = ({ data }) => {
    let billingHistory = [];
    if (
      data.billingHistoryResponse &&
      data.billingHistoryResponse.billingHistoryRecord &&
      data.billingHistoryResponse.billingHistoryRecord.length > 0
    ) {
      billingHistory = beautifyBillingHistoryResponse(data);
      this.setState({ billingHistory });
    }
    if (
      data.billingHistoryResponse &&
      data.billingHistoryResponse.billingHistoryRecord &&
      data.billingHistoryResponse.billingHistoryRecord.length === 0
    ) {
      this.setState({ billingHistory });
    }
  };

  handleFailure = () => {
    this.setState({ billingHistory: [] });
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
                <React.Fragment>
                  <h3
                    className="head_txt dnload_txt"
                    onClick={this.toggleShowHide}
                  >
                    {appData.content.BillingSection.BillingInfoSectionHeader}
                    {/* <img
                      src="img/down.jpg"
                      className="img-resp down_img1"
                      alt=""
                    /> */}
                  </h3>
                  {(show || !isMobile) && (
                    <div className="bill_Div show">
                      {!showBillingTable ? (
                        <p className="pay_txt">
                          <label>
                            {
                              appData.content.BillingSection
                                .NextScheduledPayment
                            }
                          </label>{' '}
                          {billingHistory.items[0]
                            ? formatDate(
                                billingHistory.items[0].nextBillingDate
                              )
                            : 'N/A'}
                        </p>
                      ) : null}

                      <a
                        href="/"
                        className="view_txt d-block d-md-none d-lg-none"
                      >
                        {appData.content.BillingSection.ViewAllBillingHistory}
                        <i className="fa fa-angle-right" aria-hidden="true" />
                      </a>
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
                                      styles={{ width: '5%' }}
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
                          style={{ height: !showBillingTable ? 226 : 'auto' }}
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
                              <tr>
                                <td>{!showBillingTable ? '$15' : 'N/A'}</td>
                              </tr>
                              {!showBillingTable ? (
                                <React.Fragment>
                                  <tr>
                                    <td>$15</td>
                                  </tr>
                                  <tr>
                                    <td>$15</td>
                                  </tr>
                                  <tr>
                                    <td>$15</td>
                                  </tr>
                                  <tr>
                                    <td>$15</td>
                                  </tr>
                                </React.Fragment>
                              ) : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  <div style={{ marginTop: 40 }} />
                </React.Fragment>
              );
            }}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default BillingInfoSection;
