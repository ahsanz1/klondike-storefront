import React from 'react'
import PropTypes from 'prop-types'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Button from 'components/atoms/button'
import './styles.scss'

const InstagramArrows = ({ onPrev, onNext }) => {
  return (
    <div className="instagram-arrows">
      <Button iconOnly onClick={onPrev}>
        <LeftOutlined />
      </Button>
      <Button iconOnly onClick={onNext}>
        <RightOutlined />
      </Button>
    </div>
  )
}

InstagramArrows.propTypes = {
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
}

export default InstagramArrows
