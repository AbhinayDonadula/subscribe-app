import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Dropdown from '../SharedComponents/Dropdown';
import SubscriptionDetails from './Details/SubscriptionDetails';
import SubscriptionContext from '../Context/SubscriptionContext';
import {
  getSubscriptionImg,
  getFrequency,
  getImageBySKU,
  getOrderNowURL,
  getFrequencyForAPI,
  getCancelReasonServerVal,
  getOrderNowMobileURL,
  formatPrice,
  formatDate
} from '../utils';
import Img from '../SharedComponents/Img';
import updateItemSubscription from '../../apiCalls/updateItemSubscription';
import CancelDropdown from '../SharedComponents/CancelDropDown';
import getCancellationFee from '../../apiCalls/getCancellationFee';
import cancelServiceSubscription from '../../apiCalls/cancelServiceSubscription';

class SubscriptionItem extends React.Component {
  state = {
    openSaveCancelMenu: false,
    saveAction: '',
    viewDetails: false,
    openExtendedMenu: false,
    cancelService: false,
    resetEdit: false,
    editEmail: false,
    frequencySelected: '',
    prevFrequencySelected: '',
    itemQuantity: '',
    prevItemQuantity: '',
    cancelReason: '',
    emailToSave: '',
    rewards: '',
    refreshDetailsSection: false,
    localViewDetails: false
  };

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentDidMount() {
    const { billingFrequency, quantity, isItem, Freq } = this.subscription;
    const { viewDetails } = this.props;
    this.setState({
      frequencySelected: getFrequency(isItem ? Freq : billingFrequency),
      prevFrequencySelected: getFrequency(isItem ? Freq : billingFrequency),
      itemQuantity: isItem ? quantity.replace(/^0+/, '') : '',
      prevItemQuantity: isItem ? quantity.replace(/^0+/, '') : '',
      viewDetails
    });
  }

  componentWillReceiveProps(nextProps) {
    const { viewDetails } = this.props;
    if (JSON.stringify(viewDetails) !== JSON.stringify(nextProps.viewDetails)) {
      this.setState({ viewDetails: nextProps.viewDetails });
    }
  }

  componentWillUnmount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleClick = ({ target }) => {
    const { className } = target;
    if (className !== 'extended__menu-click') {
      if (this.node && this.node.contains(target)) {
        return;
      }
      if (this.node) {
        this.setState({ openExtendedMenu: false });
      }
    }
  };

  handleFrequencyDropDown = (selected) => {
    this.setState(({ frequencySelected, prevItemQuantity }) => ({
      prevFrequencySelected: frequencySelected,
      frequencySelected: selected,
      openSaveCancelMenu: true,
      saveAction: 'frequency',
      itemQuantity: prevItemQuantity
    }));
  };

  handleItemQuantity = ({ target: { value } }) => {
    const { prevItemQuantity, prevFrequencySelected } = this.state;
    if ((Number(value) || value === '') && value < 10000) {
      this.setState(() => ({
        itemQuantity: value,
        openSaveCancelMenu: value !== '' && value !== prevItemQuantity,
        saveAction: 'quantity',
        frequencySelected: prevFrequencySelected
      }));
    }
  };

  resetQuantity = ({ target: { value } }) => {
    const { prevItemQuantity } = this.state;
    if (value === '') {
      this.setState({ itemQuantity: prevItemQuantity });
    }
  };

  handleExtendedMenu = () => {
    this.setState(({ openExtendedMenu }) => ({
      openExtendedMenu: !openExtendedMenu
    }));
  };

