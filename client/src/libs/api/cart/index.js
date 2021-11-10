import axios from 'axios'
import { ENDPOINTS } from 'libs/endpoints'
import HEADER from 'libs/services/headers.js'

export const getCartByUserId = async (userId, authToken) => {
  //   let response
  //   try {
  const response = await axios.get(ENDPOINTS.GET_CART, {
    params: {
      userAuthToken: userId,
    },
    headers: {
      ...HEADER.common,
    },
  })

  return response
  //   if (response.status === 200) {
  //     return response
  //   } else {
  //     throw response
  //   }
  //     response = { error: false, data: response.data, message: null }
  //   } catch (e) {
  //     console.log(e.message)
  // console.log(e.response);
  // response = {
  //       error: true,
  //       data: e.response.data,
  //       message: 'Unable to load cart. Please refresh your page.',
  //     }
  //   }

  //   return response
}

export const getItemsBySkus = async skus => {
  //   let response
  //   try {
  const response = await axios.post(ENDPOINTS.GET_ITEMS_BY_SKU, skus, {
    headers: {
      ...HEADER.common,
    },
  })

  return response
}
