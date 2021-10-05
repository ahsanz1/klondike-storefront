import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import PDPInformation from 'components/molecules/pdpinforamation'
import { Radio, InputNumber, Tooltip, Row, Col, Breadcrumb, Divider, Image } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
import PDPMobile from '../PDPMobile'
import Link from 'components/atoms/link'

import { AppContext } from 'libs/context'
import { constant } from 'lodash'
import { getProductBySKU, addProductToCart } from 'libs/services/api/pdp.api'
import PlpTabList from 'components/organisms/plp-tab-list';

const PDP = ({ pdpdata, pdpdatasheet, RadioData }) => {
  const { data, imgdata, heading } = pdpdata
  const [productData, setProductData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [packagedOrder, setPackagedOrder] = useState(true)

  const { packagedata, bulk, text2, text1 } = RadioData
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
      units: '12',
      partNum: 'KL-HD0540',
      price: '20.00',
      quantity: 0,
      totalPrice: '0.00'
    },
    {
      size: '4.73 mL',
      units: '5',
      partNum: 'KL-HD0540',
      price: '10.00',
      quantity: 0,
      totalPrice: '0.00'
    },
    {
      size: '46 mL',
      units: '',
      partNum: 'KL-HD0540',
      price: '30.00',
      quantity: 0,
      totalPrice: '0.00'
    },
    {
      size: '946 mL',
      units: '12',
      partNum: 'KL-HD0540',
      price: '20.00',
      quantity: 0,
      totalPrice: '0.00'
    },
  ]

  const bulkOrderData = {
    price: '1.85',
    partNum: 'KP-787777',
    litres: 0,
    totalPrice: '0.00'
  }

  useEffect(() => {
    getProductBySKU('AUTO000', 1)
      .then((res) => {
        let newObj = {
          ...res?.response?.data?.product,
          packagedOrderData: packgedOrderData,
          bulkOrderData: bulkOrderData,
        }
        setProductData(newObj)

        console.log('producttt', res.response.data)
      })
      .catch((e) => console.log({ e }))
  }, [])

  // eslint-disable-next-line space-before-function-paren
  const onQtyChange = (value, index) => {
    let { packagedOrderData } = productData
    let newArray = []
    newArray[index] = {
      ...newArray[index],
      totalPrice: parseFloat(Number(packagedOrderData[index]?.price) * value).toFixed(2),
    }
    let newObj = {
      ...productData,
      packagedOrderData: newArray,
      totalPackagedOrderPrice: packagedOrderData?.reduce((accu, curn) => {
        return accu + parseInt(curn?.totalPrice)
      }, 0)
    }
    setProductData(newObj)
  }

  const onBulkQtyChange = value => {
    let newObj = {
      ...productData,
      bulkOrderData: {
        ...productData?.bulkOrderData,
        totalPrice: parseFloat(Number(productData?.bulkOrderData?.price) * value).toFixed(2),
      }
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
    let req = productData
    let payload = {
      cartId: null,
      items: [req]
    }
    console.log('payload', payload)
    addProductToCart(payload)
      .then((res) => showcartPOPModal())
      .catch((e) => console.log(e))
  }

  const { showcartPOPModal, user } = useContext(AppContext)
  console.log({ user })

  const style3 = { padding: 20, color: '#FFFFFF', background: '#05050563', margin: 5, fontSize: '1.5vw' }

  return (
    <>
      <div className="customContainer">
        <Row className="p-10">
          <Col>
            <Breadcrumb className="breadCrumbStyle" separator={<span style={{ color: '#FFFFFF' }}>/</span>}>
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
          <Col style={{ display: 'flex', justifyContent: 'space-evenly', width: '80%', flexWrap: 'wrap' }}>
            <div className='flex-column'>
              <div className="image-background">
                {productData?.images?.map((img, i) => (
                  <Image src={img?.source[0]?.url} key={i} width='100%' height='100%' />
                ))}
              </div>
              {!isLoggedIn && <div style={{ textAlign: 'center' }}>
                <Button className="customButton">HOW TO BUY</Button>
              </div>}
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h1 style={{ fontSize: '3vw', fontWeight: 'bold', color: '#FFFFFF', lineHeight: '1.2' }}>{productData?.title}</h1>
                </div>
                <div className="share-icon">
                  <ShareAltOutlined size="32px" style={{ color: '#FFFFFF' }} />
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <Radio.Group onChange={onChange} value={value} defaultValue={1} size='large' optionType="button">
                  <Tooltip placement="bottomLeft" title={text}>
                    <Radio value={1} style={{ color: 'white' }}>PACKAGED ORDER</Radio>
                  </Tooltip>
                  <Tooltip placement="bottomRight" title={text}>
                    <Radio value={2} style={{ color: 'white' }}>BULK ORDER</Radio>
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
                {
                  productData?.packagedOrderData?.map((item, i) => {
                    return <div className="table" key={i}>
                      <div className="cell" key={i}>{item?.size}</div>
                      <div className="cell" key={i}>{item?.units}</div>
                      <div className="cell" key={i}>{item?.partNum}</div>
                      <div className="cell" key={i}>{isLoggedIn && item?.price}</div>
                      <div className="cell" key={i}>
                        {isLoggedIn && <InputNumber
                          min={0}
                          max={100}
                          defaultValue={0}
                          onChange={(e) => onQtyChange(e, i)}
                          disabled={!packagedOrder}
                          size='middle'
                          className='input'
                        />}
                      </div>
                      <div className="cell" key={i}>{isLoggedIn && `$${item?.totalPrice || '0.00'}`}</div>
                    </div>
                  })
                }
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <div className="cell">{isLoggedIn && `$${productData?.totalPackagedOrderPrice || '0.00'}`}</div>
                </div>
                {isLoggedIn && <Divider style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }} />}
                {isLoggedIn ? <><div className="table">
                  <div className="cell">BULK</div>
                  <div className="cell">PRICE/LITER</div>
                  <div className="cell">PART NUM</div>
                  <div className="cell">LITRES</div>
                  <div className="cell"></div>
                </div>
                  <div className="table">
                    <div className="cell"></div>
                    <div className="cell">{productData?.bulkOrderData?.price}</div>
                    <div className="cell">{productData?.bulkOrderData?.partNum}</div>
                    <div className="cell"><InputNumber
                      min={0}
                      max={100}
                      defaultValue={0}
                      onChange={(e) => onBulkQtyChange(e)}
                      size='middle'
                      className='input'
                      disabled={packagedOrder}
                    /></div>
                    <div className="cell">{`$${productData?.bulkOrderData?.totalPrice || '0.00'}`}</div>
                  </div></> :
                  <div className="table">
                    <div className="cell">BULK</div>
                    <div className="cell"></div>
                    <div className="cell">{productData?.bulkOrderData?.partNum}</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                  </div>
                }
                {isLoggedIn && <Divider style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }} />}
                {isLoggedIn && <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <Button className="customButton" onClick={onSubmit} >ADD TO CART</Button>
                </div>}
              </div>
            </div>

            <PDPInformation pdpdatasheet={pdpdatasheet} />

          </Col>
        </Row>

        {/* <div className="PDP-container">
          <div className="left-side">
            {imgdata.map((content, i) => (
              <>
                <div className="img-wrapper" key={i}>
                  <Image src={content.image.url} className="slider-image" />
                </div>
                <Button className="how_buy">{content.btntxt}</Button>
              </>
            ))}
          </div>
          <div className="right-side">
            <div className="share-icon">
              <p
                className="right-align"
              // onClick={() => {
              //   // window.open(
              //   //   `https://facebook.com/sharer.php?u=${'https://dev.klondike.fabric.zone/'}`,
              //   //   '_blank',
              //   // )
              //   window.location.href
              // }}
              >
                <ShareAltOutlined />
              </p>
            </div>
            {heading && <h1>{heading}</h1>}
            <Radio.Group
              onChange={onChange}
              value={value}
              className="radio-group"
            >
              <Tooltip placement="bottomLeft" title={text}>
                <Radio
                  value={1}
                  className={`package   ${disable || 'disabledradio'}`}
                  disabled={bulksdisable}
                  onChange={packageHandler}
                >
                  <Link to="/Order" className="pack_order_link">
                    Packaged ORDER
                  </Link>
                </Radio>
              </Tooltip>
              <Tooltip placement="bottomLeft" title={secondtext}>
                <Radio
                  value={2}
                  className={`bulk   ${!disable ? 'disabledradio' : ''}`}
                  disabled={packagedisabl}
                  onClick={() => {
                    console.log('foucs')
                  }}
                  onChange={bulkHandler}
                >
                  <Link to="/bulk" className="pack_order_link">
                    Bulk ORDER
                  </Link>
                </Radio>
              </Tooltip>
            </Radio.Group>
            <div
              className={
                !packages
                  ? 'test  bulk_overlay_top hide-packg'
                  : 'test bulk_overlay_top'
              }
            >
              {!packages && <div className="bulk_overlay"></div>}
              <p className="item-list-warapper mobile-hide">
                <span>SIZE</span>
                <span>UNIT/CASE</span>
                <span>PART NUM</span>
                <span>Price</span>
                <span>QTy</span>
                <span>Total Price</span>
              </p>
              {data.map((content, id) => (
                <>
                  <div className="item-list-warapper" key={id}>
                    <div>
                      <span className="desktop-hide">SIZE</span>
                      <p>{content.size}</p>
                    </div>

                    <div>
                      <span className="desktop-hide">UNIT/CASE</span>
                      <p>{content.unit}</p>
                    </div>
                    <div>
                      <span className="desktop-hide"> PART NUM</span>
                      <p>{content.part}</p>
                    </div>
                    <div>
                      <span className="desktop-hide">Price</span>
                      <p>
                        ${(content.price = parseFloat(content.price).toFixed(2))}
                      </p>
                    </div>
                    <div>
                      <span className="desktop-hide">QTy</span>
                      <p>
                        <InputNumber
                          min={0}
                          max={100}
                          defaultValue={0}
                          onChange={onChang}
                        />
                      </p>
                    </div>
                    <div>
                      <span className="desktop-hide">Total Price</span>
                      <p>
                        $
                        {(content.price = parseFloat(content.price).toFixed(2)) *
                          a}
                      </p>
                    </div>
                  </div>
                </>
              ))}
              <p className="right-align">
                ${(newdata = parseFloat(newdata).toFixed(2))}
              </p>
            </div>
            <div className={!bulks ? 'hide-bulk' : 'pdp_bulk_order'}>
              <Divider />
              <div className="top_overlay">
                {!bulks && <div className="overlay"></div>}

                <p
                  className={`item-bulk-warappers ${!disable ? 'disabledradio' : ''}`}
                >
                  <span>BULK</span>
                  <span>Price/LitRE</span>
                  <span>PART NUM</span>
                  <span>LITRES</span>
                  <span></span>
                </p>
                <div className="item-bulk-warappers">
                  <p></p>
                  <p>20</p>
                  <p>item</p>
                  <p>
                    <InputNumber
                      min={0}
                      max={100}
                      defaultValue={0}
                      onChange={onChanging}
                    />
                  </p>
                  <p>$50</p>
                </div>
              </div>
              <Divider />
            </div>
            <Button
              className="add-to-cart"
              onClick={() => {
                showcartPOPModal()
              }}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
        <PDPInformation pdpdatasheet={pdpdatasheet} />
        <PDPMobile pdpdata={pdpdata} /> */}
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
