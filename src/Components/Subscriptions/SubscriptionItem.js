import React from "react";
import AppContext from "../Context/AppContext";
import TextLink from "../SharedComponents/TextLink";
import Dropdown from "../SharedComponents/Dropdown";
import SubscriptionDetails from "./Details/SubscriptionDetails";

class SubscriptionItem extends React.Component {
  state = {
    viewDetailsOpen: false,
    openExtendedMenu: false,
    frequencySelected: "",
    quantitySelected: 1
  };

  handleViewDetails = () => {
    this.setState({ viewDetailsOpen: !this.state.viewDetailsOpen });
  };

  handleFrequencyDropDown = selected => {
    this.setState({ frequencySelected: selected });
  };

  handleQuantityDropDown = selected => {
    this.setState({ quantitySelected: Number(selected) });
  };

  handleExtendedMenu = () => {
    this.setState({ openExtendedMenu: !this.state.openExtendedMenu });
  };

  handleExtendeMenuSelection = event => {
    this.setState({
      openExtendedMenu: false,
      selectedExtendedMenu: event.target.getAttribute("data-value")
    });
  };

  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <React.Fragment>
            <div
              className={`data-table ${
                this.state.openExtendedMenu ? "overlay" : ""
              }`}
              onClick={() => {
                if (this.state.openExtendedMenu)
                  this.setState({ openExtendedMenu: false });
              }}
            >
              {/* Success message */}
              <div className="succ_Div">
                <div className="media">
                  <div className="media-left">
                    <i className="fa fa-check-circle" aria-hidden="true" />
                  </div>
                  <div className="media-body">
                    <p>your frequecy changes have been successfully updated.</p>
                  </div>
                </div>
              </div>
              {/* each item */}
              <ul className="list-unstyled list-inline main_ul">
                <li>
                  <img
                    alt=""
                    src="img/table1.jpg"
                    className="img-responsive center-block"
                  />
                </li>
                <li>
                  <span className="main_txt">
                    HK Anderson Peanut Butter-Filled <br /> Pretzel Nuggets, 24
                    Oz Tub{" "}
                  </span>
                  <br />
                  <TextLink
                    label={`${
                      this.state.viewDetailsOpen
                        ? "Close Details"
                        : "View Details"
                    }`}
                    handleClick={this.handleViewDetails}
                  />
                </li>
                <li className="d-mob">
                  <label>STATUS </label> <br />{" "}
                  <span className="pad_span">Delivery by: 07/05/18 </span>
                </li>
                <li className="d-mob">
                  <label>{appData.content.Quantity}</label>
                  <br />
                  <Dropdown
                    options={appData.content.QuantityOptions}
                    updateParentState={this.handleQuantityDropDown}
                  />
                </li>
                <li className="d-mob">
                  <label>{appData.content.FrequencyLabel}</label>
                  <br />
                  <Dropdown
                    frequencyDropDown
                    options={appData.content.FrequencyOptions}
                    updateParentState={this.handleFrequencyDropDown}
                  />
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
            {this.state.openExtendedMenu && (
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
                          {appData.content.ExtendedMenuOptions.map(each => (
                            <li key={each.id}>
                              <a
                                data-value={each.label}
                                onClick={this.handleExtendeMenuSelection}
                              >
                                {each.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {/* Save/Update confirmation  */}
            {this.state.test && (
              <div className="show_Div">
                <ul className="list-inline list-unstyled">
                  <li>save/update frequency changes?</li>
                  <li>
                    <a className="btn btn_sv">Save/Update</a>
                  </li>
                  <li>
                    <a className="btn btn_cncl">No, Cancel</a>
                  </li>
                </ul>
              </div>
            )}
            {/* Subscription Details Section */}
            {this.state.viewDetailsOpen && <SubscriptionDetails />}
          </React.Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionItem;