  handleExtendedMenuSelection = (event, subscription) => {
    event.preventDefault();
    const { SKU, IncPct, FreeSku, WlrPct, RecordKey } = subscription;
    const { handleViewDetails } = this.props;
    const selected = event.target.getAttribute('data-value');
    this.setState({ openExtendedMenu: false }, async () => {
      if (selected === 'View Details') {
        handleViewDetails();
      } else if (selected === 'Order Now') {
        window.location.href =
          window.innerWidth <= 750
            ? getOrderNowMobileURL(SKU)
            : getOrderNowURL(SKU, IncPct, FreeSku, WlrPct, RecordKey);
      } else if (selected === 'Cancel Subscription') {
        this.setState({
          openSaveCancelMenu: true,
          cancelService: false,
          saveAction: 'cancel'
        });
      } else if (selected === 'Cancel Service Subscription') {
        const cancelFeeResponse = await getCancellationFee(
          this.appData.localAPI,
          this.subscription.contractId,
          this.subscription.lineNumber
        );

        if (
          !cancelFeeResponse ||
          cancelFeeResponse.hasErrorResponse === undefined ||
          cancelFeeResponse.hasErrorResponse === 'true' ||
          cancelFeeResponse.responseObject.jsonObjectResponse
            .terminationFeeResponse === null
        ) {
          this.setState({
            cancellationFeeFailed: true,
            saveAction: 'cancelService',
            cancelService: true,
            cancelStep: 1
          });
        } else {
          this.setState({
            cancellationFeeFailed: false,
            response: cancelFeeResponse.responseObject.jsonObjectResponse,
            cancelFees:
              cancelFeeResponse.responseObject.jsonObjectResponse
                .terminationFeeResponse &&
              cancelFeeResponse.responseObject.jsonObjectResponse
                .terminationFeeResponse.CancellationFee === undefined
                ? 'N/A'
                : cancelFeeResponse.responseObject.jsonObjectResponse
                    .terminationFeeResponse.CancellationFee,
            saveAction: 'cancelService',
            cancelService: true,
            cancelStep: 1
          });
        }
      } else if (selected === 'Skip Next Delivery') {
        this.setState({
          openSaveCancelMenu: true,
          cancelService: false,
          saveAction: 'skip'
        });
      } else if (selected === '') {
        this.setState({
          openSaveCancelMenu: true,
          cancelService: false,
          saveAction: 'frequency'
        });
      }
    });
  };

  handleSaveUpdate = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const { RecordKey, LstChgTmpStmp } = this.subscription;
    const {
      itemQuantity,
      saveAction,
      frequencySelected,
      emailToSave,
      rewards
    } = this.state;
    let updateAction = {};
    const isServiceCancellation = saveAction === 'cancelService';
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const invalidEmail = !re.test(String(emailToSave).toLowerCase());

