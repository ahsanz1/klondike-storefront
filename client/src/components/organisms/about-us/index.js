import React from 'react'
import PropTypes from 'prop-types'

import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import AlternateTextImage from 'components/molecules/alternate-text-image'

const AboutUs = ({ desktopHeroImage, mobileHeroImage, aboutUsContent }) => {
  const heroBanner = {
    desktopImage: desktopHeroImage,
    mobileImage: mobileHeroImage,
  }
  return (
    <>
      <WebpagesHeroImages {...heroBanner} />
      {aboutUsContent.map((aboutUsSingle, id) => (
        <AlternateTextImage {...aboutUsSingle} key={id} />
      ))}
    </>
  )
}

AboutUs.propTypes = {
  desktopHeroImage: PropTypes.object,
  mobileHeroImage: PropTypes.object,
  aboutUsContent: PropTypes.array,
}

export default AboutUs
