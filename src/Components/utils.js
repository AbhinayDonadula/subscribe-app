import axios from "axios";
import datefns from "date-fns";

export const setTokenCookie = (name, value) => {
  const date = new Date();
  date.setTime(date.getTime() + 540 * 1000);
  const expires = `; expires= ${date.toGMTString()}`;
  document.cookie = `${name} = ${value}${expires}; path=/`;
};

export const getTokenFromCookie = () =>
  document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

export const formatDate = date => {
  const jsDate = new Date(date);
  const year = jsDate.getFullYear();
  return jsDate
    .toDateString()
    .slice(4)
    .replace(` ${year}`, `, ${year}`);
};

export const beautifyGetSubListResponse = response => {
  const subscriptions = [];
  const { contractList } = response;
  const contract = contractList ? contractList.contract : [];
  contract.forEach((_contract, index) => {
    const header = { ..._contract.contractHeader };
    const contractLines = _contract.contractLines || [];
    contractLines.forEach(contractLine => {
      // use below to skip cancelled
      // (contractLine.status === "Active" ||
      //   contractLine.status === "Under amendment" ||
      //   contractLine.status === "Pending signature" ||
      //   contractLine.status === "Pending approval" ||
      //   contractLine.status === "Sent for signature" ||
      //   contractLine.status === "Hold")

      // skip BS(Bussiness-Select) contracts
      if (contractLine.serviceType !== "BS") {
        subscriptions.push(
          Object.assign({
            ...header,
            ...contractLine,
            ...response.customer,
            reactKeyId: index + 1,
            sortDate: datefns.format(contractLine.startDate, "MM/DD/YYYY")
          })
        );
      }
    });
  });
  return subscriptions;
};

export const getSubscriptionImg = (sku, isSubCancelled) => {
  let imgUrl = "https://officedepot.scene7.com/is/image/officedepot/sku-image-SKU".replace(
    "SKU",
    sku || "9204711"
  );
  if (isSubCancelled) {
    imgUrl = `${imgUrl}?op_colorize=cccccc`;
  }

  return imgUrl;
};

export const getImageBySKU = itemNum => {
  if (itemNum === "5628175" || itemNum === "932208") {
    return "http://officedepot.scene7.com/is/image/officedepot/Logo";
  }

  if (itemNum === "112724" || itemNum === "360948") {
    return "http://officedepot.scene7.com/is/image/officedepot/SEO";
  }

  if (itemNum === "285557" || itemNum === "269756") {
    return "http://officedepot.scene7.com/is/image/officedepot/Social%20Media";
  }

  if (itemNum === "267807") {
    return "http://officedepot.scene7.com/is/image/officedepot/Website";
  }

  if (
    itemNum === "714164" ||
    itemNum === "885450" ||
    itemNum === "320227" ||
    itemNum === "869265" ||
    itemNum === "717496" ||
    itemNum === "354434"
  ) {
    return "http://officedepot.scene7.com/is/image/officedepot/PPC";
  }

  return "http://officedepot.scene7.com/is/image/officedepot/Logo";
};

export const getFrequency = frequency => {
  if (frequency === "MON" || frequency === "M") {
    return "Monthly";
  }
  if (frequency === "W") {
    return "Weekly";
  }
  if (frequency === "YR") {
    return "Annually";
  }
  return "Quarterly";
};

export const formatPrice = price => `$${parseFloat(price).toFixed(2)}`;

export const getContractNumber = (contractId = "N/A", lineNumber = "N/A") =>
  `${contractId}-${lineNumber}`;

export const FireFetch = async (url, handleSuccess, handleError) => {
  const axiosInstance = axios.create({ baseURL: url });
  // const tokenFromCookie = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
  //   "$1"
  // );
  // if (!tokenFromCookie.length) {
  //   const axiosJWTInstance = axios.create({
  //     baseURL: "/json/jwtSubscription.do"
  //   });
  //   // axiosJWTInstance.defaults.headers.common.credentials = "same-origin";
  //   try {
  //     const response = await axiosJWTInstance.get();
  //     axiosInstance.defaults.headers.common.Authorization = response;
  //   } catch (error) {
  //     const { response } = JSON.parse(JSON.stringify(error));
  //     const isJWTfailed = true;

  //     handleError(response, isJWTfailed);
  //   }
  // } else {
  //   axiosInstance.defaults.headers.common.Authorization = tokenFromCookie;
  // }

  axiosInstance.defaults.headers.common.Authorization =
    "Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFM1MTIiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJTdWJzY3JpcHRpb24tVUkiLCJleHAiOjE1MzkwMzMwNzZ9.Jw2AhFMMcRTt1FztxLK7deyFMEdUmzKIyfKlbf7n11qzJjW3VySWVLbWE1Tf1KLXvwsruraUFtXz-z0GvdmJXw";

  // api call
  try {
    const response = await axiosInstance.get();
    handleSuccess(response);
    return response;
  } catch (error) {
    const { response } = JSON.parse(JSON.stringify(error));
    const isJWTfailed = false;
    if (!response) {
      handleError({ status: 401 }, isJWTfailed);
    } else {
      handleError(response, isJWTfailed);
    }
    return error;
  }
};

export const getStatusFromError = err => {
  const {
    response: { status }
  } = JSON.parse(JSON.stringify(err));
  return status;
};

export const formatPhoneNumber = phoneNumberString => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return null;
};

export const formatStatus = status => {
  if (status === "A") {
    return "Active";
  }
  if (status === "C") {
    return "Cancelled";
  }

  return status;
};
