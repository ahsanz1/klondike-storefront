import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import Category from 'components/organisms/category'

import './style.scss'

const PlpTabList = ({
  categories,
  itemName,
  clickCategoryHandler,
  subItem,
  width = '20%',
  subItemClickHandler,
  handleClose,
  categoryName,
  subItemHandler,
  sku,
}) => {
  console.log('itemName', itemName)
  const [product, setProduct] = useState(sku)
  console.log('props plp tab:', subItem)
  const productClickHandler = productName => {
    console.log({ productName })
    setProduct(productName.sku)
    subItemClickHandler(productName)
    handleClose()
  }
  console.log('check categories:', categories)
  return (
    <div className="categoryItem trt">
      {categories &&
        categories.length &&
        categories.map((item, index) => (
          <>
            {item.categoryName.length > 0 && (
              <>
                <Label
                  // to="/plp-page"
                  className={
                    itemName === item.categoryName
                      ? 'active-category'
                      : 'deactive-category'
                  }
                  key={index}
                  onClick={() =>
                    clickCategoryHandler(item.categoryName, item.categoryDesc)
                  }
                >
                  {item.categoryName}
                  {itemName === item.categoryName && (
                    <>
                      <div className="subItem">
                        {subItem &&
                          subItem.hits &&
                          subItem.hits.map(
                            (item, index) =>
                              !item.isVariant && (
                                <Label
                                  key={index}
                                  onClick={() => productClickHandler(item)}
                                  className={
                                    item.sku === product
                                      ? 'active-product'
                                      : 'deactive-product'
                                  }
                                >
                                  <Link
                                    to={`/PDP?sku=${item.sku}`}
                                    className="notranslate"
                                  >
                                    {item.title}
                                  </Link>
                                </Label>
                              ),
                          )}
                      </div>
                    </>
                  )}
                </Label>
                <div>
                  {item.categoryName === categoryName && (
                    <div className="productItem-mobile">
                      <Category
                        categoryName={categoryName}
                        subItemHandler={subItemHandler}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ))}
    </div>
  )
}
PlpTabList.propTypes = {
  categories: PropTypes.array,
  itemName: PropTypes.string,
  clickCategoryHandler: PropTypes.func,
  subItem: PropTypes.array,
  width: PropTypes.string,
  subItemClickHandler: PropTypes.func,
  handleClose: PropTypes.func,
  categoryName: PropTypes.string,
  subItemHandler: PropTypes.func,
  sku: PropTypes.string,
}

export default PlpTabList
