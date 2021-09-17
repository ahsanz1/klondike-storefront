import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.scss'
// import { AppContext } from 'libs/context'
// import useRemoveFromCart from 'libs/api-hooks/useRemoveFromCart'
// import useUpdateCart from 'libs/api-hooks/useUpdateCart'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import { InputNumber } from 'antd'
import Button from 'components/atoms/button'
// import ImageOnlyButton from 'components/atoms/image-only-button'
// import Link from 'components/atoms/link'

const DesktopCartPageItem = props => {
  // const { apiButtonCalled } = useContext(AppContext)
  //   const [removing, setRemoving] = useState(false)
  //   const { removeFromCart, error } = useRemoveFromCart()
  //   const { updateCartApiCall } = useUpdateCart()
  const [quantity, setQuantity] = useState(1)

  //   const removeItem = async () => {
  //     setRemoving(true)
  //     // await removeFromCart(lineItemId)
  //     setRemoving(false)
  //     if (!error || error) {
  //       setRemoving(false)
  //     }
  //   }

  const onChange = value => {
    setQuantity(value)
  }

  return (
    <div className="product">
      <div className="cart-item">
        <div className="product-disc-and-image">
          <Image
            src={props['Image URL'] || props['Image 1 URL']}
            className="cart-item-image"
          />
          <div className="item-desc">
            <Label className="item-title">{props.title}</Label>

            <Label className="item-info">
              PART NUM: <p className="item-subInfo">{props['Part Number']}</p>
            </Label>

            <Label className="item-info">
              SIZE: <p className="item-subInfo">{props['Package Size']}</p>
            </Label>

            <Label className="item-info">
              PER CASE: <p className="item-subInfo">{props['Base Price']}</p>
            </Label>
          </div>
        </div>
        <div className="product-price-info">
          <Label className="product-price">
            <p className="product-price-mobile">PRICE</p>${props['Base Price']}
          </Label>
          <div className="quantity-box">
            {/* <Label className="items-quanity">{quantity}</Label>
            <div className="quantity-buttons">
              <ImageOnlyButton
                onClick={() => updateCartApiCall(itemId, 1)}
                id={itemId}
                imgSrc="/static/icons/arrow-up.png"
                // imgAlt={imageAlt}
                className="quantity-increase-btn"
              />
              <ImageOnlyButton
                onClick={() => updateCartApiCall(itemId, -1)}
                id={itemId}
                imgSrc="/static/icons/arrow-down.png"
                disabled={quantity === 1}
                className="quantity-increase-btn"
              />
            </div> */}
            <div>
              <p className="product-quantity-mobile">QTY:</p>
              <InputNumber
                className="product-quantity-spinner"
                min={1}
                max={1000}
                defaultValue={props.quantity}
                onChange={onChange}
              />
            </div>
          </div>
          <Label className="total-price">
            <p className="product-total-mobile">TOTAL PRICE</p>$
            {(quantity * props['Base Price']).toFixed(2)}
          </Label>
        </div>
      </div>
      <div className="removebtn-div">
        <Button
          className="remove-button"
          //   onClick={removeItem}
          //   disabled={removing && true}
        >
          {/* {removing ? 'Removing' : 'Remove'} */}
        </Button>
      </div>
    </div>
  )
}
DesktopCartPageItem.propTypes = {
  itemId: PropTypes.number,
  lineItemId: PropTypes.number,
  'Image URL': PropTypes.string,
  'Image 1 URL': PropTypes.string,
  title: PropTypes.string,
  'Package Size': PropTypes.string,
  'Part Number': PropTypes.string,
  'Base Price': PropTypes.number,
  quantity: PropTypes.number,
  totalBars: PropTypes.number,
  partnum: PropTypes.number,
  percase: PropTypes.number,
}

export default DesktopCartPageItem
