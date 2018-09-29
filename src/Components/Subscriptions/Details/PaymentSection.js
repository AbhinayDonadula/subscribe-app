import React from "react";
import AppContext from "../../Context/AppContext";

class PaymentSection extends React.Component {
  editPayment = event => {
    event.preventDefault();
    console.log("editPayment");
  };

  editContactEmail = event => {
    event.preventDefault();
    console.log("editContactEmail");
  };

  editMemberNumber = event => {
    event.preventDefault();
    console.log("editMemberNumber");
  };

  addMobileNumber = event => {
    event.preventDefault();
    console.log("addMobileNumber");
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <div className="table-responsive d-mob">
            <table className="table table2 table-striped" id="table_pay">
              <thead>
                <tr>
                  <th>{appData.content.PaymentSection.PaymentMethod} </th>
                  <th>{appData.content.PaymentSection.ContactEmail} </th>
                  <th>{appData.content.PaymentSection.RewardsMemberNumber} </th>
                  <th>{appData.content.PaymentSection.SignUpTextUpdates} </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      src="img/visa.jpg"
                      className="img-resp visa_img"
                      alt=""
                    />
                    VISA - xxxxxx
                    <br />
                    <a href="" onClick={this.editPayment} className="edit_txt">
                      {appData.content.PaymentSection.EditPaymentMethod}
                    </a>
                  </td>
                  <td>
                    <a href="" className="test_txt">
                      TESTIongnamehere@OFFICEDEPOT.COM
                    </a>
                    <br />
                    <a
                      href=""
                      onClick={this.editContactEmail}
                      className="edit_txt"
                    >
                      {appData.content.PaymentSection.EditContactEmail}
                    </a>
                  </td>
                  <td>
                    <a className="test_txt">1931674376</a>
                    <br />
                    <a
                      href=""
                      onClick={this.editMemberNumber}
                      className="edit_txt"
                    >
                      {appData.content.PaymentSection.EditMemberNumber}
                    </a>
                  </td>
                  <td>
                    Get Notifications sent to
                    <br /> your mobile! <br />
                    <a
                      href=""
                      onClick={this.addMobileNumber}
                      className="edit_txt"
                    >
                      {appData.content.PaymentSection.AddMyMobileNumber}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default PaymentSection;
