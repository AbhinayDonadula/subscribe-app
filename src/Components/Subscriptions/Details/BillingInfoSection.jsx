import React from 'react';
import AppContext from '../../Context/AppContext';
import SubscriptionContext from '../../Context/SubscriptionContext';
import Img from '../../SharedComponents/Img';
import {
  FireFetch,
  formatDate,
  beautifyBillingHistoryResponse
} from '../../utils';

class BillingInfoSection extends React.Component {
  state = {
    show: false,
    isMobile: window.innerWidth <= 750,
    billingHistory: null
  };

  componentDidMount() {
    FireFetch(
      this.localAPI
        ? 'http://localhost:3004/billingHistory'
        : this.billingHistoryUrl,
      this.handleSuccess,
      this.handleFailure
    );
  }

  handleSuccess = response => {
    window.setTimeout(() => {
      this.setState({
        billingHistory: beautifyBillingHistoryResponse(response)
      });
    }, 3000);
  };

  handleFailure = (error, isJWTFailed) => {
    if (isJWTFailed) {
      console.log('JWT failed in billing section', error.status);
    }
    console.log(error);
    this.setState({ billingHistory: [], billingHistoryError: error });
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
        {appData => (
          <SubscriptionContext.Consumer>
            {subscription => {
              this.billingHistoryUrl =
                appData.content.apiUrls.getBillingHistory +
                subscription.contractId;
              this.localAPI = appData.localAPI;
              return (
                <React.Fragment>
                  <h3
                    className="head_txt dnload_txt"
                    role="presentation"
                    onClick={this.toggleShowHide}
                  >
                    {appData.content.BillingSection.BillingInfoSectionHeader}
                    <img
                      src="img/down.jpg"
                      className="img-resp down_img1"
                      alt=""
                    />
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
                          {formatDate(billingHistory.items[0].nextBillingDate)}
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
                                      src="https://wwwsqm.officedepot.com/images/od/v2/loading.gif"
                                    />
                                  </td>
                                  <td />
                                  <td className="zui-sticky-col mob" />
                                </tr>
                              )}
                              {showBillingTable && !isLoading ? (
                                <tr>
                                  <td />
                                  <td />
                                  <td>
                                    {noBillingHistory && billingHistoryError
                                      ? 'Billing History unvailable'
                                      : 'Your first recurring bill has not been generated'}
                                  </td>
                                  <td />
                                  <td className="zui-sticky-col mob" />
                                </tr>
                              ) : (
                                <React.Fragment>
                                  {billingHistory &&
                                    billingHistory.items.map(each => {
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
