/* eslint-disable indent */
import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context/index'
import { Alert, message, Radio, Skeleton } from 'antd'
import { useLocation, useNavigate } from '@reach/router'
import StarRatings from 'react-star-ratings'

import Heading from 'components/atoms/heading'
import ProdItemNativeDropdown from 'components/atoms/product-item-native-dropdown'
import StyledButton from 'components/atoms/styled-button'
import Label from 'components/atoms/label'

import Container from 'components/molecules/container'
import PDPSlider from 'components/molecules/product-description-page/product-slider'
import PdpItemQuantityControls from 'components/molecules/product-description-page/item-quantity-controls'
import PDPTabs from 'components/molecules/product-description-page/pdp-tabs'
import CustomizeTheBox from 'components/molecules/product-description-page/customize-the-box'
import StyledPdpSvg from 'components/molecules/product-description-page/styled-pdp-svg'
import PDPImagePopup from 'components/molecules/product-description-page/pdp-image-popup'

import CardsGroup from 'components/organisms/cards-group'

import useProductDetails from 'libs/api-hooks/useProductDetails'
import { productView } from 'libs/utils/gtm'
import useAddToCart from 'libs/api-hooks/useAddToCart'

import { StyledRadio } from './constants'
import {
  getAttributesbyId,
  addAttributeToCartItem,
} from 'libs/services/api/attributes-apis'
import { benefits, bodyNutrients, badStuff, perfect } from './7BarSamplerData'

import './styles.scss'

