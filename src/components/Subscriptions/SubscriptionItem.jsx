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
  getFrequencyForAPI
} from '../utils';
import Img from '../SharedComponents/Img';
import updateItemSubscription from '../../apiCalls/updateItemSubscription';

class SubscriptionItem extends React.Component {
  state = {
    openSaveCancelMenu: false,
    saveAction: '',
    viewDetailsOpen: false,
    openExtendedMenu: false,
    frequencySelected: '',
    prevFrequencySelected: '',
    itemQuantity: '',
    prevItemQuantity: '',
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

  handleExtendedMenuSelection = (event, subscription) => {
    event.preventDefault();
    const { SKU, IncPct, FreeSku, WlrPct, RecordKey } = subscription;
    const selected = event.target.getAttribute('data-value');
    this.setState({ openExtendedMenu: false }, () => {
      if (selected === 'Order Now') {
        window.location.href = getOrderNowURL(
          SKU,
          IncPct,
          FreeSku,
          WlrPct,
          RecordKey
        );
      } else if (selected === 'Cancel Subscription') {
        this.setState({
          openSaveCancelMenu: true,
          saveChangesTxt: 'Cancel Item Subscription ?',
          saveAction: 'cancel'
        });
      } else if (selected === 'Skip Next Delivery') {
        this.setState({
          openSaveCancelMenu: true,
          saveChangesTxt: 'Skip Item Subscription ?',
          saveAction: 'skip'
        });
      } else if (selected === '') {
        this.setState({
          openSaveCancelMenu: true,
          saveChangesTxt: 'Change Item Frequency ?',
          saveAction: 'frequency'
        });
      }
    });
  };

  handleSaveUpdate = async (event) => {
    event.preventDefault();
    const { RecordKey, LstChgTmpStmp } = this.subscription;
    const { itemQuantity, saveAction, frequencySelected } = this.state;
    let updateAction = {};

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
          toast.success(`Item ${saveAction} is failed.`);
        });
      } else {
        if (updateAction.name === 'cancel' || updateAction.name === 'skip') {
          this.appData.getItems('Active');
        }
        this.setState(
          { openSaveCancelMenu: false, prevItemQuantity: itemQuantity },
          () => {
            toast.success(`Item ${saveAction} is successful.`);
          }
        );
      }
    } catch (error) {
      toast.error('Item Subscription skip failed.');
    }
  };

  handleCancelSave = (event) => {
    event.preventDefault();
    this.setState(({ prevItemQuantity, prevFrequencySelected }) => ({
      itemQuantity: prevItemQuantity,
      frequencySelected: prevFrequencySelected,
      openSaveCancelMenu: false
    }));
  };

  render() {
    const {
      openExtendedMenu,
      viewDetailsOpen,
      itemQuantity,
      openSaveCancelMenu,
      saveChangesTxt,
      frequencySelected
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
                                data-value={appData.content.SkipNextDelivery}
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

                  {/* Save/Update confirmation  */}
                  {openSaveCancelMenu && (
                    <div className="show_Div hidden-xs show">
                      <ul className="list-inline list-unstyled">
                        <li className="update__save--cancel-conf">
                          {saveChangesTxt.length ? saveChangesTxt : null}
                        </li>
                        <li className="btn_sv-container">
                          <a
                            href="/"
                            className="btn_sv"
                            onClick={this.handleSaveUpdate}
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
                            {appData.content.CancelSaveUpdate}
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}

                  {openSaveCancelMenu ? (
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
                        <a onClick={this.handleCancelSave}>Cancel</a>
                      </div>
                    </div>
                  ) : null}

                  {/* Subscription Details Section */}
                  {viewDetailsOpen && <SubscriptionDetails />}
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
