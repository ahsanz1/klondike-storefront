import React, { useEffect, useState } from 'react'

import './style.scss'
import { Radio, InputNumber } from 'antd'
import Label from 'components/atoms/label'
import PackageOrder from 'components/organisms/quick-order/package-order/index'
import BulkOrder from 'components/organisms/quick-order/bulk-order/index'
import AccordionComponent from 'components/molecules/accordionComponent'
import DesktopCartPageItem from 'components/organisms/cart-and-total'
import Link from 'components/atoms/link'
import { fetchItems, searchFilters } from 'libs/services/algolia'

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
  const [packgdata, setPackgdata] = useState([])
  const [fetcheditems, setFetcheditems] = useState([])
  const [inputList, setInputList] = useState([{ partnumber: '', quantity: '' }])
  const [accordianisActive, setAccordianIsActive] = useState(true)
  const [bulkdata, setBulkdata] = useState([])
  let [pn, setPN] = useState()
  let [caseqty, setCaseqty] = useState([])

  const { addToCartApiCall } = useAddToCart()
  console.log(fetcheditems, 'fetcheditems')
  console.log(inputList, 'inputList')

  useEffect(() => {
    const data = async () => {
      const items = await fetchItems('')
      setFetcheditems(items.hits)
      console.log('part', items)
    }
    data()
  }, [])
  const onChangeqty = async (value, index) => {
    console.log('changed', value)
    setCaseqty(value)
  }

  const handleAccordianClick = () => {
    setAccordianIsActive(!accordianisActive)
  }

  const addedItemToCart = async Data => {
    const resData = await addToCartApiCall(Data)
    console.log('addto', resData)
  }
  const itemremove = async i => {
    let a = packgdata
    a.splice(i, 1)
    setPackgdata(a)
    handleRemoveClick(i)
  }
  const handleChange = async (e, index) => {
    console.log('eeed', e, index)
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)

    if (name === 'partnumber') {
      setPN(value)
      filters['Part Number'] = value
      algoliaApi()
    } else {
      setCaseqty(value)
    }

    const items = await fetchItems(value)

    const titleArray = items.hits.map(item => {
      return item.title
    })
    console.log(titleArray, 'titleArray')
    // setProductstitle(titleArray)
    const inputs = Object.values(inputList[0])
    console.log('arraaayy', inputs)
    if (inputs[0] !== '' || inputs[1] !== '' || inputList.length > 1) {
      setRadioStatePackage(true)
    } else {
      setRadioStatePackage(false)
    }
  }
  //   const caceqty = async (e) => {
  // console.log(e.target.value, 'case')
  //   }
  const filters = {}

  const algoliaApi = async () => {
    let payload = []
    let res = Object.entries(filters)

    await res.map(v => {
      payload.push(`${v[0]}:${v[1]}`)
    })

    await searchFilters(payload).then(res => {
      let payload = []
      if (packgdata.length < 1) {
        payload.push(res[0])
      } else {
        payload = packgdata
        payload.push(res[0])
      }

      console.log(payload, 'payload')
      setPackgdata(payload)
    })
  }

  const handleChangeBulk = async (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
    if (name === 'partnumber') {
      setPN(value)
      filters['Part Number'] = value
      algoliaApi()
    } else {
      setCaseqty(value)
      console.log(value, 'vvvv')
    }
    // const items = await fetchItems(value)

    // const titleArray = items.hits.map(item => {
    //   return item.title
    // })
    // setProductstitle(titleArray)
    const inputs = Object.values(inputList[0])
    console.log('arraaayy', inputs)
    if (inputs[0] !== '' || inputs[1] !== '' || inputList.length > 1) {
      setRadioStateBulk(true)
    } else {
      setRadioStateBulk(false)
    }
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
  }

  const handleRemoveClick = index => {
    console.log(index, 'indexing')
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
    // setAcctive(false)
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
              value={pn !== undefined ? pn : 'Part Number'}
              handleChangePackage={handleChange}
              // caceqty={caceqty}
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
            value={pn !== undefined ? pn : 'Part Number'}
            text="Order by Part Number"
            className="accordian"
            isActive={accordianisActive}
            onClick={handleAccordianClick}
          >
            <BulkOrder
              handleChangePackage={handleChangeBulk}
              handleAddtoCart={handleAddtoCart}
              bulkdata={bulkdata}
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
      <div className="quick-order-wrapper">
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
            <div className="price-list-btn">
              <Link className="price-list-text" to="/Price-List">
                View Price List
              </Link>
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

            {cartItems && (
              <div className="quickorder-wrapper">
                {packgdata &&
                  packgdata.map((data, i) => (
                    <div key={i} className="orders">
                      <div className="item-wraper">
                        <div>
                          <div className="img-wraper">
                            <img src={data['Image URL']} alt="img" />
                          </div>
                          <button
                            className="quick-orde_btn"
                            onClick={e => itemremove(i)}
                          >
                            Remove Item
                          </button>
                        </div>
                        <div className="part-wraper">
                          <div className="quik-product-heading">
                            <p>{data['product title']}</p>
                          </div>
                          <div>
                            <p>
                              Part Num <span>{data['Part Number']}</span>
                            </p>
                          </div>
                          <div>
                            <p>
                              Size <span>{data['Package Size']}</span>
                            </p>
                          </div>
                          <div>
                            <p>
                              Per case <span>{data['QTY PER CASE']}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p>{data['Base Price']}</p>
                      </div>
                      <div>
                        <InputNumber
                          min={0}
                          max={100}
                          defaultValue={0}
                          value={caseqty}
                          onChange={e => onChangeqty(e, i)}
                          size="middle"
                          className="input"
                        />
                      </div>
                      <div>
                        <p>${data['Base Price'] * caseqty}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {cartItems && <TotalCartPrice />}
        </div>
      </div>
    </>
  )
}

export default QuickOrder
