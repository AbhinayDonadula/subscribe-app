import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Dropdown from '../../SharedComponents/Dropdown';
import DetailsSection from './DetailsSection';
import DownloadServiceSection from './DownloadServiceSection';
import BillingInfoSection from './BillingInfoSection';
import PaymentSection from './PaymentSection';
import SubscriptionContext from '../../Context/SubscriptionContext';
import { getFrequencyForAPI, getFrequency, formatDate } from '../../utils';
import Img from '../../SharedComponents/Img';
import getItemDetails from '../../../apiCalls/getItemDetails';
import updateItemSubscription from '../../../apiCalls/updateItemSubscription';
import SubDetailsContext from '../../Context/SubDetailsContext';
import AutoRenewalPortal from '../../SharedComponents/AutoRenewalPortal';

class SubscriptionDetails extends React.Component {
  state = {
    itemInfo: null,
    gettingDetailsError: false,
    loading: false,
    openSaveCancelMenu: false,
    itemQuantity: null,
    editingRewardsNum: false,
    editPayment: false,
    editEmail: false,
    email: '',
    autoRenewalSelected: true,
    disableAutoRenewal: false,
    showAutoRenewalModal: false,
    enableAutoRenewFlag: true
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

  componentWillReceiveProps(props) {
    const { refresh } = this.props;
    if (props.refresh !== refresh) {
      this.getDetails();
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
        itemQuantity: this.subscription.quantity.replace(/^0+/, ''),
        email:
          responseObject.jsonObjectResponse &&
          responseObject.jsonObjectResponse.Email
            ? responseObject.jsonObjectResponse.Email.toLowerCase()
            : 'N/A',
        subscriptionId: RecordKey.replace(/^0+/, '')
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
      saveChangesTxt: 'Save frequency changes?',
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
        saveChangesTxt: 'Save quantity changes?',
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
          toast.success(`Update item ${saveAction} is failed.`);
        });
      } else {
        this.setState({ openSaveCancelMenu: false }, () => {
          toast.success(`Update item ${saveAction} is successful.`);
          // pass true to not to show extra toast msg
          this.appData.getItems(true);
        });
      }
    } catch (error) {
      toast.error('Updates to item failed.');
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
      openSaveCancelMenu: false,
      editEmail: false,
      editRewards: false
    }));
  };

  handleEditEmailMobile = () => {
    const { email } = this.state;
    const { handleEditUserInfo } = this.props;
    this.setState({
      editEmail: true,
      editPayment: false,
      editRewards: false,
      openSaveCancelMenu: false,
      saveChangesTxt: 'Save email changes?',
      saveAction: 'emailUpdate'
    });
    handleEditUserInfo('email', email);
  };

  editEmailAddress = ({ target: { value } }) => {
    const { handleEditUserInfo } = this.props;
    this.setState({ email: value }, () => {
      handleEditUserInfo('email', value);
    });
  };

  handleEditRewardsNumMobile = () => {
    const { email } = this.state;
    const { handleEditUserInfo } = this.props;
    this.setState({
      editEmail: false,
      editPayment: false,
      editingRewardsNum: true,
      openSaveCancelMenu: false,
      saveChangesTxt: 'Save Rewards Number changes?',
      saveAction: 'updateMemNum'
    });
    handleEditUserInfo('updateMemNum', email);
  };

  editRewardsNum = ({ target: { value } }) => {
    const { handleEditUserInfo } = this.props;
    this.setState({ rewardsNum: value }, () => {
      handleEditUserInfo('updateMemNum', value);
    });
  };

  render() {
    const {
      frequencySelected,
      itemInfo,
      loading,
      gettingDetailsError,
      editEmail,
      editingRewardsNum,
      editPayment,
      subscriptionId,
      email,
      enableAutoRenewFlag
    } = this.state;

    return (
      <SubscriptionContext.Consumer>
        {({ appData, ...subscription }) => {
          this.subscription = subscription;
          this.appData = appData;
          this.isLocalAPI = appData.localAPI;
          const {
            status = '',
            serviceType = 'SS',
            billingFrequency,
            vendorNumber,
            isItem,
            SubType,
            contractId,
            lineNumber
          } = subscription;
          console.log(subscription.renewalType);

          const {
            itemQuantity,
            saveChangesTxt,
            openSaveCancelMenu,
            autoRenewalSelected,
            showAutoRenewalModal,
            disableAutoRenewal
          } = this.state;

          // show billing section only only for SS type and Monthly frequency
          const showBillingSection =
            serviceType === 'SS' && billingFrequency === 'MON' && !isItem;

          const isSteamSub = isItem && SubType === 'S';

          // show/hide download section
          const showDownloadSection =
            window.innerWidth > 750 &&
            !isItem &&
            status.toLowerCase() !== 'closed' &&
            vendorNumber !== '01242135' &&
            (serviceType === 'SS' && vendorNumber !== '01306234');

          return (
            <div className="expand_box" style={{ display: 'block' }}>
              {showAutoRenewalModal ? (
                <AutoRenewalPortal
                  closeModal={() => {
                    this.setState({
                      showAutoRenewalModal: false,
                      autoRenewalSelected: true
                    });
                  }}
                  handleSubmit={() => {
                    this.setState({
                      disableAutoRenewal: true,
                      showAutoRenewalModal: false
                    });
                  }}
                  contractId={contractId}
                  lineNumber={lineNumber}
                />
              ) : null}
              <div className="d-block d-md-none d-lg-none status_box full__width-mob">
                {enableAutoRenewFlag ? (
                  <div className="auto__renewal-container">
                    <input
                      type="checkbox"
                      className={`filter__sort-checkbox ${
                        disableAutoRenewal || subscription.renewalType === 'DNR'
                          ? 'disable'
                          : ''
                      }`}
                      id="auto__renewal"
                      checked={autoRenewalSelected}
                      onChange={(event) => {
                        this.setState({
                          autoRenewalSelected: event.target.checked,
                          showAutoRenewalModal: autoRenewalSelected
                        });
                      }}
                      disabled={
                        disableAutoRenewal || subscription.renewalType === 'DNR'
                      }
                    />
                    <label htmlFor="auto__renewal">Auto-Renew</label>
                    <img
                      src="http://s7d1.scene7.com/is/image/officedepot/Info-small"
                      alt=""
                    />
                  </div>
                ) : null}
                <ul className="list-unstyled details__mobile">
                  <li className="status__item-mob">
                    <span className={`status mobile ${isItem ? 'item' : ''}`}>
                      {isItem ? 'DELIVERY BY' : 'NEXT BILL'}
                    </span>
                    <span className="status__date-mobile">
                      {isItem
                        ? subscription.NextDlvDt
                        : formatDate(
                            subscription.nextBillingDate,
                            'MM/DD/YYYY'
                          )}
                    </span>
                  </li>
                  <li className="quantity__item-mob">
                    <span className="quantity mobile">
                      {appData.content.Quantity}
                    </span>
                    <span>
                      {isItem && !isSteamSub ? (
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
                    {isItem && !isSteamSub ? (
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
                  {isItem ? (
                    <li className="status__item-mob">
                      <span className="status mobile sub__id">
                        SUBSCRIPTION ID
                      </span>
                      <span className="status__date-mobile">
                        {subscriptionId}
                      </span>
                    </li>
                  ) : null}
                </ul>
                {openSaveCancelMenu ? (
                  <div className="save__update-mob">
                    <div className="title">{saveChangesTxt}</div>
                    <div>
                      <button type="button" onClick={this.handleSaveUpdate}>
                        Save
                      </button>
                    </div>
                    <div>
                      <a onClick={this.handleCancelSave}>Cancel</a>
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
                <SubDetailsContext.Provider
                  value={{
                    itemInfo,
                    editEmail,
                    editPayment,
                    editingRewardsNum,
                    email,
                    subscriptionId,
                    handleEditEmailMobile: this.handleEditEmailMobile,
                    handleEditRewardsNumMobile: this.handleEditRewardsNumMobile,
                    editEmailAddress: this.editEmailAddress,
                    editRewardsNum: this.editRewardsNum,
                    appData,
                    subscription
                  }}
                >
                  <React.Fragment>
                    <DetailsSection />
                    {showDownloadSection ? <DownloadServiceSection /> : null}
                    {showBillingSection ? <BillingInfoSection /> : null}
                    <PaymentSection />
                  </React.Fragment>
                </SubDetailsContext.Provider>
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
    );
  }
}

SubscriptionDetails.propTypes = {
  handleEditUserInfo: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired
};

export default SubscriptionDetails;
