import React from 'react';
import { toast } from 'react-toastify';
import AppContext from '../Context/AppContext';
import TextLink from '../SharedComponents/TextLink';
import Dropdown from '../SharedComponents/Dropdown';
import SubscriptionDetails from './Details/SubscriptionDetails';
import SubscriptionContext from '../Context/SubscriptionContext';
import {
  getSubscriptionImg,
  getFrequency,
  getImageBySKU,
  formatStatus,
  getOrderNowURL,
  getFrequencyForAPI,
  getCancellationFee,
  getCancelReasonServerVal,
  cancelSubscription,
  getOrderNowMobileURL
} from '../utils';
import Img from '../SharedComponents/Img';
import updateItemSubscription from '../../apiCalls/updateItemSubscription';
import CancelDropdown from '../SharedComponents/CancelDropDown';

class SubscriptionItem extends React.Component {
  state = {
    openSaveCancelMenu: false,
    saveAction: '',
    viewDetailsOpen: false,
    openExtendedMenu: false,
    cancelService: false,
    resetEdit: false,
    frequencySelected: '',
    prevFrequencySelected: '',
    itemQuantity: '',
    prevItemQuantity: '',
    cancelReason: '',
    saveChangesTxt: ''
  };

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentDidMount() {
    const { billingFrequency, quantity, isItem, Freq } = this.subscription;
    this.setState({
      frequencySelected: getFrequency(isItem ? Freq : billingFrequency),
      prevFrequencySelected: getFrequency(isItem ? Freq : billingFrequency),
      itemQuantity: isItem ? quantity.replace(/^0+/, '') : '',
      prevItemQuantity: isItem ? quantity.replace(/^0+/, '') : ''
    });
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
      saveChangesTxt: 'Save/Update frequency changes?',
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
        saveChangesTxt: 'Save/Update quantity changes?',
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

  handleExtendedMenu = (subscription) => {
    if (
      subscription.Status === 'C' ||
      subscription.status === 'Closed' ||
      (subscription.closeDate && subscription.closeDate.length > 0)
    ) {
      return;
    }
    this.setState(({ openExtendedMenu }) => ({
      openExtendedMenu: !openExtendedMenu
    }));
  };

  cancellationFeeSuccess = ({ data }) => {
    this.setState({ cancelFees: data.CancellationFee });
  };

  cancellationFeeErr = () => {
    this.setState({ cancellationFeeErr: true });
  };

  handleExtendedMenuSelection = (event, subscription) => {
    event.preventDefault();
    const { SKU, IncPct, FreeSku, WlrPct, RecordKey } = subscription;
    const selected = event.target.getAttribute('data-value');
    this.setState({ openExtendedMenu: false }, async () => {
      if (selected === 'Order Now') {
        window.location.href =
          window.innerWidth <= 750
            ? getOrderNowMobileURL(SKU)
            : getOrderNowURL(SKU, IncPct, FreeSku, WlrPct, RecordKey);
      } else if (selected === 'Cancel Subscription') {
        this.setState({
          openSaveCancelMenu: true,
          cancelService: false,
          saveChangesTxt: 'Cancel Item Subscription ?',
          saveAction: 'cancel'
        });
      } else if (selected === 'Cancel Service Subscription') {
        await getCancellationFee(
          this.appData.localAPI
            ? 'http://localhost:3004/getCancellationFee'
            : `https://dev.odplabs.com/services/subscription-management-service-ext/eaiapi/getCancellationFee?contractNumber=${
                this.subscription.contractId
              }&cancellingLine=${this.subscription.lineNumber}`,
          this.cancellationFeeSuccess,
          this.cancellationFeeErr
        );
        this.setState({
          saveAction: 'cancelService',
          cancelService: true,
          cancelStep: 1
        });
      } else if (selected === 'Skip Next Delivery') {
        this.setState({
          openSaveCancelMenu: true,
          cancelService: false,
          saveChangesTxt: 'Skip Item Subscription ?',
          saveAction: 'skip'
        });
      } else if (selected === '') {
        this.setState({
          openSaveCancelMenu: true,
          cancelService: false,
          saveChangesTxt: 'Change Item Frequency ?',
          saveAction: 'frequency'
        });
      }
    });
  };

  handleSaveUpdate = async (event) => {
    event.preventDefault();
    const { RecordKey, LstChgTmpStmp } = this.subscription;
    const {
      itemQuantity,
      saveAction,
      frequencySelected,
      emailToSave
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
          // console.log(updateAction);
          break;
        default:
          updateAction = {
            name: 'quantity',
            value: itemQuantity
          };
      }

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
              resetEdit: true
            },
            () => {
              toast.success(`Update item ${saveAction} is successful.`);
              // pass true to not to show extra toast msg
              this.appData.getItems(null, null, true);
            }
          );
        }
      } catch (error) {
        toast.error('Item update failed.');
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
      cancelStep: 1
    }));
  };

  handleCancelSubmit = (event) => {
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
        cancelSubscription(
          contractId,
          lineNumber,
          currentBillingEndDate,
          getCancelReasonServerVal(cancelReason),
          this.handleCancelSuccess,
          this.handleCancelErr
        );
      } else {
        this.handleCancelSuccess();
      }
    }
  };

  handleCancelSuccess = () => {
    this.setState({ cancelService: false, cancelReason: '' }, () => {
      this.appData.reloadApp();
      toast.success(`Cancellation subscription is successful.`);
    });
  };

  handleCancelErr = (error) => {
    this.setState({ cancellationFailed: error });
    toast.warn(`Cancellation item is failed.`);
  };

  handleEditUserInfo = (editing, value) => {
    let editPayment = false;
    let editEmail = false;
    let editMemberNum = false;
    let saveChangesTxt = '';
    let saveAction = '';
    if (editing === 'email') {
      editEmail = true;
      saveChangesTxt = 'Save email changes?';
      saveAction = 'email';
    } else if (editing === 'payment') {
      editPayment = true;
      saveChangesTxt = 'Save payment changes?';
      saveAction = 'updatePayment';
    } else {
      editMemberNum = true;
      saveChangesTxt = 'Save member number changes?';
      saveAction = 'updateMemNum';
    }
    this.setState({
      editEmail,
      editPayment,
      editMemberNum,
      saveChangesTxt,
      openSaveCancelMenu: true,
      resetEdit: false,
      saveAction,
      emailToSave: value
    });
  };

  render() {
    const {
      openExtendedMenu,
      viewDetailsOpen,
      itemQuantity,
      openSaveCancelMenu,
      saveChangesTxt,
      frequencySelected,
      cancelService,
      cancelFees,
      cancelStep,
      cancelReason,
      resetEdit
    } = this.state;

    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => {
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
                Status
              } = subscription;

              let subscriptionImage = '';
              if (isItem) {
                subscriptionImage =
                  mediumImageUrl || appData.content.defaultItemImg;
              } else if (vendorNumber === '01242135') {
                subscriptionImage = getImageBySKU(itemNumber);
              } else {
                subscriptionImage = getSubscriptionImg(
                  itemNumber,
                  closeDate.length > 0
                );
              }

              const disableExtendedMenu =
                Status === 'C' ||
                subscription.status === 'Closed' ||
                (closeDate && closeDate.length > 0);
              const isSteamSub = isItem && SubType === 'S';
              const isActiveItemSubscription = isItem && Status === 'A';
              const showFreqDropDown = isItem && Status === 'A' && !isSteamSub;

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
                    className={`data-table ${
                      openExtendedMenu ? 'overlay' : ''
                    } ${openSaveCancelMenu ? 'open__conf' : ''}`}
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
                          className={`${
                            isItem && !skuUrl ? 'default_cursor' : ''
                          }`}
                        >
                          <Img src={subscriptionImage} />
                        </a>
                      </li>
                      <li>
                        <span
                          className="main_txt desc"
                          dangerouslySetInnerHTML={{
                            __html: subscriptionDescription
                          }}
                        />
                        <br />
                        <TextLink
                          label={`${
                            viewDetailsOpen ? 'Close details' : 'View details'
                          }`}
                          handleClick={(open) => {
                            this.setState(() => ({ viewDetailsOpen: open }));
                          }}
                        />
                      </li>
                      <li className="d-mob">
                        <label className="item__label">STATUS</label> <br />
                        <label
                          className={`pad_span ${
                            isActiveItemSubscription ? 'mgb0' : ''
                          }`}
                        >
                          {isActiveItemSubscription
                            ? `Delivery by: ${subscription.NextDlvDt}`
                            : null}
                          {!isActiveItemSubscription
                            ? formatStatus(
                                closeDate.length > 0 ||
                                (!isActiveItemSubscription && isItem)
                                  ? 'C'
                                  : 'Active'
                              )
                            : null}
                        </label>
                      </li>
                      <li
                        className={`d-mob ${
                          isActiveItemSubscription
                            ? 'item__quantity-container'
                            : ''
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
                        {isActiveItemSubscription ? (
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
                          <span className="pad_span margin__left-10">
                            {getFrequency(subscription.billingFrequency)}
                          </span>
                        )}
                      </li>
                      <li
                        className={`cursor__pointer ${
                          disableExtendedMenu ? 'disable' : ''
                        }`}
                        onClick={() => {
                          this.handleExtendedMenu(subscription);
                        }}
                      >
                        <a
                          className={`open_drop ${
                            disableExtendedMenu ? 'disable' : ''
                          }`}
                        >
                          <span className="menu__ellipses">.</span>
                          <span className="menu__ellipses">.</span>
                          <span className="menu__ellipses">.</span>
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
                                data-value={
                                  subscription.isItem
                                    ? appData.content.SkipNextDelivery
                                    : 'Cancel Service Subscription'
                                }
                                className="extended__menu-click"
                                onClick={(event) => {
                                  this.handleExtendedMenuSelection(
                                    event,
                                    subscription
                                  );
                                }}
                              >
                                {subscription.isItem
                                  ? appData.content.SkipNextDelivery
                                  : 'Cancel Subscription'}
                              </p>
                            </div>
                            {subscription.isItem ? (
                              <div className="dropbody">
                                <ul className="list-unstyled subscription__extended-menu">
                                  {appData.content.ExtendedMenuOptions.map(
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
                                  )}
                                </ul>
                              </div>
                            ) : null}
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Subscription Details Section */}
                  {viewDetailsOpen && (
                    <SubscriptionDetails
                      handleEditUserInfo={this.handleEditUserInfo}
                      resetEdit={resetEdit}
                    />
                  )}

                  {/* Save/Update confirmation  */}
                  {openSaveCancelMenu && !cancelService ? (
                    <div
                      className={`show_Div hidden-xs show ${
                        viewDetailsOpen ? 'add__margin' : ''
                      }`}
                    >
                      <ul className="list-inline list-unstyled">
                        {cancelService ? (
                          <li className="update__save--cancel-conf">
                            <span
                              style={{ color: '#273039', fontWeight: '600' }}
                            >
                              Are you sure you want to cancel? if you cancel
                              now, your fee to cancel will be:
                            </span>
                            <span style={{ color: '#ad2f2f', fontWeight: 600 }}>
                              {' '}
                              ${cancelFees}
                            </span>
                          </li>
                        ) : (
                          <li className="update__save--cancel-conf">
                            {saveChangesTxt}
                          </li>
                        )}
                        <li className="btn_sv-container">
                          <a
                            href="/"
                            className="btn_sv"
                            onClick={this.handleSaveUpdate}
                          >
                            {cancelService
                              ? 'Yes, Continue'
                              : appData.content.SaveUpdate}
                          </a>
                        </li>
                        <li className="btn_cncl-container">
                          <a
                            href="/"
                            className="btn_cncl"
                            onClick={this.handleCancelSave}
                          >
                            {cancelService ? 'I Changed My Mind' : 'Cancel'}
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : null}

                  {/* cancel service */}
                  {!openSaveCancelMenu && cancelService ? (
                    <div
                      className={`show_Div hidden-xs show cancellation ${
                        viewDetailsOpen ? 'add__margin' : ''
                      }`}
                    >
                      <ul className="list-inline list-unstyled">
                        {cancelStep === 1 ? (
                          <li className="update__save--cancel-conf">
                            <span
                              style={{ color: '#273039', fontWeight: '600' }}
                            >
                              Are you sure you want to cancel? if you cancel
                              now, your fee to cancel will be:
                            </span>
                            <span style={{ color: '#ad2f2f', fontWeight: 600 }}>
                              {' '}
                              ${cancelFees}
                            </span>
                          </li>
                        ) : null}
                        {cancelStep === 2 ? (
                          <li className="update__save--cancel-conf">
                            <span
                              style={{ color: '#273039', fontWeight: '600' }}
                            >
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
                            {cancelStep === 1 && 'Yes, Continue'}
                            {cancelStep === 2 && 'Submit'}
                          </a>
                        </li>
                        <li className="btn_cncl-container">
                          <a
                            href="/"
                            className="btn_cncl"
                            onClick={this.handleCancelSave}
                          >
                            I Changed My Mind
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
                            ${cancelFees}
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
                        <a onClick={this.handleCancelSave}>I change my mind</a>
                      </div>
                    </div>
                  ) : null}

                  {openSaveCancelMenu && !cancelService ? (
                    <div
                      className="visible-xs-block save__update-mob"
                      style={{ margin: '-15px 0' }}
                    >
                      <div className="title">{saveChangesTxt}</div>
                      <div>
                        <button type="button" onClick={this.handleSaveUpdate}>
                          Save/Update
                        </button>
                      </div>
                      <div>
                        <a onClick={this.handleCancelSave}>cancel</a>
                      </div>
                    </div>
                  ) : null}
                </React.Fragment>
              );
            }}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionItem;
