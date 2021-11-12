import React from 'react'
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
  subItemName,
}) => {
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
                    {item.subItemHeading && (
                      <Label className="subitems-heading">
                        {item.subItemHeading}
                      </Label>
                    )}
                    {item.subItem &&
                      item.subItem.hits &&
                      item.subItem.hits.map((item, index) => {
                        console.log('item', item)
                        return (
                          <div key={index}>
                            <Link
                              className={
                                item.title === subItemName && 'active-product'
                              }
                              // onClick={() => productClickHandler(item.title)}
                              to={item.links}
                            >
                              <ul>
                                <li>{item.title}</li>
                              </ul>
                            </Link>
                          </div>
                        )
                      })}
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
  subItemName: '',
}

Techtabllist.propTypes = {
  categories: PropTypes.array,
  itemName: PropTypes.string,
  categoryLink: PropTypes.string,
  clickCategoryHandler: PropTypes.func,
  subItem: PropTypes.array,
  className: PropTypes.string,
  subItemName: PropTypes.string,
}
export default Techtabllist
