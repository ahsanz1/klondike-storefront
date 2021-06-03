import React from 'react'

import { STATIC_FOLDER } from 'libs/global-constants'

import './styles.scss'

const Splash = () => {
  return (
    <div className="logo-overlay">
      <img
        width="100px"
        src={`${STATIC_FOLDER}/logo.svg`}
        alt="logo-overlay"
      ></img>
    </div>
  )
}

export default Splash
