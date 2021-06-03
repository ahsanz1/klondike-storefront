import React, { memo } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import cx from 'classnames'

import Image from 'components/atoms/image'

import './style.scss'

const PDPImagePopup = ({
  image = '',
  show = false,
  handleCloseImagePopup = noop,
}) => {
  show
    ? document.body.classList.add('image-popup-open')
    : document.body.classList.remove('image-popup-open')

  return (
    <div
      className={cx('pdp-image-popup', { show: show })}
      onClick={handleCloseImagePopup}
      onKeyUp={() => {}}
      role="button"
      tabIndex="0"
    >
      <div className="pdp-image-wrap">
        <Image src={image} alt="..." />
      </div>
    </div>
  )
}

PDPImagePopup.propTypes = {
  image: PropTypes.string,
  show: PropTypes.bool,
  handleCloseImagePopup: PropTypes.func,
}

export default memo(PDPImagePopup)
