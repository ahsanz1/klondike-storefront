/* eslint-disable no-unneeded-ternary */
import React, { useEffect, useState, useContext } from 'react'
import useWindowSize from 'libs/custom-hooks/useWindowSize'

import './style.scss'
import { Radio, InputNumber, Modal } from 'antd'
import Label from 'components/atoms/label'
import PackageOrder from 'components/organisms/quick-order/package-order/index'
import BulkOrder from 'components/organisms/quick-order/bulk-order/index'
import AccordionComponent from 'components/molecules/accordionComponent'
// import DesktopCartPageItem from 'components/organisms/cart-and-total'
import Link from 'components/atoms/link'
import { fetchItems, searchFilters } from 'libs/services/algolia'
import { getProductBySKU, addProductToCart } from 'libs/services/api/pdp.api'
import { AppContext } from 'libs/context'
// import useAddToCart from 'libs/api-hooks/useAddToCart'
import Button from 'components/atoms/button'
import {
  getCartByUserId,
  removeItemFromCart,
  updateCartApi,
} from 'libs/services/api/cart'
import { getItemsBySkus } from 'libs/services/api/item'
/* eslint-disable indent */

const QuickOrder = () => {
  const [size] = useWindowSize()
  const {
    user,
    showModal,
    setGetCartItemsState,
    getCartItems,
    // setCartState,
  } = useContext(AppContext)

  const [packageComponent, setPackageComponent] = useState(true)
  const [bulkComponent, setBulkComponent] = useState(false)
  // const [radioStatePackage, setRadioStatePackage] = useState(false)
  // const [radioStateBulk, setRadioStateBulk] = useState(false)
  const [value, setValue] = useState(1)
  // const [qty, setQty] = useState([])
  const [cartItems, setCartItems] = useState()
  const [productstitle, setProductstitle] = useState([])
  const [packgdata, setPackgdata] = useState([])
  const [fetcheditems, setFetcheditems] = useState([])
  const [inputList, setInputList] = useState([{ partnumber: '', quantity: '' }])
  const [accordianisActive, setAccordianIsActive] = useState(true)
  const [bulkdata, setBulkdata] = useState([])
  // const [amounttotal, setAmounttotal] = useState({})
  const [addingToCart, setAddingToCart] = useState(false)
  let [pn, setPN] = useState()
  let [caseqty, setCaseqty] = useState([])
  let [total, setTotal] = useState([])
  let qtyIndex = {}
  let [totalqty, setTotalQty] = useState()
  let [qtyerror, setQtyError] = useState(false)
  let [inputchange, setInputchange] = useState(false)
  const [removeItem, setRemoveItem] = useState(false)
  const [indexState, setIndexState] = useState(0)
  const [inputvalue, setInputValue] = useState()
  const [isPackage, setIsPackage] = useState(true)
  const [hasCartData, setHasCartData] = useState(false)

  console.log(inputvalue, inputvalue)
  // let total = []
  useEffect(() => {
    const data = async () => {
      const items = await fetchItems('')
      setFetcheditems(items.hits)
      mapShowCartData()
    }

    data()
  }, [])

  useEffect(() => {
    total.length > 0 && itemtotalamount()
  }, [total])

  useEffect(() => {
    if (getCartItems && getCartItems.items && getCartItems.items.length > 0) {
      let res = false
      res = getCartItems.items[0].attributes.find(
        arr => arr.name === 'Packaged Order',
      )

      if (res && res.value) {
        setIsPackage(true)
      } else {
        setIsPackage(false)
      }
      setHasCartData(true)
    } else {
      setHasCartData(false)
    }
  }, [getCartItems])

  const itemtotalamount = () => {
    let sum = total.reduce(
      (previousValue, currentValue, currentIndex, array) => {
        return previousValue + currentValue
      },
      0,
    )
    let totalamount = sum.toFixed(2)
    setTotalQty(totalamount)
  }

  // const onChangeqty = async (value, index) => {
  //   qtyIndex = {
  //     ...caseqty,
  //     [`index-${index}`]: value,
  //   }
  //   setCaseqty(qtyIndex)
  //   let amounts = amounttotal * Number(caseqty[`index-${index}`])
  //   console.log(amounts, 'amouunt')
  //   total.push(amounts)
  //   itemtotalamount()
  // }

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

  const mapShowCartData = async () => {
    let skus = []
    let res = await getCartByUserId(user.accessToken)
    let data = res.data

    await data.items.map((item, i) => {
      skus.push(item.sku)
    })

    let itemsRes = await getItemsBySkus(skus)

    let itemsArr = []
    let grandPrice = 0

    let tempArray = []

    let sizes = []
    let partNumbers = []
    await data.items.map(async (item, i) => {
      let attributes = itemsRes?.data[i]?.attributes
      await attributes.map(attr => {
        if (attr.name === 'Package Size') {
          sizes.push(attr.value)
        }

        if (attr.name === 'Part Number') {
          partNumbers.push(attr.value)
        }
      })
      tempArray.push({
        ...item,
        attributes: attributes,
      })

      // let itemObj = {
      //   ...item,
      //   size: sizes[i],
      //   image: itemsRes?.data[i]?.images[0]?.source[0]?.url,
      //   attributes: itemsRes?.data[i]?.attributes,
      // }
      let itemObj = {
        ...item,
      }
      itemObj['Product Title'] = item.title
      itemObj['cartId'] = data._id
      itemObj['subtotal'] = item.price?.base * item.quantity
      itemObj['Image URL'] = itemsRes?.data[i]?.images[0]?.source[0]?.url
      itemObj['Package Size'] = sizes[i]
      itemObj['Base Price'] = item.price?.base
      itemObj['Part Number'] = partNumbers[i]

      grandPrice += itemObj['subtotal']
      itemsArr.push(itemObj)
    })

    setTotalQty(grandPrice)
    setCartItems(itemsArr)
    setGetCartItemsState({ items: tempArray })
  }

  const addedItemToCart = async searchedCartitems => {
    let items = []
    let obj = {}
    let arrayTotal = []

    packgdata.map(async (data, i) => {
      if (data !== undefined) {
        let baseprice = data['Base Price']
        obj = { ...obj, [i]: baseprice }
        let amount = baseprice * Number(caseqty[`index-${i}`])
        // total.push(amount)
        arrayTotal.push(amount)
        console.log('totalss', total)
        // itemtotalamount()
        await getProductBySKU(data.sku)
          .then(res => {
            let response = res.response.data
            console.log(response, 'response')
            let product = response && response.product
            let newobj = {
              extra: {},
              group: product.group,
              itemId: product.itemId,
              sku: product.sku,
              quantity: caseqty[`index-${i}`], // qty,
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
            items.push(newobj)
          })
          .catch(err => {
            console.log('error', err)
          })
      }

      if (i >= packgdata.length - 1) {
        let payload = {
          cartId: null,
          items,
          registeredUser: true,
          userAuthToken: user.accessToken,
        }
        addProductToCart(payload)
          .then(async res => {
            if (res?.response?.data) {
              getUpdatedCartData(res?.response?.data)
              console.log('sucres', res)
            } else {
              error(res?.response?.error)
              setAddingToCart(false)
            }
          })
          .catch(err => {
            console.log('errres', err)
            error(err)
            setAddingToCart(false)
          })
      }

      if (packgdata.length - 1 === i) {
        // setAmounttotal(obj)
        setTotal(arrayTotal)
      }
    })
    setInputList([{ partnumber: '', quantity: '' }])
  }

  const getUpdatedCartData = async resData => {
    let skus = []
    await resData?.items?.map(item => skus.push(item?.sku))
    let itemsRes = await getItemsBySkus(skus)

    let itemsArr = []

    let sizes = []
    await resData?.items.map(async (item, i) => {
      let attributes = itemsRes?.data[i]?.attributes
      await attributes.map(attr => {
        if (attr.name === 'Package Size') {
          sizes.push(attr.value)
        }
      })

      let itemObj = {
        ...item,
        size: sizes[i],
        image: itemsRes?.data[i]?.images[0]?.source[0]?.url,
        attributes: itemsRes?.data[i]?.attributes,
      }

      itemsArr.push(itemObj)
    })

    let payload = {
      ...resData,
      items: itemsArr,
    }
    console.log('insidelooppp', payload)
    setGetCartItemsState(payload)
    setAccordianIsActive(false)
    mapShowCartData()
    setAddingToCart(false)
    // showcartPOPModal()
  }

  const itemremove = async (i, data) => {
    setRemoveItem(true)
    setIndexState(i)
    await removeItemFromCart(data.cartId, data.lineItemId)
    await mapShowCartData()
    setRemoveItem(false)
  }

  const onChangeqty = async (value, i, item) => {
    setIndexState(i)
    setInputchange(true)
    let qtyIndex = {
      ...caseqty,
      [`index-${i}`]: value,
    }
    setCaseqty(qtyIndex)

    let updateCartPayload = {
      items: [
        {
          lineItemId: item.lineItemId,
          itemId: item.itemId,
          quantity: value,
          price: item.price,
        },
      ],
    }

    await updateCartApi(item?.cartId, updateCartPayload)
    await mapShowCartData()
    setInputchange(false)
  }
  const handleRemove = index => {
    console.log(index, 'indexing')
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
    // itemremove(index)
  }
  const handleChangePackageqty = async (e, index) => {
    setQtyError(false)
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputValue(value)

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
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)

    if (name === 'partnumber') {
      setPN(value)
      filters['Part Number'] = value
      algoliaApi()
    } else {
    }

    const items = await fetchItems(value)

    const titleArray = items.hits.map(item => {
      return item.title
    })
    console.log(titleArray, 'titleArray')
    const inputs = Object.values(inputList[0])
    console.log('arraaayy', inputs)
    // if (inputs[0] !== '' || inputs[1] !== '' || inputList.length > 1) {
    //   setRadioStatePackage(true)
    // } else {
    //   setRadioStatePackage(false)
    // }
  }

  const filters = {}

  const algoliaApi = async () => {
    let payload = []
    let res = Object.entries(filters)

    res.map(v => {
      payload.push(`${v[0]}:${v[1]}`)
    })

    searchFilters(payload)
      .then(res => {
        let payload = []
        if (packgdata.length < 1) {
          payload.push(res[0])
        } else {
          payload = packgdata
          payload.push(res[0])
        }

        setPackgdata(payload)
      })
      .catch(err => {
        console.log(err, 'error')
      })
  }

  const handleChangeBulk = async (e, index) => {
    setQtyError(false)
    const { name, value } = e.target
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
      const inputs = Object.values(inputList[0])
      console.log('arraaayy', inputs)
      // if (inputs[0] !== '' || inputs[1] !== '' || inputList.length > 1) {
      //   setRadioStateBulk(true)
      // } else {
      //   setRadioStateBulk(false)
      // }
    }

    setCaseqty(qtyIndex)
  }

  useEffect(() => {
    let packagearr = []
    let bulkararr = []

    fetcheditems &&
      fetcheditems.map((datas, i) => {
        if (datas['Packaged Order'] === true) {
          let packageorder = {
            label: datas['Part Number'],
            value: datas['Part Number'],
          }
          packagearr.push(packageorder)
        } else {
          let bulkorder = {
            label: datas['Part Number'],
            value: datas['Part Number'],
          }
          bulkararr.push(bulkorder)
        }
      })
    setProductstitle(packagearr)
    setBulkdata(bulkararr)
    console.log(packagearr, 'packageorder')
    console.log(bulkararr, 'bulkararr')
  }, [fetcheditems])

  const handleAddRow = () => {
    if (inputList[0].partnumber.length > 0 && inputList[0].quantity > 0) {
      setInputList([...inputList, { partnumber: '', quantity: '' }])
    }
    inputList[0].quantity <= 0 && setQtyError(true)
  }

  // -----------------------------------
  const handleAddtoCart = async () => {
    setAddingToCart(true)
    const partnumberlist = inputList.map(item => {
      return item.partnumber
    })

    // const quantitylist = inputList.map(item => {
    //   return item.quantity
    // })

    const searchedCartitems = fetcheditems.filter(item =>
      partnumberlist.includes(item.title),
    )

    // setQty(quantitylist)
    // const cartItem = {
    //   ...searchedCartitems,
    //   quantitylist,
    // }
    // addedItemToCart({ ...cartItem[0] })
    addedItemToCart(searchedCartitems)

    // if (searchedCartitems.length > 0) {
    // setCartItems(searchedCartitems)
    // } else {
    // show invalid sku error from here
    // }
  }

  const radioChangeBULK = () => {
    setPackageComponent(false)
    setBulkComponent(true)
    setInputList([{ partnumber: '', quantity: '' }])
  }

  const radioChangePACKAGE = e => {
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
              value={pn !== undefined ? pn : 'Part Number'}
              handleChangePackage={handleChange}
              // caceqty={caceqty}
              handleChangePackageqty={handleChangePackageqty}
              handleAddtoCart={handleAddtoCart}
              productstitle={productstitle}
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
              value={pn !== undefined ? pn : 'Part Number'}
              handleChangePackage={handleChange}
              handleChangePackageqty={handleChangeBulk}
              handleAddtoCart={handleAddtoCart}
              bulkdata={bulkdata}
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
        <div className="checkout">
          <div className="order-price">
            <Label className="sub-total">Order Total</Label>
            <Label className="total">
              <span>${totalqty}</span>
            </Label>
          </div>
          <div className="checkout-links">
            <Link className="checkout-btn" to="/Checkoutsection">
              PROCEED TO CHECK OUT
            </Link>
            <div className="view-btn" to="/cart">
              {/* <Button>VIEW CART </Button> */}
              <Button onClick={showModal}>VIEW CART </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  // const cartItem = cartItems
  //   ? cartItems.map((cartItem, i) => {
  //       return <DesktopCartPageItem {...cartItem} quantity={qty} key={i} />
  //     })
  //   : null

  return (
    <>
      <div className="quick-order-wrapper">
        <div className="order-total-and-list">
          <div className="orderComponent">
            {/* ^^^^Order list and order component div excluding orderTotal */}
            <div className="radio-wrapper">
              <Radio.Group
                value={value}
                className="radio-group"
                defaultValue={1}
                onChange={e => setValue(e.target.value)}
              >
                <Radio
                  className={'radiobtn'}
                  value={1}
                  // defaultChecked={true}
                  disabled={hasCartData ? !isPackage : false}
                  onChange={radioChangePACKAGE}
                  // disabled={
                  //   cartState === 'bulk' && getCartItems?.items?.length > 0
                  //     ? true
                  //     : false
                  // }
                >
                  PACKAGED ORDER
                </Radio>

                <Radio
                  className="radiobtn"
                  value={2}
                  disabled={hasCartData ? isPackage : false}
                  onChange={radioChangeBULK}
                  // disabled={
                  //   cartState === 'package' && getCartItems?.items?.length > 0
                  //     ? true
                  //     : false
                  // }
                >
                  BULK ORDER
                </Radio>
              </Radio.Group>
            </div>
            <div className="price-list-btn">
              <Link className="price-list-text" to="/Price-List">
                View Price List
              </Link>
            </div>
            {OrderType()}
            {cartItems && cartItems.length > 0 && (
              <div className="wrapper itemList">
                <span className="list-items-catagory">
                  <Label className="catagory-label">Item</Label>
                  <Label className="catagory-label">Price</Label>
                  <Label className="catagory-label">Qty</Label>
                  <Label className="catagory-label">Subtotal</Label>
                </span>
              </div>
            )}
            {/* {cartItem} */}

            {cartItems && (
              <div className="quickorder-wrapper">
                {cartItems &&
                  cartItems.map((data, i) => {
                    if (data !== undefined) {
                      return size > 768 ? (
                        <div key={i} className="orders">
                          <div className="item-wraper">
                            <div>
                              <div className="img-wraper">
                                <img src={data['Image URL']} alt="img" />
                              </div>
                              <button
                                className="quick-orde_btn"
                                onClick={e => itemremove(i, data)}
                              >
                                {removeItem && indexState === i
                                  ? 'Removing...'
                                  : 'Remove Item'}
                              </button>
                            </div>
                            <div className="part-wraper">
                              <div className="quik-product-heading">
                                <p>{data['Product Title']}</p>
                              </div>
                              <div>
                                <p>
                                  Part Num
                                  <span className="quick-item-description">
                                    {data['Part Number']}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p>
                                  Size
                                  <span className="quick-item-description">
                                    {data['Package Size']}
                                  </span>
                                </p>
                              </div>
                              <div>
                                <p>
                                  {data['QTY PER CASE'] ? 'Per case' : ''}
                                  <span className="quick-item-description">
                                    {data['QTY PER CASE']}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="quickorder-Price">
                              ${data['Base Price'].toFixed(2)}
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
                              max={100}
                              type="number"
                              defaultValue={1}
                              value={data['quantity']}
                              onChange={e => onChangeqty(e, i, data)}
                              size="middle"
                              className="input"
                            />
                          </div>
                          <div>
                            <p className="quickorder-Price">
                              ${data.subtotal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="quick-order-mobile">
                            <div className="quick-order-mobile__previous">
                              <img
                                className="quick-order-mobile__image"
                                src={data['Image URL']}
                                alt="img"
                              />
                              <p className="price">Price</p>
                              <p className="price-value">
                                ${data['Base Price'].toFixed(2)}
                              </p>
                            </div>
                            <p>{data['product title']}</p>
                            <div className="quick-order-mobile__next-container">
                              <p>
                                Size
                                <span className="span">
                                  {data['Package Size']}
                                </span>
                              </p>
                              <p>
                                {data['QTY PER CASE'] ? 'Per case' : ''}
                                <span className="span">
                                  {data['QTY PER CASE']}
                                </span>
                              </p>
                              <p>
                                Part Num
                                <span className="span">
                                  {data['Part Number']}
                                </span>
                              </p>
                              <div className="quantity-container">
                                <div className="remove-button">
                                  <p>
                                    <span className="quantity">QTY:</span>
                                    <InputNumber
                                      min={0}
                                      max={100}
                                      type="number"
                                      defaultValue={1}
                                      value={data['quantity']}
                                      onChange={e => onChangeqty(e, i, data)}
                                      size="middle"
                                      className="input"
                                    />
                                  </p>
                                  <button
                                    className="quick-orde_btn"
                                    onClick={e => itemremove(i, data)}
                                  >
                                    Remove
                                  </button>
                                </div>
                                <div>
                                  <p className="total-price">Total Price</p>
                                  <p className="total-price-value">
                                    ${data.subtotal.toFixed(2)}
                                  </p>
                                </div>
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

          {cartItems && <TotalCartPrice value={totalqty} />}
        </div>
      </div>
    </>
  )
}

export default QuickOrder
