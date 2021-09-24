import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import './style.scss'
import { categoriesXPM } from './data'
const Techtabllist = ({
  categories,
  itemName,
  clickCategoryHandler,
  subItem,
}) => {
  const [product, setProduct] = useState('')
  console.log('props:', categories)
  const productClickHandler = productName => {
    setProduct(productName)
  }
  console.log('check categories:', categories)
  return (
    <div className="categoryItem-tab trt">
      {categoriesXPM &&
        categoriesXPM.length &&
        categoriesXPM.map((item, index) => (
          <>
            {item.categoryName.length > 0 && (
              <Label
                className={itemName === item.categoryName && 'active-category'}
                key={index}
                onClick={() =>
                  clickCategoryHandler(item.categoryName, item.categoryDesc)
                }
              >
                {item.categoryName}
                {itemName === item.categoryName && (
                  <div className="subItem">
                    {subItem &&
                      subItem.hits &&
                      subItem.hits.map((item, index) => (
                        <Label
                          key={index}
                          onClick={() => productClickHandler(item.title)}
                          className={item.title === product && 'active-product'}
                        >
                          {item.title}
                        </Label>
                      ))}
                  </div>
                )}
              </Label>
            )}
          </>
        ))}
    </div>
  )
}
Techtabllist.propTypes = {
  categories: PropTypes.array,
  itemName: PropTypes.string,
  clickCategoryHandler: PropTypes.func,
  subItem: PropTypes.array,
}
export default Techtabllist
