import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
const Heading = ({
  desktopPrefix,
  desktopSuffix,
  mobilePrefix,
  mobileSuffix,
  discount,
  headingColor = '#fff',
  discountColor = '#ffd17b',
  fontFamily = 'Intro',
}) => {
  return (
    <Fragment>
      <h3
        className={`heading ${(mobilePrefix || mobileSuffix) && 'for-dekstop'}`}
        style={{
          color: headingColor,
          fontFamily: `${fontFamily}`,
        }}
      >
        {desktopPrefix}{' '}
        <span
          className="heading--underline-effect"
          style={{
            color: discountColor,
            borderBottomColor: discountColor,
          }}
        >
          {discount}
        </span>{' '}
        {desktopSuffix}
      </h3>
      {(mobilePrefix || mobileSuffix) && (
        <h3
          className="heading for-mobile"
          style={{
            color: headingColor,
          }}
        >
          {mobilePrefix}{' '}
          <span
            className="heading--underline-effect"
            style={{
              color: discountColor,
              borderBottomColor: discountColor,
            }}
          >
            {discount}
          </span>{' '}
          {mobileSuffix}
        </h3>
      )}
    </Fragment>
  )
}

Heading.propTypes = {
  desktopPrefix: PropTypes.string,
  desktopSuffix: PropTypes.string,
  mobilePrefix: PropTypes.string,
  mobileSuffix: PropTypes.string,
  headingColor: PropTypes.string,
  discount: PropTypes.string,
  discountColor: PropTypes.string,
  fontFamily: PropTypes.string,
}

export default Heading
