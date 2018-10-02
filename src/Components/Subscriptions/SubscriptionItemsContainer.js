import React from "react";
import AppContext from "../Context/AppContext";
import SubscriptionItem from "./SubscriptionItem";
import SubscriptionContext from "../Context/SubscriptionContext";

class SubscriptionItemsContainer extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {appData => {
          console.log(appData.subscriptions);
          return (
            <div className="row">
              <div className="col-md-12">
                {appData.subscriptions
                  ? appData.subscriptions.map(eachSubscription => (
                      <div
                        className="sub_div"
                        key={
                          eachSubscription.reactKeyId +
                          eachSubscription.lineNumber
                        }
                      >
                        <SubscriptionContext.Provider
                          value={{ ...eachSubscription }}
                        >
                          <SubscriptionItem />
                        </SubscriptionContext.Provider>
                      </div>
                    ))
                  : [
                      <div className="sub_div" key="abcd">
                        <SubscriptionItem />
                      </div>,
                      <div className="sub_div" key="def">
                        <SubscriptionItem />
                      </div>
                    ]}
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
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionItemsContainer;
