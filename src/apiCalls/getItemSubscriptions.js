import { getDefaultHeaders } from '../components/utils';

const getItemSubscriptions = async (
  url,
  statusCode = 'A',
  sortBy = 'D',
  dirFlag = 'T'
) => {
  const data = {
    REQUEST: {
      NAME: 'SUBSCRIPTION',
      TYPE: 'LIST'
    },
    INPUT: {
      StsCode: statusCode,
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
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  // api call
  return window
    .fetch(request)
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch(() => {});

  // const result = await window.fetch(request);
  // return result;
};

export default getItemSubscriptions;
