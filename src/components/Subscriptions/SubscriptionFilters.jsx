import React from 'react';
import AppContext from '../Context/AppContext';
import FilterDropDown from '../SharedComponents/FilterDropDown';

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
                  <div className="row select_Box hidden-xs">
                    <div className="filter__label col-xs-2">Filter & Sort:</div>
                    <div className="filter__options col-xs-6">
                      <FilterDropDown
                        updateParentState={appData.handleAllFilter}
                        selected={appData.filterBy}
                      />
                    </div>
                  </div>
                  {/*  mobile only */}
                  {/* <div className="row visible-xs-block select_Box filters__mob">
                    <div className="filters__container" id="scroll__to">
                      <div className="filter__mob">
                        <div className="filter__label col-xs-12">
                          Filter & Sort:
                        </div>
                        <div className="filter__options col-xs-12">
                          <FilterDropDown
                            updateParentState={appData.handleAllFilter}
                            selected={appData.filterBy}
                          />
                        </div>
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
