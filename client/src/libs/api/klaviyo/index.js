import axios from 'axios'
import HEADER from 'libs/services/headers.js'
import { ENDPOINTS } from 'libs/endpoints'

export const subscribeNewsletter = async payload => {
  let response
  try {
    response = await axios.post(
      ENDPOINTS.SUBSCRIBE_NEWSLETTER,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADER.tempJuicy,
        },
      },
    )
    if (response.data) {
      response = {
        error: false,
        data: response.data,
        message: 'Subscribed Successfully',
      }
    } else {
      response = {
        error: true,
        data: null,
        message: 'Failed to subscribe. Try again',
      }
    }
  } catch (e) {
    //   console.log(e.message);
    response = {
      error: true,
      data: null,
      message: 'Failed to subscribe. Try again',
    }
  }

  return response
}

export const accountCreated = async payload => {
  let response
  try {
    response = await axios.post(
      ENDPOINTS.ACCOUNT_CREATED,
      { ...payload },
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    if (response.data) {
      response = {
        error: false,
        data: response.data,
        message: 'Subscribed Successfully',
      }
    } else {
      response = {
        error: true,
        data: null,
        message: 'Failed to subscribe. Try again',
      }
    }
  } catch (e) {
    // console.log(e.message);
    response = {
      error: true,
      data: null,
      message: 'Failed to subscribe. Try again',
    }
  }

  // console.log("klaviyo account res:", response);
  return response
}

export const klaviyoforgotPassword = async payload => {
  let response
  try {
    response = await axios.post(
      ENDPOINTS.KLAVIYO_FORGOT_PASSWORD,
      { ...payload },
      {
        headers: {
          ...HEADER.common,
        },
      },
    )
    if (response.data) {
      response = {
        error: false,
        data: response.data,
        message: 'Email with klaviyo key and user token received successfully',
      }
    } else {
      response = {
        error: true,
        data: null,
        message: 'Email with klaviyo key and user token is failed...',
      }
    }
  } catch (e) {
    // console.log(e.message);
    console.log('klaviyo response in catch')
    response = {
      error: true,
      data: null,
      message: 'Email with klaviyo key and user token is failed',
    }
  }

  // console.log("klaviyo account res:", response);
  return response
}
