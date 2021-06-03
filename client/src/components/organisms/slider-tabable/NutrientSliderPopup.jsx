import React, { memo } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import cx from 'classnames'

import Heading from 'components/molecules/heading'

const NutrientSliderPopup = ({ name, text, show, onClosePopup }) => {
  show
    ? document.body.classList.add('open-nutrient-popup')
    : document.body.classList.remove('open-nutrient-popup')

  return (
    <div
      className={cx('nutrient-popup-wrapper', { show: show })}
      onClick={onClosePopup}
      onKeyUp={() => {}}
      role="button"
      tabIndex="0"
    >
      <div className="nutrient-popup-content">
        <Heading
          desktopPrefix={name}
          mobilePrefix={name}
          headingColor={'#000'}
          fontFamily="futura-pt"
        />
        <div
          className="nutrient-popup-text"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </div>
    </div>
  )
}

NutrientSliderPopup.defaultProps = {
  text: '',
  name: '',
  show: false,
  onClosePopup: noop,
}

NutrientSliderPopup.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
  show: PropTypes.bool,
  onClosePopup: PropTypes.func,
}

export default memo(NutrientSliderPopup)
