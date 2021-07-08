import React from 'react'
// import PropTypes from 'prop-types'

import { string } from 'yup/lib/locale'
import './style.scss'

const BannerLubricant = ({ bannersubheading, bannerparagraph }) => {
  return (
    <>
      <div className="banner-content">
        <h5>{bannersubheading}</h5>
        <p>{bannerparagraph}</p>
      </div>
    </>
  )
}

// const { object } = PropTypes
BannerLubricant.propTypes = {
  bannersubheading: string,
  bannerparagraph: string,
  // bannercontent: array,
}

export default BannerLubricant
