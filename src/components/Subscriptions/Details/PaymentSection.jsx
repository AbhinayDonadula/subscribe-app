import React from 'react';
import AppContext from '../../Context/AppContext';
import SubscriptionContext from '../../Context/SubscriptionContext';
import SubDetailsContext from '../../Context/SubDetailsContext';

class PaymentSection extends React.Component {
  state = { email: '', invalidEmail: false };

  handleEmail = (event) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({
      email: event.target.value,
      invalidEmail: !re.test(String(event.target.value).toLowerCase())
    });
    this.editEmailAddress(event);
  };

  render() {
    const { invalidEmail } = this.state;
    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => {
              return (
                <SubDetailsContext.Consumer>
                  {({
                    itemInfo,
                    handleEditEmailMobile,
                    editingEmail,
                    email,
                    editEmailAddress,
                    resetEdit
                  }) => {
                    this.itemInfo = itemInfo;
                    this.editEmailAddress = editEmailAddress;
                    const {
                      loyaltyMember = 'N/A',
                      paymentDetails,
                      closeDate,
                      isItem,
                      Status
                    } = subscription;
                    let cardType = '';
                    if (isItem) {
                      cardType =
                        itemInfo &&
                        itemInfo.AccountType &&
                        itemInfo.AccountType.length > 0
                          ? itemInfo.AccountType
                          : 'N/A';
                    } else {
                      cardType =
                        paymentDetails && paymentDetails.paymentCard
                          ? paymentDetails.paymentCard.cardType
                          : 'N/A';
                    }
                    const isCancelledSub =
                      (closeDate && closeDate.length) ||
                      (isItem && Status === 'C');

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
                                    {
                                      appData.content.PaymentSection
                                        .ContactEmail
                                    }
                                  </th>
                                ) : null}
                                <th className="payment__header">
                                  {
                                    appData.content.PaymentSection
                                      .RewardsMemberNumber
                                  }
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
                                    {editingEmail && !resetEdit ? (
                                      <input
                                        className={`email__edit ${
                                          invalidEmail ? 'invalid' : ''
                                        }`}
                                        value={email}
                                        onChange={this.handleEmail}
                                      />
                                    ) : (
                                      <span className="test_txt  email__address">
                                        {itemInfo ? itemInfo.Email : 'N/A'}
                                      </span>
                                    )}
                                    <br />
                                    {editingEmail &&
                                    !resetEdit &&
                                    invalidEmail ? (
                                      <span
                                        style={{
                                          color: '#ad2f2f',
                                          paddingLeft: 10
                                        }}
                                      >
                                        Invalid Email address
                                      </span>
                                    ) : null}
                                    {!isCancelledSub ? (
                                      <a
                                        href="/"
                                        onClick={(event) => {
                                          event.preventDefault();
                                          handleEditEmailMobile();
                                        }}
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
                                    {itemInfo
                                      ? itemInfo.AdvantageNum
                                      : loyaltyMember}
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
                          <h3>
                            {appData.content.PaymentSection.PaymentMethod}
                          </h3>
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
                                {
                                  appData.content.PaymentSection
                                    .EditPaymentMethod
                                }
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
                                  {
                                    appData.content.PaymentSection
                                      .EditContactEmail
                                  }
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
                                {itemInfo
                                  ? itemInfo.AdvantageNum
                                  : loyaltyMember}
                              </a>
                            </li>
                            <li>
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
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SubDetailsContext.Consumer>
              );
            }}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default PaymentSection;
