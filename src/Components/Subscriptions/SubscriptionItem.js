import React from "react";
import AppContext from "../Context/AppContext";
import TextLink from "../SharedComponents/TextLink";
// import Dropdown from "../SharedComponents/Dropdown";
import SubscriptionDetails from "./Details/SubscriptionDetails";
import SubscriptionContext from "../Context/SubscriptionContext";
import { getSubscriptionImg, getFrequency, getImageBySKU } from "../utils";
import Img from "../SharedComponents/Img";

class SubscriptionItem extends React.Component {
  state = {
    viewDetailsOpen: false,
    // showSaveUpdateConf: false,
    openExtendedMenu: false,
    showFreqSuccessMsg: false,
    showQuantitySuccessMsg: false
    // frequencySelected: "",
    // quantitySelected: 1
  };

  handleViewDetails = () => {
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

  // handleQuantityDropDown = selected => {
  //   this.setState({ quantitySelected: Number(selected) });
  // };

  handleExtendedMenu = () => {
    this.setState(({ openExtendedMenu }) => ({
      openExtendedMenu: !openExtendedMenu
    }));
  };

  handleExtendeMenuSelection = () => {
    this.setState({
      openExtendedMenu: false
      // selectedExtendedMenu: event.target.getAttribute("data-value")
    });
  };

  handleSaveUpdate = () => {
    this.setState(
      ({ showFreqUpdateSaveConf }) => ({
        showFreqUpdateSaveConf: false,
        showFreqSuccessMsg: showFreqUpdateSaveConf
      }),
      () => {
        window.setTimeout(() => {
          this.setState(() => ({
            showFreqSuccessMsg: false
          }));
        }, 2000);
      }
    );
  };

  handleCancelSave = () => {
    this.setState(() => ({
      showFreqUpdateSaveConf: false
      // frequencySelected: prevFrequencySelected
    }));
  };

  render() {
    const {
      openExtendedMenu,
      showFreqSuccessMsg,
      showFreqUpdateSaveConf,
      showQtyUpdateSaveConf,
      showQuantitySuccessMsg,
      viewDetailsOpen
    } = this.state;
    return (
      <AppContext.Consumer>
        {appData => (
          <SubscriptionContext.Consumer>
            {subscription => {
              const { closeDate = "" } = subscription;
              const isSubCancelled = closeDate.length > 0;

              return (
                <React.Fragment>
                  <div
                    className={`data-table ${
                      openExtendedMenu ? "overlay" : ""
                    }`}
                    onClick={() => {
                      if (openExtendedMenu)
                        this.setState({ openExtendedMenu: false });
                    }}
                  >
                    {/* Success message */}
                    {(showFreqSuccessMsg || showQuantitySuccessMsg) && (
                      <div className="succ_Div" style={{ display: "block" }}>
                        <div className="media">
                          <div className="media-left">
                            <i
                              className="fa fa-check-circle"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="media-body">
                            <p>
                              {showQuantitySuccessMsg
                                ? "your quantity changes have been successfully updated."
                                : null}
                              {showFreqSuccessMsg
                                ? "your frequency changes have been successfully updated."
                                : null}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* each item */}
                    <ul className="list-unstyled list-inline main_ul">
                      <li>
                        <Img
                          src={
                            subscription.vendorNumber === "01242135"
                              ? getImageBySKU(subscription.itemNumber)
                              : getSubscriptionImg(
                                  subscription.itemNumber,
                                  isSubCancelled
                                )
                          }
                        />
                      </li>
                      <li>
                        <span className="main_txt">
                          {subscription.itemDescription &&
                          subscription.itemDescription.length > 0
                            ? subscription.itemDescription
                            : "N/A"}
                        </span>
                        <br />
                        <TextLink
                          label={`${
                            viewDetailsOpen ? "Close Details" : "View Details"
                          }`}
                          handleClick={this.handleViewDetails}
                        />
                      </li>
                      <li className="d-mob">
                        <label>STATUS </label> <br />
                        <span className="pad_span">{subscription.status}</span>
                      </li>
                      <li className="d-mob">
                        <label>{appData.content.Quantity}</label>
                        <br />
                        <span className="pad_span margin__left-25">
                          {subscription.quantity}
                        </span>
                        {/* <Dropdown
                            options={appData.content.QuantityOptions}
                            updateParentState={this.handleQuantityDropDown}
                          /> */}
                      </li>
                      <li className="d-mob">
                        <label>{appData.content.FrequencyLabel}</label>
                        <br />
                        <span className="pad_span margin__left-10">
                          {getFrequency(subscription.billingFrequency)}
                        </span>
                        {/* <Dropdown
                            frequencyDropDown
                            options={appData.content.FrequencyOptions}
                            updateParentState={this.handleFrequencyDropDown}
                          /> */}
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
                    <div className="dropdown_div" style={{ display: "block" }}>
                      <ul className="list-inline list-unstyled">
                        <li>
                          <div className="dropbox">
                            <div className="drophead">
                              <p
                                data-value={appData.content.SkipNextDelivery}
                                onClick={this.handleExtendeMenuSelection}
                                role="presentation"
                              >
                                {appData.content.SkipNextDelivery}
                              </p>
                            </div>
                            <div className="dropbody">
                              <ul className="list-unstyled subscription__extended-menu">
                                {appData.content.ExtendedMenuOptions.map(
                                  each => (
                                    <li key={each.id}>
                                      <a
                                        data-value={each.label}
                                        onClick={
                                          this.handleExtendeMenuSelection
                                        }
                                      >
                                        {each.label}
                                      </a>
                                    </li>
                                  )
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
                            onClick={this.handleSaveUpdate}
                          >
                            {appData.content.SaveUpdate}
                          </a>
                        </li>
                        <li>
                          <a
                            className="btn btn_cncl"
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
