import ENDPOINTS from 'libs/services/endpoints'
import HEADER from 'libs/modules/axios/headers'
import { AXIOS } from 'libs/modules'

const { axiosObj } = AXIOS

export const getUserDetails = async (token, userId, count = 1) => {
  try {
    const response = await axiosObj.common.get(
      ENDPOINTS.GET.getUserDetails(userId),
      {
        headers: {
          ...HEADER.common,
          Authorization: token,
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
      if (statusCode === 500 && count < 4) {
        return getUserDetails(token, userId, count + 1)
      }
    }
    return {
      hasError: true,
      response: { error: e.message },
    }
  }
}
