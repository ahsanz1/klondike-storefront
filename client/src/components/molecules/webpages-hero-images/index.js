import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/atoms/image'
import './style.scss'

const WebpagesHeroImages = ({ desktopImage, mobileImage }) => {
  return (
    <>
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
    </>
  )
}

const { object } = PropTypes
WebpagesHeroImages.propTypes = {
  desktopImage: object,
  mobileImage: object,
}

export default WebpagesHeroImages
