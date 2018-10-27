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
    // frequencySelected: '',
    itemQuantity: '',
    prevItemQuantity: '',
    saveChangesTxt: ''
  };

  componentDidMount() {
    this.setState({
      // frequencySelected: getFrequency(this.subscription.billingFrequency),
      // prevFrequencySelected: getFrequency(this.subscription.billingFrequency),
      itemQuantity: this.subscription.isItem
        ? this.subscription.quantity.replace(/^0+/, '')
        : '',
      prevItemQuantity: this.subscription.isItem
        ? this.subscription.quantity.replace(/^0+/, '')
        : ''
    });
  }

  handleViewDetails = (open) => {
    this.setState(() => ({ viewDetailsOpen: open }));
  };

  handleFrequencyDropDown = (selected) => {
    this.setState(({ frequencySelected }) => ({
      prevFrequencySelected: frequencySelected,
      frequencySelected: selected,
      openSaveCancelMenu: true,
      saveChangesTxt: 'Save/Update frequency changes?',
      saveAction: 'frequency'
    }));
  };

  handleItemQuantity = async ({ target: { value } }) => {
    if ((Number(value) || value === '') && value < 10000) {
      this.setState(() => ({
        itemQuantity: value,
        openSaveCancelMenu: value !== '',
        saveChangesTxt: 'Save/Update quantity changes?',
        saveAction: 'quantity'
      }));
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

  handleExtendeMenuSelection = (event, subscription) => {
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
        if (updateAction.name === 'cancel') {
          this.appData.getItems('Active');
        }
        this.setState({ openSaveCancelMenu: false }, () => {
          toast.success(`Item ${saveAction} is successful.`);
        });
      }
    } catch (error) {
      toast.error('Item Subscription skip failed.');
    }
  };

  handleCancelSave = (event) => {
    event.preventDefault();
    this.setState(({ prevItemQuantity }) => ({
      itemQuantity: prevItemQuantity,
      openSaveCancelMenu: false
    }));
  };

  render() {
    const {
      openExtendedMenu,
      viewDetailsOpen,
      itemQuantity,
      openSaveCancelMenu,
      saveChangesTxt
      // frequencySelected,
      // prevFrequencySelected,
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
              // console.log(subscription);

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
                        <span className="main_txt desc">
                          {isItem && shortDescription
                            ? `${shortDescription
                                .split(' ')
                                .slice(1, 15)
                                .join(' ')}...`
                            : ''}
                          {isItem && !shortDescription ? itemDescription : ''}
                          {!isItem ? itemDescription : ''}
                        </span>
                        <br />
                        <TextLink
                          label={`${
                            viewDetailsOpen ? 'Close Details' : 'View Details'
                          }`}
                          handleClick={this.handleViewDetails}
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
                            ? formatStatus(subscription.status)
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
                            selected={getFrequency(
                              isItem
                                ? subscription.Freq
                                : subscription.billingFrequency
                            )}
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
                                onClick={(event) => {
                                  this.handleExtendeMenuSelection(
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
                                            onClick={(event) => {
                                              this.handleExtendeMenuSelection(
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
                    <div className="show_Div show">
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
