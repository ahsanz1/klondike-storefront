const ENDPOINTS = {
  GET: {
    globalComponents: '/api-xpm/global-component/live',
    page: url => `/api-xpm/page/live?url=${url}`,
    productBySKU: sku => `/api-item/item/product/${sku}`,
    getItemsBySkus: '/api-item/item/sku',
    getUser: userId => `/user/${userId}`,
    getCart: `/api-cart/cart`,
    getCartPayment: cartId => `/api-payment/payment/${cartId}`,
    getNavigation:
      process.env.NAVIGATION_DATA_API ||
      'https://abchome-config.s3.amazonaws.com/navigationqa.json',
    getNavigationItems:
      process.env.NAVIGATION_ITEMS_API ||
      'https://uat01.abchome.fabric.zone/api-xpm/menu/items',
    // getNavigationLinks: url =>
    //   process.env.NAVIGATION_LINKS_API
    //     ? `${process.env.NAVIGATION_LINKS_API}${url}`
    //     : `https://uat01.abchome.fabric.zone/api-xpm/menu/get-item-by-url?url=${url}`,
  },
  POST: {
    addToCart: '/api-cart/cart/item',
    getInventory: '/api-inventory/inventory',
    getOfferByItemIds: '/api-price/offer/get-by-itemIds',
    createTax: '/api-tax/tax/create',
    createShipTo: cartId => `/api-cart/ship-to/cart/${cartId}`,
    createBillTo: cartId => `/api-cart/bill-to/cart/${cartId}`,
    checkout: '/api-order/checkout-v4',
    login: '/auth/local/login',
    signUp: '/user/local',
    refreshToken: '/auth/local/refresh',
    resetPassRequest: '/auth/local/reset/token',
    validateAddress: '/api-tax/address/validate',
    stripePayment: '/api-payment/payment',
    stripePaymentMethod: '/ext-stripe/payment-method',
    stripePaymentIntent: '/ext-stripe/payment-intent',
    confirmPaymentIntent: paymentIntent =>
      `/ext-stripe/payment-intent/confirm/${paymentIntent}`,
    removePromo: '/api-cart/cart/remove-promo',
    applyPromo: '/api-cart/cart/apply-promo',
  },
  PUT: {},
  PATCH: {
    updateShipToApi: cartId => `/api-cart/cart/${cartId}/ship-to`,
    removeFromCart: (cartId, itemId) => {
      return `/api-cart/cart/${cartId}/item/${itemId}`
    },
    updateCartItems: cartId => `/api-cart/cart/${cartId}/items`,
    mergeCart: `/api-cart/cart/merge`,
  },
  DELETE: {
    removePayment: `/api-payment/payment`,
  },
}

export default ENDPOINTS
