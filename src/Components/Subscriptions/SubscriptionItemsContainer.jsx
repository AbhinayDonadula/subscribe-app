import React from 'react';
import AppContext from '../Context/AppContext';
import SubscriptionItem from './SubscriptionItem';
import SubscriptionContext from '../Context/SubscriptionContext';
import SubscriptionFilters from './SubscriptionFilters';
import SpinnerPortal from '../SharedComponents/SpinnerPortal';

class SubscriptionItemsContainer extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {(appData) => (
          <div className="row">
            {appData.subscriptionsAndItems && !appData.initialAppLoading ? (
              <div className="col-md-12">
                <SubscriptionFilters
                  handleAllFilter={appData.handleAllFilter}
                  handleSortFilter={appData.handleSortFilter}
                />
                <div className="space50" />
                {!appData.initialAppLoading &&
                  appData.subscriptionsAndItems &&
                  appData.subscriptionsAndItems.map((eachSubscription) => (
                    // console.log(eachSubscription);
                    <div
                      className="sub_div"
                      key={
                        eachSubscription.RecordKey
                          ? eachSubscription.RecordKey
                          : eachSubscription.reactKeyId +
                            eachSubscription.lineNumber
                      }
                    >
                      <SubscriptionContext.Provider
                        value={{ ...eachSubscription }}
                      >
                        <SubscriptionItem />
                      </SubscriptionContext.Provider>
                    </div>
                  ))}
                {/* : [
                    <div className="sub_div" key="abcd">
                      <SubscriptionItem />
                    </div>,
                    <div className="sub_div" key="def">
                      <SubscriptionItem />
                    </div>
                  ]} */}
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
            ) : (
              <SpinnerPortal />
              // <div>Loading....</div>
            )}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionItemsContainer;
