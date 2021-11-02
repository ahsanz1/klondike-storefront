import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import './style.scss'
import { categoriesXPM } from './data'
import Link from 'components/atoms/link'

const Techtabllist = ({
  categories,
  itemName,
  categoryLink,
  clickCategoryHandler,
  subItem,
  className,
}) => {
  const [product, setProduct] = useState('')
  console.log('props:', categories)
  const productClickHandler = productName => {
    setProduct(productName)
  }
  console.log('subitem', subItem)
  console.log('check categories:', categories)
  return (
    <div className={`categoryItem-tab trt ${className}`}>
      {categoriesXPM &&
        categoriesXPM.length &&
        categoriesXPM.map((item, index) => (
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
                <Link className="catagory-link" to={item.categoryLink}>
                  {item.categoryName}
                </Link>
                {item.subItem && itemName === item.categoryName && (
                  <div className="subItem">
                    {item.subItem &&
                      item.subItem.hits &&
                      item.subItem.hits.map((item, index) => (
                        <Link
                          key={index}
                          onClick={() => productClickHandler(item.title)}
                          className={item.title === product && 'active-product'}
                          to={item.links}
                        >
                          <ul>
                            <li>{item.title}</li>
                          </ul>
                        </Link>
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
Techtabllist.DefaultProps = {
  categories: [],
  itemName: '',
  categoryLink: '',
  clickCategoryHandler: {},
  subItem: [],
  className: '',
}

Techtabllist.propTypes = {
  categories: PropTypes.array,
  itemName: PropTypes.string,
  categoryLink: PropTypes.string,
  clickCategoryHandler: PropTypes.func,
  subItem: PropTypes.array,
  className: PropTypes.string,
}
export default Techtabllist
