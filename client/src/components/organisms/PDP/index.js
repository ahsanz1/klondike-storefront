import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import PDPInformation from 'components/molecules/pdpinforamation'
import {
  Radio,
  InputNumber,
  Tooltip,
  Row,
  Col,
  Breadcrumb,
  Divider,
  Image,
  Spin,
} from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
// import PDPMobile from '../PDPMobile'
// import Link from 'components/atoms/link'

import { AppContext } from 'libs/context'
// import { constant } from 'lodash'
import { getProductBySKU, addProductToCart } from 'libs/services/api/pdp.api'
// import PlpTabList from 'components/organisms/plp-tab-list'
import CartDropdown from '../cart-dropdown'
import { useLocation } from '@reach/router'
import queryString from 'query-string'

const PDP = ({ pdpdata, pdpdatasheet, RadioData }) => {
  // const { data, imgdata, heading } = pdpdata
  const { showcartPOPModal, user, setCartData } = useContext(AppContext)
  console.log({ user })

  const { search } = useLocation()
  const { sku } = queryString.parse(search)

  const [productData, setProductData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [packagedOrder, setPackagedOrder] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)

  const { packagedata, text1, bulk, text2 } = RadioData
  const [value, setValue] = React.useState(1)

  const onChange = e => {
    setValue(e.target.value)
    if (e.target.value === 1) {
      setPackagedOrder(true)
    } else {
      setPackagedOrder(false)
    }
  }

  const packgedOrderData = [
    {
      size: '946 mL',
      quantity: 0,
      units: '12',
      partNum: 'KL-HD0540',
      price: '20.00',
      totalPrice: '0.00',
    },
    {
      size: '4.73 mL',
      units: '5',
      partNum: 'KL-HD0540',
      price: '10.00',
      quantity: 0,
      totalPrice: '0.00',
    },
    {
      size: '46 mL',
      units: '',
      partNum: 'KL-HD0540',
      price: '30.00',
      quantity: 0,
      totalPrice: '0.00',
    },
    {
      size: '946 mL',
      units: '12',
      partNum: 'KL-HD0540',
      price: '20.00',
      quantity: 0,
      totalPrice: '0.00',
    },
  ]

  const bulkOrderData = {
    price: '1.85',
    partNum: 'KP-787777',
    litres: 0,
    totalPrice: '0.00',
  }

  const requestArray = [
    {
      extra: {},
      group: ['3847102387441923'],
      itemId: 234,
      sku: 'lkddjff',
      quantity: 0,
      price: {
        base: 0,
        currency: 'USD',
        sale: false,
        discount: {
          price: 0,
        },
      },
      size: false,
    },
  ]

  // dummycomment

  useEffect(() => {
    setIsLoading(true)
    getProductBySKU(sku || 'AUTO000', 1)
      .then(res => {
        let newObj = {
          ...res?.response?.data?.product,
          packagedOrderData: packgedOrderData,
          bulkOrderData: bulkOrderData,
          requestArray: requestArray,
        }
        setProductData(newObj)
        setIsLoading(false)

        console.log('producttt', res.response.data)
      })
      .catch(e => {
        setIsLoading(false)
        console.log({ e })
      })
    if (user?.accessToken) {
      setIsLoggedIn(true)
    } else setIsLoggedIn(false)
  }, [])

  // eslint-disable-next-line space-before-function-paren
  const onQtyChange = async (value, index) => {
    let { packagedOrderData, requestArray } = productData
    let newArray = [...packagedOrderData]
    newArray[index] = {
      ...newArray[index],
      totalPrice: parseFloat(Number(productData?.price?.base) * value).toFixed(
        2,
      ),
      quantity: Number(value),
    }
    let reqArray = [...requestArray]
    reqArray[index] = {
      extra: {},
      group: productData?.group,
      itemId: productData?.itemId,
      sku: productData?.sku,
      quantity: Number(value),
      price: {
        base: packagedOrderData[index]?.totalPrice,
        currency: 'USD',
        sale: false,
        discount: {
          price: 0,
        },
      },
      size: packagedOrderData[index]?.size,
    }
    console.log('newArray', reqArray)
    let newObj = {
      ...productData,
      packagedOrderData: newArray,
      requestArray: reqArray,
      totalPackagedOrderPrice: await packagedOrderData?.reduce((accu, curn) => {
        return accu + parseFloat(curn?.totalPrice)
      }, 0),
    }
    await setProductData(newObj)
    console.log({ productData })
  }

  const onBulkQtyChange = value => {
    let newObj = {
      ...productData,
      bulkOrderData: {
        ...productData?.bulkOrderData,
        litres: value,
        totalPrice: parseFloat(
          Number(productData?.price?.base) * value,
        ).toFixed(2),
      },
    }
    setProductData(newObj)
  }
  const text = (
    <div className="toltip-container" style={{ border: '1px dashed #013A4E' }}>
      <h1>{packagedata}</h1>
      <p>{text1}</p>
    </div>
  )
  const secondtext = (
    <div className="toltip-container">
      <h1>{bulk}</h1>
      <p>{text2}</p>
    </div>
  )

  const onSubmit = () => {
    console.log(productData?.requestArray, 'pkg')
    let payload = {
      cartId: null,
      items: packagedOrder
        ? productData?.requestArray?.filter(item => item?.quantity > 0)
        : [
          {
            extra: {},
            group: productData?.group,
            itemId: productData?.itemId,
            sku: productData?.sku,
            quantity: productData?.bulkOrderData?.litres,
            price: {
              base: Number(productData?.price),
              currency: 'USD',
              sale: false,
              discount: {
                price: 0,
              },
            },
            size: false,
          },
        ],
      registeredUser: isLoggedIn,
      userAuthToken: isLoggedIn ? user?.accessToken : null,
    }

    addProductToCart(payload)
      .then(res => {
        setAddingToCart(true)
        if (res?.response?.data) {
          setCartData(res?.response?.data)
          showcartPOPModal()
          setAddingToCart(false)
        }
      })
      .catch(e => alert('No Data Found'))
  }

  if (isLoading) {
    return (
      <div className="spinner">
        <Spin />
      </div>
    )
  }

  return (
    <>
      <div className="customContainer">
        <Row className="p-10">
          <Col>
            <Breadcrumb
              className="breadCrumbStyle"
              separator={<span style={{ color: '#FFFFFF' }}>/</span>}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Our Products</Breadcrumb.Item>
              <Breadcrumb.Item>{productData?.category}</Breadcrumb.Item>
              {/* <Breadcrumb.Item>Heavy Duty Engine Oil</Breadcrumb.Item> */}
              <Breadcrumb.Item>{productData?.title}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className="p-10">
          <Col style={{ width: '20%' }}>
            <div
              style={{
                height: '100%',
                background: 'rgba(5, 5, 5, 0.39)',
                padding: 10,
                fontSize: '1vw',
              }}
            >
              <h5 style={{ color: 'white' }}>Categories</h5>
            </div>
          </Col>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: '80%',
              flexWrap: 'wrap',
            }}
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
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h1
                    style={{
                      fontSize: '3vw',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      lineHeight: '1.2',
                      whiteSpace: 'initial',
                      wordWrap: 'break-word',
                      maxWidth: '35vw',
                    }}
                  >
                    {productData?.title}
                  </h1>
                </div>
                <div className="share-icon">
                  <ShareAltOutlined size="32px" style={{ color: '#FFFFFF' }} />
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
                      <Radio value={1} style={{ color: 'white' }}>
                        PACKAGED ORDER
                      </Radio>
                    </Tooltip>
                    <Tooltip placement="bottomRight" title={secondtext}>
                      <Radio value={2} style={{ color: 'white' }}>
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
                {productData?.packagedOrderData?.map((item, i) => {
                  return (
                    <div className="table" key={i}>
                      <div
                        className={
                          !packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        {item?.size}
                      </div>
                      <div
                        className={
                          !packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        {item?.units}
                      </div>
                      <div
                        className={
                          !packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        {item?.partNum}
                      </div>
                      <div
                        className={
                          !packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        {isLoggedIn && productData?.price?.base}
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
                      >
                        {isLoggedIn && '$' + (item?.totalPrice || '0.00')}
                      </div>
                    </div>
                  )
                })}
                {isLoggedIn && (
                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <div className="cell-header total-price">
                      {'$' + (productData?.totalPackagedOrderPrice || '0.00')}
                    </div>
                  </div>
                )}
                {isLoggedIn && (
                  <Divider
                    style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                  />
                )}
                {isLoggedIn ? (
                  <>
                    <div className="table">
                      <div className="cell-header">BULK</div>
                      <div
                        className={
                          packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        PRICE/LITER
                      </div>
                      <div
                        className={
                          packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        PART NUM
                      </div>
                      <div
                        className={
                          packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        LITRES
                      </div>
                      <div className="cell-header"></div>
                    </div>
                    <div className="table">
                      <div
                        className={
                          packagedOrder ? 'cell' : 'cell color-disabled'
                        }
                      ></div>
                      <div
                        className={
                          packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        {productData?.price?.base}
                      </div>
                      <div
                        className={
                          packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        {productData?.bulkOrderData?.partNum}
                      </div>
                      <div
                        className={
                          packagedOrder ? 'cell color-disabled' : 'cell'
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
                              packagedOrder && 'rgba(255, 255, 255, 0.3)',
                          }}
                        />
                      </div>
                      <div
                        className={
                          packagedOrder ? 'cell color-disabled' : 'cell'
                        }
                      >
                        {'$' + productData?.bulkOrderData?.totalPrice || '0.00'}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="table">
                    <div className="cell">BULK</div>
                    <div className="cell"></div>
                    <div className="cell">
                      {productData?.bulkOrderData?.partNum}
                    </div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                  </div>
                )}
                {isLoggedIn && (
                  <Divider
                    style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                  />
                )}
                {isLoggedIn && (
                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button className="customButton" onClick={onSubmit}>
                      {addingToCart ? 'Adding...' : 'ADD TO CART'}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <PDPInformation pdpdatasheet={pdpdatasheet} />
          </Col>
        </Row>
        <CartDropdown productData={productData} />
      </div>
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
}
export default PDP
