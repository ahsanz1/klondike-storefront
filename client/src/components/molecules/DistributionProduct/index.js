import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const DistributionProduct = ({
  image,
  text,
  btntext,
  headingtext,
  outerboreder,
}) => {
  return (
    <div className="distribution-wraper">
      <div className={outerboreder ? 'outer-border' : 'deleteouter-border'}>
        <div className="imag-wrapper">
          <img src={image.url} alt="" />
        </div>
      </div>
      <div className="text-wrapper">
        <h1>{headingtext}</h1>
        <p>{text}</p>
        <button>{btntext}</button>
      </div>
    </div>
  )
}

const { string, object } = PropTypes
DistributionProduct.propTypes = {
  image: object,
  text: string,
  btntext: string,
  headingtext: string,
  outerboreder: string,
}

export default DistributionProduct
