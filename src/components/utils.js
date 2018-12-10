import datefns from 'date-fns';

export const formatDate = (date, format) => {
  if (format) {
    return datefns.format(date, format);
  }
  return datefns.format(date, 'MMM D, YYYY');
};

export const beautifyGetSubListResponse = (servicesList) => {
  const response = Object.keys(servicesList).length
    ? servicesList.getSubscriptionDetailsListResponse
    : {};
  const subscriptions = [];
  const { contractList } = response;
  const contract = contractList ? contractList.contract : [];
  contract.forEach((_contract, index) => {
    const header = { ..._contract.contractHeader };
    const contractLines = _contract.contractLines || [];
    contractLines.forEach((contractLine) => {
      // skip BS(Bussiness-Select) contracts
      if (
        contractLine.serviceType !== 'BS' &&
        contractLine.lineTypeName !== 'Termination Fee' &&
        !(
          contractLine.status === 'Pending signature' ||
          contractLine.status === 'Pending approval' ||
          contractLine.status === 'Sent for signature' ||
          contractLine.status === 'Hold' ||
          contractLine.status === 'Draft'
        )
      ) {
        let sortByFreq = 0;
        if (contractLine.billingFrequency === 'MON') {
          sortByFreq = 1;
        }
        if (contractLine.billingFrequency === 'YR') {
          sortByFreq = 2;
        }
        const reactKeyId =
          index === 0 ? Math.random() * 1000 : index * Math.random() * 1000;

        subscriptions.push(
          Object.assign({
            ...header,
            ...contractLine,
            ...response.customer,
            reactKeyId,
            sortDate: datefns.format(contractLine.startDate, 'MM/DD/YYYY'),
            sortByFreq
          })
        );
      }
    });
  });
  return subscriptions;
};

export const getSubscriptionImg = (sku, isSubCancelled) => {
  let imgUrl = 'https://officedepot.scene7.com/is/image/officedepot/sku-image-SKU'.replace(
    'SKU',
    sku || '9204711'
  );
  if (isSubCancelled) {
    imgUrl = `${imgUrl}?op_colorize=cccccc`;
  }

  return imgUrl;
};

export const getImageBySKU = (itemNum) => {
  if (itemNum === '5628175' || itemNum === '932208') {
    return 'http://officedepot.scene7.com/is/image/officedepot/Logo';
  }

  if (itemNum === '112724' || itemNum === '360948') {
    return 'http://officedepot.scene7.com/is/image/officedepot/SEO';
  }

  if (itemNum === '285557' || itemNum === '269756') {
    return 'http://officedepot.scene7.com/is/image/officedepot/Social%20Media';
  }

  if (itemNum === '267807') {
    return 'http://officedepot.scene7.com/is/image/officedepot/Website';
  }

  if (
    itemNum === '714164' ||
    itemNum === '885450' ||
    itemNum === '320227' ||
    itemNum === '869265' ||
    itemNum === '717496' ||
    itemNum === '354434'
  ) {
    return 'http://officedepot.scene7.com/is/image/officedepot/PPC';
  }

  return 'http://officedepot.scene7.com/is/image/officedepot/Logo';
};

export const getFrequency = (frequency) => {
  switch (frequency) {
    case 'W':
      return 'Weekly';
    case 'I':
      return 'Every other month';
    case 'B':
      return 'Every other week';
    case 'T':
      return 'Every 3 weeks';
    case 'M':
      return 'Monthly';
    case 'MON':
      return 'Monthly';
    case 'Q':
      return 'Quarterly';
    case 'S':
      return 'Every 6 Months';
    default:
      return 'Annually';
  }
};

export const getFrequencyForAPI = (frequency) => {
  switch (frequency) {
    case 'Weekly':
      return 'W';
    case 'Every other week':
      return 'B';
    case 'Every 3 weeks':
      return 'T';
    case 'Monthly':
      return 'M';
    case 'Quarterly':
      return 'Q';
    case 'Every 6 Months':
      return 'S';
    case 'Every other month':
      return 'I';
    default:
      return 'N/A';
  }
};

export const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;

export const getContractNumber = (contractId = 'N/A', lineNumber = 'N/A') =>
  `${contractId}-${lineNumber}`;

