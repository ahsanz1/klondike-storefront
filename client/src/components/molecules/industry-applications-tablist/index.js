import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
// import './style.scss'
import { IndustryAppXPM } from 'components/organisms/Technical-tablist/data'
import Link from 'components/atoms/link'

const IndustryAppTablist = ({
  categories,
  itemName,
  clickCategoryHandler,
  subItem,
  className,
}) => {
  const [product, setProduct] = useState('')
  const productClickHandler = productName => {
    setProduct(productName)
  }
  return (
    <div className={`categoryItem-tab trt ${className}`}>
      {IndustryAppXPM &&
        IndustryAppXPM.length &&
        IndustryAppXPM.map((item, index) => (
          <>
            {item.categoryName.length > 0 && (
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
IndustryAppTablist.DefaultProps = {
  categories: [],
  itemName: '',
  clickCategoryHandler: {},
  subItem: [],
  className: '',
}

IndustryAppTablist.propTypes = {
  categories: PropTypes.array,
  itemName: PropTypes.string,
  clickCategoryHandler: PropTypes.func,
  subItem: PropTypes.array,
  className: PropTypes.string,
}
export default IndustryAppTablist
