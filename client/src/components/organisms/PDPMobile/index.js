import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Image from 'components/atoms/image'
// import Button from 'components/atoms/button'
// import PDPInformation from 'components/molecules/pdpinforamation'
import { Radio, InputNumber, Button, Breadcrumb, Space, Divider } from 'antd'
// import { ShareAltOutlined } from '@ant-design/icons'
import Heading from 'components/atoms/heading'
// import Button from 'components/atoms/button'
import { ShareAltOutlined } from '@ant-design/icons'

const PDPMobile = ({
  pdpdata,
  productData,
  isLoggedIn,
  packagedOrder,
  onQtyChange,
  onRadioChange,
  onSubmit,
  addingToCart,
  onBulkQtyChange,
  value,
  btnDisabled,
}) => {
  console.log('responsive', pdpdata)

  return (
    <div className="pdp_mobile-wraper">
      <div className="pdp_mobile-container">
        <div className="top-section">
          <Button className="categoryButton" type="primary" ghost>
            PRODUCTS BY CATEGORY {'>>'}
          </Button>
          <Breadcrumb
            className="breadCrumb"
            separator={<span style={{ color: '#FFFFFF' }}>/</span>}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Our Products</Breadcrumb.Item>
            <Breadcrumb.Item>{productData?.category}</Breadcrumb.Item>
            {/* <Breadcrumb.Item>Heavy Duty Engine Oil</Breadcrumb.Item> */}
            <Breadcrumb.Item>{productData?.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="pdp-container">
          <div className="image-bg">
            {productData?.images?.map((img, i) => (
              <Image
                src={img?.source[0]?.url}
                key={i}
                width="100%"
                height="100%"
              />
            ))}
          </div>
          <div className="shareIcon">
            <ShareAltOutlined size="32px" style={{ color: '#FFFFFF' }} />
          </div>
        </div>
        <Heading className="pdp_mobile-heading">
          {productData && productData?.title}
        </Heading>
        <div className="radioGroup">
          <Radio.Group
            onChange={onRadioChange}
            value={value}
            defaultValue={1}
            size="large"
            optionType="button"
          >
            <Space direction="vertical">
              <Radio value={1} style={{ color: 'white' }}>
                PACKAGED ORDER
              </Radio>
              <Radio value={2} style={{ color: 'white' }}>
                BULK ORDER
              </Radio>
            </Space>
          </Radio.Group>
        </div>
        {packagedOrder
          ? pdpdata?.packagedOrderItems?.map((item, i) => {
            return (
              <div
                className="pdp-mobile-table"
                style={{
                  justifyContent: isLoggedIn ? 'flex-end' : 'space-between',
                }}
                key={i}
              >
                <div className="oneCell">
                  <span className="head">SIZE</span>
                  <span className="value">
                    {item?.mappedAttributes['Package Size']}F
                  </span>
                </div>
                <div className="oneCell">
                  <span className="head">UNITS/CASE</span>
                  <span className="value">
                    {item?.mappedAttributes['Unit of Measurement']}
                  </span>
                </div>
                <div className="oneCell">
                  {<span className="head">PART NUM</span>}
                  <span className="value">
                    {item?.mappedAttributes['Part Number']}
                  </span>
                </div>
                {isLoggedIn && (
                  <div className="oneCell">
                    <span className="head">Price</span>
                    <span className="value">{item?.price?.base}</span>
                  </div>
                )}

                {isLoggedIn && (
                  <div className="value-qty">
                    <span className="head">QTY:</span>
                    <InputNumber
                      min={0}
                      max={100}
                      defaultValue={0}
                      onChange={e => onQtyChange(e, i)}
                      disabled={!packagedOrder}
                      size="middle"
                      className="input"
                      style={{
                        minWidth: '50%',
                        backgroundColor:
                            !packagedOrder && 'rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  </div>
                )}
                {isLoggedIn && (
                  <div className="oneCell">
                    <span className="head">Total Price</span>
                    <span className="value">
                      {isLoggedIn && '$' + (item?.totalPrice || '0.00')}
                    </span>
                  </div>
                )}
                {isLoggedIn && <Divider className="divider" />}
              </div>
            )
          })
          : pdpdata?.bulkOrderItem?.map((item, i) => {
            return (
              <div
                className="pdp-mobile-table"
                style={{
                  justifyContent: isLoggedIn ? 'flex-end' : 'space-between',
                }}
                key={i}
              >
                <div className="oneCell">
                  <span className="head">Bulk</span>
                  {/* <span className="value">
                    {item?.mappedAttributes['Package Size']}F
                  </span> */}
                </div>
                <div className="oneCell">
                  <span className="head">Price pER Litre</span>
                  <span className="value">{item?.price?.base}</span>
                </div>
                <div className="oneCell">
                  {<span className="head">PART NUM</span>}
                  <span className="value">
                    {item?.mappedAttributes['Part Number']}
                  </span>
                </div>
                {isLoggedIn && (
                  <div className="value-qty">
                    <span className="head">LITRES:</span>
                    <InputNumber
                      min={0}
                      max={100}
                      defaultValue={0}
                      onChange={e => onBulkQtyChange(e)}
                      disabled={packagedOrder}
                      size="middle"
                      className="input"
                      style={{
                        minWidth: '50%',
                        backgroundColor:
                            packagedOrder && 'rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  </div>
                )}
                {isLoggedIn && (
                  <div className="oneCell">
                    <span className="head">Total Price</span>
                    <span className="value">
                      {item?.totalPrice || '0.00'}
                    </span>
                  </div>
                )}
                {isLoggedIn && <Divider className="divider" />}
              </div>
            )
          })}
        <div className="total-price-container">
          <span className="total-price">
            {'$' +
              (pdpdata?.totalPackagedOrderPrice > 0
                ? parseFloat(pdpdata?.totalPackagedOrderPrice).toFixed(2)
                : '0.00')}
          </span>
        </div>
        {isLoggedIn ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              className="add-to-cart"
              disabled={btnDisabled}
              onClick={onSubmit}
            >
              {addingToCart ? 'Adding...' : 'ADD TO CART'}
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button className="add-to-cart">{'How To Buy'}</Button>
          </div>
        )}
      </div>
      {/* <div className="pdp_mobile-container">
        {imgdata.map((content, i) => (
          <div className="product-img" key={i}>
            <Image src={content.image.url} className="slider-image" />
          </div>
        ))}
        <Heading className="pdp_mobile-heading">{heading && heading}</Heading>
        <div className="radio_btn_container">
          <Radio.Group
            onChange={onChange}
            value={value}
            className="radio-group"
          >
            <Radio
              value={1}
              className=""
              // disabled={bulksdisabl}
              // onChange={packageHandler}
            >
              Packaged ORDER
            </Radio>
            <Radio
              value={2}
              className=""
              // disabled={packgdisabl}
              // onClick={() => {
              //   console.log('foucs')
              // }}
              // onChange={bulkHandler}
            >
              Bulk ORDER
            </Radio>
          </Radio.Group>
        </div>
        {data.map((content, id) => (
          <div className="item-list-warapper" key={id}>
            <div className="item">
              <span>SIZE</span>
              <p>{content.size}</p>
            </div>

            <div className="item">
              <span>UNIT/CASE</span>
              <p>{content.unit}</p>
            </div>
            <div className="item">
              <span> PART NUM</span>
              <p>{content.part}</p>
            </div>
            <div className="item">
              <span>Price</span>
              <p>${(content.price = parseFloat(content.price).toFixed(2))}</p>
            </div>
            <div className="item">
              <span>QTy</span>
              <p>
                <InputNumber
                  min={0}
                  max={100}
                  defaultValue={0}
                  onChange={onChang}
                />
              </p>
            </div>
            <div className="item">
              <span>Total Price</span>
              <p>${(content.price = parseFloat(content.price).toFixed(2))}</p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  )
}
PDPMobile.propTypes = {
  pdpdata: PropTypes.object,
  data: PropTypes.array,
  heading: PropTypes.string,
  imgdata: PropTypes.array,
  productData: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  onQtyChange: PropTypes.func,
  packagedOrder: PropTypes.bool,
  onRadioChange: PropTypes.func,
  value: PropTypes.number,
  onSubmit: PropTypes.func,
  addingToCart: PropTypes.bool,
  onBulkQtyChange: PropTypes.func,
  btnDisabled: PropTypes.bool,
}
export default PDPMobile