export const FireGetImageBySku = async (url, handleSuccess, handleError) => {
  const headers = new window.Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  const request = new window.Request(url, {
    headers,
    method: 'GET',
    credentials: 'same-origin'
  });

  // api call
  window
    .fetch(request)
    .then((resp) => resp.json())
    .then((resp) => {
      handleSuccess(resp);
    })
    .catch((error) => {
      handleError(error);
    });
};

export const createGetImageInfoBySkuURL = (localAPI, itemSkus) => {
  const stripZerosFromItemSkus = itemSkus.map((each) =>
    each.replace(/^0+/, '')
  );
  if (!localAPI) {
    return `/mobile/getAjaxPriceListFromService.do?mapBySkuId=true&items=${stripZerosFromItemSkus.join(
      ','
    )}`;
  }
  return 'http://localhost:3004/imageForSku';
};

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

export const formatStatus = (status) => {
  if (status === 'C') {
    return 'Cancelled';
  }
  if (status) {
    return 'On Hold';
  }
  return 'Active';
};

export const beautifyBillingHistoryResponse = (response, lineNumber) => {
  let records = [];
  if (
    response.billingHistoryResponse &&
    response.billingHistoryResponse.billingHistoryRecord
  ) {
    records = response.billingHistoryResponse.billingHistoryRecord;
  }
  const list = [];
  for (let i = 0; i < records.length; i += 1) {
    const record = records[i];
    const lines = record.invoice.invoiceLines.invoiceLine;

    for (let j = 0; j < lines.length; j += 1) {
      const line = lines[j];
      if (
        lineNumber === undefined ||
        parseInt(line.contractLineNumber, 10) === parseInt(lineNumber, 10)
      ) {
        const invoice = {
          ...record.invoice,
          ...line,
          ...record.invoice.tenders
        };

        list.push({
          id: `${invoice.itemNumber}-${invoice.orderLineNumber}`,
          invoiceNumber: invoice.invoiceNumber,
          date: datefns.format(invoice.invoiceDate, 'MM/DD/YYYY'),
          servicePeriodStart: datefns.format(
            invoice.servicePeriodStartDate,
            'MM/DD/YYYY'
          ),
          servicePeriodEnd: datefns.format(
            invoice.servicePeriodEndDate,
            'MM/DD/YYYY'
          ),
          paymentCardType: invoice.cardType,
          paymentCardNumber: invoice.cardnumber,
          total: invoice.unitTotal,
          nextBillingDate: datefns.format(
            invoice.nextBillingDate,
            'MM/DD/YYYY'
          ),
          contractLineNumber: invoice.contractLineNumber
        });
      }
    }
  }

  list.sort((prev, next) => new Date(next.date) - new Date(prev.date));
  let digestedResponse = { items: [] };
  if (records.length > 0) {
    const { invoice } = records[0];
    if (invoice) {
      digestedResponse = Object.assign(digestedResponse, {
        orderNumber: invoice.orderNumber,
        contractNumber: invoice.serviceContractNumber,
        orderDate: datefns.format(invoice.invoiceDate, 'MM/DD/YYYY'),
        status: invoice.invoiceStatus,
        servicePeriodStartDate: datefns.format(
          invoice.servicePeriodStartDate,
          'MM/DD/YYYY'
        ),
        servicePeriodEndDate: datefns.format(
          invoice.servicePeriodEndDate,
          'MM/DD/YYYY'
        ),
        tenders: invoice.tenders,
        invoiceNumber: invoice.invoiceNumber,
        items: list
      });
    }
  }
  return digestedResponse;
};

export const getOrderNowURL = (
  sku = 315515,
  subscriptionIncentivePercent = '',
  subscriptionHasFreeDelivery = '',
  subscriptionWlrPercent = '',
  subscriptionId = ''
) => {
  return `/catalog/addSkuByButtonSetAction.do?addingToCartFromSubscriptionManager=true&qty=1&sku=${sku}&subscriptionIncentivePercent=${subscriptionIncentivePercent}&subscriptionHasFreeDelivery=${subscriptionHasFreeDelivery}&subscriptionWlrPercent=${subscriptionWlrPercent}&subscriptionId=${subscriptionId}`;
};

export const getOrderNowMobileURL = (sku) => {
  return `/mb/addSkuByButton.do?entryFormList[0].qty=1&entryFormList[0].sku=${sku.replace(
    /^0+/,
    ''
  )}&quickAdd=true`;
};

