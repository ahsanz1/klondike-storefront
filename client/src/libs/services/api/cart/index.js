import axios from 'axios'

import HEADER from 'libs/modules/axios/headers'
import { AXIOS } from 'libs/modules'

const { axiosObj, ENDPOINTS } = AXIOS

export const addToCart = async (cartData, count = 1) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.addToCart,
      JSON.stringify(cartData),
    )
    response = { error: false, data: response.data, message: null }
  } catch (e) {
    let code = ''
    let message = 'Unable to add item in cart. Try again'

    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return addToCart(cartData, count + 1)
      }
      const response = JSON.parse(e.request.response)
      code = response.code
      if (code === 'NOT_IN_STOCK') message = 'This Item is out of stock!'
    }

    response = { error: true, data: null, message, code }
  }
  return response
}

export const getCartByCartId = async cartId => {
  let response
  try {
    response = await axiosObj.common.get(ENDPOINTS.GET.getCart, {
      params: {
        cartId: cartId,
      },
    })
    response = { error: false, data: response.data, message: null }
  } catch (e) {
    // console.log(e.message);
    // console.log(e.response);
    response = {
      error: true,
      data: e.response.data,
      message: 'Unable to load cart. Please refresh your page.',
    }
  }

  return response
}

export const getCartByUserId = async (authToken, count = 1) => {
  let response
  try {
    response = await axiosObj.common.get(ENDPOINTS.GET.getCart, {
      params: {
        userAuthToken: authToken,
      },
    })
    response = { error: false, data: response.data, message: null }
  } catch (e) {
    // console.log(e.message);
    console.log('error', e.response)
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return getCartByUserId(authToken, count + 1)
      }
    }
    response = {
      error: true,
      data: e.response.data,
      message: 'Unable to load cart. Please refresh your page.',
    }
  }

  return response
}

export const addShippingWithLineItems = async (cartId, payload) => {
  let response
  try {
    response = await axiosObj.common.patch(
      ENDPOINTS.PATCH.linkItemsWithShipping(cartId),
      JSON.stringify(payload),
      {
        params: {
          userAuthToken: null,
        },
      },
    )

    response = { error: false, data: response.data, message: null }
  } catch (e) {
    response = {
      error: true,
      data: null,
      message: JSON.stringify(e),
    }
  }
  return response
}

export const addPickupAndShippingWithLineItems = async (cartId, payload) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.PATCH.linkItemsWithPickupandShipping(cartId),
      JSON.stringify(payload),
    )
  } catch (e) {
    response = {
      error: true,
      data: null,
      message: JSON.stringify(e),
    }
  }
  return response
}

export const removeItemFromCart = async (cartId, lineItemId) => {
  let response
  try {
    response = await axiosObj.common.patch(
      ENDPOINTS.PATCH.removeFromCart(cartId, lineItemId),
      JSON.stringify({}),
      {
        params: {
          userAuthToken: null,
        },
        // headers: {
        //   ...HEADER.common,
        // },
      },
    )

    response = { error: false, data: response.data, message: null }
  } catch (e) {
    // console.log(e.message);
    response = {
      error: true,
      data: null,
      message: 'Unable to remove item. Try again',
    }
  }

  return response
}

export const updateCartApi = async (cartId, updateCartItemPayload) => {
  let response
  try {
    response = await axiosObj.common.patch(
      ENDPOINTS.PATCH.updateCartItems(cartId),
      JSON.stringify(updateCartItemPayload),
    )
    response = { error: false, data: response.data, message: null }
  } catch (e) {
    console.log(e.message)
    response = {
      error: true,
      data: null,
      message: 'Unable to update product. Try again',
      code: '',
    }
  }
  return response
}

export const removePromo = async payload => {
  let response

  try {
    response = await axios.patch(
      ENDPOINTS.REMOVE_PROMO,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    response = { error: false, data: response.data, message: null }
  } catch (e) {
    // console.log(e.message);
    // console.log(e.response);
    response = {
      error: true,
      data: null,
      message: 'Unable to remove promo. Try again.',
    }
  }

  return response
}

export const mergeCart = async (guestCartId, loggedInUserAccessToken) => {
  let response
  const mergeCartPayload = {
    guestCartId: guestCartId,
  }

  try {
    response = await axiosObj.common.patch(
      ENDPOINTS.PATCH.mergeCart,
      JSON.stringify(mergeCartPayload),
      {
        headers: {
          ...HEADER.common,
          Authorization: loggedInUserAccessToken,
        },
      },
    )
    response = { error: false, data: response.data, message: null }
  } catch (e) {
    // console.log(e.message);
    // console.log(e.response);
    response = {
      error: true,
      data: null,
      message: 'Unable to merge cart. Try again.',
    }
  }

  return response
}
