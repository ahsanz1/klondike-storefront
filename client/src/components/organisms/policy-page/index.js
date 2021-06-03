import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const PolicyPage = ({ page }) => {
  return (
    <div className="policy-page" dangerouslySetInnerHTML={{ __html: page }} />
  )
}

PolicyPage.propTypes = {
  page: PropTypes.string,
}

export default PolicyPage
