/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import Category from 'components/organisms/category'
import { AppContext } from 'libs/context'
import { navigate, useLocation } from '@reach/router'

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
  const { setPlpDescription } = useContext(AppContext)
  const [product, setProduct] = useState(sku)
  const location = useLocation()
  console.log('check loc:', location.pathname.slice(0, 9))
  const productClickHandler = productName => {
    setProduct(productName.sku)
    subItemClickHandler(productName)
    handleClose()
  }

  return (
    <div className="categoryItem trt">
      {categories &&
        categories.length &&
        categories.map((item, index) => (
          <>
            {item.categoryName.length > 0 && (
              <>
                {itemName === item.categoryName
                  ? setPlpDescription(item.categoryDesc)
                  : null}
                <Label
                  // to="/plp-page"
                  className={
                    itemName === item.categoryName
                      ? 'active-category'
                      : 'deactive-category'
                  }
                  key={index}
                  onClick={() => {
                    clickCategoryHandler(item.categoryName, item.categoryDesc)
                  }}
                >
                  <span
                    onClick={
                      location.pathname.slice(0, 9) === '/category'
                        ? () =>
                          navigate(
                            `/category?category=${item.categoryName
                              .split(' ')
                              .join('-')
                              .toLowerCase()}`,
                          )
                        : () => {}
                    }
                  >
                    {item.categoryName}
                  </span>
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
                                    to={`/product?sku=${item.sku}`}
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
