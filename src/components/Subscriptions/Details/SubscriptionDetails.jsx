import React from 'react';
import AppContext from '../../Context/AppContext';
import Dropdown from '../../SharedComponents/Dropdown';
import DetailsSection from './DetailsSection';
import DownloadServiceSection from './DownloadServiceSection';
import BillingInfoSection from './BillingInfoSection';
import PaymentSection from './PaymentSection';
import SubscriptionContext from '../../Context/SubscriptionContext';
import { formatDate } from '../../utils';
import Img from '../../SharedComponents/Img';
import getItemDetails from '../../../apiCalls/getItemDetails';

class SubscriptionDetails extends React.Component {
  state = {
    itemInfo: null,
    gettingDetailsError: false,
    loading: false
  };

  componentDidMount() {
    const { isItem } = this.subscription;
    if (isItem) {
      this.setState({ loading: true }, () => {
        this.getDetails();
      });
    }
  }

  getDetails = async () => {
    const { RecordKey } = this.subscription;
    try {
      const { responseObject } = await getItemDetails(
        this.appData.localAPI,
        RecordKey
      );
      this.setState({
        itemInfo: responseObject.success
          ? responseObject.jsonObjectResponse
          : null,
        gettingDetailsError: !responseObject.success,
        loading: false
      });
    } catch (error) {
      this.setState({ gettingDetailsError: true, loading: false });
    }
  };

  handleFrequencyDropDown = () => {
    // handleFrequencyDropDown = (selected) => {
    // this.setState({ frequencySelected: selected });
  };

  render() {
    const { itemInfo, loading, gettingDetailsError } = this.state;
    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => {
              this.subscription = subscription;
              this.appData = appData;
              const {
                status = '',
                serviceType = 'SS',
                billingFrequency,
                vendorNumber,
                isItem
              } = subscription;

              // show billing section only only for SS type and Monthly frequency
              const showBillingSection =
                serviceType === 'SS' && billingFrequency === 'MON' && !isItem;

              // show/hide download section
              const showDownloadSection =
                !isItem &&
                status.toLowerCase() !== 'closed' &&
                vendorNumber !== '01242135' &&
                (serviceType === 'SS' && vendorNumber !== '01306234');

              return (
                <div className="expand_box" style={{ display: 'block' }}>
                  <div className="d-block d-md-none d-lg-none status_box">
                    <ul className="list-unstyled">
                      <li>
                        <label>STATUS </label> Subscribed until:{' '}
                        {formatDate(subscription.endDate)}
                      </li>
                      <li>
                        <label>{appData.content.Quantity}</label>{' '}
                        {subscription.quantity.replace(/^0+/, '')}
                      </li>
                      <li>
                        <label>{appData.content.Frequency}</label>
                        <Dropdown
                          options={appData.content.FrequencyOptions}
                          updateParentState={this.handleFrequencyDropDown}
                        />
                      </li>
                    </ul>
                  </div>
                  {loading ? (
                    <Img
                      spinner
                      src="https://wwwsqm.officedepot.com/images/od/v2/loading.gif"
                    />
                  ) : null}

                  {!loading && !gettingDetailsError ? (
                    <React.Fragment>
                      <DetailsSection itemInfo={itemInfo} />
                      {showDownloadSection ? <DownloadServiceSection /> : null}
                      {showBillingSection ? <BillingInfoSection /> : null}
                      <PaymentSection itemInfo={itemInfo} />
                    </React.Fragment>
                  ) : null}

                  {!loading && gettingDetailsError ? (
                    <div className="unexpected__error">
                      Something unexpected happened while we tried to load item
                      details, Please try again later.
                    </div>
                  ) : null}
                </div>
              );
            }}
          </SubscriptionContext.Consumer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default SubscriptionDetails;
