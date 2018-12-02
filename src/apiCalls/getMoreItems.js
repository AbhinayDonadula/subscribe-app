import { getDefaultHeaders } from '../components/utils';

const getMoreItems = (localAPI, statusCode, sortBy) => {
  let url = '';
  let StsCode = 'A';
  let SortBy = 'D';

  if (localAPI) {
    url = 'http://localhost:3004/getMoreItems';
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
      DirFlag: 'F',
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

export default getMoreItems;
