import axios from 'axios'
import { subApiDomain } from 'libs/general-config'
import ENDPOINTS from 'libs/services/endpoints'
import HEADERS from 'libs/services/axios/headers'
import axiosObj from 'libs/services/axios'

export const subAxios = axios.create({
  baseURL: subApiDomain,
  headers: {
    ...HEADERS.common,
    Authorization:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTIzMzBjMGViYmYxMDAwODYzOTJmZCIsInJvbGVzIjpbIkFkbWluIl0sInBlcm1pc3Npb25zIjpbIndyaXRlOmNvbGxlY3Rpb24iLCJ3cml0ZTpyb2xlIiwicmVhZDpyb2xlIiwicmVhZDphdHRyaWJ1dGUtZ3JvdXAiLCJ3cml0ZTpza3VzZXQiLCJ3cml0ZTphdHRyaWJ1dGUtZ3JvdXAiLCJ3cml0ZTp1c2VyIiwid3JpdGU6YXR0cmlidXRlIiwicmVhZDpwZXJtaXNzaW9uIiwicmVhZDpza3VzZXQiLCJyZWFkOmF0dHJpYnV0ZSIsInJlYWQ6Y29sbGVjdGlvbiIsInJlYWQ6dXNlciJdLCJhY2NvdW50IjoiNWYzMjhiZjBiN2MxNTcwMDA3MTIzM2I5IiwiYWNjb3VudElkIjo4NzM5MzkyMjk0LCJ1c2VyVHlwZSI6eyJraW5kIjoiUkVHSVNURVJFRCJ9LCJpYXQiOjE2MTExNDEzNTgsImV4cCI6MTcxMTE0MzE1OH0.DPMYtQNpcPGryK1f5Pv5DM74yRMIF7Ytd-D-UmCv1Hu5ajp_y9QPMNR4vPDumJrleR7VB6lOmfJRwv2hop_Bag',
  },
})

// const priceIdAxios = axios.create({
//   baseURL: 'https://dev01-apigw.newbailey.fabric.zone',
//   headers: {
//     ...HEADERS.common,
//     Authorization:
//       'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTIzMzBjMGViYmYxMDAwODYzOTJmZCIsInJvbGVzIjpbIkFkbWluIl0sInBlcm1pc3Npb25zIjpbIndyaXRlOmNvbGxlY3Rpb24iLCJ3cml0ZTpyb2xlIiwicmVhZDpyb2xlIiwicmVhZDphdHRyaWJ1dGUtZ3JvdXAiLCJ3cml0ZTpza3VzZXQiLCJ3cml0ZTphdHRyaWJ1dGUtZ3JvdXAiLCJ3cml0ZTp1c2VyIiwid3JpdGU6YXR0cmlidXRlIiwicmVhZDpwZXJtaXNzaW9uIiwicmVhZDpza3VzZXQiLCJyZWFkOmF0dHJpYnV0ZSIsInJlYWQ6Y29sbGVjdGlvbiIsInJlYWQ6dXNlciJdLCJhY2NvdW50IjoiNWYzMjhiZjBiN2MxNTcwMDA3MTIzM2I5IiwiYWNjb3VudElkIjo4NzM5MzkyMjk0LCJ1c2VyVHlwZSI6eyJraW5kIjoiUkVHSVNURVJFRCJ9LCJpYXQiOjE2MTExNDEzNTgsImV4cCI6MTcxMTE0MzE1OH0.DPMYtQNpcPGryK1f5Pv5DM74yRMIF7Ytd-D-UmCv1Hu5ajp_y9QPMNR4vPDumJrleR7VB6lOmfJRwv2hop_Bag',
//   },
// })

export const getSubscribableItems = async (itemIds, count = 1) => {
  try {
    const response = await subAxios.post(ENDPOINTS.POST.subscribableItems, {
      itemIds,
    })
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getSubscribableItems(itemIds, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const getAllSubscriptions = async (accessToken, userId, count = 1) => {
  try {
    const response = await axios.get(
      ENDPOINTS.GET.getAllSubscriptions(userId),
      {
        baseURL: subApiDomain,
        headers: {
          ...HEADERS.common,
          Authorization: accessToken,
        },
      },
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getAllSubscriptions(accessToken, userId, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const editASubscription = async (subId, payload, count = 1) => {
  console.log('subId, payload')
  console.log(subId, payload)
  try {
    const response = await subAxios.put(
      ENDPOINTS.PUT.editSubscription(subId),
      payload,
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getAllSubscriptions(subId, payload, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const getASubscription = async (subId, count = 1) => {
  console.log('here 2')
  try {
    const response = await subAxios.get(ENDPOINTS.GET.getSubscription(subId))
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getAllSubscriptions(subId, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const getSubscriptionById = async (subId, count = 1) => {
  try {
    const response = await subAxios.get(
      ENDPOINTS.GET.getSubscriptionById(subId),
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getSubscriptionById(subId, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const getPriceByPriceId = async (payload, count = 1) => {
  try {
    const response = await axiosObj.common.post(
      ENDPOINTS.POST.pricesByPriceListId,
      {
        items: payload,
      },
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getPriceByPriceId(payload, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const updateSubscription = async (payload, subId, count = 1) => {
  try {
    const response = await subAxios.put(
      ENDPOINTS.PUT.updateSubscription(subId),
      JSON.stringify(payload),
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return updateSubscription(payload, subId, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const getUserPurchaseHitory = async (userId, authToken, count = 1) => {
  try {
    const response = await subAxios.get(
      ENDPOINTS.GET.getPurchaseHitoryByUserId(userId),
      {
        headers: {
          ...HEADERS.common,
          Authorization: authToken,
        },
      },
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getUserPurchaseHitory(userId, authToken, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const getOrderDetails = async (orderId, count = 1) => {
  try {
    const response = await subAxios.get(
      ENDPOINTS.GET.getOrderDetailsByOrderId(orderId),
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getOrderDetails(orderId, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const getDeliverySchedule = async (userId, authToken, count = 1) => {
  try {
    const response = await subAxios.get(
      ENDPOINTS.GET.getDeliverySchedule(userId),
      {
        headers: {
          ...HEADERS.common,
          Authorization: authToken,
        },
      },
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode >= 500 && count < 4) {
        return getDeliverySchedule(userId, authToken, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}
