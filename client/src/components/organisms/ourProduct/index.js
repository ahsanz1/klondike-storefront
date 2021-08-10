import React, { useState } from 'react'
import { ourProduct } from 'libs/data/data'
import './style.scss'

const OurProduct = () => {
  const [itemHover, setItemHover] = useState('')
  const [imgHover, setImgHover] = useState('')
  console.log('check porps:', ourProduct)
  return (
    <div className="show-products">
      <div className="product-list">
        <ul>
          {ourProduct &&
            ourProduct.length &&
            ourProduct.map((item, i) => (
              <>
                <li
                  className="productsItem"
                  key={i}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  className={i === imgHover && 'activeItem'}
                  onMouseEnter={() => setItemHover(i)}
                  onMouseLeave={() => setItemHover('')}
                >
                  {item.name}
                </li>
              </>
            ))}
        </ul>
      </div>
      <div className="product-image">
        <ul>
          {ourProduct &&
            ourProduct.length &&
            ourProduct.map((item, i) => (
              <>
                <li
                  className="img"
                  key={i}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  className={i === itemHover && 'activeImg'}
                  onMouseEnter={() => setImgHover(i)}
                  onMouseLeave={() => setImgHover('')}
                >
                  <img src={item.image} alt="pic" />
                </li>
              </>
            ))}
        </ul>
      </div>
    </div>
  )
}
export default OurProduct
