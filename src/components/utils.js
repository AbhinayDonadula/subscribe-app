import axios from 'axios';
import datefns from 'date-fns';
import getJWToken from '../apiCalls/getJWToken';

export const formatDate = (date) => {
  const jsDate = new Date(date);
  const year = jsDate.getFullYear();
  return jsDate
    .toDateString()
    .slice(4)
    .replace(` ${year}`, `, ${year}`);
};

export const beautifyGetSubListResponse = (response) => {
  const subscriptions = [];
  const { contractList } = response;
  const contract = contractList ? contractList.contract : [];
  contract.forEach((_contract, index) => {
    const header = { ..._contract.contractHeader };
    const contractLines = _contract.contractLines || [];
    contractLines.forEach((contractLine) => {
      // skip BS(Bussiness-Select) contracts
      if (contractLine.serviceType !== 'BS') {
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
  if (frequency === 'MON' || frequency === 'M') {
    return 'Monthly';
  }
  if (frequency === 'W') {
    return 'Weekly';
  }
  if (frequency === 'YR') {
    return 'Annually';
  }
  return 'Quarterly';
};

export const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;

export const getContractNumber = (contractId = 'N/A', lineNumber = 'N/A') =>
  `${contractId}-${lineNumber}`;

export const FireFetch = async (url, handleSuccess, handleError) => {
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
  axiosInstance.defaults.headers.common.Authorization = `Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJTdWJzY3JpcHRpb24tVUkiLCJleHAiOjE1Mzk4MTU5NDB9.VbKg9kwc_Z7S1B474VyeUw4aJjCy86aKiYIrv3kUHMjYzmhfV1fz-jnfQm9qqVDJHUw8ginR3sZH0fyeR30iLQ`;
  await axiosInstance
    .get()
    .then((response) => {
      handleSuccess(response);
    })
    .catch((error) => {
      handleError(error);
    });
};

export const FireGetItems = async (url, handleSuccess, handleError) => {
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
export const FireGetItemDetails = async (url, handleSuccess, handleError) => {
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

export const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

export const formatStatus = (status) => {
  if (status === 'A') {
    return 'Active';
  }
  if (status === 'C') {
    return 'Cancelled';
  }

  return status;
};

export const beautifyBillingHistoryResponse = (response, lineNumber) => {
  const records = response.data.billingHistoryResponse.billingHistoryRecord;
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
  qty = 1,
  sku = 315515,
  subscriptionIncentivePercent = '',
  subscriptionHasFreeDelivery = '',
  subscriptionWlrPercent = '',
  subscriptionId = ''
) => {
  return `/catalog/addSkuByButtonSetAction.do?addingToCartFromSubscriptionManager=true&qty=${qty}&sku=${sku}&subscriptionIncentivePercent=${subscriptionIncentivePercent}&subscriptionHasFreeDelivery=${subscriptionHasFreeDelivery}&subscriptionWlrPercent=${subscriptionWlrPercent}&subscriptionId=${subscriptionId}`;
};

export const createGetItemsURL = (
  RecordKey = '',
  Freq = '',
  DirFlag = 'F',
  StsCode = 'A',
  SortBy = 'D',
  isTest = true
) => {
  return `/orderhistory/subscriptionManager.do?RecordKey=${RecordKey}&Freq=${Freq}&DirFlag=${DirFlag}&StsCode=${StsCode}&SortBy=${SortBy}&request=LIST&isTest=${isTest}`;
};

export const createGetItemDetailsURL = (RecordKey = '', isTest = true) => {
  return `/orderhistory/subscriptionManager.do?RecordKey=${RecordKey}&request=INFO&isTest=${isTest}`;
};
