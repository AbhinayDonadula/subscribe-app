import { getDefaultHeaders } from '../components/utils';

const getEmailForDownloadAgent = (localAPI, contractId) => {
  let url = '';
  const data = {
    REQUEST: {
      NAME: 'SUBSCRIPTION',
      TYPE: 'SERVICE_DOWNLOAD'
    },
    INPUT: { contractId }
  };

  if (localAPI) {
    url = 'http://localhost:3004/billingHistory';
  } else {
    url = '/orderhistory/subscriptionManager.do';
  }

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

export default getEmailForDownloadAgent;
