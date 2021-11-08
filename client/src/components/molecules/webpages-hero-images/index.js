import React from 'react'
import PropTypes from 'prop-types'
import { useWindowSize } from 'libs/custom-hooks'
import Image from 'components/atoms/image'
import './style.scss'

const WebpagesHeroImages = ({
  desktopImage,
  mobileImage,
  overLapImage,
  overLapMobile,
}) => {
  const size = useWindowSize()
  return (
    <div
      className="banner"
      style={overLapMobile && size[0] < 768 ? { marginTop: '35.73vw' } : {}}
    >
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
      {overLapImage && overLapMobile && (
        <>
          <Image
            src={overLapImage.url}
            alt={overLapImage.alt || overLapImage.altText}
            className="overLapImage"
          />
          <Image
            src={overLapMobile.url}
            alt={overLapMobile.alt || overLapMobile.altText}
            className="overLapMobile"
          />
        </>
      )}
    </div>
  )
}

const { object } = PropTypes
WebpagesHeroImages.propTypes = {
  desktopImage: object,
  mobileImage: object,
  overLapImage: object,
  overLapMobile: object,
}

export default WebpagesHeroImages
