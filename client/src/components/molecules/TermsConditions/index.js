import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const TermsConditions = ({ text }) => {
  return (
    <>
      <div className="Terms-wrapper">
        <ul>
          <li>{text}</li>
        </ul>
      </div>
    </>
  )
}

TermsConditions.propTypes = {
  text: PropTypes.string,
}

export default TermsConditions
