import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/atoms/image'
import HomepageHeroTextLinks from 'components/molecules/mainpage-hero/homepage-hero-text-links'
import HomepageHeroVideos from 'components/molecules/homepage-hero-videos'
import './styles.scss'

const MainPageHero = ({
  desktopVideo,
  mobileVideo,
  heroImage,
  firstDesktopHeading,
  secondDesktopHeading,
  mobileHeading,
  bulletPoints,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="homepage-hero-banner">
      {desktopVideo && mobileVideo ? (
        <div className="video-box">
          <HomepageHeroVideos
            desktopVideo={desktopVideo}
            mobileVideo={mobileVideo}
          />
          <HomepageHeroTextLinks
            firstDesktopHeading={firstDesktopHeading}
            secondDesktopHeading={secondDesktopHeading}
            mobileHeading={mobileHeading}
            bulletPoints={bulletPoints}
            buttonText={buttonText}
            buttonLink={buttonLink}
          />
        </div>
      ) : (
        <Image src={heroImage.url} alt={heroImage.altText} />
      )}
    </div>
  )
}

const { array, string, object } = PropTypes
MainPageHero.propTypes = {
  desktopVideo: string,
  mobileVideo: string,
  heroImage: object,
  firstDesktopHeading: string,
  secondDesktopHeading: string,
  mobileHeading: string,
  bulletPoints: array,
  buttonText: string,
  buttonLink: string,
}

export default MainPageHero
