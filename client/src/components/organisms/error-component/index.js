/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Button from 'components/atoms/button'
import React from 'react'
import './style.scss'

const ErrorComponent = () => {
  const handleReload = () => {
    window.location.reload()
  }
  const navigateToHome = () => {
    window.location.href = '/'
  }
  return (
    <div className="error-component">
      <nav>
        <img
          src="static\images\klondike.png"
          alt="company-logo"
          onClick={navigateToHome}
        ></img>
      </nav>
      <div className="error-component__body">
        <h1>Something went wrong!</h1>
        <Button onClick={handleReload}>Reload</Button>
      </div>
    </div>
  )
}

export default ErrorComponent
