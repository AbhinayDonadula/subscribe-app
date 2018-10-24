import { getDefaultHeaders } from '../components/utils';

const updateItemSubscription = (localAPI, RecordKey, LstChgTS, action) => {
  let url = '';
  if (localAPI) {
    url = 'http://localhost:3004/getItems';
  } else {
    url = '/orderhistory/subscriptionManager.do';
  }
  const { name, value } = action;

  const data = {
    REQUEST: {
      NAME: 'SUBSCRIPTION',
      TYPE: 'MAINTAIN'
    },
    INPUT: {
      ...(RecordKey ? { RecordKey } : { RecordKey: 'N/A' }),
      ...(LstChgTS ? { LstChgTS } : { LstChgTS: 'N/A' }),
      ...(name === 'skip' ? { SkipNext: '1' } : undefined),
      ...(name === 'quantity' ? { QtyOrd: value } : undefined),
      ...(name === 'cancel' ? { Cancel: 'C' } : undefined),
      ...(name === 'freq' ? { Freq: value } : undefined),
      ...(name === 'email' ? { Email: value } : undefined),
      ...(name === 'rewards' ? { WLRNumber: value } : undefined)
    }
  };

  const request = new window.Request(url, {
    headers: getDefaultHeaders(),
    method: localAPI ? 'GET' : 'POST',
    credentials: 'same-origin',
    body: localAPI ? undefined : JSON.stringify(data)
  });

  //   api call
  return window
    .fetch(request)
    .then((resp) => resp.json())
    .then((resp) => resp)
    .catch(() => {});
};

export default updateItemSubscription;
