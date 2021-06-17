import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
const TestimonialHeading = ({
  desktopPrefix,
  desktopSuffix,
  mobilePrefix,
  mobileSuffix,
  headingColor = '#fff',
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
        {desktopPrefix} <span className="testimonial-stars"></span>{' '}
        {desktopSuffix}
      </h3>
      {(mobilePrefix || mobileSuffix) && (
        <h3
          className="heading for-mobile"
          style={{
            color: headingColor,
          }}
        >
          {mobilePrefix} <span className="testimonial-stars"></span>{' '}
          {mobileSuffix}
        </h3>
      )}
    </Fragment>
  )
}

TestimonialHeading.propTypes = {
  desktopPrefix: PropTypes.string,
  desktopSuffix: PropTypes.string,
  mobilePrefix: PropTypes.string,
  mobileSuffix: PropTypes.string,
  headingColor: PropTypes.string,
  fontFamily: PropTypes.string,
}

export default TestimonialHeading
