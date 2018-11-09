// // import { getTokenFromCookie, setTokenCookie } from '../utils/cookieUtils';
// import getJWToken from './getJWToken';

// const cancelSubscriptionAPI = (
//   contractNumber = '',
//   lineNumber = '',
//   cancelDate = '',
//   reasonCode = ''
// ) => {
//   const cancelEndPoint = '/api/cancelSubscription';
//   const customerId = '12312312'; // accountID
//   // let endPoint = [];
//   // if (PathProvider.cancelSubscriptionUrl) {
//   //   endPoint = PathProvider.cancelSubscriptionUrl.split('?');
//   // }
//   // let cancelEndPoint = '';
//   // let customerId = '';
//   // if (endPoint && endPoint.length > 0) {
//   //   cancelEndPoint = endPoint[0];
//   //   customerId = endPoint[1].split('=')[1];
//   // }

//   //   {
//   //     "cancelContractRequest":{
//   //        "transactionHeader":{
//   //           "consumer":{
//   //              "consumerName":"WWW",
//   //              "consumerTransactionID":"2018-11-07T20:01:47-06:00"
//   //           },
//   //           "timeReceived":"2018-11-07T20:01:47-06:00"
//   //        },
//   //        "contract":{
//   //           "customerId":"02688034",
//   //           "contractNumber":"60379",
//   //           "lineNumber":"1",
//   //           "cancelDate":"2018-12-04",
//   //           "reasonCode":"OD_TERMINATED_QUALITY_DID_NOT"
//   //        }
//   //     }
//   //  }

//   // "https://staging.odplabs.com/services/subscription-management-async-broker/eaiapi/subscriptions/submitCancelSubscription?customerId=02688034"
//   //   const postBody = {
//   //     cancelContractRequest: {
//   //       transactionHeader: {
//   //         consumer: {
//   //           consumerName: 'WWW',
//   //           consumerTransactionID: moment().format()
//   //         },
//   //         timeReceived: moment().format()
//   //       },
//   //       contract: {
//   //         customerId,
//   //         contractNumber,
//   //         lineNumber,
//   //         cancelDate,
//   //         reasonCode
//   //       }
//   //     }
//   //   };

//   const headers = new window.Headers({
//     'Content-Type': 'application/json',
//     Accept: 'application/json'
//   });

//   const request = new window.Request(cancelEndPoint, {
//     headers,
//     method: 'POST',
//     credentials: 'same-origin'
//     // body: JSON.stringify(postBody)
//   });

//   // get token from cookie
//   const token = '';
//   if (token.length > 0) {
//     request.headers.append('Authorization', `Bearer ${token}`);
//     return window
//       .fetch(request)
//       .then((response) => {
//         if (response.status === 401) {
//           return {
//             ok: false,
//             unAuth: true,
//             notFound: false,
//             systemFailure: false
//           };
//         }
//         if (response.status === 404) {
//           return {
//             ok: false,
//             unAuth: false,
//             notFound: true,
//             systemFailure: false
//           };
//         }
//         if (response.status === 200) {
//           return response.json();
//         }
//         return {
//           ok: false,
//           unAuth: false,
//           notFound: false,
//           systemFailure: true
//         };
//       })
//       .catch(() => {
//         return {
//           ok: false,
//           unAuth: false,
//           notFound: false,
//           systemFailure: true
//         };
//       })
//       .then((response) => {
//         if (response.ok !== false) {
//           return { ok: true, response };
//         }
//         return response;
//       })
//       .catch((e) => new Error(`error while cancelling subscription ${e}`));
//   }

//   return getJWToken().then((data) => {
//     if (data && data.ok && data.token) {
//       request.headers.append('Authorization', `Bearer ${data.token}`);
//       //   setTokenCookie('token', data.token, 540); // cookie name, cookie val, time in seconds
//       return window
//         .fetch(request)
//         .then((response) => {
//           if (response.status === 401) {
//             return {
//               ok: false,
//               unAuth: true,
//               notFound: false,
//               systemFailure: false
//             };
//           }
//           if (response.status === 404) {
//             return {
//               ok: false,
//               unAuth: false,
//               notFound: true,
//               systemFailure: false
//             };
//           }
//           if (response.status === 200) {
//             return response.json();
//           }
//           return {
//             ok: false,
//             unAuth: false,
//             notFound: false,
//             systemFailure: true
//           };
//         })
//         .catch(() => {
//           return {
//             ok: false,
//             unAuth: false,
//             notFound: false,
//             systemFailure: true
//           };
//         })
//         .then((response) => {
//           if (response.ok !== false) {
//             return response;
//           }
//           return response;
//         })
//         .catch((e) => new Error(`error while cancelling subscription ${e}`));
//     }
//     return {
//       ok: false,
//       tokenFailure: true
//     };
//   });
// };

// export default cancelSubscriptionAPI;