export const getServiceSubscriptionsURL = (localAPI) => {
  if (!localAPI) {
    const accountId = document.querySelector("input[name='accountId']").value;
    return `https://staging.odplabs.com/services/subscription-management-sync-service/eaiapi/subscriptions/getSubscriptionList?customerAccountId=${accountId}`;
  }
  return 'http://localhost:3004/data';
};

export const getDefaultHeaders = () => {
  return new window.Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
};

export const filterActiveCancel = (services) => {
  // filter all active
  const activeServices = services.filter(
    (each) => !each.isItem && each.closeDate.length === 0
  );

  // filter all cancelled
  const cancelledServices = services.filter(
    (each) => !each.isItem && each.closeDate.length > 0
  );

  return [activeServices, cancelledServices];
};

export const cleanUp = () => {
  if (document.getElementById('actualContent')) {
    document.getElementById('actualContent').className = 'col-md-9 col-sm-12';
  }

  if (
    document.querySelector('.my_cart > .toolbar_section_content') &&
    document.querySelector(
      '.my_store_details.toolbar_section_content.hide.pt12.clear'
    ) &&
    document.querySelector('.my_orders > .toolbar_section_content')
  ) {
    document.querySelector('.my_cart > .toolbar_section_content').className =
      'toolbar_section_content is_collapsed clear';
    document.querySelector(
      '.my_store_details.toolbar_section_content.hide.pt12.clear'
    ).className = 'my_store_details toolbar_section_content pt12 clear';
    document.querySelector('.my_orders > .toolbar_section_content').className =
      'toolbar_section_content is_collapsed clear';
  }
};

export const getCancelReasonServerVal = (reason) => {
  if (reason === 'Quality did not meet my expectations') {
    return 'OD_TERMINATED_QUALITY_DID_NOT';
  }
  if (reason === 'Better price at a competitor') {
    return 'OD_TERMINATED_BETTER_PRICE';
  }
  if (reason === 'Took too long to set up my account/service') {
    return 'OD_TERMINATED_TOOK_TOO_LONG';
  }
  if (reason === 'Lack of use') {
    return 'OD_TERMINATED_LACK_OF_USE';
  }
  return 'OD_TERMINATED_CHANGE_OF_PLANS';
};

export const getFilterSort = (filter, sort) => {
  return [filter.replace(', ', '-'), sort.replace(', ', '')];
};

