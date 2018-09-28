import React from "react";
import AppContext from "../Context/AppContext";
import Dropdown from "../SharedComponents/Dropdown";

class SubscriptionFilters extends React.Component {
  render() {
    return (
      <AppContext.Consumer>
        {appData => (
          <div className="row">
            <h3 className="notif_head">
              {appData.content.MySubscriptionsHeader}
            </h3>
            <div className="space40" />
            <div className="row row_sub">
              <div className="col-md-6 col-sm-10 col-xs-12">
                <div className="row select_Box">
                  <div className="col-md-6 col-sm-6 col-xs-7">
                    <Dropdown title="" options={appData.content.ShowOptions} />
                  </div>
                  {/* <div className="col-md-6 col-sm-6 col-xs-5">
                    <div className="custom-select">
                      <select className="form-control" id="sel2">
                        <option value="s5">Sort By: Next Delivery Date</option>
                        <option value="s6">select1</option>
                        <option value="s7">select2</option>
                        <option value="s8">select3</option>
                      </select>
                      <div className="select-selected">
                        Sort By: Next Delivery Date
                      </div>
                      <div className="select-items select-hide">
                        <div>Sort By: Next Delivery Date</div>
                        <div>select1</div>
                        <div>select2</div>
                        <div>select3</div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionFilters;
