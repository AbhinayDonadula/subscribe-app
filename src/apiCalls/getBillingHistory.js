import Axios from "axios";

const getBillingHistory = async token => {
  const axiosInstance = Axios.create({
    baseURL:
      "https://staging.odplabs.com/services/subscription-billing-history/eaiapi/subscriptions/getBillingHistory?contractNumber=42320"
  });

  axiosInstance.defaults.headers.common.Authorization = token;

  //   axiosInstance.defaults.headers.common.Authorization =
  //     "Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJTdWJzY3JpcHRpb24tVUkiLCJleHAiOjE1Mzg1NzA4ODR9.aP9M1YS1xGirk4P5Rc-wckZmE3ywkmsIJBtcqRMxf2TEamKjhape4osepQbaQ5eN_2_BwSChalIxdymkpQHlCQ";

  let response = "";
  try {
    response = axiosInstance.get();
  } catch (e) {
    response = e;
  }

  return response;
};

export default getBillingHistory;
