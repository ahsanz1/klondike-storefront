import React from 'react'
import PropTypes from 'prop-types'

import Video from 'components/atoms/video'

import './style.scss'

const HomepageHeroVideos = ({ desktopVideo, mobileVideo }) => {
  return (
    <>
      <Video
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        height="100%"
        width="100%"
        className="desktopVideo"
        src={desktopVideo}
        controls={false}
        type="video/mp4"
      />
      <Video
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        height="100%"
        width="100%"
        className="mobileVideo"
        src={mobileVideo}
        controls={false}
        type="video/mp4"
      />
    </>
  )
}

const { string } = PropTypes

HomepageHeroVideos.propTypes = {
  desktopVideo: string,
  mobileVideo: string,
}

export default HomepageHeroVideos
