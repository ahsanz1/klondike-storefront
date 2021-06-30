import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/button'
import './style.scss'

const Commited = ({ heading, subheading, paragraph, butontext }) => {
  return (
    <div className="commited-wraper">
      <div className="commited-content">
        <h1>{heading}</h1>
        <p>{paragraph}</p>
        <h3>{subheading}</h3>
      </div>
      <div className="commited-buton">
        <Button>{butontext}</Button>
      </div>
    </div>
  )
}

Commited.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  paragraph: PropTypes.string,
  butontext: PropTypes.string,
}

export default Commited
