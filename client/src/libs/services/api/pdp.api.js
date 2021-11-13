import axios from 'libs/services/axios'
import ENDPOINTS from 'libs/services/endpoints'

export const getProductBySKU = async (sku, count = 1) => {
  try {
    const response = await axios.common.get(ENDPOINTS.GET.productBySKU(sku))
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
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

export const resetPasswordEmail = async email => {
  try {
    console.log('emailll', email)
    const response = await axios.common.patch(
      ENDPOINTS.PATCH.resetPassword,
      email,
    )

    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    return {
      hasError: true,
      error: e,
    }
  }
}

export const addProductToCart = async (payload, count = 1) => {
  console.log('from api', payload)
  try {
    const response = await axios.common.post(ENDPOINTS.POST.addToCart, payload)
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return addProductToCart(payload, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const retreiveProductAttributes = async (sku, count = 1) => {
  try {
    const response = await axios.common.get(
      ENDPOINTS.GET.retreiveProductAttributes(sku),
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
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

export const getItemInStockStatus = async (itemIds, count = 1) => {
  let response

  let itemIdsWithQty = []

  itemIds.forEach(itemId => {
    itemIdsWithQty.push({
      itemId,
      quantity: 1,
    })
  })

  const payload = {
    items: itemIdsWithQty,
    channelId: '12',
  }

  try {
    response = await axios.common.post(
      ENDPOINTS.POST.getInventory,
      JSON.stringify(payload),
    )
    response = { hasError: false, response: response }
  } catch (e) {
    if (e.response && e.response.status) {
      // const statusCode = e.response.status
      if (count < 4) {
        return getItemInStockStatus(itemIds, count + 1)
      }
    }
    response = {
      hasError: true,
      response: { error: 'Unable to get stock. Try again' },
    }
  }

  return response
}

export const getItemsInPricing = async (itemIds, count = 1) => {
  let response

  const payload = {
    itemIds: itemIds,
  }
  try {
    response = await axios.common.post(
      ENDPOINTS.POST.getPricing,
      JSON.stringify(payload),
    )
    response = { hasError: false, response: response }
  } catch (e) {
    if (e.response && e.response.status) {
      // const statusCode = e.response.status
      if (count < 4) {
        return getItemsInPricing(itemIds, count + 1)
      }
    }
    response = {
      hasError: true,
      response: { error: 'Unable to get pricing. Try again' },
    }
  }

  return response
}

export const getProductByIds = async (itemIds, count = 1) => {
  try {
    const response = await axios.common.post(
      ENDPOINTS.POST.productsByItemsById,
      { itemIds },
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getProductByIds(itemIds, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}
