import axios from 'axios'
import HEADER from 'libs/modules/axios/headers'
import { AXIOS } from 'libs/modules'

const { axiosObj, ENDPOINTS } = AXIOS

export const getItemsBySkus = async (payload, count = 1) => {
  let response
  const skuIds = {
    skus: payload,
  }
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.GET.getItemsBySkus,
      JSON.stringify(skuIds),
    )
    response = { error: false, data: response.data, message: null }
  } catch (e) {
    // console.log(e.message);
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return getItemsBySkus(payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: 'Unable to get items. Try again',
    }
  }
  return response
}

export const getItemInStockStatus = async itemId => {
  let response

  const payload = {
    items: [{ itemId: itemId, quantity: 1 }],
    channelId: '12',
  }

  try {
    response = await axios.post(
      ENDPOINTS.GET_STOCK_BY_ITEMID,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    response = { error: false, data: response.data, message: null }
  } catch (e) {
    response = {
      error: true,
      data: null,
      message: 'Unable to get stock. Try again',
    }
  }

  return response
}
