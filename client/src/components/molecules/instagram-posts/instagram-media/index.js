import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Image from 'components/atoms/image'
import MyVideo from 'components/atoms/video'
import { VIDEO } from 'components/molecules/instagram-posts/instagram-modal/constant'

import './style.scss'

const InstagramMediaItem = ({ url = '', onOpen, index = 0, type = '' }) => {
  const iosDevice = useRef(false)

  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Macintosh/i)
  ) {
    iosDevice.current = true
  }

  return (
    <div className="insta-feed__container">
      {type !== VIDEO && <Image src={url} alt="alt text" />}
      {type === VIDEO && (
        <MyVideo autoPlay={!!iosDevice.current} src={url} controls={false} />
      )}
      <div
        className="overlay"
        onKeyDown={null}
        onClick={() => {
          onOpen && onOpen(index)
        }}
        role="button"
        tabIndex={0}
      >
        <Image
          src={`/static/icons/${
            type === VIDEO ? 'video-icon.png' : 'instagram.svg'
          }`}
          className="icon-img"
        />
      </div>
    </div>
  )
}

InstagramMediaItem.propTypes = {
  url: PropTypes.string,
  onOpen: PropTypes.func,
  index: PropTypes.number,
  type: PropTypes.string,
}

export default InstagramMediaItem
