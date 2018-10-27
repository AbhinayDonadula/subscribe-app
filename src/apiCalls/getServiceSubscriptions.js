import { getDefaultHeaders } from '../components/utils';

const getServiceSubscriptions = (localAPI) => {
  let url = '';

  if (localAPI) {
    url = 'http://localhost:3004/getServicesFromNewAPI';
  } else {
    url = '/orderhistory/subscriptionManager.do';
  }

  const data = {
    REQUEST: {
      NAME: 'SUBSCRIPTION',
      TYPE: 'SERVICE_LIST'
    },
    INPUT: {}
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

export default getServiceSubscriptions;
