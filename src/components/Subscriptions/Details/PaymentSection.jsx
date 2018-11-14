import React from 'react';
import AppContext from '../../Context/AppContext';
import SubscriptionContext from '../../Context/SubscriptionContext';
import SubDetailsContext from '../../Context/SubDetailsContext';

class PaymentSection extends React.Component {
  state = { email: '', invalidEmail: false };

  render() {
    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => {
              return (
                <SubDetailsContext.Consumer>
                  {({ itemInfo, email, editEmailAddress, editRewardsNum }) => {
                    this.itemInfo = itemInfo;
                    this.editEmailAddress = editEmailAddress;
                    this.editRewardsNum = editRewardsNum;
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
                                    {subscription.editEmail ? (
                                      <input
                                        className={`email__edit ${
                                          subscription.invalidEmail
                                            ? 'invalid'
                                            : ''
                                        }`}
                                        value={subscription.email}
                                        onChange={subscription.handleEditEmail}
                                      />
                                    ) : (
                                      <span className="test_txt  email__address">
                                        {itemInfo ? itemInfo.Email : 'N/A'}
                                      </span>
                                    )}
                                    <br />
                                    {subscription.editEmail &&
                                    subscription.invalidEmail ? (
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
                                          subscription.handleEditEmailClick(
                                            email
                                          );
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
                                  {subscription.editRewards ? (
                                    <input
                                      className="rewards__edit"
                                      value={subscription.rewards}
                                      onChange={subscription.handleEditRewards}
                                    />
                                  ) : (
                                    <span className="test_txt  email__address">
                                      {itemInfo
                                        ? itemInfo.AdvantageNum
                                        : loyaltyMember}
                                    </span>
                                  )}
                                  <br />
                                  {subscription.isItem ? (
                                    <a
                                      href="/"
                                      onClick={(event) => {
                                        event.preventDefault();
                                        subscription.handleEditRewardsClick(
                                          itemInfo.AdvantageNum
                                        );
                                      }}
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
                                {subscription.editEmail ? (
                                  <input
                                    className={`email__edit ${
                                      subscription.invalidEmail ? 'invalid' : ''
                                    }`}
                                    value={subscription.email}
                                    onChange={subscription.handleEditEmail}
                                  />
                                ) : (
                                  <span className="test_txt  email__address">
                                    {itemInfo ? itemInfo.Email : 'N/A'}
                                  </span>
                                )}
                              </li>
                              {!isCancelledSub ? (
                                <li>
                                  <a
                                    href="/"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      subscription.handleEditEmailClick(email);
                                    }}
                                    className="edit_txt email__address"
                                  >
                                    {
                                      appData.content.PaymentSection
                                        .EditContactEmail
                                    }
                                  </a>
                                </li>
                              ) : null}
                            </ul>
                          ) : null}
                          <h3>REWARDS MEMBER NUMBER:</h3>
                          <ul className="list-unstyled">
                            <li>
                              {subscription.editRewards ? (
                                <input
                                  className="email__edit"
                                  value={subscription.rewards}
                                  onChange={subscription.handleEditRewards}
                                />
                              ) : (
                                <span className="test_txt  email__address">
                                  {itemInfo
                                    ? itemInfo.AdvantageNum
                                    : loyaltyMember}
                                </span>
                              )}
                            </li>
                            <li>
                              <a
                                href="/"
                                onClick={(event) => {
                                  event.preventDefault();
                                  subscription.handleEditRewardsClick(
                                    itemInfo.AdvantageNum
                                  );
                                }}
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
