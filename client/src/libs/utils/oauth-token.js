// import { get } from 'js-cookie'

let authToken = null

function getAuthTokenWithoutCache () {
  const userInfo = JSON.parse(localStorage.getItem('x-sd-user'))
  authToken = userInfo ? userInfo.accessToken : null

  // if (process.env.NODE_ENV !== 'production') {
  //   const userInfo = JSON.parse(localStorage.getItem('x-sd-user'))
  //   authToken = userInfo ? userInfo.accessToken : null
  //   console.log('authToken in inter', authToken)
  // } else {
  //   authToken = get('__Secure-id_token') || get('__Secure-access_token') || null
  // }
}

export function clearAuthTokenCache () {
  authToken = null
}

export function getAuthToken () {
  if (authToken == null) {
    getAuthTokenWithoutCache()
  }

  return authToken
}
