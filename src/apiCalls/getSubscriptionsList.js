import { getTokenFromCookie, setTokenCookie } from '../components/utils';
import getJWToken from './getJWToken';

const customizeResponse = (response) => {
  try {
    const subscriptions = [];
    const customer = {
      ...response.getSubscriptionDetailsListResponse.customer
    };
    const {
      getSubscriptionDetailsListResponse: { contractList }
    } = response;
    // const contractList =
    //   response..contractList;
    const contract = contractList ? contractList.contract : [];
    contract.forEach((_contract) => {
      const header = { ..._contract.contractHeader };
      const contractLines = _contract.contractLines || [];
      contractLines.forEach((contractLine) => {
        subscriptions.push(
          Object.assign({ ...header, ...contractLine, ...customer })
        );
      });
    });
    return { ok: true, subscriptions };
  } catch (err) {
    return {
      ok: false,
      details: err
    };
  }
};

const getSubscriptionsList = () => {
  // get token from cookie
  const token = getTokenFromCookie();
  if (token.length > 0) {
    return window
      .fetch('http://localhost:3004/getSubscriptionDetailsListResponse', {
        method: 'get',
        headers: new window.Headers({ Authorization: `Bearer ${token}` })
      })
      .then((response) => {
        if (response.status === 401) {
          return {
            ok: false,
            unAuth: true,
            notFound: false,
            systemFailure: false
          };
        }
        if (response.status === 404) {
          return {
            ok: false,
            unAuth: false,
            notFound: true,
            systemFailure: false
          };
        }
        if (response.status === 200) {
          return response.json();
        }
        return {
          ok: false,
          unAuth: false,
          notFound: false,
          systemFailure: true
        };
      })
      .catch(() => ({
        ok: false,
        unAuth: false,
        notFound: false,
        systemFailure: true
      }))
      .then((response) => {
        if (response.ok !== false) {
          return customizeResponse(response);
        }
        return response;
      })
      .catch((e) => new Error(`error while getting sub list ${e}`));
  }
  return getJWToken().then((data) => {
    if (data && data.ok && data.token) {
      setTokenCookie('token', data.token, 540); // cookie name, cookie val, time in seconds
      return window
        .fetch('http://localhost:3004/getSubscriptionDetailsListResponse', {
          method: 'get',
          headers: new window.Headers({ Authorization: `Bearer ${data.token}` })
        })
        .then((response) => {
          if (response.status === 401) {
            return {
              ok: false,
              unAuth: true,
              notFound: false,
              systemFailure: false
            };
          }
          if (response.status === 404) {
            return {
              ok: false,
              unAuth: false,
              notFound: true,
              systemFailure: false
            };
          }
          if (response.status === 200) {
            return response.json();
          }
          return {
            ok: false,
            unAuth: false,
            notFound: false,
            systemFailure: true
          };
        })
        .catch(() => ({
          ok: false,
          unAuth: false,
          notFound: false,
          systemFailure: true
        }))
        .then((response) => {
          if (response.ok !== false) {
            return customizeResponse(response);
          }
          return response;
        })
        .catch((e) => new Error(`error while getting sub list ${e}`));
    }
    return {
      ok: false,
      tokenFailure: true
    };
  });
};

export default getSubscriptionsList;
