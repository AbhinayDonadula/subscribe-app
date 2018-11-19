import datefns from 'date-fns';
import { getDefaultHeaders } from '../components/utils';

const cancelServiceSubscription = (
  localAPI,
  contractNumber,
  lineNumber,
  cancelDate,
  reasonCode
) => {
  let url = '';
  const customerId = document.querySelector("input[name='accountId']").value;

  const data = {
    REQUEST: {
      NAME: 'SUBSCRIPTION',
      TYPE: 'SERVICE_LIST'
    },
    INPUT: {
      cancelContractRequest: {
        transactionHeader: {
          consumer: {
            consumerName: 'WWW',
            consumerTransactionID: datefns.format(new Date(), 'MM/DD/YYYY')
          },
          timeReceived: datefns.format(new Date(), 'MM/DD/YYYY')
        },
        contract: {
          customerId,
          contractNumber,
          lineNumber,
          cancelDate,
          reasonCode
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

export default cancelServiceSubscription;
