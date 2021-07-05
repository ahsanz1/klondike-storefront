import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import TermsConditions from 'components/molecules/TermsConditions'

const TermsCondition = ({ heading, subheading, paragraph, termlist }) => {
  return (
    <div className="TermsConditions-wrapper">
      <div className="Termscondition-container">
        <h1>{heading}</h1>
        <h3>{subheading}</h3>
        <p>{paragraph}</p>
        {termlist.map((content, id) => (
          <TermsConditions {...content} key={id} />
        ))}
      </div>
    </div>
  )
}

TermsCondition.propTypes = {
  termlist: PropTypes.object,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  paragraph: PropTypes.string,
}
export default TermsCondition
