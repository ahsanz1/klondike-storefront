import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import DistributionProduct from 'components/molecules/DistributionProduct'

const HomeDistributionProduct = ({
  aboutUsSecondContent,
  distributionProduct,
  distributionheading,
  LubricantContent,
}) => {
  console.log(
    'LubricantContent',
    aboutUsSecondContent,
    distributionProduct,
    LubricantContent,
  )
  return (
    <>
      {LubricantContent.map((content, i) => (
        <DistributionProduct {...content} key={i} />
      ))}

      {aboutUsSecondContent.map((content, i) => (
        <DistributionProduct {...content} key={i} />
      ))}
      <div className="distribute-wraper">
        {distributionheading && (
          <h1 className="distribute-heading">
            {distributionheading.headingtext}
          </h1>
        )}
      </div>

      {distributionProduct.map((content, i) => (
        <DistributionProduct {...content} key={i} />
      ))}
    </>
  )
}

HomeDistributionProduct.propTypes = {
  aboutUsSecondContent: PropTypes.string,
  distributionProduct: PropTypes.string,
  distributionheading: PropTypes.string,
  LubricantContent: PropTypes.string,
}

export default HomeDistributionProduct
