import axios from 'axios';
import datefns from 'date-fns';
import getJWToken from '../apiCalls/getJWToken';

export const getTokenFromCookie = () => {};

export const setTokenCookie = () => {};

export const formatDate = (date, format) => {
  if (format) {
    return datefns.format(date, format);
  }
  return datefns.format(date, 'MMM D, YYYY');
};

export const beautifyGetSubListResponse = ({
  getSubscriptionDetailsListResponse: response
}) => {
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
        !(
          contractLine.status === 'Under amendment' ||
          contractLine.status === 'Pending signature' ||
          contractLine.status === 'Pending approval' ||
          contractLine.status === 'Sent for signature' ||
          contractLine.status === 'Hold'
        )
      ) {
        subscriptions.push(
          Object.assign({
            ...header,
            ...contractLine,
            ...response.customer,
            reactKeyId: index + 1,
            sortDate: datefns.format(contractLine.startDate, 'MM/DD/YYYY')
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

export const getBillingHistory = async (url, handleSuccess, handleError) => {
  const axiosInstance = axios.create({ baseURL: url });
  const tokenFromCookie = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  if (tokenFromCookie.length === 0) {
    await getJWToken().then(({ token }) => {
      const date = new Date();
      date.setTime(date.getTime() + 540 * 1000);
      const expires = `; expires= ${date.toGMTString()}`;
      document.cookie = `token = ${token}${expires}; path=/`;
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    });
  } else {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${tokenFromCookie}`;
  }

  await axiosInstance
    .get()
    .then((response) => {
      handleSuccess(response);
    })
    .catch((error) => {
      handleError(error);
    });
};

export const getCancellationFee = async (url, handleSuccess, handleError) => {
  const axiosInstance = axios.create({ baseURL: url });
  const tokenFromCookie = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  if (tokenFromCookie.length === 0) {
    await getJWToken().then(({ token }) => {
      const date = new Date();
      date.setTime(date.getTime() + 540 * 1000);
      const expires = `; expires= ${date.toGMTString()}`;
      document.cookie = `token = ${token}${expires}; path=/`;
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    });
  } else {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${tokenFromCookie}`;
  }

  await axiosInstance
    .get()
    .then((response) => {
      handleSuccess(response);
    })
    .catch((error) => {
      handleError(error);
    });
};

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
    (each) => !each.isItem && !each.closeDate
  );

  // filter all cancelled
  const cancelledServices = services.filter(
    (each) => !each.isItem && each.closeDate
  );

  return [activeServices, cancelledServices];
};
