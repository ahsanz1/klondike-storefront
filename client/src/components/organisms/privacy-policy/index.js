import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Privacy from '../../molecules/privacy-policy'

const PrivacyPolicy = ({ heading, subheading, paragraph, policyList }) => {
  console.log('policylist', policyList)
  return (
    <div className="PrivacyPolicy-wrapper">
      <div className="PrivacyPolicy-container">
        <div className="privacy-body">
          <h1 className="main-heading">{heading}</h1>
          <h1 className="sub-heading">{subheading}</h1>
          <p>{paragraph}</p>
          {policyList.map((content, id) => (
            <Privacy text={content} key={id} />
          ))}
        </div>
      </div>
    </div>
  )
}

PrivacyPolicy.propTypes = {
  policyList: PropTypes.array,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  paragraph: PropTypes.string,
}
export default PrivacyPolicy
