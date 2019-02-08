import datefns from 'date-fns';
import { getDefaultHeaders } from '../components/utils';

const cancelAutoRenewal = (localAPI, contractNumber, lineNumber) => {
  let url = '';
  const customerId = document.querySelector("input[name='accountId']").value;

  const data = {
    REQUEST: {
      NAME: 'SUBSCRIPTION',
      TYPE: 'SERVICE_AUTO_RENEW'
    },
    INPUT: {
      autoRenewalContractRequest: {
        transactionHeader: {
          consumer: {
            consumerName: 'WWW',
            altTrackingIDs: null,
            moniker: null,
            consumerTransactionID: datefns.format(new Date())
          },
          timeReceived: datefns.format(new Date()),
          transactionId: null
        },
        contract: {
          customerId,
          contractNumber,
          lineNumber,
          autoRenewal: 'DNR'
        }
      }
    }
  };

  if (localAPI) {
    url = 'http://localhost:3004/cancel';
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

export default cancelAutoRenewal;
