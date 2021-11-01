import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/atoms/image'
import './style.scss'

const WebpagesHeroImages = ({ desktopImage, mobileImage, overLapImage }) => {
  return (
    <div className="banner">
      <Image
        src={desktopImage.url}
        alt={desktopImage.alt || desktopImage.altText}
        className="desktopImage"
      />
      <Image
        src={mobileImage.url}
        alt={mobileImage.alt || mobileImage.altText}
        className="mobileImage"
      />
      {overLapImage && (
        <Image
          src={overLapImage.url}
          alt={overLapImage.alt || overLapImage.altText}
          className="overLapImage"
        />
      )}
    </div>
  )
}

const { object } = PropTypes
WebpagesHeroImages.propTypes = {
  desktopImage: object,
  mobileImage: object,
  overLapImage: object,
}

export default WebpagesHeroImages
