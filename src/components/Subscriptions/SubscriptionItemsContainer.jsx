import React from 'react';
// import { handleCancelEditPaymentFrame } from 'components/utils';
import AppContext from '../Context/AppContext';
import SubscriptionItem from './SubscriptionItem';
import SubscriptionContext from '../Context/SubscriptionContext';
import SubscriptionFilters from './SubscriptionFilters';
import SpinnerPortal from '../SharedComponents/SpinnerPortal';
import EmailCampaign from './EmailCampaign';
import paymentCalls from './Payment';

class SubscriptionItemsContainer extends React.Component {
  state = {
    email: '',
    openDetailsInfo: {},
    search: '',
    searchResults: []
  };

  // componentDidMount() {
  //   window.$('#ssPayCancel').on('click', (e) => {
  //     e.preventDefault();
  //     handleCancelEditPaymentFrame();
  //   });
  // }

  handleEditEmailClick = (email, editEmail = true) => {
    this.setState({
      editEmail,
      editRewards: false,
      email,
      editPayment: false
    });
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
    this.setState({
      editRewards,
      editEmail: false,
      rewards,
      editPayment: false
    });
  };

  handleEditPaymentClick = () => {
    this.setState(
      { editRewards: false, editEmail: false, editPayment: true },
      () => {
        const paymentNode = document.getElementById('service-Subscription-Pay');
        const editPaymentSection = document.getElementById(
          'edit-payment-section'
        );
        if (paymentNode) {
          document.getElementById('service-Subscription-Pay').classList = '';
          editPaymentSection.appendChild(paymentNode);
        }
        if (!this.localAPI) {
          window.$('#ssPaySave').unbind('click');
          paymentCalls.init();
        }
      }
    );
  };

  handleEditRewards = ({ target: { value } }) => {
    if (!Object.is(Number(value), NaN)) {
      this.setState({ rewards: value });
    }
  };

  handleSearch = (event, allServices) => {
    this.setState({ search: event.target.value }, () => {
      const { search } = this.state;
      this.filterSearch(search, allServices);
    });
  };

  filterSearch = (search, allSubscriptions) => {
    const searchResults = allSubscriptions.filter(
      (each) => each.contractId === search || each.SKU === search
    );
    this.setState({ searchResults });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <AppContext.Consumer>
        {(appData) => {
          let subsToShow = [];
          if (searchResults.length > 0) {
            subsToShow = searchResults;
          } else {
            subsToShow = appData.subscriptionsToShow;
          }
          this.localAPI = appData.localAPI;
          return (
            <div className="row">
              {appData.subscriptionsToShow && !appData.initialAppLoading ? (
                <div className="col-md-12">
                  <SubscriptionFilters />
                  <div className="space50" />
                  <div>
                    <a
                      href="/vendor/ingramRedirector.do"
                      className="ingram__link"
                    >
                      Manage Cloud Services
                    </a>
                  </div>
                  {/* <div className="search__box">
                    <input
                      onChange={(event) => {
                        this.handleSearch(event, appData.subscriptionsToShow);
                      }}
                      value={search}
                    />
                  </div> */}
                  {appData.loadingServicesFailed ||
                  appData.loadingProductsFailed ? (
                    <div className="partial__subs">
                      {`Due to some technical issues, we couldn't show all of your
                      subscriptions. Please try again later.`}
                    </div>
                  ) : null}
                  {subsToShow.map((eachSubscription) => {
                    const { state } = this;
                    const viewDetailsPropName = `viewDetails${
                      eachSubscription.reactKeyId
                    }`;

                    return (
                      <div
                        className="sub_div"
                        key={
                          eachSubscription.reactKeyId +
                          eachSubscription.lineNumber
                        }
                        id={eachSubscription.reactKeyId}
                      >
                        <SubscriptionContext.Provider
                          value={{
                            appData,
                            ...eachSubscription,
                            ...this.state,
                            handleEditEmailClick: this.handleEditEmailClick,
                            handleEditRewardsClick: this.handleEditRewardsClick,
                            handleEditPaymentClick: this.handleEditPaymentClick,
                            handleEditEmail: this.handleEditEmail,
                            handleEditRewards: this.handleEditRewards
                          }}
                        >
                          <SubscriptionItem
                            viewDetails={
                              state.openDetailsInfo[viewDetailsPropName]
                            }
                            handleViewDetails={() => {
                              this.setState(
                                {
                                  openDetailsInfo: {
                                    [viewDetailsPropName]: !state
                                      .openDetailsInfo[viewDetailsPropName]
                                  },
                                  editEmail: false,
                                  editRewards: false
                                },
                                () => {
                                  document
                                    .getElementById(eachSubscription.reactKeyId)
                                    .scrollIntoView({
                                      behavior: 'smooth',
                                      block: 'start',
                                      inline: 'center'
                                    });
                                }
                              );
                            }}
                          />
                        </SubscriptionContext.Provider>
                      </div>
                    );
                  })}
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
                            top: document.getElementById('scroll__to-top')
                              .offsetTop
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
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionItemsContainer;
