import axios from 'axios'
import ENDPOINTS from 'libs/services/endpoints'
import { orderApiKey, apiDomain } from 'libs/general-config'
import HEADERS from 'libs/services/axios/headers'

// export const ordersAxios = axios.create({
//   baseURL: apiDomain,
//   headers: {
//     ...HEADERS.common,
//     'x-api-key': orderApiKey,
//     Authorization:
//       'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTIzMzBjMGViYmYxMDAwODYzOTJmZCIsInJvbGVzIjpbIkFkbWluIl0sInBlcm1pc3Npb25zIjpbIndyaXRlOmNvbGxlY3Rpb24iLCJ3cml0ZTpyb2xlIiwicmVhZDpyb2xlIiwicmVhZDphdHRyaWJ1dGUtZ3JvdXAiLCJ3cml0ZTpza3VzZXQiLCJ3cml0ZTphdHRyaWJ1dGUtZ3JvdXAiLCJ3cml0ZTp1c2VyIiwid3JpdGU6YXR0cmlidXRlIiwicmVhZDpwZXJtaXNzaW9uIiwicmVhZDpza3VzZXQiLCJyZWFkOmF0dHJpYnV0ZSIsInJlYWQ6Y29sbGVjdGlvbiIsInJlYWQ6dXNlciJdLCJhY2NvdW50IjoiNWYzMjhiZjBiN2MxNTcwMDA3MTIzM2I5IiwiYWNjb3VudElkIjo4NzM5MzkyMjk0LCJ1c2VyVHlwZSI6eyJraW5kIjoiUkVHSVNURVJFRCJ9LCJpYXQiOjE2MTExNDEzNTgsImV4cCI6MTcxMTE0MzE1OH0.DPMYtQNpcPGryK1f5Pv5DM74yRMIF7Ytd-D-UmCv1Hu5ajp_y9QPMNR4vPDumJrleR7VB6lOmfJRwv2hop_Bag',
//   },
// })

export const getOrdersByUser = async (
  accessToken,
  page = 0,
  pageSize = 10,
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
    console.log('api call')
    console.log(e)
    console.log(e.response)
    if (e.response && e.response.status) {
      const statusCode = e.response.status
      if (statusCode === 500 && count < 4) {
        return getOrdersByUser(accessToken, page, pageSize, count + 1)
      }
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
