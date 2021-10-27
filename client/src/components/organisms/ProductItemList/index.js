import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import ProductItem from 'components/molecules/ProductItem'
import PCPBottom from 'components/organisms/pcpBottom'
import { PcpBottom } from 'libs/data/data'

const ProductItemList = ({ ProductList }) => {
  console.log('pcp check:', PcpBottom)
  return (
    <>
      <div className="Productitem-wrapper">
        {ProductList.map((content, id) => (
          <ProductItem {...content} key={id} />
        ))}
      </div>
      <div className="warp-bottom">
        <div className="plp-bottom-section">
          {PcpBottom &&
            PcpBottom.map((item, i) => (
              <>
                <PCPBottom
                  image={item.image}
                  button={item.button}
                  mobileButton={item.mobileButton}
                  url={item.url}
                />
              </>
            ))}
        </div>
      </div>
    </>
  )
}

ProductItemList.propTypes = {
  ProductList: PropTypes.object,
  PcpBottom: PropTypes.array,
}
export default ProductItemList
