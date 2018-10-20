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
  getOrderNowURL
} from '../utils';
import Img from '../SharedComponents/Img';
import updateItemSubscription from '../../apiCalls/updateItemSubscription';

class SubscriptionItem extends React.Component {
  state = {
    viewDetailsOpen: false,
    openExtendedMenu: false,
    showFreqSuccessMsg: false,
    showQtySuccessMsg: false,
    // frequencySelected: '',
    // prevQuantitySelected: 1,
    itemQuantity: '',
    prevItemQuantity: ''
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

  handleViewDetails = (event) => {
    event.preventDefault();
    this.setState(({ viewDetailsOpen }) => ({
      viewDetailsOpen: !viewDetailsOpen
    }));
  };

  handleFrequencyDropDown = (selected) => {
    this.setState(({ frequencySelected }) => ({
      prevFrequencySelected: frequencySelected,
      frequencySelected: selected,
      showFreqUpdateSaveConf: frequencySelected !== selected
    }));
  };

  handleItemQuantity = async ({ target: { value } }) => {
    if (Number(value) || value === '') {
      this.setState(({ itemQuantity }) => ({
        itemQuantity: value,
        prevItemQuantity: itemQuantity,
        showQtyUpdateSaveConf: true,
        showFreqUpdateSaveConf: false
      }));
    }
  };

  handleExtendedMenu = () => {
    this.setState(({ openExtendedMenu }) => ({
      openExtendedMenu: !openExtendedMenu
    }));
  };

  handleExtendeMenuSelection = (event, subscription) => {
    event.preventDefault();
    const { quantity, SKU, IncPct, FreeSku, WlrPct, RecordKey } = subscription;
    const selected = event.target.getAttribute('data-value');
    this.setState({ openExtendedMenu: false }, () => {
      if (selected === 'Order Now') {
        window.location.href = getOrderNowURL(
          quantity.replace(/^0+/, ''),
          SKU,
          IncPct,
          FreeSku,
          WlrPct,
          RecordKey
        );
      }
    });
  };

  handleSaveUpdate = async (event) => {
    event.preventDefault();
    const { RecordKey, LstChgTmpStmp } = this.subscription;
    const { itemQuantity } = this.state;
    try {
      await updateItemSubscription(this.isLocalAPI, RecordKey, LstChgTmpStmp, {
        name: 'quantity',
        value: itemQuantity
      });
      this.setState({ showQtyUpdateSaveConf: false }, () => {
        toast.success('Quantity updated.');
      });
    } catch (error) {
      toast.warn('Quantity update failed.');
    }
  };

  handleCancelSave = (event) => {
    event.preventDefault();
    this.setState(({ prevItemQuantity }) => ({
      itemQuantity: prevItemQuantity,
      showQtyUpdateSaveConf: false,
      showFreqUpdateSaveConf: false
    }));
  };

  render() {
    const {
      openExtendedMenu,
      showFreqSuccessMsg,
      showFreqUpdateSaveConf,
      showQtyUpdateSaveConf,
      showQtySuccessMsg,
      viewDetailsOpen,
      itemQuantity
      // frequencySelected,
      // prevFrequencySelected,
    } = this.state;

    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => {
              this.isLocalAPI = appData.localAPI;
              const {
                closeDate = '',
                isItem,
                skuUrl,
                itemNumber,
                itemDescription = 'N/A',
                shortDescription
              } = subscription;
              this.subscription = subscription;

              let subscriptionImage = '';
              if (subscription.isItem) {
                subscriptionImage = subscription.mediumImageUrl
                  ? subscription.mediumImageUrl
                  : appData.content.defaultItemImg;
              } else if (subscription.vendorNumber === '01242135') {
                subscriptionImage = getImageBySKU(subscription.itemNumber);
              } else {
                subscriptionImage = getSubscriptionImg(
                  subscription.itemNumber,
                  closeDate.length > 0
                );
              }

              return (
                <React.Fragment>
                  <div
                    className={`data-table ${
                      openExtendedMenu ? 'overlay' : ''
                    } ${
                      showFreqUpdateSaveConf || showQtyUpdateSaveConf
                        ? 'open__conf'
                        : ''
                    }`}
                    onClick={() => {
                      if (openExtendedMenu)
                        this.setState({ openExtendedMenu: false });
                    }}
                  >
                    {/* Success message */}
                    {(showFreqSuccessMsg || showQtySuccessMsg) && (
                      <div className="succ_Div" style={{ display: 'block' }}>
                        <div className="media">
                          <div className="media-left">
                            <i
                              className="fa fa-check-circle"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="media-body">
                            <p>
                              {showQtySuccessMsg
                                ? 'your quantity changes have been successfully updated.'
                                : null}
                              {showFreqSuccessMsg
                                ? 'your frequency changes have been successfully updated.'
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* each item */}
                    <ul className="list-unstyled list-inline main_ul">
                      <li>
                        <a
                          href={`${
                            isItem
                              ? skuUrl
                              : '/catalog/search.do?Ntt=itemNumber'.replace(
                                  'itemNumber',
                                  itemNumber
                                )
                          }`}
                        >
                          <Img src={subscriptionImage} />
                        </a>
                      </li>
                      <li>
                        <span className="main_txt desc">
                          {isItem ? shortDescription : itemDescription}
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
                        <label className="pad_span">
                          {formatStatus(subscription.status)}
                        </label>
                      </li>
                      <li
                        className={`d-mob ${
                          subscription.isItem ? 'item__quantity-container' : ''
                        }`}
                      >
                        <label
                          className={`item__label ${
                            subscription.isItem
                              ? 'item__quantity-container'
                              : ''
                          }`}
                        >
                          {appData.content.Quantity}
                        </label>
                        <br />
                        {subscription.isItem ? (
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
                      <li className="d-mob">
                        <label className="item__label">
                          {appData.content.FrequencyLabel}
                        </label>
                        <br />
                        {subscription.isItem ? (
                          <Dropdown
                            frequencyDropDown
                            options={appData.content.FrequencyOptions}
                            updateParentState={this.handleFrequencyDropDown}
                            selected={getFrequency(
                              subscription.billingFrequency
                            )}
                          />
                        ) : (
                          <span className="pad_span margin__left-10">
                            {getFrequency(subscription.billingFrequency)}
                          </span>
                        )}
                      </li>
                      {/*
                      This is used when Notifications are implemented
                        <li className="org_bg">
                            <img src="img/correct2.jpg" />
                        </li>
                    */}
                      <li
                        className="cursor__pointer"
                        onClick={this.handleExtendedMenu}
                        role="presentation"
                      >
                        <a className="open_drop">
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
                                onClick={this.handleExtendeMenuSelection}
                                role="presentation"
                              >
                                {subscription.isItem
                                  ? appData.content.SkipNextDelivery
                                  : 'Cancel Subscription'}
                              </p>
                            </div>
                            <div className="dropbody">
                              <ul className="list-unstyled subscription__extended-menu">
                                {appData.content.ExtendedMenuOptions.map(
                                  (each) => {
                                    if (each.id === 2 && !subscription.isItem) {
                                      return undefined;
                                    }
                                    if (each.id === 3 && !subscription.isItem) {
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
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Save/Update confirmation  */}
                  {(showFreqUpdateSaveConf || showQtyUpdateSaveConf) && (
                    <div className="show_Div show">
                      <ul className="list-inline list-unstyled">
                        <li className="update__save--cancel-conf">
                          {showFreqUpdateSaveConf &&
                            'Save/Update frequency changes?'}
                          {showQtyUpdateSaveConf &&
                            'Save/Update quantity changes?'}
                        </li>
                        <li className="btn_sv-container">
                          <a
                            href="/"
                            className="btn btn_sv"
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
