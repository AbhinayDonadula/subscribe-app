export default {
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
  SubscriptionDiscount: 'Subscription Discount',
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
  SaveUpdate: 'Save/Update',
  CancelSaveUpdate: 'Cancel',
  navigateToService: '/catalog/search.do?Ntt=itemNumber',
  defaultItemImg:
    'https://officedepot.scene7.com/is/image/officedepot/sku-image-default',
  ShowOptions: [
    {
      id: 0,
      title: 'Show All Subscriptions',
      value: 'All'
    },
    {
      id: 1,
      title: 'Active Subscriptions',
      value: 'Active'
    },
    {
      id: 2,
      title: 'Cancelled Subscriptions',
      value: 'Cancelled'
    }
  ],
  SortOptions: [
    {
      id: 0,
      title: 'Sort By: Next Delivery Date',
      value: 'Sort By: Next Delivery Date'
    },
    {
      id: 1,
      title: 'Select 1',
      value: 'Select 1'
    },
    {
      id: 2,
      title: 'Select 2',
      value: 'Select 2'
    }
  ],
  FrequencyOptions: [
    {
      id: 0,
      title: 'Every Other Month',
      value: 'Every Other Month'
    },
    {
      id: 1,
      title: 'Weekly',
      value: 'Weekly'
    },
    {
      id: 2,
      title: 'Every Other Week',
      value: 'Every Other Week'
    },
    {
      id: 3,
      title: 'Monthly',
      value: 'Monthly'
    },
    {
      id: 4,
      title: 'Every 3 Weeks',
      value: 'Every 3 Weeks'
    },
    {
      id: 5,
      title: 'Quarterly',
      value: 'Quarterly'
    },
    {
      id: 6,
      title: 'Every 6 Months',
      value: 'Every 6 Months'
    }
  ],
  QuantityOptions: [
    {
      id: 0,
      title: '1',
      value: '1'
    },
    {
      id: 1,
      title: '2',
      value: '2'
    },
    {
      id: 2,
      title: '3',
      value: '3'
    }
  ],
  ExtendedMenuOptions: [
    { id: 1, label: 'Go To Order History' },
    { id: 2, label: 'Cancel Subscription' },
    { id: 3, label: 'Order Now' }
  ]
};
