import axios from 'axios'
import ENDPOINTS from 'libs/services/endpoints'
import { orderApiKey, apiDomain } from 'libs/general-config'
import HEADERS from 'libs/services/axios/headers'
import { getItem, saveItem } from '../localStorage/localStorage'

export const refreshToken = async token => {
  try {
    const response = await axios.post(
      ENDPOINTS.POST.refreshToken,
      JSON.stringify({ refreshToken: token }),
      {
        headers: {
          ...HEADERS.common,
        },
      },
    )

    saveItem('x-sd-user', JSON.stringify(response.data))

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

export const getOrdersByUser = async (
  accessToken,
  page = 0,
  pageSize = 500,
  count = 1,
) => {
  try {
    const response = await axios.get(
      ENDPOINTS.GET.historyByUser(page, pageSize),
      {
        baseURL: apiDomain,
        headers: {
          ...HEADERS.common,
          'x-api-key': orderApiKey,
          Authorization: accessToken,
        },
      },
    )

    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    let user = JSON.parse(getItem('x-sd-user'))
    let res = await refreshToken(user.refreshToken)

    if (res.hasError === false && count < 4) {
      return getOrdersByUser(
        res?.response?.data?.accessToken,
        page,
        pageSize,
        ++count,
      )
    }

    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const getOrdersByQuery = async (accessToken, payload, count = 1) => {
  try {
    const response = await axios.post(
      apiDomain + ENDPOINTS.POST.historyByQuery,
      JSON.stringify(payload),
      {
        headers: {
          ...HEADERS.common,
          'x-api-key': 'LfTYwnqk5frPWLcn8h946K31XpQDzRH87JYYP877', // orderApiKey,
          Authorization: accessToken,
        },
      },
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    console.log('api call')
    console.log(e)
    console.log(e.response)
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return getOrdersByQuery(accessToken, payload, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}

export const getSingle = async (
  orderId,
  accessToken,
  page = 0,
  pageSize = 10,
  count = 1,
) => {
  try {
    const response = await axios.get(
      ENDPOINTS.GET.singleOrderHistoryByUser(orderId),
      {
        baseURL: apiDomain,
        headers: {
          ...HEADERS.common,
          'x-api-key': orderApiKey,
          Authorization:
            accessToken ||
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjI3Njk3OTQyOTliMDAwNzE0MGEyOSIsInJvbGVzIjpbeyJpZCI6IjVlMTk2MjUwNWVmNjEyMDAwODlmM2IyMiJ9XSwicGVybWlzc2lvbnMiOltdLCJhY2NvdW50aWQiOiI2MDIyNzY5Njk0Mjk5YjAwMDcxNDBhMjgiLCJhY2NvdW50SWQiOm51bGwsInVzZXJUeXBlIjp7ImtpbmQiOiJSRUdJU1RFUkVEIn0sImlhdCI6MTYxNzYwMzU1MywiZXhwIjoxNjE3NjA1MzUzfQ.SJO7ac5T9sWhTdO40aBgP-n17SiifVl2lathDE_zFDwTD7xpkcYyDbZT-ybo7F_ye14QdmZEqrRvHjlKSfLB0A',
        },
      },
    )
    return {
      hasError: false,
      response: response,
    }
  } catch (e) {
    console.log('api call')
    console.log(e)
    console.log(e.response)
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return getOrdersByUser(orderId, accessToken, page, pageSize, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}