export const getProductErrorMsg = (errCode = '') => {
  let errorMessage = '';
  switch (errCode) {
    case 'B14':
      errorMessage =
        'Credit card expires before next estimated delivery date. Please update your credit card information.';
      break;
    case 'B17':
      errorMessage = 'Not enough stock, customer does not allow backorder.';
      break;
    case 'BDC':
      errorMessage = 'Cancel date reached before next estimated delivery date.';
      break;
    case 'BDE':
      errorMessage = 'End date reached before next estimated delivery date.';
      break;
    case 'BID':
      errorMessage =
        'Not enough stock, item discontinued, cancel subscription.';
      break;
    case 'BIN':
      errorMessage =
        'Not enough stock, this item will not replenish, cancel subscription. Please create new subscription with another available item.';
      break;
    case 'L05':
      errorMessage = 'Miscellaneous line error(s).';
      break;
    case 'L18':
      errorMessage =
        'Quantity limit exceeded. Please update your subscription quantity appropriately.';
      break;
    case 'L78':
      errorMessage =
        'Unit price exceeded. Please create new subscription with another available item.';
      break;
    case 'L79':
      errorMessage =
        'Extended line total exceeded. Please lower subscription quantity to satisfy your line limit.';
      break;
    case 'L84':
      errorMessage =
        'Line limit exceeded. Please create new subscription with another available item that satisfies your line limit.';
      break;
    case 'L88':
      errorMessage =
        'Cost Center line limit exceeded. Please create new subscription with another available item that satisfies your line limit.';
      break;
    case 'LBO':
      errorMessage = 'Not enough stock, customer allows backorder.';
      break;
    case 'O77':
      errorMessage = 'Order dollar limit exceeded.';
      break;
    case 'O81':
      errorMessage = 'Order Bill to limit exceeded.';
      break;
    case 'O82':
      errorMessage = 'Order PO limit exceeded.';
      break;
    case 'O83':
      errorMessage = 'Order Cost Center limit exceeded.';
      break;
    case 'O85':
      errorMessage = 'Order limit exceeded.';
      break;
    case 'O86':
      errorMessage = 'Order Ship To limit exceeded.';
      break;
    case 'O89':
      errorMessage = 'Order PO expired.';
      break;
    case 'O90':
      errorMessage = 'Minimum order value not met.';
      break;
    case 'L27':
      errorMessage =
        'Restricted item not allowed. Please create new subscription with another available item.';
      break;
    case 'ORD':
      errorMessage = '';
      break;
    case 'O05':
      errorMessage =
        'We were unable to process the order due to the accounting fields on this subscription. Please update the values as needed.';
      break;
    case 'L39':
      errorMessage =
        'Item is discontinued. Can no longer be back-ordered. Please create new subscription with another available item.';
      break;
    case 'BSI':
      errorMessage =
        'Shipping address for this subscription has been placed in inactive status. Please update your profile with a valid Shipping address.';
      break;
    case 'L11':
      errorMessage =
        'Discontinued, invalid or invalid for location and no stock available. Please create new subscription with another available item.';
      break;
    case 'L17':
      errorMessage =
        'Not enough stock, customer does not allow backorder. Please create new subscription with another available item.';
      break;
    case 'SFS':
      errorMessage = '';
      break;
    case 'U05':
      errorMessage = 'Cost Center is invalid. Please enter a new Cost Center.';
      break;
    case 'U11':
      errorMessage =
        'Item is not available at this location for this order type.';
      break;
    case 'U23':
      errorMessage =
        'Orders can not be delivered to PO box numbers. Please set up an alternate shipping address.';
      break;
    case 'UC5':
      errorMessage = 'An item in this subscription has been discontinued.';
      break;
    case 'UG1':
      errorMessage =
        'The shipping address has expired. Please update the shipping address.';
      break;
    case 'UG3':
      errorMessage =
        'The Cost Center has expired. Please update the Cost Center.';
      break;
    case 'UG5':
      errorMessage =
        'Shipping address balance exceeded. Contact your shipping department for additional information.';
      break;
    case 'X05':
      errorMessage = 'Cost Center information is missing or invalid.';
      break;
    case 'X07':
      errorMessage = 'Credit card information is missing or invalid.';
      break;
    case 'X22':
      errorMessage = 'PayPal transaction did not complete. Please try again.';
      break;
    case 'X25':
      errorMessage =
        'User location error. Please contact your management to correct user profile location.';
      break;
    case 'X70':
      errorMessage = 'Credit card expiration date is required.';
      break;
    default:
      errorMessage = '';
  }
  if (
    errorMessage === '' &&
    ([...errCode][0] === 'U' || [...errCode][0] === 'X')
  ) {
    errorMessage = `We were unable to fulfill this subscription order. Please contact Customer Service and provide the error code:${errCode}`;
  }
  return errorMessage;
};

export const filterServices = (state) => {
  const {
    activeAndCancelledServices,
    sortBy,
    activeServices,
    cancelledServices,
    filterBy
  } = state;
  let servicesToShow = [];
  let toastMessage = '';
  if (filterBy === 'Services') {
    servicesToShow = activeAndCancelledServices;
    toastMessage = 'Showing All Services';
  }

  if (filterBy === 'Services-Active') {
    servicesToShow = activeServices;
    toastMessage = 'Showing Active Services';
  }

  if (filterBy === 'Services-Cancelled') {
    servicesToShow = cancelledServices;
    toastMessage = 'Showing Cancelled Services';
  }

  if (sortBy === 'Purchase Date') {
    if (filterBy === 'Services-Active') {
      servicesToShow = activeServices.sort(
        (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
      );
    } else if (filterBy === 'Services-Cancelled') {
      servicesToShow = cancelledServices.sort(
        (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
      );
    } else {
      servicesToShow = activeAndCancelledServices.sort(
        (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
      );
    }
    toastMessage = 'Showing Services sorted by purchase date';
  }
  if (sortBy === 'Billing Frequency') {
    if (filterBy === 'Services-Active') {
      servicesToShow = activeServices.sort(
        (a, b) => a.sortByFreq - b.sortByFreq
      );
    } else if (filterBy === 'Services-Cancelled') {
      servicesToShow = cancelledServices.sort(
        (a, b) => a.sortByFreq - b.sortByFreq
      );
    } else {
      servicesToShow = activeAndCancelledServices.sort(
        (a, b) => a.sortByFreq - b.sortByFreq
      );
    }
    toastMessage = 'Showing Services sorted by billing frequency';
  }
  return [servicesToShow, toastMessage];
};
