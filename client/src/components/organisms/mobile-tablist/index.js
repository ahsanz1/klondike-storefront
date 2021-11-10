import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import './style.scss'
import { AboutUsXPM } from 'components/organisms/Technical-tablist/data'
import Link from 'components/atoms/link'

const MobileTabList = ({
  categories,
  itemName,
  clickCategoryHandler,
  subItem,
  className,
  children = null,
}) => {
  const [product, setProduct] = useState('')
  const productClickHandler = productName => {
    setProduct(productName)
  }

  return (
    <div className="mobile-tab-list">
      <div className={`categoryItem-tab trt ${className}`}>
        {AboutUsXPM &&
          AboutUsXPM.length &&
          AboutUsXPM.map((item, index) => (
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
                      to={`about-klondike/${item.link}`}
                    >
                      {item.categoryName}
                    </Link>

                    {subItem && itemName === item.categoryName && (
                      <div className="subItem">
                        {subItem &&
                          subItem.hits &&
                          subItem.hits.map((item, index) => (
                            <Link
                              onClick={() => productClickHandler(item.title)}
                              key={index}
                              className={
                                item.title === product && 'active-product'
                              }
                              to={item.links}
                            >
                              {item.title}
                            </Link>
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
MobileTabList.DefaultProps = {
  categories: [],
  itemName: '',
  clickCategoryHandler: {},
  subItem: [],
  className: '',
}

MobileTabList.propTypes = {
  categories: PropTypes.array,
  itemName: PropTypes.string,
  clickCategoryHandler: PropTypes.func,
  subItem: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.node,
}
export default MobileTabList
