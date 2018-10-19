import {
  createGetImageInfoBySkuURL,
  getDefaultHeaders
} from '../components/utils';

// calling endpoint to get image info for all items
const getImageInfoBySku = (localAPI, itemSkus) => {
  const request = new window.Request(
    createGetImageInfoBySkuURL(localAPI, itemSkus),
    {
      headers: getDefaultHeaders(),
      method: 'GET',
      credentials: 'same-origin'
    }
  );
  // api call
  return window
    .fetch(request)
    .then((resp) => resp.json())
    .then(({ skuPriceList }) => skuPriceList)
    .catch(() => {});
};

export default getImageInfoBySku;
