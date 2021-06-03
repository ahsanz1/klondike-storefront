import axios from 'axios'

import { getAuthToken } from 'libs/utils/oauth-token'

// import { RefreshToken } from 'libs/utils/refresh-token'

export function initAxiosInterceptors () {
  axios.interceptors.request.use(config => {
    let shouldAddToken = false
    for (const keyword of API_KEYWORDS) {
      if (config.url.includes(keyword)) {
        shouldAddToken = true
        break
      }
    }
    if (shouldAddToken) {
      const token = getAuthToken()
      config.headers.Authorization = token
    }

    return config
  })

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401 || error.response.status === 403) {
        let shouldLogin = false
        for (const keyword of API_KEYWORDS) {
          if (error.config.url != null && error.config.url.includes(keyword)) {
            shouldLogin = true
            break
          }
        }

        if (shouldLogin) {
          // alert(`TODO: REDIRECT TO SSO`)
          // RefreshToken()
          // Logout()
          // TODO: REDIRECT TO SSO
        }
      }
      throw error
      // return error
    },
  )
}
