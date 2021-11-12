import { apiDomain } from 'libs/general-config'

export const ENDPOINTS = {
  CREATE_USER: `${apiDomain}/api-commerceIdentity/user/local`,
  LOGIN_USER: `${apiDomain}/api-commerceIdentity/auth/local/login`,
  FORGOT_PASSWORD: `${apiDomain}/api-commerceIdentity/auth/local/reset/token`,
  ADD_TO_CART: `${apiDomain}/api-cart/cart/item`,
  GET_CART: `${apiDomain}/api-cart/cart`,
  GET_STOCK_BY_ITEMID: `${apiDomain}/api-inventory/inventory`,
  UPDATE_CART_ITEMS: cardId => `${apiDomain}/api-cart/cart/${cardId}/items`,
  MERGE_CART: `${apiDomain}/api-cart/cart/merge`,
  REMOVE_FROM_CART: (cartId, itemId) => {
    return `${apiDomain}/api-cart/cart/${cartId}/item/${itemId}`
  },
  VALIDATE_ADDRESS: `${apiDomain}/api-tax/address/validate`,
  CREATE_BILL_TO: cartId => `${apiDomain}/api-cart/bill-to/cart/${cartId}`,
  CREATE_SHIP_TO: cardId => `${apiDomain}/api-cart/ship-to/cart/${cardId}`,
  UPDATE_SHIP_TO: cartId => `${apiDomain}/api-cart/cart/${cartId}/ship-to`,
  GET_PARCEL_RATES: `${apiDomain}/ext-shipment/shipment/quotes`,
  GET_DELIVERY_RATES: `${apiDomain}/api-shipping/shipping/all`,
  CREATE_TAX: `${apiDomain}/api-tax/tax/create`,
  CHECKOUT: `${apiDomain}/api-order/checkout`,
  UPDATE_PASSWORD: `${apiDomain}/api-commerceIdentity/auth/change-password`,
  REFRESH_USER: `${apiDomain}/api-commerceIdentity/auth/local/refresh`,
  UPDATE_USER_DETAILS: userId =>
    `${apiDomain}/api-commerceIdentity/user/${userId}`,
  APPLY_PROMO: `${apiDomain}/api-cart/cart/apply-promo`,
  REMOVE_PROMO: `${apiDomain}/api-cart/cart/remove-promo`,
  SUBSCRIBE_NEWSLETTER: `https://dev01-apigw.juicycouture.fabric.zone/klaviyo/subscribe-to-newsletter`,
  ACCOUNT_CREATED: `${apiDomain}/klaviyo/account-created`,
  KLAVIYO_FORGOT_PASSWORD: `${apiDomain}/klaviyo/forgot-password`,
  VERIFY_TOKEN: `${apiDomain}/api-commerceIdentity/auth/token`,
  RESET_PASSWORD: `${apiDomain}/api-commerceIdentity/auth/password`,
  CREATE_ADDRESS: `${apiDomain}/api-commerceIdentity/user`,
  UPDATE_ADDRESS: `${apiDomain}/api-commerceIdentity/user`,
  DELETE_ADDRESS: `${apiDomain}/api-commerceIdentity/user`,
  DEFAULT_ADDRESS: `${apiDomain}/api-commerceIdentity/user`,
  UNSET_DEFAULT_ADDRESS: `${apiDomain}/api-commerceIdentity/user`,
  ALL_ADDRESSES: `${apiDomain}/api-commerceIdentity/user`,
  GET_ORDER: (offset, limit) =>
    `${apiDomain}/api-order/orders/user?offset=${offset}&limit=${limit}`,
  GET_ITEMS_BY_SKU: `${apiDomain}/api-item/item/sku`,
}
