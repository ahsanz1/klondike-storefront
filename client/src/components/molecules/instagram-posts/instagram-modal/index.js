/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import MyVideo from 'components/atoms/video'
import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

import InstagramAvatar from 'components/molecules/instagram-posts/instagram-avatar'
import InstagramArrows from 'components/molecules/instagram-posts/instagram-arrows'
import InstagramFooter from 'components/molecules/instagram-posts/instagram-footer'

import { VIDEO } from './constant'
import './styles.scss'

const antIcon = <CloseOutlined />

const InstagramModal = ({
  visible = false,
  handleCancel,
  data = {},
  onPrev,
  onNext,
  user = {},
}) => {
  const {
    username,
    media_url,
    media_type,
    caption,
    timestamp,
    permalink,
  } = data
  return (
    <Modal
      bodyStyle={{
        padding: '0',
      }}
      destroyOnClose
      centered
      wrapClassName="instagram-modal"
      visible={visible}
      onCancel={handleCancel}
      closable={false}
      footer={null}
    >
      <Row className="instagram-modal__row">
        <Col span={24} md={12} lg={14} className="instagram-modal__media-col">
          {media_type !== VIDEO && (
            <Image width="100%" src={media_url} alt="..." />
          )}
          {media_type === VIDEO && (
            <MyVideo
              className="instagram-modal__video"
              src={media_url}
              autoPlay
              muted
            />
          )}
        </Col>
        <Col span={24} md={12} lg={10} className="instagram-modal__desc-col">
          <div className="instagram-modal__desc-wrapper">
            <Button
              className="instagram-modal__close-button"
              onClick={handleCancel}
            >
              {antIcon}
            </Button>
            <InstagramAvatar
              name={user.name}
              username={username}
              profileImage={user.profilePic}
            />
            <hr />
            <div>
              <InstagramArrows onNext={onNext} onPrev={onPrev} />
              <Label
                style={{
                  margin: '20px 0 60px',
                  color: '#666',
                }}
              >
                {caption}
              </Label>
              <hr />
              <InstagramFooter date={timestamp} link={permalink} />
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

InstagramModal.propTypes = {
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
  data: PropTypes.object,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  user: PropTypes.object,
}

export default InstagramModal
