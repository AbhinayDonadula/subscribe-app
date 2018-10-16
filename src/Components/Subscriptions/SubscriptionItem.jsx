/* eslint-disable */
import React from 'react';
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

class SubscriptionItem extends React.Component {
  state = {
    viewDetailsOpen: false,
    openExtendedMenu: false,
    showFreqSuccessMsg: false,
    showQtySuccessMsg: false,
    frequencySelected: '',
    prevFrequencySelected: '',
    quantitySelected: 1,
    prevQuantitySelected: 1
  };

  componentDidMount() {
    this.setState({
      frequencySelected: getFrequency(this.subscription.billingFrequency),
      prevFrequencySelected: getFrequency(this.subscription.billingFrequency)
    });
  }

  handleViewDetails = event => {
    event.preventDefault();
    this.setState(({ viewDetailsOpen }) => ({
      viewDetailsOpen: !viewDetailsOpen
    }));
  };

  handleFrequencyDropDown = selected => {
    this.setState(({ frequencySelected }) => ({
      prevFrequencySelected: frequencySelected,
      frequencySelected: selected,
      showFreqUpdateSaveConf: frequencySelected !== selected
    }));
  };

  handleQuantityDropDown = selected => {
    this.setState(({ quantitySelected }) => ({
      prevQuantitySelected: quantitySelected,
      quantitySelected: Number(selected),
      showQtyUpdateSaveConf: quantitySelected !== selected
    }));
  };

  handleExtendedMenu = () => {
    this.setState(({ openExtendedMenu }) => ({
      openExtendedMenu: !openExtendedMenu
    }));
  };

  handleExtendeMenuSelection = event => {
    event.preventDefault();
    const selected = event.target.getAttribute('data-value');
    this.setState(
      { openExtendedMenu: false, selectedExtendedMenu: selected },
      () => {
        selected;
      }
    );
    // getOrderNowURL()
  };

  handleSaveUpdate = () => {
    this.setState(
      ({ showFreqUpdateSaveConf, showQtyUpdateSaveConf }) => ({
        showFreqUpdateSaveConf: false,
        showQtyUpdateSaveConf: false,
        showFreqSuccessMsg: showFreqUpdateSaveConf,
        showQtySuccessMsg: showQtyUpdateSaveConf
      }),
      () => {
        window.setTimeout(() => {
          this.setState(() => ({
            showFreqSuccessMsg: false,
            showQtySuccessMsg: false
          }));
        }, 2000);
      }
    );
  };

  handleCancelSave = () => {
    this.setState(({ prevFrequencySelected }) => ({
      showFreqUpdateSaveConf: false,
      showQtyUpdateSaveConf: false,
      frequencySelected: prevFrequencySelected
    }));
  };

  render() {
    const {
      openExtendedMenu,
      showFreqSuccessMsg,
      showFreqUpdateSaveConf,
      showQtyUpdateSaveConf,
      showQtySuccessMsg,
      viewDetailsOpen
    } = this.state;

    return (
      <AppContext.Consumer>
        {appData => (
          <SubscriptionContext.Consumer>
            {subscription => {
              this.subscription = subscription;
              const { closeDate = '' } = subscription;
              let subscriptionImage = '';
              if (subscription.isItem) {
                subscriptionImage =
                  'https://officedepot.scene7.com/is/image/officedepot/315515_p_smead_manila_file_folders?$OD%2DMed$';
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
                    }`}
                    onKeyPress={() => {
                      if (openExtendedMenu)
                        this.setState({ openExtendedMenu: false });
                    }}
                    onClick={() => {
                      if (openExtendedMenu)
                        this.setState({ openExtendedMenu: false });
                    }}
                    role="button"
                    tabIndex={0}
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
                        <Img src={subscriptionImage} />
                      </li>
                      <li>
                        <span className="main_txt desc">
                          {subscription.itemDescription &&
                          subscription.itemDescription.length > 0
                            ? subscription.itemDescription
                            : 'N/A'}
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
                        <label>STATUS </label> <br />
                        <label className="pad_span">
                          {formatStatus(subscription.status)}
                        </label>
                      </li>
                      <li className="d-mob">
                        <label>{appData.content.Quantity}</label>
                        <br />
                        <label className="pad_span margin__left-25">
                          {subscription.quantity.replace(/^0+/, '')}
                        </label>
                        {/* <Dropdown
                          options={appData.content.QuantityOptions}
                          updateParentState={this.handleQuantityDropDown}
                        /> */}
                      </li>
                      <li className="d-mob">
                        <label>{appData.content.FrequencyLabel}</label>
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
                        {/* <span className="pad_span margin__left-10">
                          {getFrequency(subscription.billingFrequency)}
                        </span> */}
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
                          <i className="fa fa-ellipsis-h" aria-hidden="true" />
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
                                  each => {
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
                                          onClick={event => {
                                            this.handleExtendeMenuSelection(
                                              event
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
                        <li>
                          {showFreqUpdateSaveConf &&
                            `Save/Update frequency changes?`}
                          {showQtyUpdateSaveConf &&
                            `Save/Update quantity changes?`}
                        </li>
                        <li>
                          <a
                            className="btn btn_sv"
                            // onClick={this.handleSaveUpdate}
                            onKeyDown={this.handleSaveUpdate}
                            role="button"
                            tabIndex={0}
                          >
                            {appData.content.SaveUpdate}
                          </a>
                        </li>
                        <li>
                          <a
                            role="button"
                            tabIndex={0}
                            className="btn btn_cncl"
                            onKeyDown={this.handleCancelSave}
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