    if (isServiceCancellation) {
      this.setState({ cancelStep: 2 });
    } else if (emailToSave && invalidEmail) {
      toast.warn('please enter a valid email address.');
    } else {
      switch (saveAction) {
        case 'quantity':
          updateAction = {
            name: 'quantity',
            value: itemQuantity
          };
          break;
        case 'frequency':
          updateAction = {
            name: 'freq',
            value: getFrequencyForAPI(frequencySelected)
          };
          break;
        case 'cancel':
          updateAction = { name: 'cancel' };
          break;
        case 'skip':
          updateAction = { name: 'skip' };
          break;
        case 'email':
          updateAction = { name: 'email', value: emailToSave };
          break;
        case 'rewards':
          updateAction = { name: 'rewards', value: rewards };
          break;
        default:
          updateAction = {
            name: 'quantity',
            value: itemQuantity
          };
      }

      if (
        (saveAction === 'rewards' && rewards.length === 0) ||
        (saveAction === 'email' && emailToSave.length === 0)
      ) {
        this.subscription.handleEditRewardsClick('', false);
      } else {
        try {
          const response = await updateItemSubscription(
            this.isLocalAPI,
            RecordKey,
            LstChgTmpStmp,
            updateAction
          );
          if (
            (response.success !== undefined && !response.success) ||
            !response.responseObject.success
          ) {
            this.setState({ openSaveCancelMenu: false }, () => {
              toast.warn(`Update item ${saveAction} is failed.`);
            });
          } else {
            this.setState(
              {
                openSaveCancelMenu: false,
                prevItemQuantity: itemQuantity,
                resetEdit: true,
                refreshDetailsSection: false
              },
              () => {
                toast.success(`Update item ${saveAction} is successful.`);
                // pass true to not to show extra toast msg
                if (saveAction === 'rewards' || saveAction === 'email') {
                  this.subscription.handleEditEmailClick('', false);
                  this.subscription.handleEditRewardsClick('', false);
                  this.setState({ refreshDetailsSection: true });
                }
                this.appData.getItems(true);
              }
            );
          }
        } catch (error) {
          toast.error('Item update failed.');
        }
      }
    }
  };

  handleCancelSave = (event) => {
    event.preventDefault();
    this.setState(({ prevItemQuantity, prevFrequencySelected }) => ({
      itemQuantity: prevItemQuantity,
      frequencySelected: prevFrequencySelected,
      openSaveCancelMenu: false,
      cancelService: false,
      resetEdit: true,
      editEmail: false,
      editRewards: false,
      cancelStep: 1
    }));
    this.subscription.handleEditEmailClick('', false);
    this.subscription.handleEditRewardsClick('', false);
  };

  handleCancelSubmit = async (event) => {
    event.preventDefault();
    const { cancelStep, cancelReason } = this.state;

    if (cancelStep === 1) {
      this.setState({ cancelStep: 2 });
    }

    if (cancelStep === 2 && cancelReason.length > 0) {
      const {
        currentBillingEndDate,
        contractId,
        lineNumber
      } = this.subscription;

      if (!this.isLocalAPI) {
        await cancelServiceSubscription(
          this.isLocalAPI,
          contractId,
          lineNumber,
          currentBillingEndDate,
          getCancelReasonServerVal(cancelReason)
        );
        this.setState({ cancelService: false, cancelReason: '' }, () => {
          this.appData.reloadApp();
          toast.success(`Cancellation subscription is successful.`);
        });
      } else {
        this.handleCancelSuccess();
      }
    }
  };

  handleEditUserInfo = (editing, value) => {
    let editPayment = false;
    let editEmail = false;
    let editMemberNum = false;
    let saveAction = '';
    if (editing === 'email') {
      editEmail = true;
      saveAction = 'email';
    } else if (editing === 'payment') {
      editPayment = true;
      saveAction = 'updatePayment';
    } else {
      editMemberNum = true;
      saveAction = 'updateMemNum';
    }
    this.setState({
      editEmail,
      editPayment,
      editMemberNum,
      openSaveCancelMenu: true,
      saveAction,
      emailToSave: value
    });
  };

  render() {
    const {
      openExtendedMenu,
      viewDetails,
      itemQuantity,
      openSaveCancelMenu,
      frequencySelected,
      cancelService,
      cancelFees,
      cancelStep,
      cancelReason,
      refreshDetailsSection
    } = this.state;

    return (
      <SubscriptionContext.Consumer>
        {({ appData, ...subscription }) => {
          this.appData = appData;
          this.subscription = subscription;
          this.isLocalAPI = appData.localAPI;

          const {
            closeDate = '',
            isItem,
            skuUrl,
            itemNumber,
            itemDescription = 'N/A',
            shortDescription = '',
            mediumImageUrl,
            vendorNumber,
            SubType,
            Status,
            editEmail,
            editRewards,
            editPayment
          } = subscription;

          let subscriptionImage = '';
          if (isItem) {
            subscriptionImage =
              mediumImageUrl || this.appData.content.defaultItemImg;
          } else if (vendorNumber === '01242135') {
            subscriptionImage = getImageBySKU(itemNumber);
          } else {
            subscriptionImage = getSubscriptionImg(
              itemNumber,
              closeDate.length > 0
            );
          }

          const isSteamSub = isItem && SubType === 'S';
          const isActiveItemSubscription = isItem && Status === 'A';
          const showFreqDropDown = isItem && Status === 'A' && !isSteamSub;
          const showQtyEdit = isItem && Status === 'A' && !isSteamSub;

          const showAlertBox =
            !subscription.isItem &&
            subscription.status === 'Under amendment' &&
            subscription.userStatusCode &&
            subscription.userStatusCode.toLowerCase() === 'hold';

          let subscriptionDescription = '';
          if (isItem && shortDescription) {
            subscriptionDescription = `${shortDescription
              .split(' ')
              .slice(1, 12)
              .join(' ')}...`;
          } else if (isItem && !shortDescription) {
            subscriptionDescription = itemDescription;
          } else if (!isItem) {
            subscriptionDescription = itemDescription;
          } else {
            subscriptionDescription = 'N/A';
          }

          return (
            <React.Fragment>
              <div
                className={`data-table ${openExtendedMenu ? 'overlay' : ''} ${
                  openSaveCancelMenu ? 'open__conf' : ''
                }`}
                onClick={() => {
                  if (openExtendedMenu)
                    this.setState({ openExtendedMenu: false });
                }}
                ref={(node) => {
                  this.node = node;
                }}
              >
                {/* each item */}
                <ul className="list-unstyled list-inline main_ul">
                  <li>
                    <a
                      onClick={(event) => {
                        if (isItem && !skuUrl) {
                          event.preventDefault();
                        }
                        return true;
                      }}
                      href={`${
                        isItem
                          ? skuUrl || ''
                          : '/catalog/search.do?Ntt=itemNumber'.replace(
                              'itemNumber',
                              itemNumber
                            )
                      }`}
                      className={`${isItem && !skuUrl ? 'default_cursor' : ''}`}
                    >
                      <Img src={subscriptionImage} />
                    </a>
                  </li>
                  <li>
                    <div
                      className="main_txt desc"
                      dangerouslySetInnerHTML={{
                        __html: subscriptionDescription
                      }}
                    />
                  </li>
                  <li className="d-mob">
                    <label className="item__label">
                      {isItem ? 'DELIVERY BY' : 'NEXT BILL'}
                    </label>{' '}
                    <br />
                    <label
                      className={`pad_span ${
                        isActiveItemSubscription ? 'mgb0' : ''
                      }`}
                    >
                      {isItem
                        ? subscription.NextDlvDt
                        : formatDate(
                            subscription.nextBillingDate,
                            'MM/DD/YYYY'
                          )}
                    </label>
                  </li>
                  <li
                    className={`d-mob ${
                      isActiveItemSubscription ? 'item__quantity-container' : ''
                    }`}
                  >
                    <label
                      className={`item__label ${
                        isActiveItemSubscription
                          ? 'item__quantity-container'
                          : ''
                      }`}
                    >
                      {appData.content.Quantity}
                    </label>
                    <br />
                    {isActiveItemSubscription && showQtyEdit ? (
                      <input
                        className="item__quantity"
                        onChange={this.handleItemQuantity}
                        value={itemQuantity}
                        onBlur={this.resetQuantity}
                      />
                    ) : (
                      <label className="item__label pad_span margin__left-25">
                        {subscription.quantity.replace(/^0+/, '')}
                      </label>
                    )}
                  </li>
                  <li
                    className={`${
                      !showFreqDropDown ? 'no__Dropdown' : ''
                    } d-mob select_Box`}
                  >
                    <label className="item__label">
                      {appData.content.FrequencyLabel}
                    </label>
                    <br />
                    {showFreqDropDown ? (
                      <Dropdown
                        frequencyDropDown
                        options={appData.content.FrequencyOptions}
                        updateParentState={this.handleFrequencyDropDown}
                        selected={frequencySelected}
                      />
                    ) : (
                      <span className="pad_span">
                        {getFrequency(subscription.billingFrequency)}
                      </span>
                    )}
                  </li>
                  {(isItem &&
                    subscription.ActionCode !== '' &&
                    subscription.status === 'A') ||
                  showAlertBox ? (
                    <li className="org_bg">
                      <img src={appData.content.icons.alertIcon} alt="" />
                    </li>
                  ) : null}
                  <li
                    className="cursor__pointer"
                    onClick={this.handleExtendedMenu}
                  >
                    <a className="view_txt opn_box">
                      <span className="view-txt">
                        Actions
                        <span className="animated__arrow " />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Extended Menu */}
              {openExtendedMenu && (
                <div className="dropdown_div" style={{ display: 'block' }}>
                  <ul className="list-inline list-unstyled">
                    <li>
                      <div className="dropbox">
                        <div className="drophead">
                          <p
                            data-value="View Details"
                            className="extended__menu-click"
                            onClick={(event) => {
                              this.handleExtendedMenuSelection(
                                event,
                                subscription
                              );
                            }}
                          >
                            {viewDetails ? 'Close Details' : 'View Details'}
                          </p>
                        </div>
                        {subscription.isItem ? (
                          <div
                            className="dropbody"
                            style={{
                              display: isActiveItemSubscription ? '' : 'none'
                            }}
                          >
                            <ul className="list-unstyled subscription__extended-menu">
                              {isActiveItemSubscription
                                ? appData.content.ExtendedMenuOptions.map(
                                    (each) => {
                                      if (each.id === 3 && isSteamSub) {
                                        return undefined;
                                      }
                                      return (
                                        <li key={each.id}>
                                          <a
                                            href="/"
                                            data-value={each.label}
                                            className="extended__menu-click"
                                            onClick={(event) => {
                                              this.handleExtendedMenuSelection(
                                                event,
                                                subscription
                                              );
                                            }}
                                          >
                                            {each.label}
                                          </a>
                                        </li>
                                      );
                                    }
                                  )
                                : null}
                            </ul>
                          </div>
                        ) : (
                          <div className="dropbody">
                            <ul className="list-unstyled subscription__extended-menu">
                              <li>
                                <a
                                  href="/"
                                  data-value="Cancel Service Subscription"
                                  className="extended__menu-click"
                                  onClick={(event) => {
                                    this.handleExtendedMenuSelection(
                                      event,
                                      subscription
                                    );
                                  }}
                                >
                                  Cancel Subscription
                                </a>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* Save/Update confirmation  */}
              {openSaveCancelMenu && !cancelService ? (
                <div
                  className={`show_Div hidden-xs show ${
                    viewDetails ? 'add__margin' : ''
                  }`}
                >
                  <ul className="list-inline list-unstyled">
                    <li className="update__save--cancel-conf">Save changes?</li>
                    <li className="btn_sv-container">
                      <a
                        href="/"
                        className="btn_sv"
                        onClick={this.handleSaveUpdate}
                      >
                        {cancelService
                          ? 'Continue'
                          : appData.content.SaveUpdate}
                      </a>
                    </li>
                    <li className="btn_cncl-container">
                      <a
                        href="/"
                        className="btn_cncl"
                        onClick={this.handleCancelSave}
                      >
                        Cancel
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}

              {openSaveCancelMenu && !cancelService ? (
                <div
                  className="visible-xs-block save__update-mob"
                  style={{ margin: '-15px 0' }}
                >
                  <div className="title">Save changes?</div>
                  <div>
                    <button type="button" onClick={this.handleSaveUpdate}>
                      Save
                    </button>
                  </div>
                  <div>
                    <a onClick={this.handleCancelSave}>Cancel</a>
                  </div>
                </div>
              ) : null}

              {editPayment ? (
                <div
                  className={`show_Div hidden-xs show ${
                    viewDetails ? 'add__margin' : ''
                  }`}
                  id="edit-payment-section"
                />
              ) : null}

              {/* Subscription Details Section */}
              {viewDetails && (
                <SubscriptionDetails
                  handleEditUserInfo={this.handleEditUserInfo}
                  refresh={refreshDetailsSection}
                />
              )}

              {/* cancel service */}
              {!openSaveCancelMenu && cancelService ? (
                <div
                  className={`show_Div hidden-xs show cancellation ${
                    viewDetails ? 'add__margin' : ''
                  }`}
                >
                  <ul className="list-inline list-unstyled">
                    {cancelStep === 1 ? (
                      <li className="update__save--cancel-conf">
                        <span style={{ color: '#273039', fontWeight: '600' }}>
                          Are you sure you want to cancel? if you cancel now,
                          your fee to cancel will be:
                        </span>
                        <span style={{ color: '#ad2f2f', fontWeight: 600 }}>
                          {' '}
                          {formatPrice(cancelFees)}
                        </span>
                      </li>
                    ) : null}
                    {cancelStep === 2 ? (
                      <li className="update__save--cancel-conf">
                        <span style={{ color: '#273039', fontWeight: '600' }}>
                          Before you go, Please select a reason for your
                          cancellation:
                        </span>
                      </li>
                    ) : null}
                    {cancelStep === 2 ? (
                      <CancelDropdown
                        options={appData.content.cancelReasonOptions}
                        updateParentState={(reason) => {
                          if (reason === 'Select your Reason...') {
                            this.setState({ cancelReason: '' });
                          } else {
                            this.setState({ cancelReason: reason });
                          }
                        }}
                      />
                    ) : null}
                    <li className="btn_sv-container">
                      <a
                        href="/"
                        className={`btn_sv ${
                          cancelStep === 2 && cancelReason.length === 0
                            ? 'disable'
                            : ''
                        }`}
                        onClick={this.handleCancelSubmit}
                      >
                        {cancelStep === 1 && 'Continue'}
                        {cancelStep === 2 && 'Submit'}
                      </a>
                    </li>
                    <li className="btn_cncl-container">
                      <a
                        href="/"
                        className="btn_cncl"
                        onClick={this.handleCancelSave}
                      >
                        Cancel
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}

              {/* Mobile */}
              {cancelService && !openSaveCancelMenu ? (
                <div
                  className="visible-xs-block save__update-mob cancel__sub"
                  style={{ margin: '-15px 0' }}
                >
                  <div className="title">
                    {cancelStep === 1 &&
                      'Are you sure you want to cancel? if you cancel now, your fee to cancel will be: '}
                    {cancelStep === 1 && (
                      <span style={{ color: '#ad2f2f', fontWeight: 600 }}>
                        {formatPrice(cancelFees)}
                      </span>
                    )}
                    {cancelStep === 2 ? (
                      <span style={{ color: '#273039', fontWeight: '600' }}>
                        Before you go, Please select a reason for your
                        cancellation:
                      </span>
                    ) : null}
                  </div>
                  {cancelStep === 2 ? (
                    <CancelDropdown
                      options={appData.content.cancelReasonOptions}
                      updateParentState={(reason) => {
                        if (reason === 'Select your Reason...') {
                          this.setState({ cancelReason: '' });
                        } else {
                          this.setState({ cancelReason: reason });
                        }
                      }}
                    />
                  ) : null}
                  <div>
                    <button
                      type="button"
                      onClick={(event) => {
                        this.handleCancelSubmit(event);
                      }}
                      className={`${
                        cancelStep === 2 && cancelReason.length === 0
                          ? 'disable__btn'
                          : ''
                      }`}
                    >
                      {cancelStep === 1 && 'Yes, Cancel Subscription'}
                      {cancelStep === 2 && 'Submit'}
                    </button>
                  </div>
                  <div>
                    <a onClick={this.handleCancelSave}>Cancel</a>
                  </div>
                </div>
              ) : null}

              {/* edit email */}
              {(editEmail || editRewards) && viewDetails ? (
                <div
                  className={`show_Div hidden-xs show ${
                    viewDetails ? 'add__margin' : ''
                  }`}
                >
                  <ul className="list-inline list-unstyled email__rewards">
                    <li className="update__save--cancel-conf">
                      {editEmail ? 'Save email changes?' : null}
                      {editRewards ? 'Save Rewards number changes?' : null}
                    </li>
                    <li className="btn_sv-container">
                      <a
                        href="/"
                        className="btn_sv"
                        onClick={(event) => {
                          event.preventDefault();
                          this.setState(
                            {
                              saveAction: editEmail ? 'email' : 'rewards',
                              emailToSave: subscription.email,
                              rewards: subscription.rewards
                            },
                            () => {
                              this.handleSaveUpdate();
                            }
                          );
                        }}
                      >
                        {appData.content.SaveUpdate}
                      </a>
                    </li>
                    <li className="btn_cncl-container">
                      <a
                        href="/"
                        className="btn_cncl"
                        onClick={this.handleCancelSave}
                      >
                        Cancel
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}

              {/* edit email mobile */}
              {(editEmail || editRewards) && viewDetails ? (
                <div
                  className="visible-xs-block save__update-mob"
                  style={{ margin: '-15px 0' }}
                >
                  <div className="title">
                    {editEmail ? 'Save email changes?' : null}
                    {editRewards ? 'Save Rewards number changes?' : null}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        this.setState(
                          {
                            saveAction: editEmail ? 'email' : 'rewards',
                            emailToSave: subscription.email,
                            rewards: subscription.rewards
                          },
                          () => {
                            this.handleSaveUpdate();
                          }
                        );
                      }}
                    >
                      Save
                    </button>
                  </div>
                  <div>
                    <a onClick={this.handleCancelSave}>Cancel</a>
                  </div>
                </div>
              ) : null}
            </React.Fragment>
          );
        }}
      </SubscriptionContext.Consumer>
    );
  }
}

SubscriptionItem.propTypes = {
  handleViewDetails: PropTypes.func.isRequired,
  viewDetails: PropTypes.bool
};

SubscriptionItem.defaultProps = {
  viewDetails: false
};

export default SubscriptionItem;
