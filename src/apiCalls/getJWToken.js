import Axios from 'axios';

const getJWToken = async () => {
  // const headers = new window.Headers({
  //   "Content-Type": "application/json",
  //   Accept: "application/json"
  // });

  // const endPoint = "/json/jwtSubscription.do";

  // const request = new window.Request(endPoint, {
  //   headers,
  //   method: "GET",
  //   credentials: "same-origin"
  // });

  // return window
  //   .fetch(request)
  //   .then(response => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     return response;
  //   })
  //   .then(jsonResponse => ({
  //     token: jsonResponse.token,
  //     ok: true
  //   }))
  //   .catch(err => ({
  //     error: err,
  //     ok: false
  //   }));

  const axiosJWTInstance = Axios.create({
    baseURL: '/json/jwtSubscription.do'
  });
  let token = '';
  axiosJWTInstance.defaults.headers.common.credentials = 'same-origin';
  try {
    const response = await axiosJWTInstance.get();
    token = response;
    // console.log('success', response);
  } catch (error) {
    console.error('error', error);
  }
  return token;
};

export default getJWToken;
