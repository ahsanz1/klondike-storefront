import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import './style.scss'
import { AboutUsXPM } from 'components/organisms/Technical-tablist/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import { PcpBottom, aboutUs } from 'libs/data/data'
import PCPBottom from 'components/organisms/pcpBottom'

const MobileTabList = ({
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
      <div>
        <WebpagesHeroImages {...aboutUs} />
      </div>
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
                    {item.categoryName}

                    {subItem && itemName === item.categoryName && (
                      <div className="subItem">
                        {subItem &&
                          subItem.hits &&
                          subItem.hits.map((item, index) => (
                            <Label
                              onClick={() => productClickHandler(item.title)}
                              key={index}
                              className={
                                item.title === product && 'active-product'
                              }
                            >
                              {item.title}
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
      <div className="technical-bottom">
        <div className="technical-bottom-section">
          {PcpBottom &&
            PcpBottom.map((item, i) => (
              <>
                <PCPBottom
                  image={item.image}
                  button={item.button}
                  mobileButton={item.mobileButton}
                />
              </>
            ))}
        </div>
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
