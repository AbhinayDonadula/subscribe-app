import React from "react";
import AppContext from "../Context/AppContext";
import SubscriptionItem from "./SubscriptionItem";

class SubscriptionItemsContainer extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {() => (
          <div className="row">
            <div className="col-md-12">
              <div className="sub_div">
                <SubscriptionItem />
                <div className="data-table data-table1">
                  <ul className="list-unstyled list-inline">
                    <li>
                      <img
                        alt=""
                        src="img/add.jpg"
                        className="img-responsive center-block"
                      />
                    </li>

                    <li>
                      Finally, e-mail campaigns <br /> that dont suck.
                    </li>
                    <li>
                      <button type="button" className="btn btn_plan">
                        Awesome Plans &amp; Pricing
                      </button>
                    </li>
                    <li>
                      <img
                        alt=""
                        src="img/final.jpg"
                        className="img-resp final_img"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionItemsContainer;
