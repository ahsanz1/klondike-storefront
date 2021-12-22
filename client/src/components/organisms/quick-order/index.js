/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useContext } from 'react'
import useWindowSize from 'libs/custom-hooks/useWindowSize'

import './style.scss'
import { Radio, InputNumber, Modal } from 'antd'
import Label from 'components/atoms/label'
import PackageOrder from 'components/organisms/quick-order/package-order/index'
import BulkOrder from 'components/organisms/quick-order/bulk-order/index'
import AccordionComponent from 'components/molecules/accordionComponent'
import Link from 'components/atoms/link'
import { fetchItems } from 'libs/services/algolia'
import { addProductToCart } from 'libs/services/api/pdp.api'
import { AppContext } from 'libs/context'
import Button from 'components/atoms/button'
import { setUserCart } from 'libs/utils/user-cart'
import { removeItemFromCart, updateCartApi } from 'libs/services/api/cart'
import { getItemsBySkus } from 'libs/services/api/item'
import { checkItemsInStock } from 'libs/utils/checkInventory'
/* eslint-disable indent */

const QuickOrder = () => {
  const [size] = useWindowSize()
  const {
    user,
    showModal,
    setGetCartItemsState,
    getCartItems,
    creditLimit,
  } = useContext(AppContext)

  const [bulkComponent, setBulkComponent] = useState(false)
  const [packageComponent, setPackageComponent] = useState(true)
  const [bulkData, setBulkData] = useState([])
  const [packageData, setPacakageData] = useState([])

  const [packgdata, setPackgdata] = useState([])
  const [inputList, setInputList] = useState([{ partnumber: '', quantity: '' }])
  const [accordianisActive, setAccordianIsActive] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  let [caseqty, setCaseqty] = useState([])
  let qtyIndex = {}

  let [qtyerror, setQtyError] = useState(false)
  let [inputchange, setInputchange] = useState(false)
  const [removeItem, setRemoveItem] = useState(false)
  const [indexState, setIndexState] = useState(0)
  const [isPackage, setIsPackage] = useState()
  const [hasCartData, setHasCartData] = useState(false)
  const [cartItemQty, setCartItemQty] = useState(null)

  const ENTER_KEY = 'Enter'

  useEffect(() => {
    if (getCartItems && getCartItems.items && getCartItems.items.length > 0) {
      if (getCartItems?.hasPackaged) {
        setIsPackage(true)
      } else {
        setIsPackage(false)
      }

      setHasCartData(true)
    } else {
      setHasCartData(false)
    }
  }, [getCartItems])

  const error = err => {
    Modal.error({
      title: 'This is an error message',
      content: err
        ? err
        : 'Due to some technical reasons, this request cannot be sent.',
    })
  }

  const handleAccordianClick = () => {
    setAccordianIsActive(!accordianisActive)
  }

  const addItemToCart = async () => {
    let obj = {}
    let price = 0
    let skus = []
    let items = []
    let existingAmount = parseFloat(getCartItems?.totalAmount?.amount)

    setAddingToCart(true)

    inputList.map((data, i) => {
      if (data !== undefined) {
        skus.push(data?.partnumber)
        obj[data?.partnumber] = data?.quantity
        price += data?.price * data?.quantity
      }
    })

    // Check for credit limit
    if (packageComponent && creditLimit <= Math.floor(existingAmount + price)) {
      error('You are exceeding your credit limit.')
    }

    let skuRes = await getItemsBySkus(skus)

    if (skuRes.hasError === true) {
      setPackgdata([])
      setAddingToCart(false)
      error(skuRes.response.error)
      setInputList([{ partnumber: '', quantity: '' }])
      return
    }

    skuRes.data.map(async (item, i) => {
      let itemObj = {
        extra: {},
        group: item.group,
        itemId: item.itemId,
        sku: item.sku,
        quantity: obj[item.sku],
        price: {
          base: 0,
          currency: 'USD',
          sale: false,
          discount: {
            price: 0,
          },
        },
        size: false,
      }

      items.push(itemObj)
    })

    let payload = {
      cartId: null,
      items,
      registeredUser: true,
      userAuthToken: user.accessToken,
    }

    let stockRes = await checkItemsInStock(items)

    if (stockRes?.length) {
      if (stockRes.length === 1) {
        error(`Part number ${stockRes[0].sku} is out of stock.`)
      } else {
        error(
          `Part numbers ${stockRes.map(
            item => `${item.sku}`,
          )} are out of stock.`,
        )
      }
      setPackgdata([])
      setAddingToCart(false)
      setInputList([{ partnumber: '', quantity: '' }])
      return
    }

    let cartRes = await addProductToCart(payload)

    if (cartRes.hasError === true) {
      setPackgdata([])
      setAddingToCart(false)
      let outOfStockItems = []
      /**
       * NOTE: cart response for out of stock items only tells which itemIds are out of stock, which is
       * not meaningful info for user, therefore this temporary solution for communicating proper out
       * of stock SKUs to user is implemented. This should be removed in future, once a more robust solution
       * is found
       */
      if (cartRes.response?.error?.includes('not in stock')) {
        const errorTokens = cartRes.response.error.split(' ')
        for (let i = 0; i < errorTokens.length; i++) {
          if (errorTokens[i].includes(',')) {
            const itemIds = errorTokens[i].split(',')
            for (let j = 0; j < itemIds.length; j++) {
              const outOfStockItem = payload.items.find(
                item => item.itemId == itemIds[j],
              )
              if (outOfStockItem) {
                outOfStockItems.push(outOfStockItem)
              }
            }
          } else {
            const outOfStockItem = payload.items.find(
              item => item.itemId == errorTokens[i],
            )
            if (outOfStockItem) {
              outOfStockItems.push(outOfStockItem)
            }
          }
        }
      }
      if (outOfStockItems.length > 1) {
        error(
          `Part numbers ${outOfStockItems.map(
            item => `${item.sku}`,
          )} are out of stock.`,
        )
      } else if (outOfStockItems.length === 1) {
        error(`Part number ${outOfStockItems[0].sku} is out of stock.`)
      } else {
        error(cartRes.response.error)
      }
      setInputList([{ partnumber: '', quantity: '' }])
      return
    }

    setPackgdata([])
    setAddingToCart(false)
    setInputList([{ partnumber: '', quantity: '' }])
    setGetCartItemsState(await setUserCart())
  }

  const itemremove = async (i, data) => {
    setIndexState(i)
    setRemoveItem(true)

    let response = await removeItemFromCart(data?.cartIdString, data.lineItemId)

    if (response.error === false) {
      setGetCartItemsState(await setUserCart())
      setRemoveItem(false)
    } else {
      error(response.message)
    }
  }

  const onChangeqty = async (value, i, item) => {
    setIndexState(i)
    setInputchange(true)

    let totalAmount = 0
    let existingAmount = getCartItems?.totalAmount?.amount

    if (item?.quantity > value) {
      // minimizing
      totalAmount = 0
    } else {
      let nQty = Math.abs(item?.quantity - value)
      totalAmount = Math.floor(existingAmount + item?.price?.base * nQty)
    }

    if (getCartItems?.hasPackaged && creditLimit <= totalAmount) {
      error('You are exceeding your credit limit')
    }

    let updateCartPayload = {
      items: [
        {
          lineItemId: item.lineItemId,
          itemId: item.itemId,
          quantity: value === '' ? 0 : value,
          price: item.price,
        },
      ],
    }

    let response = await updateCartApi(item?.cartIdString, updateCartPayload)

    if (response.error === false) {
      setGetCartItemsState(await setUserCart())
    } else {
      error(response.message)
    }

    setInputchange(false)
  }

  const handleRemove = index => {
    const list = [...inputList]
    const packList = packgdata

    packList.splice(index, 1)
    list.splice(index, 1)

    setInputList(list)
    setPackgdata(packList)
  }

  const handleChangePackageqty = async (e, index) => {
    setQtyError(false)
    let { name, value } = e.target
    if (value < 0) {
      value = value * -1
    }
    const list = [...inputList]
    list[index][name] = value

    if (qtyIndex.length > 0 && qtyIndex[`index-${index}`] === undefined) {
      qtyIndex = {
        ...caseqty,
        [`index-${index}`]: value,
      }
    } else {
      qtyIndex = {
        ...caseqty,
        [`index-${index}`]: value,
      }
    }
    setCaseqty(qtyIndex)
  }

  const handleChange = async (e, index) => {
    let bulkararr = []
    let packagearr = []
    let { name, value } = e.target
    let list = [...inputList]
    list[index][name] = value

    fetchItems(value, 500, 0, false).then(_list => {
      if (_list?.hits?.length > 0) {
        _list.hits.map((datas, i) => {
          if (datas['isVariant'] === true) {
            if (datas['Packaged Order'] === true) {
              let packageorder = {
                label: datas['Part Number'],
                value: datas['Part Number'],
                ...datas,
              }
              packagearr.push(packageorder)
            } else {
              let bulkorder = {
                label: datas['Part Number'],
                value: datas['Part Number'],
                ...datas,
              }
              bulkararr.push(bulkorder)
            }

            list[index]['price'] =
              datas['SKU'] === value ? datas['Base Price'] : 0
          }
        })

        setBulkData(bulkararr)
        setPacakageData(packagearr)
      }
    })

    setInputList(list)
  }

  const handleChangeBulk = async (e, index) => {
    setQtyError(false)
    let { name, value } = e.target
    if (value < 0) {
      value = value * -1
    }
    const list = [...inputList]
    list[index][name] = value

    if (qtyIndex.length > 0 && qtyIndex[`index-${index}`] === undefined) {
      qtyIndex = {
        ...caseqty,
        [`index-${index}`]: value,
      }
    } else {
      qtyIndex = {
        ...caseqty,
        [`index-${index}`]: value,
      }
    }

    setCaseqty(qtyIndex)
  }

  const handleAddRow = () => {
    if (inputList[0].partnumber.length > 0 && inputList[0].quantity > 0) {
      setInputList([...inputList, { partnumber: '', quantity: '' }])
    }
    inputList[0].quantity <= 0 && setQtyError(true)
  }

  const radioChangeBULK = () => {
    setPackgdata([])
    setIsPackage(false)
    setPackageComponent(false)
    setBulkComponent(true)
    setInputList([{ partnumber: '', quantity: '' }])
  }

  const radioChangePACKAGE = e => {
    setPackgdata([])
    setIsPackage(true)
    setBulkComponent(false)
    setPackageComponent(true)
    setInputList([{ partnumber: '', quantity: '' }])
  }

  const OrderType = () => {
    if (packageComponent) {
      return (
        <div className="wrapper">
          <AccordionComponent
            text="Order by Part Number"
            className="accordian"
            isActive={accordianisActive}
            onClick={handleAccordianClick}
          >
            <PackageOrder
              value={'Part Number'}
              handleChangePackage={handleChange}
              handleChangePackageqty={handleChangePackageqty}
              handleAddtoCart={addItemToCart}
              productstitle={packageData}
              inputList={inputList}
              handleAddRow={handleAddRow}
              handleRemoveClick={handleRemove}
              addingToCart={addingToCart}
              qtyerror={qtyerror}
            />
          </AccordionComponent>
        </div>
      )
    } else if (bulkComponent) {
      return (
        <div className="wrapper">
          <AccordionComponent
            text="Order by Part Number"
            className="accordian"
            isActive={accordianisActive}
            onClick={handleAccordianClick}
          >
            <BulkOrder
              value={'Part Number'}
              handleChangePackage={handleChange}
              handleChangePackageqty={handleChangeBulk}
              handleAddtoCart={addItemToCart}
              bulkdata={bulkData}
              inputList={inputList}
              qtyerror={qtyerror}
              handleAddRow={handleAddRow}
              handleRemoveClick={handleRemove}
              addingToCart={addingToCart}
            />
          </AccordionComponent>
        </div>
      )
    }
  }

  const TotalCartPrice = () => {
    return (
      <div className="checkout-and-pricelist">
        <div className="price-list-btn">
          <Link className="price-list-text" to="/price-list">
            View Price List
          </Link>
        </div>
        {getCartItems?.totalAmount?.amount > 0 ? (
          <div className="checkout">
            <div className="order-price">
              <Label className="sub-total">Order Total</Label>
              <Label className="total">
                <span>
                  $
                  {Number(
                    parseFloat(
                      getCartItems?.totalAmount?.amount || 0.0,
                    ).toFixed(2),
                  ).toLocaleString()}
                </span>
              </Label>
            </div>
            <div className="checkout-links">
              <Link className="checkout-btn" to="/Checkoutsection">
                PROCEED TO CHECK OUT
              </Link>
              <div className="view-btn" to="/cart">
                <Button onClick={showModal}>VIEW CART </Button>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }

  const handleCartItemQtyChange = qty => {
    setCartItemQty(qty)
  }

  const onSubmitUpdatedQty = (e, i, item) => {
    if (e && e.key === ENTER_KEY) {
      onChangeqty(e.target.value, i, item)
    }
  }

  return (
    <>
      <div className="quick-order-wrapper">
        <div className="order-total-and-list">
          <div className="orderComponent">
            {/* ^^^^Order list and order component div excluding orderTotal */}
            <div className="radio-wrapper">
              <Radio.Group
                value={isPackage === undefined ? 1 : !isPackage ? 2 : 1}
                className="radio-group"
              >
                <Radio
                  className={'radiobtn'}
                  value={1}
                  disabled={hasCartData ? !isPackage : false}
                  onChange={radioChangePACKAGE}
                >
                  PACKAGED ORDER
                </Radio>

                <Radio
                  className="radiobtn"
                  value={2}
                  disabled={hasCartData ? isPackage : false}
                  onChange={radioChangeBULK}
                >
                  BULK ORDER
                </Radio>
              </Radio.Group>
            </div>
            {OrderType()}
            {getCartItems && getCartItems?.items?.length > 0 && (
              <div className="wrapper itemList">
                <span className="list-items-catagory">
                  <Label className="catagory-label">Item</Label>
                  <Label className="catagory-label">Price</Label>
                  <Label className="catagory-label">Qty</Label>
                  <Label className="catagory-label">Subtotal</Label>
                </span>
              </div>
            )}

            {getCartItems && (
              <div className="quickorder-wrapper">
                <div className="item_count_mobile">
                  {getCartItems?.items?.length > 0 && (
                    <Label className="item-count">
                      <i className="fas fa-check" aria-hidden="true"></i>
                      You added
                      {` ${getCartItems?.items.length} ${
                        getCartItems?.items.length < 2
                          ? ' new item '
                          : ' new items '
                      }`}
                      to your cart
                    </Label>
                  )}
                </div>
                {getCartItems &&
                  getCartItems?.items?.length > 0 &&
                  getCartItems?.items.map((item, i) => {
                    if (item !== undefined) {
                      return size > 768 ? (
                        <div key={i} className="orders">
                          <div className="item-wraper">
                            <div>
                              <div className="img-wraper">
                                <img src={item?.image} alt="img" />
                              </div>
                              <button
                                className="quick-orde_btn"
                                onClick={e => itemremove(i, item)}
                              >
                                {removeItem && indexState === i
                                  ? 'Removing...'
                                  : 'Remove Item'}
                              </button>
                            </div>
                            <div className="part-wraper">
                              <div className="quik-product-heading">
                                <p>{item?.title}</p>
                              </div>
                              <div>
                                <p>
                                  Part Num
                                  <span className="quick-item-description">
                                    {item?.partnumber}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p>
                                  Size
                                  <span className="quick-item-description">
                                    {item?.size}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p>
                                  {item?.percase ? 'PER CASE' : ''}
                                  <span className="quick-item-description">
                                    {item?.percase}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="quickorder-Price">
                              $
                              {Number(
                                item?.price?.base.toFixed(2),
                              ).toLocaleString() || ''}
                            </p>
                          </div>
                          <div style={{ position: 'relative' }}>
                            {inputchange && indexState === i && (
                              <span
                                className="input-number"
                                style={{ position: 'absolute', top: '-24px' }}
                              >
                                Please Wait...
                              </span>
                            )}
                            <InputNumber
                              min={0}
                              type="number"
                              value={item?.quantity}
                              onChange={e => onChangeqty(e, i, item)}
                              size="middle"
                              className="qty-update-input-desktop"
                              disabled={inputchange}
                              onKeyDown={e => e.preventDefault()}
                            />
                          </div>
                          <div>
                            <p className="quickorder-Price subtotal-color">
                              $
                              {Number(
                                item?.totalPrice?.amount.toFixed(2),
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <div className="quick-order-mobile">
                              <div className="quick-order-mobile__previous">
                                <img
                                  className="quick-order-mobile__image"
                                  src={item?.image}
                                  alt="img"
                                />
                              </div>
                              <div className="quick-order_mobile_wrapper">
                                <p className="quick-mobile-title">
                                  {item?.title}
                                </p>
                                <div className="quick-order-mobile__next-container">
                                  <p>
                                    SIZE
                                    <span className="span">{item?.size}</span>
                                  </p>
                                  {item?.percase && (
                                    <p>
                                      {item?.percase ? 'PER CASE' : ''}
                                      <span className="span">
                                        {item?.percase}
                                      </span>
                                    </p>
                                  )}
                                  <p>
                                    PART NUM
                                    <span className="span">
                                      {item?.partnumber}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="quantity-container">
                              <div className="price-wrapper">
                                <p className="price white">PRICE</p>
                                <p className="price-value">
                                  $
                                  {Number(
                                    item?.price?.base.toFixed(2),
                                  ).toLocaleString() || ''}
                                </p>
                              </div>
                              <div className="remove-button">
                                <p>
                                  <span className="quantity white">QTY:</span>
                                  <InputNumber
                                    min={0}
                                    type="number"
                                    defaultValue={item?.quantity}
                                    value={cartItemQty || item?.quantity}
                                    onChange={value =>
                                      handleCartItemQtyChange(value)
                                    }
                                    size="middle"
                                    className="input"
                                    onKeyDown={e =>
                                      onSubmitUpdatedQty(e, i, item)
                                    }
                                  />
                                </p>
                                <button
                                  className="quick-orde_btn"
                                  onClick={e => itemremove(i, item)}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="Total_price">
                                <p className="total-price white">TOTAL PRICE</p>
                                <p className="total-price-value">
                                  $
                                  {Number(
                                    item?.totalPrice?.amount.toFixed(2),
                                  ).toLocaleString() || ''}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    }
                  })}
              </div>
            )}
          </div>

          {getCartItems && <TotalCartPrice />}
        </div>
      </div>
    </>
  )
}

export default QuickOrder
