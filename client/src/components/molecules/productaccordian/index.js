import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Modal, InputNumber } from 'antd'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
// import { tableProAccoData } from './data'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import { fetchCategory } from 'libs/services/algolia'
// import ProductAccordionModal from './product-pop/addtocartmodel'
// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// import Label from 'components/atoms/label'
import './style.scss'
import { getProductBySKU, addProductToCart } from 'libs/services/api/pdp.api'
import { AppContext } from 'libs/context'
import { setUserCart } from 'libs/utils/user-cart'

const ProductAccordion = ({ question }) => {
  // const { tableData } = tableProAccoData
  const {
    user,
    creditLimit,
    getCartItems,
    showcartPOPModal,
    setGetCartItemsState,
  } = useContext(AppContext)
  let [qty, setQty] = useState(1)
  let [totalPrice, setTotalPrice] = useState('')
  let [modalData, setModalData] = useState('')
  let [addToCart, setAddToCart] = useState(false)
  let [showAddToCart, setShowAddToCart] = useState(false)
  let [itemId, setItemId] = useState(0)
  const [size] = useWindowSize()
  const [itemdata, setItemData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isPackage, setIsPackage] = useState(false)
  const [hasCartData, setHasCartData] = useState(false)

  useEffect(() => {
    const data = async () => {
      const items = await fetchCategory(question)
      setItemData(items.hits)
    }
    data()
  }, [])

  useEffect(() => {
    if (getCartItems && getCartItems.items && getCartItems.items.length > 0) {
      if (getCartItems?.hasPackaged) {
        setIsPackage(true)
      } else {
        setIsPackage(false)
      }
      setHasCartData(true)
    } else {
      setHasCartData(false)
    }
  }, [getCartItems])

  const showModal = data => {
    let payload = {}
    let perCase =
      data['Weight'] !== undefined ? data['Weight'] : data['QTY PER CASE']
    data = JSON.parse(data)
    payload = {
      img: data['Image 1 URL'],
      title: data['title'],
      size: data['Package Size'],
      partNumber: data['Part Number'],
      totalPrice: data['Order Price'],
      price: data['Order Price'],
      unit: `${data['Unit of Measurement']}${
        perCase !== undefined ? '/' + perCase : ''
      }`,
      sku: data['SKU'],
    }

    setModalData(payload)
    setTotalPrice(payload.totalPrice)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  // eslint-disable-next-line space-before-function-paren
  function error(msg) {
    Modal.error({
      title: 'This is an error message',
      content:
        msg ||
        'Due to some technical reasons, this action cannot be performed!',
    })
  }

  const addItemToCart = async () => {
    let data = modalData

    let totalAmount = Math.floor(getCartItems?.totalAmount?.amount + totalPrice)
    if (creditLimit <= totalAmount) {
      error('You are exceeding your credit limit')
      return
    }

    setAddToCart(true)
    getProductBySKU(data.sku).then(res => {
      res = res.response.data
      let product = res.product
      let payload = {
        cartId: null,
        items: [
          {
            extra: {},
            group: product.group,
            itemId: product.itemId,
            sku: product.sku,
            quantity: qty,
            price: {
              base: Number(totalPrice),
              currency: 'USD',
              sale: false,
              discount: {
                price: 0,
              },
            },
            size: false,
          },
        ],

        registeredUser: true,
        userAuthToken: user.accessToken,
      }
      addProductToCart(payload)
        .then(async res => {
          if (res.hasError !== true) {
            setGetCartItemsState(await setUserCart())
            showcartPOPModal()
            setIsModalVisible(false)
            setAddToCart(false)
          } else {
            error(res.response.error)
            setIsModalVisible(false)
            setAddToCart(false)
          }
        })
        .catch(err => {
          console.log('errres', err)
          setIsModalVisible(false)
          setAddToCart(false)
        })
    })
  }

  const onChange = value => {
    let data = modalData
    setTotalPrice(data.price * value)

    let totalAmount = Math.floor(getCartItems?.totalAmount?.amount + totalPrice)
    if (creditLimit <= totalAmount) {
      error('You are exceeding your credit limit')
      return
    }

    setQty(value)
  }

  const handleAddToCart = i => {
    setShowAddToCart(!showAddToCart)
    setItemId(i)
  }
  // const showModal = () => {
  //   setIsModalVisible(true)
  // }
  // const onOk = () => {
  //   setIsModalVisible(false)
  // }

  return (
    <>
      {/* <Panel header="This is panel header 2" key="2"> */}
      <div className="table-wrapper-faqs">
        <Row className="title flex">
          <Col lg={8}>
            <p>PRODUCT</p>
          </Col>
          <Col lg={4}>
            <p>PACKAGE SIZE</p>
          </Col>
          <Col lg={3}>
            <p>PART #</p>
          </Col>
          <Col lg={3}>
            <p className="text-class-center">PER CASE</p>
          </Col>
          <Col lg={3}>
            <p className="text-class-center">PER PALLET</p>
          </Col>
          <Col lg={3}>
            <p className="text-class-right">UNIT PRICE</p>
          </Col>
        </Row>

        {itemdata &&
          itemdata.map((data, i) => {
            if (data?.isVariant) {
              return (
                <>
                  <Row
                    className="table-content flex"
                    key={i}
                    onClick={i => handleAddToCart(data.itemId)}
                  >
                    <Col lg={8} className="custom-width">
                      <p className="text-setting-table">
                        {data['Product Title']}
                      </p>
                    </Col>
                    <Col lg={4} className="custom-width">
                      <p className="light-text-weight">
                        {data['Package Size']}
                      </p>
                    </Col>
                    <Col lg={3} className="custom-width">
                      <p>{data['Part Number']}</p>
                    </Col>
                    <Col lg={3} className="custom-width">
                      <p className="text-class-center">{data['Weight']}</p>
                    </Col>
                    <Col lg={3} className="custom-width">
                      <p className="text-class-center">
                        {data['Unit of Measurement']}
                      </p>
                    </Col>
                    <Col lg={3} className="custom-width">
                      <p className="text-class-right text-setting-table">
                        ${data['Order Price'].toFixed(2)}
                      </p>
                    </Col>
                    {showAddToCart && itemId === data.itemId && (
                      <>
                        {/* <div className="hover-details"> */}
                        <div className="">
                          <div className="table-image">
                            <Image
                              src={data['Image URL'] || data['Image 1 URL']}
                              className="table-image"
                            />
                          </div>
                          <div className="table-button">
                            <Button
                              onClick={e => showModal(JSON.stringify(data))}
                              className={
                                hasCartData &&
                                !isPackage === data['Packaged Order']
                                  ? 'hover-button stop'
                                  : ' hover-button'
                              }
                              disabled={
                                hasCartData
                                  ? !(isPackage === data['Packaged Order'])
                                  : false
                              }
                            >
                              ADD TO CART
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </Row>
                </>
              )
            }
          })}
      </div>

      {/* {isModalVisible && (
        <ProductAccordionModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )} */}
      <div className="Price-list-modal">
        <Modal visible={isModalVisible} onCancel={handleCancel}>
          {size > 768 ? (
            <div className="model-parent">
              <div className="product-img">
                <img src={modalData.img} alt="img" />
              </div>
              <div className="prodct-data">
                <h1>{modalData.title}</h1>
                <div className="product-detail">
                  <div>
                    {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:' ? (
                      <p className="products-sizes">Size</p>
                    ) : (
                      <p className="products-sizes">Bulk</p>
                    )}
                    {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:' && (
                      // eslint-disable-next-line indent
                      <p className="products-sizes detail">{modalData.size}</p>
                    )}
                  </div>
                  <div>
                    {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:' && (
                      <>
                        <p className="products-sizes">UNITS/CASE</p>
                        <p className="products-sizes">{modalData.unit}</p>
                      </>
                    )}
                  </div>
                  <div>
                    <p className="products-sizes">Part Num</p>
                    <p className="products-sizes detail">
                      {modalData.partNumber}
                    </p>
                  </div>
                  <div>
                    <p className="products-sizes">
                      {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:'
                        ? 'Price'
                        : 'Price Litre'}
                    </p>
                    <p className="products-sizes detail ">
                      ${modalData?.price?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="products-sizes">
                      {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:'
                        ? 'QTY'
                        : 'Litres'}
                    </p>
                    <p className="products-sizes detail">
                      <InputNumber
                        min={0}
                        value={qty}
                        type="number"
                        defaultValue={1}
                        onChange={onChange}
                        size="middle"
                        className="input"
                      />
                    </p>
                  </div>
                  <div>
                    <p className="products-sizes">Total Price</p>
                    <p className="products-sizes detail">
                      $ {parseFloat(totalPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
                <Button
                  className="pricelist-addcart "
                  onClick={e => addItemToCart(e)}
                >
                  {addToCart ? 'Adding...' : 'Add To Cart'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="product-mobile">
              <h1 className="product-heading-mobile">{modalData.title}</h1>
              <div className="product-img-mobile">
                <img src={modalData.img} alt="img" />
              </div>
              <div className="product-content-mobile">
                <div className="product-detail-mobile">
                  {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:' ? (
                    <p className="products-sizes">SiZE</p>
                  ) : (
                    <p className="products-sizes">Bulk</p>
                  )}
                  {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:' && (
                    <p className="products-sizes detail">{modalData.size}</p>
                  )}
                </div>
                {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:' ? (
                  <div className="product-detail-mobile">
                    <p className="products-sizes">UNIT/CASE</p>
                    <p className="products-sizes detail">{modalData.unit}</p>
                  </div>
                ) : (
                  <div className="product-detail-mobile"></div>
                )}
                <div className="product-pricing-mobile">
                  <div>
                    <div>
                      <p className="products-sizes">Part Num</p>
                      <p className="products-sizes detail">
                        {modalData.partNumber}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="product-pricing-block">
                      <p className="products-sizes">
                        {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:'
                          ? 'Price'
                          : 'Price Litre'}
                      </p>
                      <p className="products-sizes detail ">
                        ${modalData?.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-total-pricing">
                <div className="total-pricing-block">
                  <p className="products-sizes">
                    {modalData.size !== 'Bulk' && modalData.size !== 'Bulk:'
                      ? 'QTY'
                      : 'Litres'}
                  </p>
                  <p className="products-sizes detail">
                    <InputNumber
                      min={0}
                      value={qty}
                      type="number"
                      defaultValue={1}
                      onChange={onChange}
                      size="middle"
                      className="input"
                    />
                  </p>
                </div>
                <div className="prodcut-total-price">
                  <p className="products-sizes">Total Price</p>
                  <p className="products-sizes details">
                    ${parseFloat(totalPrice).toFixed(2)}
                  </p>
                </div>
              </div>
              <Button
                className="pricelist-addcart-mobile "
                onClick={e => addItemToCart(e)}
              >
                Add TO CART
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </>
  )
}

// const { array } = PropTypes
ProductAccordion.propTypes = {
  // ProductAccordion: PropTypes.array,
  question: PropTypes.array,
}
export default ProductAccordion
