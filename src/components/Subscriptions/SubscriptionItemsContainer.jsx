import React from 'react';
import AppContext from '../Context/AppContext';
import SubscriptionItem from './SubscriptionItem';
import SubscriptionContext from '../Context/SubscriptionContext';
import SubscriptionFilters from './SubscriptionFilters';
import SpinnerPortal from '../SharedComponents/SpinnerPortal';
import EmailCampaign from './EmailCampaign';

class SubscriptionItemsContainer extends React.Component {
  state = { email: '' };

  handleEditEmailClick = (email, editEmail = true) => {
    this.setState({ editEmail, editRewards: false, email });
  };

  handleEditEmail = (event) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({
      email: event.target.value,
      invalidEmail:
        !re.test(String(event.target.value).toLowerCase()) &&
        event.target.value.length > 0
    });
  };

  handleEditRewardsClick = (rewards, editRewards = true) => {
    this.setState({ editRewards, editEmail: false, rewards });
  };

  handleEditRewards = ({ target: { value } }) => {
    if (!Object.is(Number(value), NaN)) {
      this.setState({ rewards: value });
    }
  };

  render() {
    return (
      <AppContext.Consumer>
        {(appData) => (
          <div className="row">
            {appData.subscriptionsToShow && !appData.initialAppLoading ? (
              <div className="col-md-12">
                <SubscriptionFilters />
                <div className="space50" />
                {appData.loadingServicesFailed ||
                appData.loadingProductsFailed ? (
                  <div className="partial__subs">
                    {`Due to some technical issues, we couldn't show all of your
                    subscriptions. Please try again later.`}
                  </div>
                ) : null}
                {appData.subscriptionsToShow.map((eachSubscription) => (
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
                      value={{
                        ...eachSubscription,
                        ...this.state,
                        handleEditEmailClick: this.handleEditEmailClick,
                        handleEditRewardsClick: this.handleEditRewardsClick,
                        handleEditEmail: this.handleEditEmail,
                        handleEditRewards: this.handleEditRewards
                      }}
                    >
                      <SubscriptionItem />
                    </SubscriptionContext.Provider>
                  </div>
                ))}
                {appData.showLoadMoreButton ? (
                  <div className="loadmore__container">
                    <button type="button" onClick={appData.handleLoadMore}>
                      Show More
                    </button>
                    <a
                      href="/"
                      onClick={(event) => {
                        event.preventDefault();
                        window.scroll({
                          behavior: 'smooth',
                          left: 0,
                          top: document.getElementById('scroll__to').offsetTop
                        });
                      }}
                    >
                      Top
                    </a>
                  </div>
                ) : null}
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
