/* eslint-disable camelcase */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Heading from 'components/atoms/heading'
import InstagramMediaItem from 'components/molecules/instagram-posts/instagram-media'
import InstagramModal from 'components/molecules/instagram-posts/instagram-modal'
import useInstagramPosts from 'libs/api-hooks/useInstagramPosts'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import './styles.scss'

const InstagramSection = ({
  title = '',
  link = '',
  accessToken = '',
  instaId = '',
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const { posts, user } = useInstagramPosts(accessToken, instaId)
  const [size] = useWindowSize()

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onNext = () => {
    if (posts) setModalIndex((modalIndex + 1) % posts.length)
  }

  const onPrev = () => {
    if (posts) {
      if (modalIndex !== 0) setModalIndex(modalIndex - 1)
      else setModalIndex(posts.length - 1)
    }
  }

  const openModel = index => {
    setModalIndex(index)
    showModal()
  }
  return (
    <div id="insta">
      <div className="insta-section">
        <div className="page-width">
          <Heading className="title">
            <a href={link} target="__blank">
              {title}
            </a>
          </Heading>
          <div className="insta-feed">
            {posts &&
              posts.length > 0 &&
              posts.map(({ media_type, media_url, id }, index) => {
                return (
                  (id !== '17885701820105884' || size > 768) && (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a key={id} className={`box-${index}`}>
                      <InstagramMediaItem
                        onOpen={index => {
                          openModel(index)
                        }}
                        index={index}
                        url={media_url}
                        type={media_type}
                      />
                    </a>
                  )
                )
              })}
          </div>
        </div>
      </div>
      <InstagramModal
        visible={isModalVisible}
        handleCancel={handleCancel}
        onNext={onNext}
        onPrev={onPrev}
        user={user}
        data={(posts && posts[modalIndex]) || {}}
      />
    </div>
  )
}

InstagramSection.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  accessToken: PropTypes.string,
  instaId: PropTypes.string,
}

export default InstagramSection
