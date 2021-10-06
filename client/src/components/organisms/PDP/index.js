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
} from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
// import PDPMobile from '../PDPMobile'
// import Link from 'components/atoms/link'

import { AppContext } from 'libs/context'
// import { constant } from 'lodash'
import { getProductBySKU, addProductToCart } from 'libs/services/api/pdp.api'
import PlpTabList from 'components/organisms/plp-tab-list'
import CartDropdown from '../cart-dropdown'

const PDP = ({ pdpdata, pdpdatasheet, RadioData }) => {
  // const { data, imgdata, heading } = pdpdata
  const { showcartPOPModal, user } = useContext(AppContext)
  console.log({ user })

  const [productData, setProductData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [packagedOrder, setPackagedOrder] = useState(true)

  const { packagedata, text1 } = RadioData
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

  // dummycomment

  useEffect(() => {
    getProductBySKU('AUTO000', 1)
      .then(res => {
        let newObj = {
          ...res?.response?.data?.product,
          packagedOrderData: packgedOrderData,
          bulkOrderData: bulkOrderData,
        }
        setProductData(newObj)

        console.log('producttt', res.response.data)
      })
      .catch(e => console.log({ e }))
    if (user?.accessToken) {
      setIsLoggedIn(true)
    } else setIsLoggedIn(false)
  }, [])

  // eslint-disable-next-line space-before-function-paren
  const onQtyChange = (value, index) => {
    let { packagedOrderData } = productData
    let newArray = [...packagedOrderData]
    newArray[index] = {
      ...newArray[index],
      totalPrice: parseFloat(
        Number(packagedOrderData[index]?.price) * value,
      ).toFixed(2),
    }
    let newObj = {
      ...productData,
      packagedOrderData: newArray,
      totalPackagedOrderPrice: packagedOrderData?.reduce((accu, curn) => {
        return accu + parseInt(curn?.totalPrice)
      }, 0),
    }
    setProductData(newObj)
  }

  const onBulkQtyChange = value => {
    let newObj = {
      ...productData,
      bulkOrderData: {
        ...productData?.bulkOrderData,
        totalPrice: parseFloat(
          Number(productData?.bulkOrderData?.price) * value,
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
  // const secondtext = (
  //   <div className="toltip-container">
  //     <h1>{bulk}</h1>
  //     <p>{text2}</p>
  //   </div>
  // )

  const onSubmit = () => {
    // let req = {
    //   ...productData,
    //   packagedOrder: packagedOrder,
    //   bulkOrder: !packagedOrder,
    //   quantity: 2,
    //   extra: {},
    //   size: false,
    // }

    let payload = {
      cartId: null,
      items: [
        {
          group: productData?.group,
          sku: productData?.sku,
          price: {
            base: 50,
            currency: 'USD',
            discount: { price: 0 },
            sale: false,
          },
          itemId: productData?.itemId,
          extra: {},
          // group: ['611d5c693fea150008c941a5'],
          // itemId: 2795,
          quantity: 2,
          size: false,
          // sku: 'TYPEMESHING',
        },
      ],
      registeredUser: false,
      userAuthToken: null,
    }

    addProductToCart(payload)
      .then(res => showcartPOPModal())
      .catch(e => console.log(e))
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
              <Breadcrumb.Item>Transmission Fluids</Breadcrumb.Item>
              <Breadcrumb.Item>Heavy Duty Engine Oil</Breadcrumb.Item>
              <Breadcrumb.Item>15W-40 CK-4 Advanced Formula</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className="p-10">
          <Col style={{ width: '20%' }}>
            <PlpTabList />
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
                  <Tooltip placement="bottomRight" title={text}>
                    <Radio value={2} style={{ color: 'white' }}>
                      BULK ORDER
                    </Radio>
                  </Tooltip>
                </Radio.Group>
              </div>
              <div>
                <div className="table">
                  <div className="cell">SIZES</div>
                  <div className="cell">UNITS/CASE</div>
                  <div className="cell">PART NUM</div>
                  <div className="cell">{isLoggedIn && 'PRICE'}</div>
                  <div className="cell">{isLoggedIn && 'QTY'}</div>
                  <div className="cell">{isLoggedIn && 'TOTAL PRICE'}</div>
                </div>
                {productData?.packagedOrderData?.map((item, i) => {
                  return (
                    <div className="table" key={i}>
                      <div className="cell" key={i}>
                        {item?.size}
                      </div>
                      <div className="cell" key={i}>
                        {item?.units}
                      </div>
                      <div className="cell" key={i}>
                        {item?.partNum}
                      </div>
                      <div className="cell" key={i}>
                        {isLoggedIn && item?.price}
                      </div>
                      <div className="cell" key={i}>
                        {isLoggedIn && (
                          <InputNumber
                            min={0}
                            max={100}
                            defaultValue={0}
                            onChange={e => onQtyChange(e, i)}
                            disabled={!packagedOrder}
                            size="middle"
                            className="input"
                          />
                        )}
                      </div>
                      <div className="cell">
                        {'$' + productData?.bulkOrderData?.totalPrice
                          ? productData?.bulkOrderData?.totalPrice
                          : '$0.00'}
                      </div>
                    </div>
                  )
                })}
                {isLoggedIn && (
                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <div className="cell">
                      {'$' + productData?.totalPackagedOrderPrice
                        ? productData?.totalPackagedOrderPrice
                        : '$0.00'}
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
                      <div className="cell">BULK</div>
                      <div className="cell">PRICE/LITER</div>
                      <div className="cell">PART NUM</div>
                      <div className="cell">LITRES</div>
                      <div className="cell"></div>
                    </div>
                    <div className="table">
                      <div className="cell"></div>
                      <div className="cell">
                        {productData?.bulkOrderData?.price}
                      </div>
                      <div className="cell">
                        {productData?.bulkOrderData?.partNum}
                      </div>
                      <div className="cell">
                        <InputNumber
                          min={0}
                          max={100}
                          defaultValue={0}
                          onChange={e => onBulkQtyChange(e)}
                          size="middle"
                          className="input"
                          disabled={packagedOrder}
                        />
                      </div>
                      <div className="cell">
                        {'$' + productData?.bulkOrderData?.totalPrice ||
                          '$0.00'}
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
                      ADD TO CART
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
