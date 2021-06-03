import React, { useContext } from 'react'
import { AppContext } from 'libs/context'
import { navigate } from '@reach/router'

const requireAuth = Component => {
  const MyComponent = props => {
    const { user } = useContext(AppContext)

    if (user.accessToken) {
      return <Component {...props} />
    } else {
      navigate('/account/login', { replace: true })
      return null
    }
  }

  return MyComponent
}

export default requireAuth
