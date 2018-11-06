import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import AppContext from '../../Context/AppContext';
import SubscriptionContext from '../../Context/SubscriptionContext';

class PaymentSection extends React.Component {
  editPayment = (event) => {
    event.preventDefault();
  };

  editContactEmail = (event) => {
    event.preventDefault();
    toast.success('Email is updated.');
  };

  editMemberNumber = (event) => {
    event.preventDefault();
  };

  addMobileNumber = (event) => {
    event.preventDefault();
  };

  render() {
    const { itemInfo } = this.props;
    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => {
              const {
                loyaltyMember = 'N/A',
                paymentDetails,
                closeDate,
                isItem,
                Status
              } = subscription;
              const cardType =
                paymentDetails && paymentDetails.paymentCard
                  ? paymentDetails.paymentCard.cardType
                  : 'N/A';
              const isCancelledSub =
                (closeDate && closeDate.length) || (isItem && Status === 'C');

              return (
                <React.Fragment>
                  <div className="table-responsive d-mob">
                    <table
                      className="table table2 table-striped"
                      id="table_pay"
                    >
                      <thead>
                        <tr>
                          <th className="payment__header">
                            {appData.content.PaymentSection.PaymentMethod}
                          </th>
                          {isItem ? (
                            <th className="payment__header">
                              {appData.content.PaymentSection.ContactEmail}
                            </th>
                          ) : null}
                          <th className="payment__header">
                            {appData.content.PaymentSection.RewardsMemberNumber}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {cardType} - xxxx
                            <br />
                            {!isCancelledSub ? (
                              <a
                                href="/"
                                onClick={this.editPayment}
                                className="edit_txt"
                              >
                                {
                                  appData.content.PaymentSection
                                    .EditPaymentMethod
                                }
                              </a>
                            ) : null}
                          </td>
                          {subscription.isItem ? (
                            <td>
                              <span className="test_txt  email__address">
                                {itemInfo ? itemInfo.Email : 'N/A'}
                              </span>
                              <br />
                              {!isCancelledSub ? (
                                <a
                                  href="/"
                                  onClick={this.editContactEmail}
                                  className="edit_txt"
                                >
                                  {
                                    appData.content.PaymentSection
                                      .EditContactEmail
                                  }
                                </a>
                              ) : null}
                            </td>
                          ) : null}
                          <td>
                            <a className="test_txt">
                              {itemInfo ? itemInfo.AdvantageNum : loyaltyMember}
                            </a>
                            <br />
                            {subscription.isItem ? (
                              <a
                                href="/"
                                onClick={this.editMemberNumber}
                                className="edit_txt"
                              >
                                {
                                  appData.content.PaymentSection
                                    .EditMemberNumber
                                }
                              </a>
                            ) : null}
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
                        {/* <img
                          src="img/visa.jpg"
                          className="img-resp visa_img"
                          alt=""
                        /> */}
                        VISA - xxxx
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
                    {isItem ? <h3>CONTACT EMAIL:</h3> : null}
                    {isItem ? (
                      <ul className="list-unstyled">
                        <li>
                          <span className="test_txt  email__address">
                            {itemInfo ? itemInfo.Email : 'N/A'}
                          </span>
                        </li>
                        <li>
                          <a
                            href="/"
                            onClick={this.editContactEmail}
                            className="edit_txt email__address"
                          >
                            {appData.content.PaymentSection.EditContactEmail}
                          </a>
                        </li>
                      </ul>
                    ) : null}
                    <h3>REWARDS MEMBER NUMBER:</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="/"
                          onClick={this.editMemberNumber}
                          className="test_txt"
                        >
                          {itemInfo ? itemInfo.AdvantageNum : loyaltyMember}
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
  itemInfo: PropTypes.object
};

PaymentSection.defaultProps = {
  itemInfo: {}
};

export default PaymentSection;
