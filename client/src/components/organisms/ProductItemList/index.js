import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import ProductItem from 'components/molecules/ProductItem'

const ProductItemList = ({ ProductList }) => {
  return (
    <>
      <div className="Productitem-wrapper">
        {ProductList.map((content, id) => (
          <ProductItem {...content} key={id} />
        ))}
      </div>
    </>
  )
}

ProductItemList.propTypes = {
  ProductList: PropTypes.object,
  PcpBottom: PropTypes.array,
}
export default ProductItemList