const ProductDescription = ({ sku }) => {
  const { user } = useContext(AppContext)
  const location = useLocation()
  const navigate = useNavigate()
  const [size, setSize] = useState()
  const { addToCartApiCall } = useAddToCart()
  const [quantity, setQuantity] = useState(1)
  const [purchaseType, setPurchaseType] = useState(0)
  const [isCustomValid, setIsCustomValid] = useState(false)
  const [subscriptionData, setSubscriptionData] = useState({})
  const [subDiscount, setSubDiscount] = useState(10)

  const [configuredCase, setConfiguredCase] = useState([])
  const {
    currentProduct,
    rawProduct,
    changeProduct,
    productNotFound,
    fetchProduct,
  } = useProductDetails()
  const [addItemToCart, setAddItemToCart] = useState(false)
  const [addToCartButtonText, setAddToCartButtonText] = useState('ADDING...')
  const [openPopup, setOpenPopup] = useState(false)
  const [popupImage, setPopupImage] = useState('')
  const [attributeId, setAttributeId] = useState('')

  useEffect(() => {
    if (size) {
      changeProduct(currentProduct.sizes[size])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  useEffect(() => {
    fetchProduct(
      sku && sku.length > 0
        ? sku
        : new URLSearchParams(location.search).get('sku'),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sku])

  useEffect(() => {
    const findWholeSale =
      rawProduct &&
      rawProduct.attributes &&
      rawProduct.attributes.find(att => att.name === 'wholesale')
    if (
      findWholeSale &&
      findWholeSale.value &&
      (!user || (user && !user.isWholeSaleUser))
    ) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawProduct])

  useEffect(() => {
    rawProduct && Object.keys(rawProduct).length > 0 && productView(rawProduct)
  }, [rawProduct])

  // const customize = false
  // const subscribeItems = [
  //   {
  //     id: 0,
  //     label: 'One-Time Purchase',
  //     value: 'oneTimePurchase',
  //     disabled: false,
  //   },
  //   {
  //     id: 1,
  //     label: 'Ship Every Week',
  //     value: 'ShipEveryWeek',
  //     disabled: false,
  //   },
  // ]

  useEffect(() => {
    setAddToCartButtonText(addToCartButtonText)
  }, [addToCartButtonText])

  const handleImageClick = image => {
    setPopupImage(image)
    setTimeout(() => {
      setOpenPopup(true)
    }, 300)
  }

  const handleCloseImagePopup = () => {
    setOpenPopup(false)
  }

  const addedItemToCart = async Data => {
    setAddItemToCart(true)
    const resData = await addToCartApiCall(Data)
    if (resData.error) {
      setAddToCartButtonText('FAILED')
      setTimeout(() => {
        setAddItemToCart(false)
        setAddToCartButtonText('ADDING...')
      }, 500)
    } else {
      if (resData && resData.data) {
        setAddToCartButtonText('ADDED')
        setTimeout(() => {
          setAddItemToCart(false)
          setAddToCartButtonText('ADDING...')
        }, 500)
        if (isCustom && attributeId) {
          let { _id, items } = resData.data
          let item =
            items &&
            items.filter(a => {
              if (a.title === 'Custom Case' || a.title === 'CUSTOM CASE') {
                return a
              }
              return []
            })
          const { lineItemId } = item && item[0]

          setAttributeToCartItem(_id, lineItemId)
        }
      }
    }
  }

  const setAttributeToCartItem = async (cartId, lineItemId) => {
    // eslint-disable-next-line no-unused-vars
    var cases = ''
    configuredCase.forEach(({ flavor, quantity }) => {
      cases += `${flavor}\n${quantity},\n`
    })
    const resData = await addAttributeToCartItem(
      cartId,
      lineItemId,
      attributeId,
      cases,
    )
    if (!resData.hasError) {
      console.log('pop', resData)
    }
  }

  const {
    itemId,
    title,
    imageUrls,
    price,
    descriptions,
    sizes,
    inStock,
    totalBars,
    colors,
    isCustom,
    ingredientsSvg,
    customCaseS,
    subscriptions,
  } = currentProduct

  const titles = title && title.split('&')
  useEffect(() => {
    if (itemId && isCustom) {
      getAttributesFromItem(itemId)
    }
  }, [itemId, isCustom])

  const getAttributesFromItem = async itemId => {
    let ids = []
    ids.push(itemId)
    const resData = await getAttributesbyId(ids)
    if (!resData.hasError) {
      const { attributes } =
        resData && resData.response[0] && resData.response[0]
      let attr =
        attributes &&
        attributes.filter(a => {
          if (a.name === 'Custom Case') return a
        })
      const { _id } = attr && attr[0]
      setAttributeId(_id)
    }
  }

  const renderSubcriptionPrice = () => {
    if (price.sale) {
      const discountPercent = (100 - subDiscount) / 100
      const calcPrice = `${(price.sale * discountPercent).toFixed(2)}`
      return calcPrice
    }
  }

  const handleAddToCart = () => {
    if (!(sizes ? size : true)) {
      message.error('Please select a size')
    }

    if (
      quantity &&
      inStock &&
      (sizes ? size : true) &&
      (isCustom ? isCustomValid : true)
    ) {
      const _item = { ...rawProduct }
      const priceListId = subscriptions.length
        ? +subscriptionData.products[0].priceListId
        : 0
      purchaseType === 1 && priceListId && (_item.priceListId = priceListId)

      const cartItem = {
        ..._item,
        size,
        quantity,
        purchaseType,
      }

      addedItemToCart({ ...cartItem })
    }
  }

  const subscriptionPrice = obj => {
    if (obj.discount) {
      setSubDiscount(obj.discount)
      setSubscriptionData(obj)
    } else {
      setSubDiscount(0)
      setSubscriptionData({})
    }
  }

  const handleChangeSubscription = event => {
    subscriptionPrice(event)
  }

  return (
    <Container color="#f7f7f7" className="product-description">
      {productNotFound && (
        <div
          style={{
            maxWidth: '1000px',
            margin: 'auto',
            marginBottom: '20px',
          }}
        >
          <Alert
            message="Product Not Found"
            description="Please try changing the product sku or try refreshing the page"
            type="error"
            showIcon
          />
        </div>
      )}
      <div className="whole-wrapper">
        <div className="pdp-slider">
          {imageUrls ? (
            <PDPSlider images={imageUrls} handleImageClick={handleImageClick} />
          ) : (
            <Skeleton.Image className="main-image-skeleton" active />
          )}
        </div>

        <PDPImagePopup
          image={popupImage}
          show={openPopup}
          handleCloseImagePopup={handleCloseImagePopup}
        />

        {imageUrls ? (
          <div className="pdp-details">
            <Heading className="product-title">
              {titles.map((title, i) => (
                <span
                  key={i}
                  style={{
                    color: colors[i] || 'black',
                  }}
                >
                  {title}
                  {titles.length > 0 && titles.length !== i + 1 ? ' & ' : ''}
                </span>
              ))}
            </Heading>
            {!(subscriptions && subscriptions.length > 0) && price && (
              <div className="label-price">
                <span>
                  {price.currency || 0}
                  <span>
                    {price.sale && price.sale > 0
                      ? parseFloat(price.sale).toFixed(2)
                      : price.base
                      ? parseFloat(price.base).toFixed(2)
                      : 0}
                  </span>
                </span>
              </div>
            )}
            {totalBars &&
              (isCustom && customCaseS ? (
                <Label className="quantity">CASE OF {totalBars}</Label>
              ) : (
                <Label className="quantity">{totalBars} Bars</Label>
              ))}
            {false && (
              <div className="rating-wrapper">
                <div className="starRating">
                  <StarRatings
                    rating={4.3}
                    starRatedColor="#ffb829"
                    starDimension="20px"
                    starSpacing="1px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <div className="review-title">5 reviews</div>
              </div>
            )}

            {isCustom && customCaseS && (
              <CustomizeTheBox
                onChange={(isValid, customCase) => {
                  setIsCustomValid(isValid)
                  setConfiguredCase(customCase)
                }}
                customCaseS={customCaseS}
              />
            )}

            {sizes &&
              Object.keys(sizes).map((key, index) => (
                <StyledButton
                  key={index}
                  className={`c-option ${key === size ? 'active' : ''}`}
                  onClick={() => {
                    setSize(key)
                  }}
                >
                  {key}
                </StyledButton>
              ))}

            {subscriptions && subscriptions.length > 0 && price && (
              <Radio.Group
                onChange={e => {
                  setPurchaseType(e.target.value)
                }}
                value={purchaseType}
                className="purchase-type"
              >
                <StyledRadio
                  value={0}
                  className="purchase-radio"
                  color={colors[0] || 'black'}
                >
                  <div className="label-price subscription">
                    <span>One-time purchase</span>
                    <span>
                      <span>{price.currency || 0}</span>
                      {price.sale && price.sale > 0
                        ? parseFloat(price.sale).toFixed(2)
                        : price.base
                        ? parseFloat(price.base).toFixed(2)
                        : 0}
                    </span>
                  </div>
                </StyledRadio>
                <StyledRadio
                  value={1}
                  className="purchase-radio"
                  color={colors[0] || 'black'}
                >
                  <div className="label-price subscription">
                    <span>Subscribe and save {subDiscount}%</span>
                    <span
                      style={{
                        color: '#1db638',
                      }}
                    >
                      <span>{price.currency || 0}</span>
                      {renderSubcriptionPrice()}
                    </span>
                  </div>
                </StyledRadio>
              </Radio.Group>
            )}
            {purchaseType === 1 && price && (
              <div
                style={{
                  marginLeft: '35px',
                }}
              >
                <ProdItemNativeDropdown
                  items={subscriptions}
                  className="subscription-select"
                  onChange={event => handleChangeSubscription(event)}
                />
              </div>
            )}
            <div className="pdp-controls">
              <PdpItemQuantityControls
                value={quantity}
                onChange={setQuantity}
              />
              <div className="pdp-add-cart-btn">
                <StyledButton
                  className="add-to-cart"
                  color={colors[0] || 'black'}
                  onClick={() => handleAddToCart()}
                >
                  {inStock === false
                    ? 'OUT OF STOCK'
                    : addItemToCart
                    ? addToCartButtonText
                    : 'ADD TO CART'}
                </StyledButton>
              </div>
            </div>
            {ingredientsSvg && (
              <div className="product-attributes">
                <StyledPdpSvg color={colors[1] || colors[0] || 'black'} />
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              width: '100%',
            }}
          >
            <div>
              <Skeleton active />
            </div>
            <div>
              <Skeleton active />
            </div>
          </div>
        )}
      </div>
      <div className="tabHolder">
        <PDPTabs descriptions={descriptions} className="tabs-p-d-p" />
      </div>
      {new URLSearchParams(location.search).get('sku') === '7BARSAMPLER' && (
        <div>
          <CardsGroup {...benefits} />
          <CardsGroup {...bodyNutrients} />
          <CardsGroup {...badStuff} />
          <CardsGroup {...perfect} />
        </div>
      )}
    </Container>
  )
}

ProductDescription.propTypes = {
  sku: PropTypes.string,
}

export default ProductDescription
