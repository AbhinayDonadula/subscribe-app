import React from 'react';
import { toast } from 'react-toastify';
import AppContext from '../../Context/AppContext';
import Dropdown from '../../SharedComponents/Dropdown';
import DetailsSection from './DetailsSection';
import DownloadServiceSection from './DownloadServiceSection';
import BillingInfoSection from './BillingInfoSection';
import PaymentSection from './PaymentSection';
import SubscriptionContext from '../../Context/SubscriptionContext';
import { formatDate, getFrequencyForAPI, getFrequency } from '../../utils';
import Img from '../../SharedComponents/Img';
import getItemDetails from '../../../apiCalls/getItemDetails';
import updateItemSubscription from '../../../apiCalls/updateItemSubscription';

class SubscriptionDetails extends React.Component {
  state = {
    itemInfo: null,
    gettingDetailsError: false,
    loading: false,
    openSaveCancelMenu: false,
    itemQuantity: null
  };

  componentDidMount() {
    const { billingFrequency, quantity, isItem, Freq } = this.subscription;
    if (isItem) {
      this.setState(
        {
          loading: true,
          itemQuantity: isItem ? quantity.replace(/^0+/, '') : '',
          prevItemQuantity: isItem ? quantity.replace(/^0+/, '') : '',
          frequencySelected: getFrequency(isItem ? Freq : billingFrequency),
          prevFrequencySelected: getFrequency(isItem ? Freq : billingFrequency)
        },
        () => {
          this.getDetails();
        }
      );
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
        loading: false,
        itemQuantity: this.subscription.quantity.replace(/^0+/, '')
      });
    } catch (error) {
      this.setState({ gettingDetailsError: true, loading: false });
    }
  };

  handleFrequencyDropDown = (selected) => {
    this.setState(({ frequencySelected, prevItemQuantity }) => ({
      prevFrequencySelected: frequencySelected,
      frequencySelected: selected,
      openSaveCancelMenu: true,
      saveChangesTxt: 'Save/Update frequency changes?',
      saveAction: 'frequency',
      itemQuantity: prevItemQuantity
    }));
  };

  handleItemQuantity = ({ target: { value } }) => {
    const { prevItemQuantity, prevFrequencySelected } = this.state;
    if ((Number(value) || value === '') && value < 10000) {
      this.setState(() => ({
        itemQuantity: value,
        openSaveCancelMenu: value !== '' && value !== prevItemQuantity,
        saveChangesTxt: 'Save/Update quantity changes?',
        saveAction: 'quantity',
        frequencySelected: prevFrequencySelected
      }));
    }
  };

  handleSaveUpdate = async (event) => {
    event.preventDefault();
    const { RecordKey, LstChgTmpStmp } = this.subscription;
    const { itemQuantity, saveAction, frequencySelected } = this.state;
    let updateAction = {};

    switch (saveAction) {
      case 'quantity':
        updateAction = {
          name: 'quantity',
          value: itemQuantity
        };
        break;
      case 'frequency':
        updateAction = {
          name: 'freq',
          value: getFrequencyForAPI(frequencySelected)
        };
        break;
      case 'cancel':
        updateAction = { name: 'cancel' };
        break;
      case 'skip':
        updateAction = { name: 'skip' };
        break;
      default:
        updateAction = {
          name: 'quantity',
          value: itemQuantity
        };
    }

    try {
      const response = await updateItemSubscription(
        this.isLocalAPI,
        RecordKey,
        LstChgTmpStmp,
        updateAction
      );
      if (
        (response.success !== undefined && !response.success) ||
        !response.responseObject.success
      ) {
        this.setState({ openSaveCancelMenu: false }, () => {
          toast.success(`Item ${saveAction} is failed.`);
        });
      } else {
        if (updateAction.name === 'cancel') {
          this.appData.getItems('Active');
        }
        this.setState({ openSaveCancelMenu: false }, () => {
          toast.success(`Item ${saveAction} is successful.`);
        });
      }
    } catch (error) {
      toast.error('Item Subscription skip failed.');
    }
  };

  resetQuantity = ({ target: { value } }) => {
    const { prevItemQuantity } = this.state;
    if (value === '') {
      this.setState({ itemQuantity: prevItemQuantity });
    }
  };

  handleCancelSave = (event) => {
    event.preventDefault();
    this.setState(({ prevItemQuantity, prevFrequencySelected }) => ({
      itemQuantity: prevItemQuantity,
      frequencySelected: prevFrequencySelected,
      openSaveCancelMenu: false
    }));
  };

  render() {
    const {
      frequencySelected,
      itemInfo,
      loading,
      gettingDetailsError
    } = this.state;
    return (
      <AppContext.Consumer>
        {(appData) => (
          <SubscriptionContext.Consumer>
            {(subscription) => {
              this.subscription = subscription;
              this.appData = appData;
              this.isLocalAPI = appData.localAPI;
              const {
                status = '',
                serviceType = 'SS',
                billingFrequency,
                vendorNumber,
                isItem
              } = subscription;
              const {
                itemQuantity,
                saveChangesTxt,
                openSaveCancelMenu
              } = this.state;

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
                  <div className="d-block d-md-none d-lg-none status_box full__width-mob">
                    <ul className="list-unstyled details__mobile">
                      <li className="status__item-mob">
                        <span className="status mobile">STATUS</span>
                        <span className="status__date-mobile">
                          {isItem
                            ? `Delivery by: ${formatDate(
                                subscription.NextDlvDt,
                                'MM/DD/YY'
                              )}`
                            : `Subscribed until: ${formatDate(
                                subscription.endDate,
                                'MM/DD/YY'
                              )}`}
                        </span>
                      </li>
                      <li className="quantity__item-mob">
                        <span className="quantity mobile">
                          {appData.content.Quantity}
                        </span>
                        <span>
                          {isItem ? (
                            <input
                              type="text"
                              className="item__qty-mob"
                              id="item--qty"
                              value={itemQuantity || ''}
                              onChange={this.handleItemQuantity}
                              onBlur={this.resetQuantity}
                            />
                          ) : (
                            subscription.quantity.replace(/^0+/, '')
                          )}
                        </span>
                      </li>
                      <li className="freq__item-mob select_Box">
                        <span className="frequency mobile">
                          {appData.content.FrequencyLabel}
                        </span>
                        {isItem ? (
                          <Dropdown
                            options={appData.content.FrequencyOptions}
                            updateParentState={this.handleFrequencyDropDown}
                            selected={frequencySelected}
                            mobile
                          />
                        ) : (
                          <span className="pad_span">
                            {getFrequency(subscription.billingFrequency)}
                          </span>
                        )}
                      </li>
                    </ul>
                    {openSaveCancelMenu ? (
                      <div className="save__update-mob">
                        <div className="title">{saveChangesTxt}</div>
                        <div>
                          <button type="button" onClick={this.handleSaveUpdate}>
                            Save/Update
                          </button>
                        </div>
                        <div>
                          <a
                            onClick={this.handleCancelSave}
                            // onClick={(e) => {
                            //   e.preventDefault();
                            //   // this.setState(({ prevItemQuantity }) => ({
                            //   //   itemQuantity: prevItemQuantity,
                            //   //   openSaveCancelMenu: false
                            //   // }));
                            //   this.handleCancelSave()
                            // }}
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                    ) : null}
                    <hr />
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
