import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import './style.scss'
import { categoriesXPM } from 'components/organisms/Technical-tablist/data'

import Link from 'components/atoms/link'

const MobileTabListTech = ({
  categories,
  itemName,
  clickCategoryHandler,
  subItem,
  className,
  children = null,
}) => {
  const [product, setProduct] = useState('')
  console.log('props:', categories)
  const productClickHandler = productName => {
    setProduct(productName)
  }
  console.log('subitem', subItem)
  console.log('check categories:', categories)
  return (
    <div className="mobile-tab-list">
      <div className={`categoryItem-tab trt ${className}`}>
        {categoriesXPM &&
          categoriesXPM.length &&
          categoriesXPM.map((item, index) => (
            <>
              {item.categoryName.length > 0 && (
                <div>
                  <Label
                    className={
                      'tablist-heading' +
                      ' ' +
                      (itemName === item.categoryName && 'active-category')
                    }
                    key={index}
                    onClick={() =>
                      clickCategoryHandler(item.categoryName, item.categoryDesc)
                    }
                  >
                    <Link
                      className="catagory-link"
                      to={`tech-resources/${item.link}`}
                    >
                      {item.categoryName}
                    </Link>

                    {item.subItem && itemName === item.categoryName && (
                      <div className="subItem">
                        {item.subItem &&
                          item.subItem.hits &&
                          item.subItem.hits.map((item, index) => (
                            <Label
                              onClick={() => productClickHandler(item.title)}
                              key={index}
                              className={
                                item.title === product && 'active-product'
                              }
                            >
                              <ul>
                                <li>{item.title}</li>
                              </ul>
                            </Label>
                          ))}
                      </div>
                    )}
                  </Label>
                  {itemName === item.categoryName && <div>{children}</div>}
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  )
}
MobileTabListTech.DefaultProps = {
  categories: [],
  itemName: '',
  clickCategoryHandler: {},
  subItem: [],
  className: '',
}

MobileTabListTech.propTypes = {
  categories: PropTypes.array,
  itemName: PropTypes.string,
  clickCategoryHandler: PropTypes.func,
  subItem: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.node,
}
export default MobileTabListTech
