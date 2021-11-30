/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Image from 'components/atoms/image'
// import Label from 'components/atoms/label'
// import StyledButton from 'components/atoms/styled-button'
// import ProdItemDropdown from 'components/atoms/product-item-dropdown'
import Link from 'components/atoms/link'

// import { subscribeItems } from 'libs/data/data'
// import useAddToCart from 'libs/api-hooks/useAddToCart'
import { productListingClick } from 'libs/utils/gtm'

import './style.scss'

const ProductItem = ({ item, id }) => {
  console.log('check item:', item)
  // const { addToCartApiCall } = useAddToCart()
  // const [adding, setAdding] = useState(false)
  const [addToCartButtonText, setAddToCartButtonText] = useState('ADDING...')
  // const [selectSubscription, setSelectSubscription] = useState(false)
  // const [subDiscount, setSubDiscount] = useState(0)
  // const [subscriptionData, setSubscriptionData] = useState({})

  // const colors = (item && item.themeColor && item.themeColor.split('|')) || []
  // const isCustom = item && item.isCustom
  // const subscription = item.Category !== 'Swag'
  const titles = item.title && item.title.split('&')
  // const subscribeItems = [
  //   {
  //     label: 'One-Time Purchase',
  //     disabled: false,
  //   },
  //   {
  //     label: 'Subscribe & Save 10%',
  //     disabled: true,
  //   },
  // ]

  useEffect(() => {
    setAddToCartButtonText(addToCartButtonText)
  }, [addToCartButtonText])

  // const subscriptionPrice = obj => {
  //   if (obj.discount) {
  //     setSubDiscount(obj.discount)
  //     setSubscriptionData(obj)
  //     setSelectSubscription(true)
  //   } else {
  //     setSubDiscount(0)
  //     setSubscriptionData({})
  //     setSelectSubscription(false)
  //   }
  // }

  // const addedItemToCart = async Data => {
  //   setAdding(true)
  //   const resData = await addToCartApiCall(Data)
  //   if (resData.error) {
  //     setAddToCartButtonText('FAILED')
  //     setTimeout(() => {
  //       setAdding(false)
  //       setAddToCartButtonText('ADDING...')
  //     }, 500)
  //   } else {
  //     if (resData && resData.data) {
  //       setAddToCartButtonText('ADDED')
  //       setTimeout(() => {
  //         setAdding(false)
  //         setAddToCartButtonText('ADDING...')
  //       }, 500)
  //     }
  //   }
  // }

  // const handleChangeSubscription = event => {
  //   subscriptionPrice(event)
  // }

  // const renderSubcriptionPrice = () => {
  //   const basePrice = item['Base Price']
  //   const discountPercent = (100 - subDiscount) / 100

  //   const calcPrice = `$${(basePrice * discountPercent).toFixed(2)}`

  //   return calcPrice
  // }

  // const handleAddToCart = () => {
  //   if (item.hasInventory) {
  //     const _item = { ...item }
  //     const priceListId = item.subscriptions.length
  //       ? +subscriptionData.products[0].priceListId
  //       : 0
  //     priceListId && (_item.priceListId = priceListId)

  //     const cartItem = {
  //       ..._item,
  //       ...(selectSubscription && subscriptionData),
  //     }

  //     addedItemToCart({ ...cartItem })
  //   }
  // }

  // const renderSalePrice = () => {
  //   if (item && item['Sale Price']) {
  //     return `$${parseFloat(item['Sale Price']).toFixed(2)}`
  //   }
  // }

  return (
    <div className="product">
      <div className="product-img">
        <Link
          to={`/PDP?sku=${item.sku}`}
          onClick={() => productListingClick(item)}
        >
          <Image src={item && item['Image 1 URL'] && item['Image 1 URL']} />
        </Link>
      </div>
      {titles.length > 0 && (
        <h3
          className="product-title"
          style={{ marginBottom: titles.length > 1 && '0' }}
        >
          <Link className="notranslate" to={`/PDP?sku=${item.sku}`}>
            {titles[0] && titles[0]}
            {titles.length > 1 ? ' & ' : ''}
          </Link>
        </h3>
      )}
      {titles.length > 1 && (
        <h3 className="product-title">
          <Link to={`/PDP?sku=${item.sku}`}>{titles[1] && titles[1]}</Link>
        </h3>
      )}

      {/* <Label className="product-p">
        <Link to="/">
          <span className={item && item['Sale Price'] ? `stroke-discount` : ''}>
            {currencySymbol}
            {item &&
              item['Order Price'] &&
              `$${parseFloat(item['Base Price']).toFixed(2)}`}
          </span>
          <span className="sale-price sp-margin">
            {selectSubscription ? renderSubcriptionPrice() : renderSalePrice()}
          </span>
        </Link>
        <span
          className={
            item && item['Sale Price']
              ? `sale-price only-option`
              : `only-option`
          }
        >
          {item && item.TotalBars && `( ${item.TotalBars} BARS )`}
        </span>
      </Label> */}
      {/* {!viewProduct && ( */}
      {/* {subscription && (
        <div className="drop-section">
          {isCustom || item.subscriptions.length < 1 ? (
            <div className="oneTime_btn">
              <Label>
                {isCustom ? 'Requires customization' : 'One-Time Purchase'}
              </Label>
            </div>
          ) : (
            <ProdItemDropdown
              items={[...subscribeItems, ...item.subscriptions]}
              className="product-dropdown"
              optionClassName="dropdown-options"
              disabledOptionStyle={{
                borderTop: '1px solid #e9ecef',
              }}
              onChange={event => handleChangeSubscription(event)}
            />
          )}
        </div>
      )} */}
      {/* )} */}

      {/* {importantNote && (
        <Label className="plp-important-note">{importantNote}</Label>
      )}  */}
      {/* {item && !item.hasVariants && !isCustom && item.Category !== 'Swag' ? (
        <StyledButton
          className="product-btn"
          disabled={adding}
          color={
            item.Category === 'VARIETIES + DEALS' ||
            (item.hasVariants && !isCustom)
              ? '#000'
              : colors[0] || '#000'
          }
          onClick={() => handleAddToCart()}
        >
          {item && item.hasInventory
            ? adding
              ? addToCartButtonText
              : 'Quick Add'
            : 'Out of Stock '}
        </StyledButton>
      ) : (
        <Link to={`/products?sku=${item.sku}`}>
          <StyledButton
            className="product-btn"
            color={
              item.Category === 'VARIETIES + DEALS' ||
              (item.hasVariants && isCustom)
                ? '#000'
                : colors[0] || '#000'
            }
          >
            {(item.hasVariants || item.Category === 'Swag') && !isCustom
              ? 'VIEW PRODUCT'
              : 'CUSTOMIZE'}
          </StyledButton>
        </Link>
      )} */}
    </div>
  )
}

ProductItem.propTypes = {
  title: PropTypes.string,
  mainImage: PropTypes.string,
  price: PropTypes.number,
  size: PropTypes.string,
  salePrice: PropTypes.number,
  buttonColor: PropTypes.string,
  item: PropTypes.object,
  subscription: PropTypes.bool,
  customize: PropTypes.bool,
  viewProduct: PropTypes.bool,
  currencySymbol: PropTypes.string,
  id: PropTypes.number,
}

export default ProductItem
