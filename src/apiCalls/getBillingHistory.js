import Axios from 'axios';

const getBillingHistory = async (token) => {
  const axiosInstance = Axios.create({
    baseURL:
      'https://staging.odplabs.com/services/subscription-billing-history/eaiapi/subscriptions/getBillingHistory?contractNumber=42320'
  });

  axiosInstance.defaults.headers.common.Authorization = token;

  let response = '';
  try {
    response = axiosInstance.get();
  } catch (e) {
    response = e;
  }

  return response;
};

export default getBillingHistory;
