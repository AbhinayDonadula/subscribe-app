import { getDefaultHeaders } from '../components/utils';

const getItemSubscriptions = (
  localAPI,
  statusCode = 'A',
  sortBy = 'D',
  dirFlag = 'T'
) => {
  let url = '';
  let StsCode = '';

  if (localAPI) {
    url = 'http://localhost:3004/getItems';
  } else {
    url = '/orderhistory/subscriptionManager.do';
  }

  if (statusCode === 'Active') {
    StsCode = 'A';
  }
  if (statusCode === 'Cancelled') {
    StsCode = 'C';
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
      SortBy: sortBy,
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
