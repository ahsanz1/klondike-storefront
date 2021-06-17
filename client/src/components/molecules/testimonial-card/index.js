import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
const TestimonialCard = ({ desc, name, testimonialImg }) => {
  return (
    <div className="test-card">
      <div className="tc--content">
        <p className="tc--desc">{desc}</p>
        <p className="tc--name">{name}</p>
      </div>
      <div className="tc--img-container">
        <img
          src={testimonialImg && testimonialImg.url}
          alt={testimonialImg && testimonialImg.altText}
        />
      </div>
    </div>
  )
}

TestimonialCard.propTypes = {
  desc: PropTypes.string,
  name: PropTypes.string,
  testimonialImg: PropTypes.object,
}

export default TestimonialCard
