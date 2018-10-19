import React from 'react';
import AppContext from '../Context/AppContext';
import SubscriptionItem from './SubscriptionItem';
import SubscriptionContext from '../Context/SubscriptionContext';
import SubscriptionFilters from './SubscriptionFilters';
import SpinnerPortal from '../SharedComponents/SpinnerPortal';
import EmailCampaign from './EmailCampaign';

class SubscriptionItemsContainer extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {(appData) => (
          <div className="row">
            {appData.itemsAndServices && !appData.initialAppLoading ? (
              <div className="col-md-12">
                <SubscriptionFilters
                  handleAllFilter={appData.handleAllFilter}
                  handleSortFilter={appData.handleSortFilter}
                />
                <div className="space50" />
                {!appData.initialAppLoading &&
                  appData.itemsAndServices &&
                  appData.itemsAndServices.map((eachSubscription) => (
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
                {appData.enableEmailCampaign ? <EmailCampaign /> : null}
              </div>
            ) : (
              <SpinnerPortal />
            )}
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionItemsContainer;
