export default {
  icons: {
    dottedIcon:
      'http://officedepot.scene7.com/is/content/officedepot/options_menu_3-blue-dots',
    solidDownArrow:
      'http://officedepot.scene7.com/is/content/officedepot/Down-arrow-solid',
    solidUpArrow:
      'http://officedepot.scene7.com/is/content/officedepot/Up-arrow-solid',
    upArrow:
      'http://officedepot.scene7.com/is/content/officedepot/Up-arrow-linear',
    downArrow:
      'http://officedepot.scene7.com/is/content/officedepot/Down-arrow-linear'
  },
  apiUrls: {
    token:
      'Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJTdWJzY3JpcHRpb24tVUkiLCJleHAiOjE1MzkxMTg1OTF9.6NDm4eYbjOJPgJ1xCNhj66sTTLK33kYCIdLv_U_8L-tKUIbKsHVkIi3YRHuUvylPssR6w6bT4Xorc8UNPmS4JQ',
    // with anitest user account id, 02688034
    getSubList:
      'https://staging.odplabs.com/services/subscription-management-sync-service/eaiapi/subscriptions/getSubscriptionList?customerAccountId=02688034',
    getItemsList:
      'https://wwwsqs.officedepot.com/orderhistory/subscriptionManager.do?request=LIST&isTest=true',
    getEmailForDownloadService:
      'https://subscription-ui-sqm.odplabs.com/dev/accounts/contractId',
    getBillingHistory:
      'https://staging.odplabs.com/services/subscription-billing-history/eaiapi/subscriptions/getBillingHistory?contractNumber='
  },
  AppTitle: 'Subscriptions Manager',
  RecentNotificationsHeader: 'Recent Notifications',
  ViewAllSubscriptions: 'View All Subscriptions',
  MySubscriptionsHeader: 'My Subscriptions',
  FrequencyLabel: 'FREQUENCY',
  SkipNextDelivery: 'Skip Next Delivery',
  Quantity: 'QUANTITY',
  SubscriptionDetails: 'Subscription Details',
  TotalPrice: 'Total Price',
  ItemPrice: 'Item Price',
  SubscriptionStart: 'Subscription Start',
  SubscriptionEnd: 'Subscription End',
  FeeToCancel: 'Fee To Cancel',
  LastShipmentDate: 'Last Shipment Date',
  SubscriptionDiscount: 'Subscription Discount:',
  OrderNumber: 'Order #',
  ItemNumber: 'Item #',
  ContractNumber: 'Contract #',
  DownloadSectionHeader: 'Download Available for Service!',
  DownloadServiceButton: 'Download for service',
  PaymentSection: {
    PaymentMethod: 'PAYMENT METHOD',
    ContactEmail: ' CONTACT EMAIL',
    RewardsMemberNumber: 'REWARDS MEMBER NUMBER',
    SignUpTextUpdates: 'SIGN UP FOR TEXT UPDATES!',
    EditPaymentMethod: 'Edit payment method',
    EditContactEmail: 'Edit contact email',
    EditMemberNumber: 'Edit member number',
    AddMyMobileNumber: 'Add my mobile number'
  },
  BillingSection: {
    InvoiceDate: 'INVOICE DATE',
    InvoiceNumber: 'INVOICE #',
    PaymentMethod: 'PAYMENT METHOD',
    ServicePeriod: 'SERVICE PERIOD',
    TaxAndTotal: 'TAX & TOTAL',
    ViewAllBillingHistory: 'View all billing history',
    BillingInfoSectionHeader: 'Billing Information',
    NextScheduledPayment: 'Next Scheduled Payment : '
  },
  SaveUpdate: 'Save',
  CancelSaveUpdate: 'Cancel',
  navigateToService: '/catalog/search.do?Ntt=itemNumber',
  defaultItemImg:
    'https://officedepot.scene7.com/is/image/officedepot/sku-image-default',
  ShowOptions: [
    {
      id: 1,
      title: 'Active',
      value: 'Active'
    },
    {
      id: 2,
      title: 'Cancelled',
      value: 'Cancelled'
    },
    {
      id: 3,
      title: 'Products',
      value: 'Products'
    },
    {
      id: 4,
      title: 'Services',
      value: 'Services'
    },
    {
      id: 5,
      title: 'All',
      value: 'All'
    }
  ],
  SortOptions: [
    {
      id: 0,
      title: 'Next Delivery Date',
      value: 'Next Delivery Date'
    },
    {
      id: 1,
      title: 'Frequency',
      value: 'Frequency'
    }
  ],
  FrequencyOptions: [
    {
      id: 0,
      title: 'Weekly',
      value: 'Weekly',
      serverVal: 'W'
    },
    {
      id: 1,
      title: 'Every other week',
      value: 'Every other week',
      serverVal: 'B'
    },
    {
      id: 2,
      title: 'Every 3 weeks',
      value: 'Every 3 weeks',
      serverVal: 'T'
    },
    {
      id: 3,
      title: 'Monthly',
      value: 'Monthly',
      serverVal: 'M'
    },
    {
      id: 4,
      title: 'Every other month',
      value: 'Every other month',
      serverVal: 'I'
    },
    {
      id: 5,
      title: 'Quarterly',
      value: 'Quarterly',
      serverVal: 'Q'
    },
    {
      id: 6,
      title: 'Every 6 Months',
      value: 'Every 6 Months',
      serverVal: 'S'
    }
  ],
  cancelReasonOptions: [
    {
      id: 1,
      value: 'Select your Reason...',
      title: 'Select your Reason...'
    },
    {
      id: 6,
      // value: 'OD_TERMINATED_QUALITY_DID_NOT',
      value: 'Quality did not meet my expectations',
      title: 'Quality did not meet my expectations'
    },
    {
      id: 2,
      // value: 'OD_TERMINATED_BETTER_PRICE',
      value: 'Better price at a competitor',
      title: 'Better price at a competitor'
    },
    {
      id: 3,
      // value: 'OD_TERMINATED_TOOK_TOO_LONG',
      value: 'Took too long to set up my account/service',
      title: 'Took too long to set up my account/service'
    },
    {
      id: 4,
      // value: 'OD_TERMINATED_LACK_OF_USE',
      value: 'Lack of use',
      title: 'Lack of use'
    },
    {
      id: 5,
      // value: 'OD_TERMINATED_CHANGE_OF_PLANS',
      value: 'Change of plans',
      title: 'Change of plans'
    }
  ],
  ExtendedMenuOptions: [
    { id: 2, label: 'Cancel Subscription' },
    { id: 3, label: 'Order Now' }
  ]
};
