/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const MyVideo = ({
  src = '',
  type = '',
  style = {},
  className = '',
  height = '',
  width = '',
  controls = true,
  autoPlay = false,
  muted = false,
  loop = true,
  playsInline = true,
}) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const { current: videoElement } = videoRef
    videoElement.setAttribute('muted', '')
  }, [])

  return (
    <video
      ref={videoRef}
      width={width}
      height={height}
      style={style}
      className={`c-video ${className}`}
      controls={controls}
      autoPlay={autoPlay}
      muted
      loop={loop}
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

MyVideo.propTypes = {
  src: PropTypes.string,
  type: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  playsInline: PropTypes.bool,
}

export default MyVideo
