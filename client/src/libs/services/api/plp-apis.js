import { AXIOS } from 'libs/modules'
import HEADER from 'libs/modules/axios/headers'

const { axiosObj, ENDPOINTS } = AXIOS

export const getProductBySKU = async (sku, count = 1) => {
  // console.log(`getProductBySKU call = count = ${count} => `);
  try {
    const response = await axiosObj.common.get(ENDPOINTS.GET.productBySKU(sku))
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      // console.log('getProductBySKU ERROR => ', { error: e.message, statusCode });
      if (statusCode === 500 && count < 4) {
        return getProductBySKU(sku, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}
export const getItemInStockStatus = async itemId => {
  let response

  const payload = {
    items: [{ itemId: itemId, quantity: 1 }],
    channelId: '12',
  }
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.getInventory,
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
