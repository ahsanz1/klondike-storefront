import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import './style.scss'

const CancelButton = ({ data = {} }) => {
  return (
    <div className="cancel-Button__container">
      <Link to={data.to}>
        <Button className="cancel--button">{data.text}</Button>
      </Link>
    </div>
  )
}

CancelButton.propTypes = {
  data: PropTypes.object,
}

export default CancelButton
