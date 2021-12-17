/* eslint-disable indent */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Image from 'components/atoms/image'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
// import Button from 'components/atoms/button'
// import PDPInformation from 'components/molecules/pdpinforamation'
import {
  Radio,
  InputNumber,
  Button,
  Breadcrumb,
  Space,
  Divider,
  // Link,
} from 'antd'
import { DoubleRightOutlined } from '@ant-design/icons'
import Link from 'components/atoms/link'
import Heading from 'components/atoms/heading'
// import Button from 'components/atoms/button'
// import { ShareAltOutlined } from '@ant-design/icons'
import PDPInformation from 'components/molecules/pdpinforamation'
// import PlpTabList from 'components/organisms/plp-tab-list'
import PlpTabList from 'components/organisms/plp-tab-list'
import { useNavigate } from '@reach/router'
import { AppContext } from 'libs/context'
import PackageOrder from 'components/organisms/PackageOrder'

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
  pdpdatasheet,
  categories,
  itemName,
  clickCategoryHandler,
  subItem,
  subItemClickHandler,
  contextPlp,
  isPdpLoading,
  items,
  packagedItemsCart,
  bulkItemsCart,
  techInfoMobile,
  modalVisible,
  setModalVisible,
  itemSku,
}) => {
  const [size] = useWindowSize()
  console.log('responsive', pdpdata, techInfoMobile)
  console.log({ categories })
  const [openCategories, setOpenCategories] = useState(false)

  const handleCategoryButton = () => {
    setOpenCategories(!openCategories)
  }
  const navigate = useNavigate()

  const handleClose = () => setOpenCategories(false)
  const handleHowToBuy = () => navigate('/account/login')
  const { showModal, getCartItems } = useContext(AppContext)

  const addToCartFunction = () => {
    onSubmit()
    showModal()
  }

  const packageOrderStarted = {
    heading: 'PACKAGED ORDER STARTED',
    paragraph1:
      'Additional items added to this order need to be for packaged delivery.',
    paragraph2: 'Please complete your order before placing a bulk order.',
  }

  const bulkOrderStarted = {
    heading: 'BULK ORDER STARTED',
    paragraph1:
      'Additional items added to this order need to be ordered in bulk.',
    paragraph2:
      'Please complete your order before placing an order with packaged items.',
  }

  if (modalVisible && size < 768) {
    window.scrollTo(0, 0)
    return (
      <PackageOrder
        order={packagedOrder ? packageOrderStarted : bulkOrderStarted}
        setModalVisible={setModalVisible}
      />
    )
  }

  return (
    <div className="pdp_mobile-container">
      <div className="top-section">
        <Button
          className="categoryButton"
          type="primary"
          ghost
          onClick={handleCategoryButton}
          // icon={<DoubleRightOutlined />}
        >
          PRODUCTS BY CATEGORY <DoubleRightOutlined />
        </Button>
        <div
          style={{ width: '100%', marginTop: '5vw', marginBottom: '5vw' }}
          className="pdp-categories-section"
        >
          {openCategories ? (
            <PlpTabList
              categories={categories}
              itemName={contextPlp}
              clickCategoryHandler={clickCategoryHandler}
              subItem={subItem}
              subItemClickHandler={subItemClickHandler}
              handleClose={handleClose}
              sku={itemSku}
            />
          ) : null}
        </div>
        {isPdpLoading ? (
          <Breadcrumb
            className="breadCrumb"
            separator={<span style={{ color: '#FFFFFF' }}></span>}
          >
            <Breadcrumb.Item>
              <span>Loading...</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        ) : (
          <Breadcrumb
            className="breadCrumb"
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
              <Link to="/category" style={{ color: '#FFFFFF' }}>
                {productData ? <span>{productData.category}</span> : ''}
              </Link>
            </Breadcrumb.Item>
            {/* <Breadcrumb.Item>Heavy Duty Engine Oil</Breadcrumb.Item> */}
            <Breadcrumb.Item>
              {productData ? <span>{productData.title}</span> : ''}
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
      </div>
      {isPdpLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            // width: '69vw',
            flexWrap: 'wrap',
          }}
          className="product-details"
        >
          <h1 style={{ color: 'gray' }}>
            {!isPdpLoading ? (
              <span>{'No Data Found for this Item'}</span>
            ) : (
              <span>{'Loading...'}</span>
            )}
          </h1>
        </div>
      ) : Object.keys(items).length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            // width: '69vw',
            flexWrap: 'wrap',
          }}
          className="product-details"
        >
          <span> </span>
          <h1 style={{ color: 'gray' }}>No Attributes Found for this Item</h1>
        </div>
      ) : (
        <>
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
            {/* <div className="shareIcon">
                <ShareAltOutlined size="32px" style={{ color: '#FFFFFF' }} />
              </div> */}
          </div>
          <Heading className="pdp_mobile-heading">
            {productData && productData?.title}
          </Heading>
          {!isLoggedIn && (
            <div style={{ width: '90%', margin: 'auto' }}>
              <Divider
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              />
            </div>
          )}
          <span> </span>
          {isLoggedIn && (
            <div className="radioGroup">
              <Radio.Group
                onChange={onRadioChange}
                value={value}
                defaultValue={1}
                size="large"
                optionType="button"
              >
                <Space direction="vertical">
                  {packagedItemsCart && (
                    <Radio
                      value={1}
                      className="radio-font"
                      style={{
                        color: packagedOrder
                          ? '#fff'
                          : 'rgba(244, 244, 244, 0.5)',
                      }}
                    >
                      <span>PACKAGED ORDER</span>
                    </Radio>
                  )}
                  {bulkItemsCart && (
                    <Radio
                      value={2}
                      className="radio-font"
                      style={{
                        color: !packagedOrder
                          ? '#ffff'
                          : 'rgba(244, 244, 244, 0.5)',
                      }}
                    >
                      <span>BULK ORDER</span>
                    </Radio>
                  )}
                </Space>
              </Radio.Group>
            </div>
          )}
          {packagedItemsCart &&
            packagedOrder &&
            pdpdata?.packagedOrderItems?.map((item, i) => {
              return (
                <div
                  className="pdp-mobile-table"
                  style={{
                    justifyContent: 'space-between',
                  }}
                  key={i}
                >
                  <div
                    className="oneCell"
                    style={{
                      justifyContent: !isLoggedIn && 'space-between',
                    }}
                  >
                    {((!isLoggedIn && i < 1) || isLoggedIn) && (
                      <span className="head">SIZE</span>
                    )}
                    <span className="value">
                      {item?.mappedAttributes['Package Size']}
                    </span>
                  </div>
                  <div className="oneCell">
                    {((!isLoggedIn && i < 1) || isLoggedIn) && (
                      <span className="head">PER CASE</span>
                    )}
                    <span className="value per-case">
                      {item?.mappedAttributes['Unit of Measurement']}
                    </span>
                  </div>
                  <div className="oneCell" style={{}}>
                    {((!isLoggedIn && i < 1) || isLoggedIn) && (
                      <span
                        className="head"
                        style={{ width: !isLoggedIn && '25vw' }}
                      >
                        PART NUM
                      </span>
                    )}
                    <span
                      className="value"
                      style={{ width: !isLoggedIn && '25vw' }}
                    >
                      {item?.mappedAttributes['Part Number']}
                    </span>
                  </div>
                  {isLoggedIn && (
                    <div className="oneCell">
                      <span className="head text-right">Price</span>
                      <span className="value text-right">
                        {isLoggedIn && item && item?.price && item?.price?.base
                          ? '$' + parseFloat(item?.price?.base).toFixed(2)
                          : ''}
                        <span> </span>
                      </span>
                    </div>
                  )}
                  {isLoggedIn && <div className="oneCell"></div>}

                  {isLoggedIn && (
                    <div className="value-qty">
                      <span className="head">QTY:</span>
                      <InputNumber
                        min={0}
                        max={100}
                        defaultValue={0}
                        type="number"
                        onChange={e => onQtyChange(e, i)}
                        disabled={!packagedOrder}
                        size="middle"
                        className="input"
                        style={{
                          minWidth: '50%',
                          backgroundColor:
                            !packagedOrder && 'rgba(255, 255, 255, 0.3)',
                        }}
                        onKeyUp={e => {
                          if (e.target.value < 0) {
                            e.target.value = e.target.value * -1
                          }
                        }}
                      />
                    </div>
                  )}
                  {isLoggedIn && (
                    <div className="oneCellBulk">
                      <span className="head text-right">Total Price</span>
                      <span
                        className="value text-right"
                        style={{
                          color: item?.totalPrice > 0 ? '#F1A900' : '#ffff',
                        }}
                      >
                        {isLoggedIn &&
                          '$' + parseFloat(item?.totalPrice || 0).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {isLoggedIn && <Divider className="divider" />}
                </div>
              )
            })}
          {!isLoggedIn && (
            <div
              className="pdp-mobile-table"
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row-reverse',
              }}
            >
              <div className="oneCellBulk">
                <span className="value text-right">
                  {items?.bulkOrderItem[0]?.mappedAttributes['Part Number']}
                </span>
              </div>
              <div className="oneCellBulk">
                <span className="value text-right"></span>
              </div>
              <div className="oneCellBulk">
                <span className="value">Bulk</span>
              </div>
            </div>
          )}
          {bulkItemsCart &&
            !packagedOrder &&
            pdpdata?.bulkOrderItem?.map((item, i) => {
              return (
                <div
                  className="pdp-mobile-table"
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row-reverse',
                  }}
                  key={i}
                >
                  <div className="oneCellBulk">
                    <span className="head text-right">PART NUM</span>
                    <span className="value text-right">
                      {item?.mappedAttributes['Part Number']}
                    </span>
                  </div>
                  <div className="oneCellBulk">
                    <span className="head">Price Per Litre</span>
                    <span className="value text-center">
                      {item?.price?.base &&
                        '$' + parseFloat(item?.price?.base).toFixed(2)}
                    </span>
                  </div>
                  <div className="oneCellBulk">
                    <span className="head">Bulk</span>
                  </div>
                  {isLoggedIn && (
                    <div className="value-qty">
                      <span className="head" style={{ marginRight: '10px' }}>
                        LITRES:
                      </span>
                      <InputNumber
                        min={0}
                        defaultValue={0}
                        onChange={e => onBulkQtyChange(e)}
                        disabled={packagedOrder}
                        size="middle"
                        type="number"
                        className="input"
                        style={{
                          minWidth: '50%',
                          backgroundColor:
                            packagedOrder && 'rgba(255, 255, 255, 0.3)',
                        }}
                        onKeyUp={e => {
                          if (e.target.value < 0) {
                            e.target.value = e.target.value * -1
                          }
                        }}
                      />
                    </div>
                  )}
                  <div>
                    {!packagedOrder &&
                      Number(item?.quantity) <
                        Number(500 - getCartItems?.quantity) && (
                        <span style={{ color: '#fa9200' }}>
                          Orders below 500L are subject to an under-a-minimum
                          fee.
                        </span>
                      )}
                  </div>
                  {isLoggedIn && <Divider className="divider" />}
                </div>
              )
            })}
          {isLoggedIn && (
            <div className="total-price-container">
              <span
                className="total-price"
                style={{
                  color:
                    pdpdata?.totalPackagedOrderPrice ||
                    pdpdata?.bulkOrderItem[0]?.totalPrice > 0
                      ? '#f1a900'
                      : '#ffff',
                }}
              >
                {'$' +
                  (packagedOrder
                    ? pdpdata?.totalPackagedOrderPrice > 0
                      ? parseFloat(pdpdata?.totalPackagedOrderPrice).toFixed(2)
                      : '0.00'
                    : parseFloat(
                        pdpdata?.bulkOrderItem[0]?.totalPrice || 0.0,
                      ).toFixed(2))}
              </span>
            </div>
          )}
        </>
      )}
      {isLoggedIn ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="add-to-cart"
            disabled={btnDisabled}
            onClick={addToCartFunction}
          >
            {addingToCart ? (
              <span>{'Adding...'}</span>
            ) : (
              <span>{'ADD TO CART'}</span>
            )}
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="add-to-cart" onClick={handleHowToBuy}>
            <span>{'How To Buy'}</span>
          </Button>
        </div>
      )}
      <div className="pdp-tech-info-section">
        {techInfoMobile && techInfoMobile.length ? (
          <PDPInformation techInfo={techInfoMobile} />
        ) : null}
      </div>
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
  pdpdatasheet: PropTypes.string,
  categories: PropTypes.array,
  itemName: PropTypes.string,
  clickCategoryHandler: PropTypes.func,
  subItem: PropTypes.array,
  techInfoMobile: PropTypes.array,
  width: PropTypes.string,
  subItemClickHandler: PropTypes.func,
  contextPlp: PropTypes.string,
  isPdpLoading: PropTypes.bool,
  items: PropTypes.array,
  packagedItemsCart: PropTypes.bool,
  bulkItemsCart: PropTypes.bool,
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  itemSku: PropTypes.string,
}
export default PDPMobile
