/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context'
import Link from 'components/atoms/link'
import Button from 'components/atoms/button'
import './style.scss'

const OurProduct = props => {
  const [itemHover, setItemHover] = useState('')
  const [imgHover, setImgHover] = useState('')
  const [sectionWidth, setSectionWidth] = useState(false)

  useEffect(() => {
    props.ourProduct &&
      props.ourProduct.some(
        item => item.image && item.image.url && setSectionWidth(true),
      )
  })
  const { setPlpRedirect } = useContext(AppContext)
  console.log('products:', props.ourProduct)
  return (
    <div className={!sectionWidth ? 'show-products-image' : 'show-products'}>
      <div className="product-list">
        <ul>
          {props.ourProduct &&
            props.ourProduct.length > 0 &&
            props.ourProduct.map((item, i) => (
              <>
                <li
                  className="productsItem"
                  key={i}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  className={i === imgHover && 'activeItem'}
                  onMouseEnter={() => setItemHover(i)}
                  onMouseLeave={() => setItemHover('')}
                  onClick={props.clickHandler}
                >
                  <Link to={item.url}>
                    <Button
                      onClick={() =>
                        setPlpRedirect(item && item.label && item.label)
                      }
                    >
                      {item.label}
                    </Button>
                  </Link>
                </li>
              </>
            ))}
        </ul>
      </div>
      <div className="product-image">
        <ul>
          {props.ourProduct &&
            props.ourProduct.length &&
            props.ourProduct.map((item, i) => (
              <>
                {item.image.url && (
                  <li
                    className="img"
                    key={i}
                    // eslint-disable-next-line react/jsx-no-duplicate-props

                    onMouseEnter={() => setImgHover(i)}
                    onMouseLeave={() => setImgHover('')}
                    onClick={() => props.clickHandler('')}
                  >
                    <div className={i === itemHover ? 'activeImg' : 'img-div'}>
                      <Link to={item.url}>
                        <Button
                          onClick={() =>
                            setPlpRedirect(item && item.label && item.label)
                          }
                        >
                          <img src={item.image.url} alt="pic" />
                        </Button>
                      </Link>
                    </div>
                  </li>
                )}
              </>
            ))}
        </ul>
      </div>
    </div>
  )
}
OurProduct.propTypes = {
  ourProduct: PropTypes.array,
  clickHandler: PropTypes.func,
  menuToggle: PropTypes.func,
}
export default OurProduct
