<a name="module_ez-pizza-api"></a>

## ez-pizza-api
ez-pizza-api Module


* [ez-pizza-api](#module_ez-pizza-api)
    * [~getStoresNearAddress(orderType, cityRegionOrPostalCode, [streetAddress])](#module_ez-pizza-api..getStoresNearAddress) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~getNearestDeliveryStore(cityRegionOrPostalCode, streetAddress)](#module_ez-pizza-api..getNearestDeliveryStore) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~getStoreInfo(storeId)](#module_ez-pizza-api..getStoreInfo) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~getStoreMenu(storeId)](#module_ez-pizza-api..getStoreMenu) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~getStoreCoupon(storeId, couponId)](#module_ez-pizza-api..getStoreCoupon) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~validateOrder(order)](#module_ez-pizza-api..validateOrder) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~priceOrder(order)](#module_ez-pizza-api..priceOrder) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~placeOrder(order, [payment])](#module_ez-pizza-api..placeOrder) ⇒ <code>Promise.&lt;object&gt;</code>
    * [~trackOrder(storeId, orderNumber)](#module_ez-pizza-api..trackOrder) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="module_ez-pizza-api..getStoresNearAddress"></a>

### ez-pizza-api~getStoresNearAddress(orderType, cityRegionOrPostalCode, [streetAddress]) ⇒ <code>Promise.&lt;object&gt;</code>
Get all stores near an address.

**Kind**: inner method of [<code>ez-pizza-api</code>](#module_ez-pizza-api)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The list of stores near the given address.  

| Param | Type | Description |
| --- | --- | --- |
| orderType | <code>string</code> | The type of order. Can be Delivery or Carryout. |
| cityRegionOrPostalCode | <code>string</code> | The postal code or City, State, Zip. |
| [streetAddress] | <code>string</code> | The house number and street name. |

<a name="module_ez-pizza-api..getNearestDeliveryStore"></a>

### ez-pizza-api~getNearestDeliveryStore(cityRegionOrPostalCode, streetAddress) ⇒ <code>Promise.&lt;object&gt;</code>
Get the nearest store that delivers to a given address.

**Kind**: inner method of [<code>ez-pizza-api</code>](#module_ez-pizza-api)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The nearest store that will deliver to the given address.  

| Param | Type | Description |
| --- | --- | --- |
| cityRegionOrPostalCode | <code>string</code> | The postal code or City, State, Zip. |
| streetAddress | <code>string</code> | The house number and street name. |

<a name="module_ez-pizza-api..getStoreInfo"></a>

### ez-pizza-api~getStoreInfo(storeId) ⇒ <code>Promise.&lt;object&gt;</code>
Get all info about a given store including: Hours, Wait Time etc.

**Kind**: inner method of [<code>ez-pizza-api</code>](#module_ez-pizza-api)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The info about the given store.  

| Param | Type | Description |
| --- | --- | --- |
| storeId | <code>string</code> | The StoreID of the given store (Can be found using getStoresNearAddress or getNearestDeliveryStore). |

<a name="module_ez-pizza-api..getStoreMenu"></a>

### ez-pizza-api~getStoreMenu(storeId) ⇒ <code>Promise.&lt;object&gt;</code>
Get all menu info for a given store including Product Codes, Options and Coupons

**Kind**: inner method of [<code>ez-pizza-api</code>](#module_ez-pizza-api)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The menu for the given store.  

| Param | Type | Description |
| --- | --- | --- |
| storeId | <code>string</code> | The StoreID of the given store (Can be found using getStoresNearAddress or getNearestDeliveryStore). |

<a name="module_ez-pizza-api..getStoreCoupon"></a>

### ez-pizza-api~getStoreCoupon(storeId, couponId) ⇒ <code>Promise.&lt;object&gt;</code>
Get detailed information about a given coupon.

**Kind**: inner method of [<code>ez-pizza-api</code>](#module_ez-pizza-api)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The info about the given coupon.  

| Param | Type | Description |
| --- | --- | --- |
| storeId | <code>string</code> | The StoreID of the given store (Can be found using getStoresNearAddress or getNearestDeliveryStore). |
| couponId | <code>string</code> | The CouponID of the given coupon (Can be found using getStoreMenu). |

<a name="module_ez-pizza-api..validateOrder"></a>

### ez-pizza-api~validateOrder(order) ⇒ <code>Promise.&lt;object&gt;</code>
Validate the information for a given Order.

**Kind**: inner method of [<code>ez-pizza-api</code>](#module_ez-pizza-api)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The validation response.  

| Param | Type | Description |
| --- | --- | --- |
| order | <code>object</code> | The order to validate. |

<a name="module_ez-pizza-api..priceOrder"></a>

### ez-pizza-api~priceOrder(order) ⇒ <code>Promise.&lt;object&gt;</code>
Get the total price for a given Order. (Including Coupon discounts and added Tax).
You should make sure your order is valid with validateOrder before calling priceOrder.

**Kind**: inner method of [<code>ez-pizza-api</code>](#module_ez-pizza-api)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The pricing response.  

| Param | Type | Description |
| --- | --- | --- |
| order | <code>object</code> | The order to price. |

<a name="module_ez-pizza-api..placeOrder"></a>

### ez-pizza-api~placeOrder(order, [payment]) ⇒ <code>Promise.&lt;object&gt;</code>
Place the order.
You will need to call priceOrder first to obtain the Amount to set on the payment object.
You can add a payment method and amount to the order.Order.Payments array OR pass the payment as a second argument.

**Kind**: inner method of [<code>ez-pizza-api</code>](#module_ez-pizza-api)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The order response including a completed order number (If the order goes through.).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| order | <code>object</code> |  | The order to price. |
| [payment] | <code>object</code> | <code></code> | The payment information. |

<a name="module_ez-pizza-api..trackOrder"></a>

### ez-pizza-api~trackOrder(storeId, orderNumber) ⇒ <code>Promise.&lt;object&gt;</code>
Track an order.

**Kind**: inner method of [<code>ez-pizza-api</code>](#module_ez-pizza-api)  
**Returns**: <code>Promise.&lt;object&gt;</code> - The tracking response.  

| Param | Type | Description |
| --- | --- | --- |
| storeId | <code>string</code> | The id of the store where the order was placed. |
| orderNumber | <code>string</code> | The id of the order number to track. Can be found on the StoreOrderID property of a placed order response. |

