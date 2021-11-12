import axios from 'axios'
import { ENDPOINTS } from 'libs/endpoints'
import HEADER from 'libs/services/headers.js'

export const getOrder = async (userAuthToken, offset = 0, limit = 10) => {
  let data = {}
  try {
    const response = await axios.get(ENDPOINTS.GET_ORDER(offset, limit), {
      headers: {
        Authorization: userAuthToken,
        ...HEADER.common,
      },
    })

    data = {
      hasError: false,
      ...response,
    }
  } catch (e) {
    data = {
      hasError: true,
      response: e,
    }
  }

  return data
}
