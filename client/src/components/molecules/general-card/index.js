import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/atoms/image'
import './style.scss'

const GeneralCard = ({
  image = {},
  primaryText = [],
  secondaryText = [],
  styles = {},
  index = 0,
}) => {
  return (
    <div className="general-card">
      <div className="image-contanier">
        <Image
          className="gc-image"
          // eslint-disable-next-line comma-dangle
          style={{ ...styles, width: index === 0 || index === 3 ? '65%' : '' }}
          src={image.url || ''}
        />
      </div>
      {primaryText && primaryText.length > 0 ? (
        <>
          {primaryText.map(heading => (
            <span className="title-text sub-heading" key={heading.title || ''}>
              {heading.title || ''}
            </span>
          ))}
        </>
      ) : (
        ''
      )}
      {secondaryText && secondaryText.length > 0 ? (
        <>
          {secondaryText.map(subHeading => (
            <p className="text" key={subHeading.secondaryText || ''}>
              {subHeading.secondaryText || ''}
            </p>
          ))}
        </>
      ) : (
        ''
      )}
    </div>
  )
}

GeneralCard.propTypes = {
  image: PropTypes.object,
  primaryText: PropTypes.array,
  secondaryText: PropTypes.array,
  styles: PropTypes.object,
  index: PropTypes.number,
}

export default GeneralCard
