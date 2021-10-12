import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import ProductOverview from 'components/molecules/ProductOverview'

const PCPOverview = ({ productcontent, heading }) => {
  return (
    <div className="overview-wrapper">
      {heading && <h1 className="overviewheading">{heading}</h1>}
      {productcontent.map((content, id) => (
        <ProductOverview {...content} key={id} />
      ))}
    </div>
  )
}

PCPOverview.propTypes = {
  productcontent: PropTypes.object,
  heading: PropTypes.string,
}
export default PCPOverview
