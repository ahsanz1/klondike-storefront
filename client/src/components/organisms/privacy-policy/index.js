import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import Privacy from '../../molecules/privacy-policy'

const PrivacyPolicy = ({ heading, subheading, paragraph, policyList }) => {
  console.log('here', heading, subheading, paragraph, policyList)
  return (
    <div className="PrivacyPolicy-wrapper">
      <div className="PrivacyPolicy-container">
        <div className="privacy-body">
          <p className="main-heading">{heading}</p>
          <p className="sub-heading">{subheading}</p>
          {paragraph.length > 0 &&
            paragraph.map((data, i) => {
              return <p key={i}>{data.paragraphs}</p>
            })}
          {policyList.length > 0 &&
            policyList.map((policy, i) => {
              return (
                <div key={i}>
                  <p className="main-heading">{policy.heading}</p>
                  <p dangerouslySetInnerHTML={{ __html: policy.data }}></p>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

PrivacyPolicy.defaultProps = {
  policyList: [],
  heading: '',
  subheading: '',
  paragraph: [],
}

PrivacyPolicy.propTypes = {
  policyList: PropTypes.array,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  paragraph: PropTypes.array,
}
export default PrivacyPolicy
