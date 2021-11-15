/* eslint-disable space-before-function-paren */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import PDPInformation from 'components/molecules/pdpinforamation'
import { fetchCategory } from 'libs/services/algolia'
import {
  Radio,
  InputNumber,
  Tooltip,
  Row,
  Col,
  Breadcrumb,
  Divider,
  Image,
  // Spin,
  Modal,
} from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
import { productListing } from 'libs/utils/gtm'
import PDPMobile from '../PDPMobile'
import Link from 'components/atoms/link'

import { AppContext } from 'libs/context'
// import { constant } from 'lodash'
import { getProductBySKU, addProductToCart } from 'libs/services/api/pdp.api'
import PlpTabList from 'components/organisms/plp-tab-list'
import CartDropdown from '../cart-dropdown'
import { useLocation } from '@reach/router'
import queryString from 'query-string'

const PDP = ({ pdpdata, pdpdatasheet, RadioData, categories }) => {
  // const { data, imgdata, heading } = pdpdata
  const {
    showcartPOPModal,
    user,
    setCartData,
    setPdpProductData,
    setCartState,
    cartState,
    getCartItems,
  } = useContext(AppContext)
  console.log({ user })

  const { search } = useLocation()
  const { sku } = queryString.parse(search)
  const [itemSku, setItemSku] = useState(sku)

  const [productData, setProductData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [packagedOrder, setPackagedOrder] = useState(true)
  const [isPdpLoading, setIsPdpLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [items, setItems] = useState({})

  const { packagedata, text1, bulk } = RadioData
  const [value, setValue] = React.useState(1)
  const [btnDisabled, setButtonDisabled] = useState(true)

  const { setStep, plpredirect, setPlpRedirect } = useContext(AppContext)
  const [desc, setDesc] = useState('')
  const [subItem, setSubItem] = useState({})
  const [contextPlp, setContextPlp] = useState(plpredirect)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  console.log({ loading })
  console.log({ products })
  console.log({ desc })
  console.log('plpredirect', plpredirect)

  useEffect(() => {
    setStep(1)
  }, [])

  useEffect(() => {
    setContextPlp(plpredirect)
  }, [plpredirect])

  const perfomeAlgoliaSearch = async (category, pageNumber = 0) => {
    try {
      setLoading(true)
      const results = await fetchCategory(category, pageNumber)
      console.log({ results })
      let serverResults = (results || { hits: [] }).hits
      serverResults.sort(
        (a, b) => (a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0),
        setPlpRedirect(category),
        console.log('category', category),
      )
      if (pageNumber === 0) {
        productListing(results.nbHits, category)
      }
      setProducts(serverResults)
      setLoading(false)
      console.log('check results:', results)
      subItemHandler(results)
    } catch (e) {
      setLoading(false)
    }
  }

  const clickCategoryHandler = (name, desc) => {
    // setItemName(name)
    console.log('name', name)
    setContextPlp(name)
    setPlpRedirect(name)
    setDesc(desc)
    perfomeAlgoliaSearch(name, 0)
  }
  const subItemHandler = list => {
    console.log('list check:', list)
    setSubItem(list)
  }

  const onChange = e => {
    setValue(e.target.value)
    if (e.target.value === 1) {
      setPackagedOrder(true)
    } else {
      setPackagedOrder(false)
    }
  }

  useEffect(() => {
    setIsPdpLoading(true)
    getProductBySKU(itemSku || 'AUTO000', 1)
      .then(res => {
        let newObj = {
          ...res?.response?.data?.product,
        }
        setProductData(newObj)
        clickCategoryHandler(newObj?.category, null)
        setIsPdpLoading(false)
        mapAttributes(res?.response?.data?.items)
        setPdpProductData(res?.response?.data?.product)
      })
      .catch(e => {
        setIsPdpLoading(false)
        console.log({ e })
      })
    if (user?.accessToken) {
      setIsLoggedIn(true)
    } else setIsLoggedIn(false)
  }, [itemSku])

  const mapAttributes = items => {
    let newItems = []
    if (items?.length > 0) {
      items?.map(item => {
        let newObj = {}
        item?.attributes?.map(att => {
          newObj = {
            ...newObj,
            [att?.name]: att?.value,
          }
        })
        newItems?.push({
          ...item,
          mappedAttributes: newObj,
          totalPrice: 0.0,
        })
      })
      let packagedOrderItems = newItems?.filter(
        item => item?.mappedAttributes['Packaged Order'],
      )
      let bulkOrderItem = newItems?.filter(
        item => !item?.mappedAttributes['Packaged Order'],
      )
      setItems({
        packagedOrderItems: packagedOrderItems,
        bulkOrderItem: bulkOrderItem,
      })
    } else setItems({})
  }

  const getTotalPackagedOrderPrice = newArray => {
    var totalCost = 0
    for (var i = 0; i < newArray?.length; i++) {
      totalCost += parseFloat(newArray[i]?.totalPrice)
    }
    if (totalCost > 0) {
      setButtonDisabled(false)
    } else setButtonDisabled(true)
    return totalCost
  }

  // eslint-disable-next-line space-before-function-paren
  const onQtyChange = async (value, index) => {
    let { packagedOrderItems } = items
    let newArray = [...packagedOrderItems]
    newArray[index] = {
      ...newArray[index],
      totalPrice: parseFloat(
        Number(newArray[index]?.price?.base) * value,
      ).toFixed(2),
      quantity: Number(value),
    }
    setItems({
      ...items,
      packagedOrderItems: newArray,
      totalPackagedOrderPrice: getTotalPackagedOrderPrice(newArray),
    })
  }

  const onBulkQtyChange = value => {
    const { bulkOrderItem } = items
    let newObj = {
      ...bulkOrderItem[0],
      quantity: value,
      totalPrice: parseFloat(
        Number(bulkOrderItem && bulkOrderItem[0]?.price?.base) * value,
      ).toFixed(2),
    }
    if (newObj?.totalPrice > 0) {
      setButtonDisabled(false)
    } else setButtonDisabled(true)
    setItems({
      ...items,
      bulkOrderItem: [newObj],
    })
  }
  const text = (
    <div className="toltip-container" style={{ border: '1px dashed #013A4E' }}>
      <h1 className="notranslate">{packagedata}</h1>
      <p>{text1}</p>
    </div>
  )
  const secondtext = (
    <div className="toltip-container">
      <h1>{bulk}</h1>
      <p>
        When ordering a product to be delivered in bulk, all items within your
        order must be ordered in bulk, too.
      </p>{' '}
      {/* <br />{' '} */}
      <p>
        Packaged Shipments and bulk deliveries have to be placed as separate
        orders.
      </p>
    </div>
  )

  const getPackagedOrder = () => {
    var newData = []
    console.log({ items })
    if (packagedOrder && items?.packagedOrderItems?.length) {
      items?.packagedOrderItems?.map(item => {
        if (item?.quantity > 0) {
          newData?.push({
            extra: {},
            group: item?.group,
            itemId: item?.itemId,
            sku: item?.sku,
            quantity: item?.quantity,
            price: {
              base: Number(item?.price?.base),
              currency: 'USD',
              sale: false,
              discount: {
                price: 0,
              },
            },
            size: item?.mappedAttributes['Package Size'],
          })
        }
      })
    }
    return newData
  }

  const getBulkOrderData = () => {
    const { bulkOrderItem } = items
    var newData = []
    if (bulkOrderItem?.length > 0) {
      newData = [
        {
          extra: {},
          group: bulkOrderItem[0]?.group,
          itemId: bulkOrderItem[0]?.itemId,
          sku: bulkOrderItem[0]?.sku,
          quantity: bulkOrderItem[0]?.quantity,
          price: {
            base: Number(bulkOrderItem[0]?.price?.base),
            currency: 'USD',
            sale: false,
            discount: {
              price: 0,
            },
          },
          size: bulkOrderItem[0]?.mappedAttributes['Package Size'],
        },
      ]
    }
    return newData
  }

  const subItemClickHandler = item => {
    setItemSku(item?.sku)
  }

  function error(msg) {
    Modal.error({
      title: 'This is an error message',
      content:
        msg ||
        'Due to some technical reasons, this action cannot be performed!',
    })
  }

  const onSubmit = e => {
    setAddingToCart(true)
    console.log(productData?.requestArray, 'pkg')
    let payload = {
      cartId: null,
      items: packagedOrder ? getPackagedOrder() : getBulkOrderData(),
      registeredUser: isLoggedIn,
      userAuthToken: isLoggedIn ? user?.accessToken : null,
    }

    addProductToCart(payload)
      .then(res => {
        console.log('ressss', res)
        if (res?.response?.data) {
          setCartData(res?.response?.data)
          showcartPOPModal()
          setAddingToCart(false)
        } else {
          setAddingToCart(false)
          if (res?.hasError) {
            error(res?.response?.error)
          }
        }
      })
      .catch(e => {
        if (e) {
          alert('Some Error Occured! Please try again!')
          setAddingToCart(false)
          console.log('errr', e)
        }
      })
  }

  return (
    <>
      <div className="customContainer">
        <Row>
          <Col className="breadcumb-column">
            <Breadcrumb
              className="breadCrumbStyle"
              separator={<span style={{ color: '#FFFFFF' }}>/</span>}
            >
              <Breadcrumb.Item>
                <Link to="/" style={{ color: '#FFFFFF' }}>
                  Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/PCP" style={{ color: '#FFFFFF' }}>
                  Our Products
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/plp-page" style={{ color: '#FFFFFF' }}>
                  {productData?.category}
                </Link>
              </Breadcrumb.Item>
              {/* <Breadcrumb.Item>Heavy Duty Engine Oil</Breadcrumb.Item> */}
              <Breadcrumb.Item className="notranslate">
                <Link to="/plp-page" style={{ color: '#FFFFFF' }}>
                  {productData?.title}
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row style={{ flexFlow: 'row' }}>
          <Col className="sidebar">
            <PlpTabList
              categories={categories}
              itemName={contextPlp}
              clickCategoryHandler={clickCategoryHandler}
              subItem={subItem}
              subItemClickHandler={subItemClickHandler}
            />
          </Col>
          {isPdpLoading ? (
            <Col
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                // width: '69vw',
                flexWrap: 'wrap',
              }}
              className="product-details"
            >
              <h1 style={{ color: 'gray' }}>
                {!isPdpLoading ? 'No Data Found for this Item' : 'Loading...'}
              </h1>
            </Col>
          ) : Object.keys(items).length === 0 ? (
            <Col
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                // width: '69vw',
                flexWrap: 'wrap',
              }}
              className="product-details"
            >
              {' '}
              <h1 style={{ color: 'gray' }}>
                No Attributes Found for this Item
              </h1>
            </Col>
          ) : (
            <Col
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                // width: '69vw',
                flexWrap: 'wrap',
              }}
              className="product-details"
            >
              <div className="flex-column">
                <div className="image-background">
                  {productData?.images?.map((img, i) => (
                    <Image
                      src={img?.source[0]?.url}
                      key={i}
                      width="100%"
                      height="100%"
                    />
                  ))}
                </div>
                {!isLoggedIn && (
                  <div style={{ textAlign: 'center' }}>
                    <Button className="customButton">HOW TO BUY</Button>
                  </div>
                )}
              </div>
              <div className="product-table">
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <h1 className="notranslate productTitle">
                      {productData?.title}
                    </h1>
                  </div>
                  <div className="share-icon">
                    <ShareAltOutlined
                      size="32px"
                      style={{ color: '#FFFFFF' }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  {isLoggedIn && (
                    <Radio.Group
                      onChange={onChange}
                      value={value}
                      defaultValue={1}
                      size="large"
                      optionType="button"
                    >
                      <Tooltip placement="bottomLeft" title={text}>
                        <Radio
                          value={1}
                          style={{
                            color: 'white',
                            fontSize: `${(17 / 1400) * 100}vw`,
                            fontFamily: 'OpenSans',
                          }}
                          disabled={
                            cartState === 'bulk' &&
                            getCartItems?.items?.length > 0
                              ? true
                              : false
                          }
                          onChange={() => {
                            setCartState('package')
                            console.log('package selected...', cartState)
                          }}
                        >
                          PACKAGED ORDER
                        </Radio>
                      </Tooltip>
                      <Tooltip placement="bottomRight" title={secondtext}>
                        <Radio
                          value={2}
                          style={{
                            color: 'white',
                            fontSize: `${(17 / 1400) * 100}vw`,
                            fontFamily: 'OpenSans',
                          }}
                          disabled={
                            cartState === 'package' &&
                            getCartItems?.items?.length > 0
                              ? true
                              : false
                          }
                          onChange={() => {
                            setCartState('bulk')
                            console.log('bulk selected...', cartState)
                          }}
                        >
                          BULK ORDER
                        </Radio>
                      </Tooltip>
                    </Radio.Group>
                  )}
                </div>
                <div>
                  <div className="table">
                    <div className="cell-header">SIZES</div>
                    <div className="cell-header">UNITS/CASE</div>
                    <div className="cell-header">PART NUM</div>
                    <div className="cell-header">{isLoggedIn && 'PRICE'}</div>
                    <div className="cell-header">{isLoggedIn && 'QTY'}</div>
                    <div className="cell-header">
                      {isLoggedIn && 'TOTAL PRICE'}
                    </div>
                  </div>
                  {items?.packagedOrderItems?.map((item, i) => {
                    return (
                      <div className="table" key={i}>
                        <div
                          className={
                            !packagedOrder ? 'cell color-disabled' : 'cell'
                          }
                        >
                          {item?.mappedAttributes['Package Size']}
                        </div>
                        <div
                          className={
                            !packagedOrder ? 'cell color-disabled' : 'cell'
                          }
                        >
                          {item?.mappedAttributes['Unit of Measurement']}
                        </div>
                        <div
                          className={
                            !packagedOrder ? 'cell color-disabled' : 'cell'
                          }
                        >
                          {item?.mappedAttributes['Part Number']}
                        </div>
                        <div
                          className={
                            !packagedOrder ? 'cell color-disabled' : 'cell'
                          }
                        >
                          {isLoggedIn && item?.price?.base}
                        </div>
                        <div
                          className={
                            !packagedOrder ? 'cell color-disabled' : 'cell'
                          }
                        >
                          {isLoggedIn && (
                            <InputNumber
                              min={0}
                              max={100}
                              defaultValue={0}
                              onChange={e => onQtyChange(e, i)}
                              disabled={!packagedOrder}
                              size="middle"
                              className="input"
                              style={{
                                backgroundColor:
                                  !packagedOrder && 'rgba(255, 255, 255, 0.3)',
                              }}
                            />
                          )}
                        </div>
                        <div
                          className={
                            !packagedOrder ? 'cell color-disabled' : 'cell'
                          }
                          style={{
                            color: item?.totalPrice > 0 ? '#fa9200' : 'white',
                          }}
                        >
                          {isLoggedIn && '$' + (item?.totalPrice || '0.00')}
                        </div>
                      </div>
                    )
                  })}
                  {isLoggedIn && (
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <div
                        className="cell totalPrice"
                        style={{
                          color:
                            items?.totalPackagedOrderPrice > 0
                              ? '#fa9200'
                              : packagedOrder
                              ? 'white'
                              : 'rgba(255, 255, 255, 0.3)',
                        }}
                      >
                        {'$' +
                          (items?.totalPackagedOrderPrice > 0
                            ? parseFloat(
                                items?.totalPackagedOrderPrice,
                              ).toFixed(2)
                            : '0.00')}
                      </div>
                    </div>
                  )}
                  {isLoggedIn && (
                    <Divider
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        width: '43.05556vw',
                      }}
                    />
                  )}
                  {items?.bulkOrderItem?.length ? (
                    items?.bulkOrderItem?.map(item => {
                      console.log('bulkitem', item)
                      return (
                        <>
                          {isLoggedIn ? (
                            <>
                              <div className="table">
                                <div className="cell-header">BULK</div>
                                <div
                                  className={
                                    packagedOrder
                                      ? 'cell color-disabled'
                                      : 'cell'
                                  }
                                >
                                  PRICE/LITER
                                </div>
                                <div
                                  className={
                                    packagedOrder
                                      ? 'cell color-disabled'
                                      : 'cell'
                                  }
                                >
                                  PART NUM
                                </div>
                                <div
                                  className={
                                    packagedOrder
                                      ? 'cell color-disabled'
                                      : 'cell'
                                  }
                                >
                                  LITRES
                                </div>
                                <div className="cell-header"></div>
                              </div>
                              <div className="table">
                                <div
                                  className={
                                    packagedOrder
                                      ? 'cell'
                                      : 'cell color-disabled'
                                  }
                                ></div>
                                <div
                                  className={
                                    packagedOrder
                                      ? 'cell color-disabled'
                                      : 'cell'
                                  }
                                >
                                  {item?.price?.base}
                                </div>
                                <div
                                  className={
                                    packagedOrder
                                      ? 'cell color-disabled'
                                      : 'cell'
                                  }
                                >
                                  {
                                    // eslint-disable-next-line standard/computed-property-even-spacing
                                    item?.mappedAttributes['Part Number']
                                  }
                                </div>
                                <div
                                  className={
                                    packagedOrder
                                      ? 'cell color-disabled'
                                      : 'cell'
                                  }
                                >
                                  <InputNumber
                                    min={0}
                                    max={100}
                                    defaultValue={0}
                                    onChange={e => onBulkQtyChange(e)}
                                    size="middle"
                                    className="input"
                                    disabled={packagedOrder}
                                    style={{
                                      backgroundColor:
                                        packagedOrder &&
                                        'rgba(255, 255, 255, 0.3)',
                                    }}
                                  />
                                </div>
                                <div
                                  className={
                                    packagedOrder
                                      ? 'cell color-disabled totalPrice'
                                      : 'cell totalPrice'
                                  }
                                  style={{
                                    color:
                                      item?.totalPrice > 0
                                        ? '#fa9200'
                                        : 'white',
                                  }}
                                >
                                  {parseFloat(item?.totalPrice || 0).toFixed(2)}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="table">
                              <div className="cell">BULK</div>
                              <div className="cell"></div>
                              <div className="cell">
                                {item?.mappedAttributes['Part Number']}
                              </div>
                              <div className="cell"></div>
                              <div className="cell"></div>
                              <div className="cell"></div>
                            </div>
                          )}
                        </>
                      )
                    })
                  ) : (
                    <div style={{ width: '100%', margin: 'auto' }}>
                      <h5 style={{ color: 'gray' }}>
                        Bulk Order is no available.
                      </h5>
                    </div>
                  )}

                  {isLoggedIn && (
                    <Divider
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        width: '43.05556vw',
                      }}
                    />
                  )}
                  {isLoggedIn && (
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Button
                        className="customButton"
                        disabled={btnDisabled}
                        onClick={onSubmit}
                      >
                        {addingToCart ? 'Adding...' : 'ADD TO CART'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="pdp-info">
                <PDPInformation pdpdatasheet={pdpdatasheet} />
              </div>
            </Col>
          )}
        </Row>
        <CartDropdown productData={productData} />
      </div>
      <PDPMobile
        pdpdata={items}
        productData={productData}
        isLoggedIn={isLoggedIn}
        onQtyChange={onQtyChange}
        onRadioChange={onChange}
        value={value}
        packagedOrder={packagedOrder}
        onBulkQtyChange={onBulkQtyChange}
        btnDisabled={btnDisabled}
        pdpdatasheet={pdpdatasheet}
        onSubmit={onSubmit}
        addingToCart={addingToCart}
        contextPlp={contextPlp}
        categories={categories}
        clickCategoryHandler={clickCategoryHandler}
        subItem={subItem}
        subItemClickHandler={subItemClickHandler}
        isPdpLoading={isPdpLoading}
        items={items}
      />
    </>
  )
}

PDP.propTypes = {
  data: PropTypes.array,
  size: PropTypes.string,
  imgdata: PropTypes.array,
  paragraph: PropTypes.string,
  heading: PropTypes.string,
  pdpdatasheet: PropTypes.string,
  pdpdata: PropTypes.string,
  RadioData: PropTypes.string,
  categories: PropTypes.array,
}
export default PDP
