import axios from 'axios'
import HEADERS from 'libs/services/headers'
import { ENDPOINTS } from 'libs/endpoints'

// import { account, stage, site } from 'libs/general-config-juicy.js'

export const createUser = async (
  firstName,
  lastName,
  middleName,
  email,
  password,
) => {
  // Construct sign up payload to send to Fabric for user creation
  const payload = {
    user: {
      name: {
        first: firstName,
        middle: middleName,
        last: lastName,
      },
      email: email,
    },
    provider: {
      username: email,
      password: password,
    },
  }

  const response = await axios.post(ENDPOINTS.CREATE_USER, payload, {
    headers: {
      ...HEADERS.special,
    },
  })
  if (response.status === 200) {
    return response
  } else {
    throw response
  }
}

export const loginUser = async user => {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN_USER, user, {
      headers: {
        ...HEADERS.special,
      },
    })

    return { hasError: false, response: response }
  } catch (e) {
    return { hasError: true, response: { error: e.response.data.message } }
  }
}

export const resetPassword = async payload => {
  let response
  try {
    response = await axios.patch(
      ENDPOINTS.RESET_PASSWORD,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADERS.special,
        },
      },
    )
    response = { error: false, data: response.data, message: null }
  } catch (e) {
    response = {
      error: true,
      data: null,
      message: 'Unable to update password. Try again',
    }
  }
  return response
}

export const forgotPassword = async email => {
  const payload = { username: email }
  try {
    const response = await axios.patch(ENDPOINTS.FORGOT_PASSWORD, payload, {
      headers: {
        ...HEADERS.special,
      },
    })

    return { hasError: false, response: response }
  } catch (e) {
    return { hasError: true, response: { error: e.response.data.message } }
  }
}

export const verifyResetToken = async token => {
  const response = await axios.get(ENDPOINTS.VERIFY_TOKEN + '/' + token, {
    headers: {
      ...HEADERS.special,
    },
  })
  if (response.status === 200) {
    return response
  } else {
    throw response
  }
}

export const allAddresses = async (userId, authToken) => {
  console.log('userId abc', userId)
  console.log('authToken a  b c', authToken)
  let response
  try {
    response = await axios.get(ENDPOINTS.ALL_ADDRESSES + `/${userId}/address`, {
      headers: {
        ...HEADERS.common,
        Authorization: authToken,
      },
    })

    return { hasError: false, response: response }
  } catch (e) {
    console.log('error', e)
    return { hasError: true, response: { error: e.message } }
  }
}

export const createAddress = async (userId, payload, authToken) => {
  console.log('userId', userId)
  console.log('payload', payload)
  console.log('authToken', authToken)
  let response
  try {
    response = await axios.post(
      ENDPOINTS.CREATE_ADDRESS + `/${userId}/address`,
      payload,
      {
        headers: {
          ...HEADERS.common,
          Authorization: authToken,
        },
      },
    )

    return { hasError: false, response: response }
  } catch (e) {
    return { hasError: true, response: { error: e.message } }
  }
}

export const updateAddress = async (userId, payload, id, authToken) => {
  console.log('userId', userId)
  console.log('payload', payload)
  console.log('id', id)
  console.log('authToken', authToken)
  let response
  try {
    response = await axios.patch(
      ENDPOINTS.UPDATE_ADDRESS + `/${userId}/address/${id}`,
      payload,
      {
        headers: {
          ...HEADERS.common,
          Authorization: authToken,
        },
      },
    )

    return { hasError: false, response: response }
  } catch (e) {
    return { hasError: true, response: { error: e.message } }
  }
}

export const deleteAddress = async (userId, id, authToken) => {
  console.log('userId', userId)
  console.log('id', id)
  console.log('authToken', authToken)

  let response
  try {
    response = await axios.delete(
      ENDPOINTS.DELETE_ADDRESS + `/${userId}/address/${id}`,

      {
        headers: {
          ...HEADERS.common,
          Authorization: authToken,
        },
      },
    )

    return { hasError: false, response: response }
  } catch (e) {
    return { hasError: true, response: { error: e.message } }
  }
}

export const validateAddress = async payload => {
  console.log('validate address', payload)

  let response
  try {
    response = await axios.post(ENDPOINTS.VALIDATE_ADDRESS, payload, {
      headers: {
        'x-api-key': 'VNeMufCEY32hsZQq0HP9nlpC1U8kPqC1UuHasc9b',
        ...HEADERS.common,
      },
    })
    return { hasError: false, response: response }
  } catch (e) {
    return { hasError: true, response: { error: e.message } }
  }
}

export const defaultAddress = async (userId, addressId, authToken) => {
  console.log('defaultAddress userId', userId)
  console.log('defaultAddress addressId', addressId)
  console.log('defaultAddress authToken', authToken)
  let response
  try {
    response = await axios.post(
      ENDPOINTS.DEFAULT_ADDRESS + `/${userId}/address/${addressId}/set`,
      {},
      {
        headers: {
          ...HEADERS.common,
          Authorization: authToken,
        },
      },
    )
    return { hasError: false, response: response }
  } catch (e) {
    return { hasError: true, response: { error: e.message } }
  }
}

export const unsetDefaultAddress = async (userId, addressId, authToken) => {
  let response
  try {
    response = await axios.post(
      ENDPOINTS.UNSET_DEFAULT_ADDRESS + `/${userId}/address/unset`,
      {},
      {
        headers: {
          ...HEADERS.common,
          Authorization: authToken,
        },
      },
    )
    return { hasError: false, response: response }
  } catch (e) {
    return { hasError: true, response: { error: e.message } }
  }
}

export const refreshUser = async payload => {
  let response
  try {
    response = await axios.post(
      ENDPOINTS.REFRESH_USER,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADERS.special,
          Authorization: payload.refreshToken,
        },
      },
    )
    return { hasError: false, response: response }
  } catch (e) {
    return { hasError: true, response: { error: e.message } }
  }
}
