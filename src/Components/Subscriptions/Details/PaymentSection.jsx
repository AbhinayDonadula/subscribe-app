import React from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../Context/AppContext';
import SubscriptionContext from '../../Context/SubscriptionContext';
import { formatPhoneNumber } from '../../utils';

class PaymentSection extends React.Component {
  editPayment = event => {
    event.preventDefault();
    console.log('editPayment');
  };

  editContactEmail = event => {
    event.preventDefault();
    console.log('editContactEmail');
  };

  editMemberNumber = event => {
    event.preventDefault();
    console.log('editMemberNumber');
  };

  addMobileNumber = event => {
    event.preventDefault();
    console.log('addMobileNumber');
  };

  render() {
    const { itemInfo } = this.props;
    return (
      <AppContext.Consumer>
        {appData => (
          <SubscriptionContext.Consumer>
            {subscription => {
              const { loyaltyMember = 'N/A' } = subscription;
              return (
                <React.Fragment>
                  <div className="table-responsive d-mob">
                    <table
                      className="table table2 table-striped"
                      id="table_pay"
                    >
                      <thead>
                        <tr>
                          <th>
                            {appData.content.PaymentSection.PaymentMethod}
                          </th>
                          <th>{appData.content.PaymentSection.ContactEmail}</th>
                          <th>
                            {appData.content.PaymentSection.RewardsMemberNumber}
                          </th>
                          <th>
                            {appData.content.PaymentSection.SignUpTextUpdates}{' '}
                          </th>
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
                            <a
                              href="/"
                              onClick={this.editPayment}
                              className="edit_txt"
                            >
                              {appData.content.PaymentSection.EditPaymentMethod}
                            </a>
                          </td>
                          <td>
                            <span className="test_txt">
                              {itemInfo ? itemInfo.Email : 'N/A'}
                            </span>
                            <br />
                            <a
                              href="/"
                              onClick={this.editContactEmail}
                              className="edit_txt"
                            >
                              {appData.content.PaymentSection.EditContactEmail}
                            </a>
                          </td>
                          <td>
                            <a className="test_txt">{loyaltyMember}</a>
                            <br />
                            <a
                              href="/"
                              onClick={this.editMemberNumber}
                              className="edit_txt"
                            >
                              {appData.content.PaymentSection.EditMemberNumber}
                            </a>
                          </td>
                          <td>
                            {itemInfo ? (
                              formatPhoneNumber(itemInfo.PhoneNo)
                            ) : (
                              <React.Fragment>
                                Get Notifications sent to
                                <br /> your mobile! <br />
                              </React.Fragment>
                            )}

                            <a
                              href="/"
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

                  {/* Show this in mobile view */}
                  <div className="d-block d-md-none d-lg-none method_Box">
                    <h3>{appData.content.PaymentSection.PaymentMethod}</h3>
                    <ul className="list-unstyled">
                      <li>
                        <img
                          src="img/visa.jpg"
                          className="img-resp visa_img"
                          alt=""
                        />
                        VISA - xxxxxx
                      </li>
                      <li>
                        <a
                          href="/"
                          onClick={this.editPayment}
                          className="edit_txt"
                        >
                          {appData.content.PaymentSection.EditPaymentMethod}
                        </a>
                      </li>
                    </ul>
                    <h3>CONTACT EMAIL:</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="/"
                          onClick={this.editContactEmail}
                          className="test_txt"
                        >
                          TESTlongnamehere@OFFICEDEPOT.COM
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          onClick={this.editContactEmail}
                          className="edit_txt"
                        >
                          {appData.content.PaymentSection.EditContactEmail}
                        </a>
                      </li>
                    </ul>
                    <h3>REWARDS MEMBER NUMBER:</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="/"
                          onClick={this.editMemberNumber}
                          className="test_txt"
                        >
                          {loyaltyMember}
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          onClick={this.editMemberNumber}
                          className="edit_txt"
                        >
                          {appData.content.PaymentSection.EditMemberNumber}
                        </a>
                      </li>
                    </ul>
                  </div>
                </React.Fragment>
              );
            }}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}
PaymentSection.propTypes = {
  itemInfo: PropTypes.object.isRequired
};

export default PaymentSection;
