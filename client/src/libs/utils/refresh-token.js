import { useContext } from 'react'

import { refreshUser } from 'libs/api/user'

import { AppContext } from 'libs/context'
import { navigate } from '@reach/router'

export const RefreshToken = () => {
  const { setCurrentUser, user, logout } = useContext(AppContext)

  const refreshUserAuthPayload = {
    refreshToken: user.refreshToken,
  }
  refreshUser(refreshUserAuthPayload).then(res => {
    if (!res.hasError) {
      console.log('ref token success', res.response.data)
      setCurrentUser(res.response.data)
      // setPersonalInfo(userPersonalInfo)
    }
    if (res.hasError) {
      logout()
      navigate('account/login')
      console.log('ref token success', res.response.error)
    }
  })
}

export const Logout = () => {
  const { logout } = useContext(AppContext)
  console.log('logout method called')
  logout()
  navigate('account/login')
}
