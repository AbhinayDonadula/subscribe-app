import { getDefaultHeaders } from '../components/utils';

const getItemSubscriptions = (localAPI, statusCode, sortBy, dirFlag = 'T') => {
  let url = '';
  let StsCode = 'A';
  let SortBy = 'D';

  if (localAPI) {
    if (statusCode === 'Products-Cancelled' || statusCode === 'Cancelled') {
      url = 'http://localhost:3004/getCancelledItems';
    } else if (statusCode === 'Products-Active' || statusCode === 'Products') {
      url = 'http://localhost:3004/getActiveItems';
    } else {
      url = 'http://localhost:3004/getItems';
    }
  } else {
    url = '/orderhistory/subscriptionManager.do';
  }

  if (statusCode === 'Products-Cancelled' || statusCode === 'Cancelled') {
    StsCode = 'C';
  }

  if (sortBy === 'Delivery Frequency') {
    SortBy = 'F';
  }

  const data = {
    REQUEST: {
      NAME: 'SUBSCRIPTION',
      TYPE: 'LIST'
    },
    INPUT: {
      StsCode,
      DirFlag: dirFlag,
      PONo: '',
      SortBy,
      ItemNum: '',
      Freq: '',
      CostCenter: '',
      ShipTo: '',
      BundleFlag: '',
      RecordKey: ''
    }
  };

  const request = new window.Request(url, {
    headers: getDefaultHeaders(),
    method: localAPI ? 'GET' : 'POST',
    credentials: 'same-origin',
    body: localAPI ? undefined : JSON.stringify(data)
  });

  // api call
  return window
    .fetch(request)
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch(() => {});
};

export default getItemSubscriptions;
