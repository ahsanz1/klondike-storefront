import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'
import './style.scss'
import { string } from 'yup/lib/locale'

const DistributionProduct = ({ LubricantContent, distributionheading }) => {
  console.log('lubricant:', LubricantContent, distributionheading)
  return (
    <>
      <div className="distribute-wraper">
        {distributionheading && (
          <h1 className="distribute-heading">{distributionheading}</h1>
        )}
      </div>
      {LubricantContent.map((content, i) => (
        <div className="distribution-wraper" key={i}>
          <div
            className={
              content.outerboreder ? 'outer-border' : 'deleteouter-border'
            }
          >
            <div className="imag-wrapper">
              <img src={content.image.url} alt="" />
            </div>
          </div>
          <div className="text-wrapper">
            <h1>{content.headingtext}</h1>
            <p>{content.text}</p>
            <Link to={content.btnUrl}>
              <button>{content.btntext}</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}

const { object } = PropTypes
DistributionProduct.propTypes = {
  LubricantContent: object,
  distributionheading: string,
}

export default DistributionProduct
