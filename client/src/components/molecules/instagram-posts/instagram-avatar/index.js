import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import Label from 'components/atoms/label'
import './styles.scss'

const InstagramAvatar = ({ name = '', username = '', profileImage = '' }) => {
  return (
    <div className="instagram-avatar">
      <Avatar size={50} src={profileImage} />
      <div className="instagram-avatar__name-wrapper">
        <Label className="instagram-avatar__full-name">{name}</Label>
        <Label className="instagram-avatar__username">@{username}</Label>
      </div>
    </div>
  )
}

InstagramAvatar.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  profileImage: PropTypes.string,
}

export default InstagramAvatar
