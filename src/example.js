const ezPizzaAPI = require('./index');

(async () => {
  const cityRegionOrPostalCode = 'Denver, CO, 80202';
  const streetAddress = '1280 Grant St';

  // Get a full list of stores near an address
  const storesResult = await ezPizzaAPI
    .getStoresNearAddress(ezPizzaAPI.orderTypes.Carryout, cityRegionOrPostalCode);

  // Get basic info about nearest delivery store to address
  const storeResult = await ezPizzaAPI
    .getNearestDeliveryStore(cityRegionOrPostalCode, streetAddress);

  // Get full info about specified store
  const storeInfo = await ezPizzaAPI
    .getStoreInfo(storeResult.StoreID);

  // Get full menu for the specified store
  const storeMenu = await ezPizzaAPI
    .getStoreMenu(storeResult.StoreID);

  const couponId = '9193';
  // Get info for the specified store and coupon
  // Coupon ID found in the above menu request
  const coupon = await ezPizzaAPI
    .getStoreCoupon(storeResult.StoreID, couponId);

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
      // Specify any coupons here, leave empty if not using a coupon
      Coupons: [{
        Code: couponId,
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
      // An array of products. Find the corresponding code and available options in the menu response.
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
      ServiceMethod: ezPizzaAPI.orderTypes.Delivery, // <- Update this can be Delivery or Carryout
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
  order.Order.OrderID = orderValid.Order.OrderID; // get the generated orderID from the response

  const pricedOrder = await ezPizzaAPI.priceOrder(order);
  const Amount = pricedOrder.Order.Amounts.Customer; // get total amount for order

  // specify the amount and credit card info OR see how to use cash on delivery below
  order.Order.Payments.push({
    Amount,
    Type: 'CreditCard',
    Number: '​4242424242424242',
    CardType: 'VISA',
    Expiration: '0424',
    SecurityCode: '424',
    PostalCode: '80202',
  });

  // OR
  // specify the amount type as Cash
  order.Order.Payments.push({
    Amount,
    Type: 'Cash', // <- Pay cash on delivery
  });

  const placedOrder = await ezPizzaAPI.placeOrder(order);
  // For a succesful order, look for:
  // StoreOrderID
  // EmailHash
  // StatusItems: [ { Code: 'Success' } ] }

  // Be sure to check your email before trying again.
  // Sometimes this has a failure status but the order still goes through...
  console.log(placedOrder);

  // Getting the orderID may vary. Validate by looking at the placedOrder response
  const orderID = placedOrder.Order.StoreOrderID.split('#')[1]; // <- This might change depending on store
  const orderStatus = await ezPizzaAPI.trackOrder(storeResult.StoreID, orderID);
  console.log(orderStatus);
})();
