/**
 * ez-pizza-api Module
 * @module ez-pizza-api
 */

const fetch = require('node-fetch');

const orderTypes = {
  Delivery: 'Delivery',
  Carryout: 'Carryout',
};

const API_URL = 'https://order.dominos.com/power';
const TRACKER_URL = 'https://tracker.dominos.com/tracker-presentation-service/v2/orders/stores';

/**
 * Get all stores near an address.
 * @param {string} orderType - The type of order. Can be Delivery or Carryout.
 * @param {string} cityRegionOrPostalCode - The postal code or City, State, Zip.
 * @param {string} [streetAddress] - The house number and street name.
 * @return {Promise<object>} The list of stores near the given address.
 */
async function getStoresNearAddress(
  orderType,
  cityRegionOrPostalCode = '',
  streetAddress = '',
) {
  const response = await fetch(`${API_URL}/store-locator?type=${orderType}&c=${cityRegionOrPostalCode}&s=${streetAddress}`);
  return response.json();
}

/**
 * Get the nearest store that delivers to a given address.
 * @param {string} cityRegionOrPostalCode - The postal code or City, State, Zip.
 * @param {string} streetAddress - The house number and street name.
 * @return {Promise<object>} The nearest store that will deliver to the given address.
 */
async function getNearestDeliveryStore(
  cityRegionOrPostalCode = '',
  streetAddress = '',
) {
  const storesResult = await getStoresNearAddress(
    orderTypes.Delivery,
    cityRegionOrPostalCode,
    streetAddress,
  );
  return storesResult.Stores.find(store => store.IsDeliveryStore);
}

/**
 * Get all info about a given store including: Hours, Wait Time etc.
 * @param {string} storeId - The StoreID of the given store (Can be found using getStoresNearAddress or getNearestDeliveryStore).
 * @return {Promise<object>} The info about the given store.
 */
async function getStoreInfo(storeId) {
  const response = await fetch(`${API_URL}/store/${storeId}/profile`);
  return response.json();
}

/**
 * Get all menu info for a given store including Product Codes, Options and Coupons
 * @param {string} storeId - The StoreID of the given store (Can be found using getStoresNearAddress or getNearestDeliveryStore).
 * @return {Promise<object>} The menu for the given store.
 */
async function getStoreMenu(storeId) {
  const response = await fetch(`${API_URL}/store/${storeId}/menu?lang=en&structured=true`);
  return response.json();
}

/**
 * Get detailed information about a given coupon.
 * @param {string} storeId - The StoreID of the given store (Can be found using getStoresNearAddress or getNearestDeliveryStore).
 * @param {string} couponId - The CouponID of the given coupon (Can be found using getStoreMenu).
 * @return {Promise<object>} The info about the given coupon.
 */
async function getStoreCoupon(storeId, couponId) {
  const response = await fetch(`${API_URL}/store/${storeId}/coupon/${couponId}?lang=en`);
  return response.json();
}

async function postOrder(order, endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(order),
    method: 'POST',
  });
  return response.json();
}

/**
 * Validate the information for a given Order.
 * @param {object} order - The order to validate.
 * @return {Promise<object>} The validation response.
 */
async function validateOrder(order) {
  return postOrder(order, 'validate-order');
}

/**
 * Get the total price for a given Order. (Including Coupon discounts and added Tax).
 * You should make sure your order is valid with validateOrder before calling priceOrder.
 * @param {object} order - The order to price.
 * @return {Promise<object>} The pricing response.
 */
async function priceOrder(order) {
  return postOrder(order, 'price-order');
}

/**
 * Place the order.
 * You will need to call priceOrder first to obtain the Amount to set on the payment object.
 * You can add a payment method and amount to the order.Order.Payments array OR pass the payment as a second argument.
 * @param {object} order - The order to price.
 * @param {object} [payment] - The payment information.
 * @return {Promise<object>} The order response including a completed order number (If the order goes through.).
 */
async function placeOrder(order, payment = null) {
  if (payment) {
    order.Order.Payments.push(payment);
  }
  return postOrder(order, 'place-order');
}

/**
 * Track an order.
 * @param {string} storeId - The id of the store where the order was placed.
 * @param {string} orderNumber - The id of the order number to track. Can be found on the StoreOrderID property of a placed order response.
 * @return {Promise<object>} The tracking response.
 */
async function trackOrder(storeId, orderNumber) {
  const response = await fetch(`${TRACKER_URL}/${storeId}/orderkeys/${orderNumber}`, {
    headers: {
      'DPZ-Market': 'UNITED_STATES',
      'DPZ-Language': 'en',
    },
  });
  return response.json();
}

module.exports = {
  orderTypes,
  getStoresNearAddress,
  getNearestDeliveryStore,
  getStoreInfo,
  getStoreMenu,
  getStoreCoupon,
  validateOrder,
  priceOrder,
  placeOrder,
  trackOrder,
};
