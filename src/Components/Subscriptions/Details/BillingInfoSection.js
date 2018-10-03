import React from "react";
import AppContext from "../../Context/AppContext";
import SubscriptionContext from "../../Context/SubscriptionContext";
import getBillingHistory from "../../../apiCalls/getBillingHistory";
import Img from "../../SharedComponents/Img";

class BillingInfoSection extends React.Component {
  state = {
    show: false,
    isMobile: window.innerWidth <= 750,
    billingHistory: null
  };

  async componentDidMount() {
    try {
      const result = await getBillingHistory(this.bearerToken);
      console.log(result);
      this.setState({
        billingHistory: result.data.billingHistoryResponse.billingHistoryRecord
      });
    } catch (e) {
      this.setState({ billingHistory: [], billingHistoryError: e });
    }
  }

  toggleShowHide = () => {
    this.setState(({ show }) => ({
      show: !show,
      isMobile: window.innerWidth <= 750
    }));
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <SubscriptionContext.Consumer>
            {subscription => {
              this.billingHistoryUrl =
                appData.content.apiUrls.getBillingHistory +
                subscription.contractId;
              this.bearerToken = appData.content.apiUrls.token;
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
                  {(this.state.show || !this.state.isMobile) && (
                    <div className="bill_Div show">
                      <p className="pay_txt">
                        <label>
                          {appData.content.BillingSection.NextScheduledPayment}
                        </label>{" "}
                        Jul 13, 2018
                      </p>
                      <a
                        href=""
                        className="view_txt d-block d-md-none d-lg-none"
                      >
                        {appData.content.BillingSection.ViewAllBillingHistory}
                        <i className="fa fa-angle-right" aria-hidden="true" />
                      </a>
                      <div className="pos_rel">
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
                              {(this.state.billingHistory &&
                                this.state.billingHistory.length === 0) ||
                              this.state.billingHistory === null ? (
                                <tr>
                                  <td />
                                  <td />
                                  <td>
                                    {this.state.billingHistory &&
                                    this.state.billingHistory.length === 0 ? (
                                      this.state.billingHistoryError ? (
                                        "Billing History unvailable"
                                      ) : (
                                        "Your first recurring bill has not been generated"
                                      )
                                    ) : (
                                      <Img
                                        spinner
                                        src="https://wwwsqm.officedepot.com/images/od/v2/loading.gif"
                                      />
                                    )}
                                  </td>
                                  <td />
                                  <td className="zui-sticky-col mob" />
                                </tr>
                              ) : (
                                <React.Fragment>
                                  <tr>
                                    <td>3/26/2018</td>
                                    <td>9000190</td>
                                    <td>PLCC 0659</td>
                                    <td>3/26/2018 - 3/26/2018</td>
                                    <td className="zui-sticky-col mob">$15</td>
                                  </tr>
                                  <tr>
                                    <td>3/26/2018</td>
                                    <td>9000190</td>
                                    <td>MASTERCARD 0659</td>
                                    <td>3/26/2018 - 3/26/2018</td>
                                    <td className="zui-sticky-col mob">$15</td>
                                  </tr>
                                  <tr>
                                    <td>3/26/2018</td>
                                    <td>9000190</td>
                                    <td>MASTERCARD 0659</td>
                                    <td>3/26/2018 - 3/26/2018</td>
                                    <td className="zui-sticky-col mob">$15</td>
                                  </tr>
                                  <tr>
                                    <td>3/26/2018</td>
                                    <td>9000190</td>
                                    <td>MASTERCARD 0659</td>
                                    <td>3/26/2018 - 3/26/2018</td>
                                    <td className="zui-sticky-col mob">$15</td>
                                  </tr>
                                  <tr>
                                    <td>3/26/2018</td>
                                    <td>9000190</td>
                                    <td>MASTERCARD 0659</td>
                                    <td>3/26/2018 - 3/26/2018</td>
                                    <td className="zui-sticky-col mob">$15</td>
                                  </tr>
                                </React.Fragment>
                              )}
                            </tbody>
                          </table>
                        </div>

                        <div className="fix d-mob1">
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
                              <tr>
                                <td>$15</td>
                              </tr>
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
