import axios from 'libs/services/axios'
import ENDPOINTS from 'libs/services/endpoints'

export const getPriceByPriceListId = async (items, count = 1) => {
  try {
    const response = await axios.common.post(
      ENDPOINTS.POST.pricesByPriceListId,
      { items },
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return getPriceByPriceListId(items, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}
