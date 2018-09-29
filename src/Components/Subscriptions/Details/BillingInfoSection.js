import React from "react";
import AppContext from "../../Context/AppContext";

class BillingInfoSection extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <React.Fragment>
            <h3 className="head_txt dnload_txt">
              {appData.content.BillingInfoSectionHeader}
              <img src="img/down.jpg" className="img-resp down_img1" alt="" />
            </h3>
            <div className="bill_Div">
              <p className="pay_txt">
                <label>{appData.content.NextScheduledPayment}</label> Jul 13,
                2018
              </p>
              <a href="" className="view_txt d-block d-md-none d-lg-none">
                View all billing histtory{" "}
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
                        <th>{appData.content.InvoiceDate}</th>
                        <th>{appData.content.InvoiceNumber}</th>
                        <th>{appData.content.PaymentMethod}</th>
                        <th>{appData.content.ServicePeriod}</th>
                        <th className="zui-sticky-col mob">
                          {appData.content.TaxAndTotal}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
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
                        <th>TAX &amp; TOTAL</th>
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
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

export default BillingInfoSection;
