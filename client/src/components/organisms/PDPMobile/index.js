import React, { useState, useContext } from 'react'
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
import PDPInformation from 'components/molecules/pdpinforamation'
// import PlpTabList from 'components/organisms/plp-tab-list'
import PlpTabList from 'components/organisms/plp-tab-list'
import { useNavigate } from '@reach/router'
import { AppContext } from 'libs/context'

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
}) => {
  console.log('responsive', pdpdata)
  console.log({ categories })
  const [openCategories, setOpenCategories] = useState(false)

  const handleCategoryButton = () => {
    setOpenCategories(!openCategories)
  }
  const navigate = useNavigate()

  const handleClose = () => setOpenCategories(false)
  const handleHowToBuy = () => navigate('/account/login')
  const { showModal } = useContext(AppContext)

  const addToCartFunction = () => {
    onSubmit()
    showModal()
  }

  return (
    <>
      <div className="pdp_mobile-container">
        <div className="top-section">
          <Button
            className="categoryButton"
            type="primary"
            ghost
            onClick={handleCategoryButton}
          >
            PRODUCTS BY CATEGORY {'>>'}
          </Button>
          {openCategories && (
            <div
              style={{ width: '100%', marginTop: '5vw', marginBottom: '5vw' }}
            >
              <PlpTabList
                categories={categories}
                itemName={contextPlp}
                clickCategoryHandler={clickCategoryHandler}
                subItem={subItem}
                subItemClickHandler={subItemClickHandler}
                handleClose={handleClose}
              />
            </div>
          )}
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
              {!isPdpLoading ? 'No Data Found for this Item' : 'Loading...'}
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
            {' '}
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
              <div className="shareIcon">
                <ShareAltOutlined size="32px" style={{ color: '#FFFFFF' }} />
              </div>
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
            )}{' '}
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
                    <Radio value={1} className="radio-font">
                      PACKAGED ORDER
                    </Radio>
                    <Radio value={2} className="radio-font">
                      BULK ORDER
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
            )}
            {packagedOrder
              ? pdpdata?.packagedOrderItems?.map((item, i) => {
                return (
                  <div
                    className="pdp-mobile-table"
                    style={{
                      justifyContent: 'space-between',
                    }}
                    key={i}
                  >
                      <>
                        <div className="oneCell">
                          {((!isLoggedIn && i < 1) || isLoggedIn) && (
                            <span className="head">SIZE</span>
                          )}
                          <span className="value">
                            {item?.mappedAttributes['Package Size']}F
                          </span>
                        </div>
                        <div className="oneCell">
                          {((!isLoggedIn && i < 1) || isLoggedIn) && (
                            <span className="head">UNITS/CASE</span>
                          )}
                          <span className="value">
                            {item?.mappedAttributes['Unit of Measurement']}
                          </span>
                        </div>
                        <div className="oneCell">
                          {((!isLoggedIn && i < 1) || isLoggedIn) && (
                            <span className="head">PART NUMBER</span>
                          )}
                          <span className="value">
                            {item?.mappedAttributes['Part Number']}
                          </span>
                        </div>
                      </>
                      {isLoggedIn && (
                        <div className="oneCell">
                          <span className="head text-right">Price</span>
                          <span className="value text-right">
                            {isLoggedIn &&
                            item &&
                            item?.price &&
                            item?.price?.base
                              ? '$' + parseFloat(item?.price?.base).toFixed(2)
                              : ''}{' '}
                          </span>
                        </div>
                      )}
                      <div className="oneCell"></div>
                      <div className="oneCell"></div>

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
                          <span className="head text-right">Total Price</span>
                          <span
                            className="value text-right"
                            style={{
                              color: item?.totalPrice > 0 ? '#f1a900' : '#ffff',
                            }}
                          >
                            {isLoggedIn &&
                              '$' +
                                parseFloat(item?.totalPrice || 0).toFixed(2)}
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
                      justifyContent: 'space-between',
                      flexDirection: 'row-reverse',
                    }}
                    key={i}
                  >
                    <div className="oneCell">
                      {<span className="head text-right">PART NUM</span>}
                      <span className="value text-right">
                        {item?.mappedAttributes['Part Number']}
                      </span>
                    </div>
                    <div className="oneCell">
                      <span className="head">Price pER Litre</span>
                      <span className="value">
                        {item?.price?.base &&
                            '$' + parseFloat(item?.price?.base)}
                      </span>
                    </div>
                    <div className="oneCell">
                      <span className="head">Bulk</span>
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
                      pdpdata?.totalPackagedOrderPrice > 0
                        ? '#f1a900'
                        : '#ffff',
                  }}
                >
                  {'$' +
                    (packagedOrder
                      ? pdpdata?.totalPackagedOrderPrice > 0
                        ? parseFloat(pdpdata?.totalPackagedOrderPrice).toFixed(
                          2,
                        )
                        : '0.00'
                      : parseFloat(
                          pdpdata?.bulkOrderItem[0]?.totalPrice || 0,
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
              {addingToCart ? 'Adding...' : 'ADD TO CART'}
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button className="add-to-cart" onClick={handleHowToBuy}>
              {'How To Buy'}
            </Button>
          </div>
        )}
        <div>
          <PDPInformation pdpdatasheet={pdpdatasheet} />
        </div>
      </div>
    </>
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
  width: PropTypes.string,
  subItemClickHandler: PropTypes.func,
  contextPlp: PropTypes.string,
  isPdpLoading: PropTypes.bool,
  items: PropTypes.array,
}
export default PDPMobile
