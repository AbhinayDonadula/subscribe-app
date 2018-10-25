import React from 'react';
import AppContext from '../Context/AppContext';
import Dropdown from '../SharedComponents/Dropdown';

class SubscriptionFilters extends React.Component {
  state = {};

  render() {
    return (
      <AppContext.Consumer>
        {(appData) => (
          <div className="row">
            <div className="col-md-12">
              <div className="row row_sub">
                <div className="col-lg-8 col-md-6 col-sm-10 col-xs-12">
                  <div className="row select_Box">
                    <div className="filter__label col-xs-1">Filter:</div>
                    <div className="filter__options col-xs-4">
                      <Dropdown
                        options={appData.content.ShowOptions}
                        updateParentState={appData.handleAllFilter}
                      />
                    </div>
                    <div className="sort__label col-xs-1">Sort by:</div>
                    <div className="sort__options col-xs-4">
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
