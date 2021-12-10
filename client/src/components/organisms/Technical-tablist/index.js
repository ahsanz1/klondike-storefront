import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import './style.scss'
import { categoriesXPM } from './data'
import Link from 'components/atoms/link'
import SubpageData from 'components/molecules/sub-pagedata'
import useWindowSize from 'libs/custom-hooks/useWindowSize'

const Techtabllist = ({
  categories,
  itemName,
  categoryLink,
  clickCategoryHandler,
  subItem,
  className,
  subItemName,
  sidebarSubitem,
  datasubpage,
}) => {
  const [size] = useWindowSize()

  return (
    <div className={`categoryItem-tab trt ${className}`}>
      {categoriesXPM &&
        categoriesXPM.length > 0 &&
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
                  <>
                    <div className="subItem">
                      {item.subItemHeading && (
                        <Label className="subitems-heading">
                          {item.subItemHeading}
                        </Label>
                      )}
                      {item.subItem &&
                        item.subItem.hits &&
                        item.subItem.hits.map((item, index) => {
                          console.log('item-1', item)
                          return (
                            <div key={index}>
                              <Link
                                className={
                                  item.title === subItemName && 'active-product'
                                }
                                onClick={() => sidebarSubitem(item.title)}
                                to={
                                  item.links && item.links.length > 0
                                    ? item.links
                                    : '/tech-resources/tech-news-blog'
                                }
                              >
                                <ul>
                                  <li className="oem-subitem-title">
                                    {item.title}
                                  </li>
                                </ul>
                              </Link>
                            </div>
                          )
                        })}
                    </div>
                    {size < 768 ? (
                      <div className="sub-pages__subpages oem-sub_category">
                        {datasubpage?.length > 0 &&
                          datasubpage?.map((down, i) => (
                            <SubpageData {...down} key={i} />
                          ))}
                      </div>
                    ) : (
                      ''
                    )}
                  </>
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
  sidebarSubitem: {},
}

Techtabllist.propTypes = {
  categories: PropTypes.array,
  itemName: PropTypes.string,
  categoryLink: PropTypes.string,
  clickCategoryHandler: PropTypes.func,
  subItem: PropTypes.array,
  className: PropTypes.string,
  subItemName: PropTypes.string,
  sidebarSubitem: PropTypes.func,
  datasubpage: PropTypes.array,
}
export default Techtabllist
