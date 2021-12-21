import axios from 'libs/services/axios'
import ENDPOINTS from 'libs/services/endpoints'

export const getAttributesbyId = async itemIds => {
  try {
    const response = await axios.common.post(ENDPOINTS.POST.getAttributes, {
      itemIds,
    })
    return {
      hasError: false,
      response: response && response.data && response.data,
    }
  } catch (e) {
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const addAttributeToCartItem = async (
  cartId,
  lineItemId,
  attributeId,
  attributeValue,
) => {
  try {
    const response = await axios.common.patch(
      ENDPOINTS.PATCH.addAttributeToCartItem(cartId),
      [
        {
          lineItemId,
          attributeId,
          attributeValue,
        },
      ],
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}
