import React from 'react';
import AppContext from '../Context/AppContext';
import Dropdown from '../SharedComponents/Dropdown';

class SubscriptionFilters extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {(appData) => (
          // this.appData = appData;
          <div className="row">
            <div className="col-md-12">
              <h3 className="notif_head">
                {appData.content.MySubscriptionsHeader}
              </h3>
              <div className="space20" />
              <div className="row row_sub">
                <div className="col-lg-8 col-md-6 col-sm-10 col-xs-12">
                  <div className="row select_Box">
                    <div className="col-sm-6 col-xs-7">
                      <Dropdown
                        options={appData.content.ShowOptions}
                        updateParentState={appData.handleAllFilter}
                      />
                    </div>
                    <div className="col-sm-6 col-xs-5">
                      <Dropdown
                        options={appData.content.SortOptions}
                        updateParentState={appData.handleSortFilter}
                      />
                    </div>
                  </div>
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
