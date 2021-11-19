const ENDPOINTS = {
  GET: {
    globalComponents: '/api-xpm/global-component/live',
    page: url => `/api-xpm/page/live?url=${url}`,
    productBySKU: sku => `/api-item/item/product/${sku}`,
    getUser: userId => `/user/${userId}`,
    retreiveProductAttributes: sku =>
      `/api-product/v1/product/attribute?itemId=${sku}`,
    getNavigation:
      process.env.NAVIGATION_DATA_API ||
      'https://abchome-config.s3.amazonaws.com/navigationqa.json',
    getNavigationItems:
      process.env.NAVIGATION_ITEMS_API ||
      'https://uat01.abchome.fabric.zone/api-xpm/menu/items',
    getInstagramPosts: (accessToken, instaId) =>
      `https://graph.facebook.com/v9.0/${instaId}/media?fields=id,caption,media_type,media_url,thumbnail_ur,timestamp,username,permalink&access_token=${accessToken}&limit=10`,
    getInstaUser: (accessToken, instaId) =>
      `https://graph.facebook.com/v3.2/${instaId}?fields=name,profile_picture_url&access_token=${accessToken}`,
    historyByUser: (page, pageSize) =>
      `/api-order/orders/user?offset=${page}&limit=${pageSize}`,
    singleOrderHistoryByUser: orderId => `api-order/orders/${orderId}`,
    // getNavigationLinks: url =>
    //   process.env.NAVIGATION_LINKS_API
    //     ? `${process.env.NAVIGATION_LINKS_API}${url}`
    //     : `https://uat01.abchome.fabric.zone/api-xpm/menu/get-item-by-url?url=${url}`,
    getAllSubscriptions: userId =>
      `/subscriptions?customerID=${userId}&pageSize=50&pageNumber=1`,
    getSubscription: subId => `/subscriptions/${subId}`,
    getSubscriptionById: subId => `/subscriptions/${subId}`,
    getPricebyPriceId: '/api-price/v2/price/get',
    getPurchaseHitoryByUserId: userId => `/orders/get-by-customer/${userId}`,
    getOrderDetailsByOrderId: orderId => `/orders/${orderId}`,
    getDeliverySchedule: userId =>
      `/orders/scheduled/get-by-customerId/${userId}`,
    getUserDetails: userId => `/api-commerceIdentity/user/${userId}`,
  },
  POST: {
    addToCart: '/api-cart/cart/item',
    historyByQuery: `/api-order/orders/query`,
    getInventory: '/api-inventory/inventory',
    getPricing: '/api-price/offer/get-by-itemIds',
    getOfferByItemIds: '/api-price/offer/get-by-itemIds',
    createTax: '/api-tax/tax/create',
    createShipTo: cartId => `/api-cart/ship-to/cart/${cartId}`,
    checkout: '/api-order/checkout',
    login: '/auth/local/login',
    signUp: '/user/local',
    refreshToken: '/auth/local/refresh',
    resetPassRequest: '/auth/local/reset/token',
    subscribableItems: '/plans/get-by-itemIds',
    productsByItemsById: `/api-item/item/generic/item-ids`,
    pricesByPriceListId: `/api-price/v2/price/get`,
    getAttributes: `/api-configuration/attribute/get-by-item-ids`,
  },
  PUT: {
    editSubscription: subId => `/subscriptions/${subId}`,
    updateSubscription: subId => `/subscriptions/${subId}`,
  },
  PATCH: {
    resetPassword: '/api-commerceIdentity/auth/local/reset',
    updateShipTo: cartId => `/api-cart/cart/${cartId}/ship-to`,
    AddAttributeToCart: cartId => `/api-cart/cart/${cartId}/item/attribute`,
  },
  DELETE: {},
}

export default ENDPOINTS
