import React, { useEffect, useState } from 'react'

import './style.scss'
import { Radio } from 'antd'
import Label from 'components/atoms/label'
import PackageOrder from 'components/organisms/quick-order/package-order/index'
import BulkOrder from 'components/organisms/quick-order/bulk-order/index'
import AccordionComponent from 'components/molecules/accordionComponent'
import DesktopCartPageItem from 'components/organisms/cart-and-total'
import Link from 'components/atoms/link'

import { fetchItems } from 'libs/services/algolia'

import useAddToCart from 'libs/api-hooks/useAddToCart'

/* eslint-disable indent */

const QuickOrder = () => {
  const [packageComponent, setPackageComponent] = useState(true)
  const [bulkComponent, setBulkComponent] = useState(false)
  const [radioStatePackage, setRadioStatePackage] = useState(false)
  const [radioStateBulk, setRadioStateBulk] = useState(false)
  const [qty, setQty] = useState([])
  const [cartItems, setCartItems] = useState()
  const [productstitle, setProductstitle] = useState([])
  const [fetcheditems, setFetcheditems] = useState([])
  const [inputList, setInputList] = useState([{ partnumber: '', quantity: '' }])
  const [accordianisActive, setAccordianIsActive] = useState(true)

  const { addToCartApiCall } = useAddToCart()

  useEffect(() => {
    const data = async () => {
      const items = await fetchItems('')
      setFetcheditems(items.hits)
      console.log('part', items)
    }
    data()
  }, [])

  const handleAccordianClick = () => {
    setAccordianIsActive(!accordianisActive)
  }

  const addedItemToCart = async Data => {
    const resData = await addToCartApiCall(Data)
    console.log('addto', resData)
  }
  const handleChange = async (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)

    const items = await fetchItems(value)

    const titleArray = items.hits.map(item => {
      return item.title
    })
    setProductstitle(titleArray)
    const inputs = Object.values(inputList[0])
    console.log('arraaayy', inputs)
    if (inputs[0] !== '' || inputs[1] !== '' || inputList.length > 1) {
      setRadioStatePackage(true)
    } else {
      setRadioStatePackage(false)
    }
  }

  const handleChangeBulk = async (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)

    const items = await fetchItems(value)

    const titleArray = items.hits.map(item => {
      return item.title
    })
    setProductstitle(titleArray)
    const inputs = Object.values(inputList[0])
    console.log('arraaayy', inputs)
    if (inputs[0] !== '' || inputs[1] !== '' || inputList.length > 1) {
      setRadioStateBulk(true)
    } else {
      setRadioStateBulk(false)
    }
  }

  const handleAddRow = () => {
    if (inputList[0].partnumber.length > 0 && inputList[0].quantity > 0) {
      setInputList([...inputList, { partnumber: '', quantity: '' }])
    }
  }

  const handleRemoveClick = index => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }
  // -----------------------------------
  const handleAddtoCart = async () => {
    const partnumberlist = inputList.map(item => {
      return item.partnumber
    })

    const quantitylist = inputList.map(item => {
      return item.quantity
    })

    const searchedCartitems = fetcheditems.filter(item =>
      partnumberlist.includes(item.title),
    )

    setQty(quantitylist)
    const cartItem = {
      ...searchedCartitems,
      quantitylist,
    }
    addedItemToCart({ ...cartItem[0] })

    setCartItems(searchedCartitems)
    setAccordianIsActive(false)
  }
  // -------------------------------------

  const radioChangeBULK = () => {
    setPackageComponent(false)
    setBulkComponent(true)
  }

  const radioChangePACKAGE = () => {
    setBulkComponent(false)
    setPackageComponent(true)
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
              handleChangePackage={handleChange}
              handleAddtoCart={handleAddtoCart}
              productstitle={productstitle}
              inputList={inputList}
              handleAddRow={handleAddRow}
              handleRemoveClick={handleRemoveClick}
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
              handleChangePackage={handleChangeBulk}
              handleAddtoCart={handleAddtoCart}
              productstitle={productstitle}
              inputList={inputList}
              handleAddRow={handleAddRow}
              handleRemoveClick={handleRemoveClick}
            />
          </AccordionComponent>
        </div>
      )
    }
  }

  const TotalCartPrice = () => {
    return (
      <div className="checkout-and-pricelist">
        <div className="quick-order-price-list-btn">
          <Link className="price-list-link" to="/faqs">
            View Price List
          </Link>
        </div>
        <div className="checkout">
          <div className="order-price">
            <Label className="sub-total">Order Total</Label>
            <Label className="total">$ 350.00</Label>
          </div>
          <div className="checkout-links">
            <Link className="checkout-btn" to="/checkout">
              PROCEED TO CHECK OUT
            </Link>
            <Link className="view-btn" to="/cart">
              VIEW CART
            </Link>
          </div>
        </div>
      </div>
    )
  }
  const cartItem = cartItems
    ? cartItems.map((cartItem, i) => {
        return <DesktopCartPageItem {...cartItem} quantity={qty} key={i} />
      })
    : null

  return (
    <>
      <div className="order-total-and-list">
        <div className="orderComponent">
          {/* ^^^^Order list and order component div excluding orderTotal */}
          <div className="radio-wrapper">
            <Radio.Group className="radio-group">
              <Radio
                className={'radiobtn'}
                value={1}
                defaultChecked={true}
                disabled={radioStateBulk}
                onChange={radioChangePACKAGE}
              >
                PACKAGED ORDER
              </Radio>

              <Radio
                className="radiobtn"
                value={2}
                disabled={radioStatePackage}
                onChange={radioChangeBULK}
              >
                BULK ORDER
              </Radio>
            </Radio.Group>
          </div>
          {OrderType()}
          {cartItems && (
            <div className="wrapper itemList">
              <span className="list-items-catagory">
                <Label className="catagory-label">Item</Label>
                <Label className="catagory-label">Price</Label>
                <Label className="catagory-label">Qty</Label>
                <Label className="catagory-label">Subtotal</Label>
              </span>
            </div>
          )}

          {cartItem}
        </div>
        {cartItems && <TotalCartPrice />}
      </div>
    </>
  )
}

export default QuickOrder
