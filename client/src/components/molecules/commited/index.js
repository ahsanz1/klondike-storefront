import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import './style.scss'

const Commited = ({
  heading,
  subheading,
  paragraph,
  butontext,
  redirectUrl,
}) => {
  return (
    <div className="commited-wraper">
      <div className="commited-content">
        <h1>{heading}</h1>
        <p>{paragraph}</p>
        <h3>{subheading}</h3>
      </div>
      <div className="commited-buton">
        <Link to={redirectUrl}>
          <Button>{butontext}</Button>
        </Link>
      </div>
    </div>
  )
}

Commited.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  paragraph: PropTypes.string,
  butontext: PropTypes.string,
  redirectUrl: PropTypes.string,
}

export default Commited
