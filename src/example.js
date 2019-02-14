const ezPizzaAPI = require('./index');

(async () => {
  // Get a full list of stores near an address
  const storesResult = ezPizzaAPI
    .getStoresNearAddress(ezPizzaAPI.orderTypes.Carryout, 'Denver, CO, 80202');

  // Get basic info about nearest delivery store to address
  const storeResult = await ezPizzaAPI
    .getNearestDeliveryStore('Denver, CO, 80202', '1280 Grant St');

  // Get full info about specified store
  const storeInfo = await ezPizzaAPI
    .getStoreInfo(storeResult.StoreID);

  // Get full menu for the specified store
  const storeMenu = await ezPizzaAPI
    .getStoreMenu(storeResult.StoreID);

  // Get info for the specified store and coupon
  // Coupon ID found in the above menu request
  const coupon = await ezPizzaAPI
    .getStoreCoupon(storeResult.StoreID, '9193');

  // Create an Order with the following properties
  const order = {
    Order: {
      Address: { // <- Update this
        Street: '123 Sesame St.',
        City: 'New York',
        Region: 'NY',
        PostalCode: '10001',
        Type: 'House',
        StreetName: 'Sesame St',
        StreetNumber: '123',
      },
      // Specify any coupons here
      Coupons: [{
        Code: '9193',
        Qty: 1,
        ID: 2, // Specify your own IDs, increment if more than 1 specified
      }],
      Email: 'coolguy@gmail.com', // <- Update this
      FirstName: 'Cool', // <- Update this
      LastName: 'Guy', // <- Update this
      LanguageCode: 'en',
      OrderChannel: 'OLO',
      OrderMethod: 'Web',
      OrderTaker: null,
      Payments: [],
      Phone: '1234567890', // <- Update this
      PhonePrefix: '1', // <- Update this
      // An array of products. Find the corresponding code in the menu response.
      Products: [{
        Code: '12THIN',
        Qty: 1,
        isNew: true,
        Options: {
          X: {
            '1/1': '1',
          },
          C: {
            '1/1': '1',
          },
          Sa: {
            '1/1': '1',
          },
          J: {
            '1/2': '1',
          },
          Z: {
            '2/2': '1',
          },
        },
      }, {
        Code: 'MARBRWNE',
        Qty: 1,
        isNew: true,
        Options: {},
      }, {
        Code: 'B16PBIT',
        Options: {},
        Qty: 1,
        isNew: true,
      }],
      ServiceMethod: 'Delivery', // <- Update this can be Delivery or Carryout
      SourceOrganizationURI: 'order.dominos.com',
      StoreID: storeResult.StoreID,
      Tags: {},
      Version: '1.0',
      NoCombine: true,
      Partners: {},
      OrderInfoCollection: [],
    },
  };

  const orderValid = await ezPizzaAPI.validateOrder(order);
  order.Order.OrderID = orderValid.Order.OrderID;
  const pricedOrder = await ezPizzaAPI.priceOrder(order);

  const Amount = pricedOrder.Order.Amounts.Customer;
  order.Order.Payments.push({
    Amount,
    Type: 'CreditCard',
    Number: '​4242424242424242',
    CardType: 'VISA',
    Expiration: '0424',
    SecurityCode: '424',
    PostalCode: '80202',
  });

  const placedOrder = await ezPizzaAPI.placeOrder(order);
  // For a succesful order, look for:
  // StoreOrderID
  // EmailHash
  // StatusItems: [ { Code: 'Success' } ] }
  console.log(placedOrder);

  // Getting the orderID may vary. Validate by looking at the placedOrder response
  const orderID = placedOrder.Order.StoreOrderID.split('#')[1];
  const orderStatus = await ezPizzaAPI.trackOrder(storeResult.StoreID, orderID);
  console.log(orderStatus);
})();
