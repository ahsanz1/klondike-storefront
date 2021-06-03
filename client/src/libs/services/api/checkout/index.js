import axios from 'axios'

import HEADER from 'libs/modules/axios/headers'
import { AXIOS } from 'libs/modules'

import { subApiDomain } from 'libs/general-config'

const { axiosObj, ENDPOINTS } = AXIOS

const csvJSON = async csv => {
  let lines = csv.split('\n')
  let result = []
  let headers = lines[0].split(',')
  for (let i = 1; i < lines.length; i++) {
    let obj = {}
    let currentline = lines[i].split(',')
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return result
}

export const getDeliveryShippingRates = async () => {
  let response = await axios.get(
    'https://abchome-mt-config.s3.amazonaws.com/shippingRate-Delivery.csv',
  )
  const convertToJson = await csvJSON(response.data)
  return convertToJson
}

export const getShippingRates = async () => {
  let response = await axios.get(
    'https://abchome-mt-config.s3.amazonaws.com/shippingRate.csv',
  )
  const convertToJson = await csvJSON(response.data)
  return convertToJson
}

export const validateAddress = async (payload, count = 1) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.validateAddress,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return validateAddress(payload, count + 1)
      }
    }
    return e
    // response = {
    //   error: true,
    //   data: null,
    //   message: e.response.data.message,
    //   code: e.response.data.code,
    // }
  }
  // return response
}

export const createShipTo = async (cartId, payload, count = 1) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.createShipTo(cartId),
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return createShipTo(cartId, payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: e.response.data.message,
      code: e.response.data.code,
    }
  }
  return response
}

export const createBillTo = async (cartId, payload, count = 1) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.createBillTo(cartId),
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return createBillTo(cartId, payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: e.response,
      code: e.request.response,
    }
  }
  return response
}

export const checkout = async (payload, count = 1) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.checkout,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return checkout(payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: e.response.data.message,
      code: '',
    }
  }
  return response
}

export const updateShipTo = async (cartId, payload, count = 1) => {
  let response
  try {
    response = await axiosObj.common.patch(
      ENDPOINTS.PATCH.updateShipToApi(cartId),
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return updateShipTo(cartId, payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: '',
      code: '',
    }
  }
  return response
}

export const createTax = async (payload, count = 1) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.createTax,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return createTax(payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: '',
      code: '',
    }
  }
  return response
}

export const stripePayment = async (payload, count = 1) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.stripePayment,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return stripePayment(payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: '',
      code: e.request.response,
    }
  }
  return response
}

export const createStripePaymentMethod = async (payload, count = 1) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.stripePaymentMethod,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
          'x-api-key': process.env.STRIPE_API_KEY,
        },
      },
    )
    // axiosObj.common.post(
    //   ENDPOINTS.POST.stripePaymentMethod,
    //   JSON.stringify(payload),
    //   {
    //     headers: {
    //       ...HEADER.common,
    //       'x-api-key': 'pwdaffp4gh6jxN6ynxBu16H0odigmPod2tLgfLJa',
    //     },
    //   },
    // )
    return response
  } catch (e) {
    console.log(e)
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return createStripePaymentMethod(payload, count + 1)
      }
    }
    // return e
    response = {
      error: true,
      data: null,
      message: e.message,
      code: JSON.parse(e.request.response),
    }
  }
  return response
}

export const createStripePaymentIntent = async (payload, count = 1) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.stripePaymentIntent,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
          'x-api-key': process.env.STRIPE_API_KEY,
        },
      },
    )
    // response = await axiosObj.common.post(
    //   ENDPOINTS.POST.stripePaymentIntent,
    //   JSON.stringify(payload),
    //   {
    //     headers: {
    //       ...HEADER.common,
    //       'x-api-key': 'pwdaffp4gh6jxN6ynxBu16H0odigmPod2tLgfLJa',
    //     },
    //   },
    // )
    return response
  } catch (e) {
    console.log(e)
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return createStripePaymentIntent(payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: e.message,
      code: e.request.response,
    }
    return response
  }
}

export const confirmStripePaymentMethodIntent = async (
  payload,
  stripePaymentIntent,
  count = 1,
) => {
  let response
  try {
    response = await axiosObj.common.post(
      ENDPOINTS.POST.confirmPaymentIntent(stripePaymentIntent),
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.common,
          'x-api-key': process.env.STRIPE_API_KEY,
        },
      },
    )
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return confirmStripePaymentMethodIntent(
          payload,
          stripePaymentIntent,
          (count = 1),
        )
      }
    }
    response = {
      error: true,
      data: null,
      message: e.message,
      code: e.request.response,
    }
    return response
  }
}

export const confirmCartPayment = async (cartId, count = 1) => {
  let response
  try {
    response = await axiosObj.common.get(ENDPOINTS.GET.getCartPayment(cartId), {
      headers: {
        ...HEADER.common,
        'x-api-key': process.env.STRIPE_API_KEY,
      },
    })
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return confirmCartPayment(cartId, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: e.message,
      code: e.code,
    }
    return response
  }
}

export const deleteCartPayment = async (payload, count = 1) => {
  console.log(payload, 'delete api payload')
  let response
  try {
    response = await axios({
      method: 'delete',
      url: 'https://dev01-apigw.iqbarsandbox.fabric.zone/api-payment/payment',
      data: payload,
      headers: {
        ...HEADER.common,
        'x-api-key': process.env.STRIPE_API_KEY,
      },
    })

    // await axiosObj.common.delete(
    //   ENDPOINTS.DELETE.removePayment,
    //   JSON.stringify(payload),
    //   {
    //     headers: {
    //       ...HEADER.common,
    //       'x-api-key': process.env.STRIPE_API_KEY,
    //     },
    //   },
    // )
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 400 && count < 4) {
        return deleteCartPayment(payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: e.message,
      code: e.code,
    }
    return response
  }
}

export const applyPromo = async payload => {
  let response

  try {
    response = await axiosObj.common.patch(
      ENDPOINTS.POST.applyPromo,
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
      message: 'Unable to apply promo. Try again.',
    }
  }

  return response
}

export const removePromo = async payload => {
  let response

  try {
    response = await axios.patch(
      ENDPOINTS.POST.removePromo,
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

export const getCustomerStripeId = async (payload, count = 1) => {
  let response
  try {
    response = await axios({
      method: 'post',
      url: `${subApiDomain}/stripe/customer/get`,
      data: payload,
      headers: {
        ...HEADER.common,
        'x-api-key': process.env.STRIPE_API_KEY,
      },
    })
    return response
  } catch (e) {
    if (e.request.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return getCustomerStripeId(payload, count + 1)
      }
    }
    response = {
      error: true,
      data: null,
      message: e.message,
      code: JSON.parse(e.request.response),
    }
    return response
  }
}
