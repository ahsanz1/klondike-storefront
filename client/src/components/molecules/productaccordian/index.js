import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Modal, InputNumber } from 'antd'
// import { tableProAccoData } from './data'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import { fetchCategory } from 'libs/services/algolia'
// import ProductAccordionModal from './product-pop/addtocartmodel'
// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// import Label from 'components/atoms/label'
import './style.scss'
import { addToCart } from 'libs/utils/gtm'

const ProductAccordion = ({ question }) => {
  // const { tableData } = tableProAccoData
  let [totalPrice, setTotalPrice] = useState('')
  let [modalData, setModalData] = useState('')

  const [itemdata, setItemData] = useState([])
  console.log(modalData, 'modalData')
  useEffect(() => {
    const data = async () => {
      const items = await fetchCategory(question)
      setItemData(items.hits)
    }

    data()
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false)

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
      originalJson: JSON.stringify(data),
    }

    setModalData(payload)
    setTotalPrice(payload.totalPrice)

    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const addItemToCart = async () => {
    let item = modalData
    addToCart(JSON.parse(item.originalJson))
    setIsModalVisible(false)
  }

  function onChange (value) {
    let data = modalData
    setTotalPrice(data.price * value)
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
            <p className="text-class-center">PACKAGE SIZE</p>
          </Col>
          <Col lg={3}>
            <p className="text-class-center">PART #</p>
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
            return (
              <>
                <Row className="table-content flex" key={i}>
                  <Col lg={8} className="custom-width">
                    <p className="text-setting-table">
                      {data['product title']}
                    </p>
                  </Col>
                  <Col lg={4} className="custom-width">
                    <p className="light-text-weight">{data['Package Size']}</p>
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
                      ${data['Order Price']}
                    </p>
                  </Col>
                  <div className="hover-details">
                    <div className="table-image">
                      <Image
                        src={data['Image URL'] || data['Image 1 URL']}
                        className="table-image"
                      />
                    </div>
                    <div className="table-button">
                      <Button
                        onClick={e => showModal(JSON.stringify(data))}
                        className="hover-button"
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </div>
                </Row>
              </>
            )
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
          <div className="model-parent">
            <div className="product-img">
              <img src={modalData.img} alt="img" />
            </div>
            <div className="prodct-data">
              <h1>{modalData.title}</h1>
              <div className="product-detail">
                <div>
                  <p className="products-sizes">Size</p>
                  <p className="products-sizes detail">{modalData.size}</p>
                </div>
                <div>
                  <p className="products-sizes">UNITS/CASE</p>
                  <p className="products-sizes">{modalData.unit}</p>
                </div>
                <div>
                  <p className="products-sizes">Part Num</p>
                  <p className="products-sizes detail">
                    {modalData.partNumber}
                  </p>
                </div>
                <div>
                  <p className="products-sizes">Price</p>
                  <p className="products-sizes detail ">${modalData.price}</p>
                </div>
                <div>
                  <p className="products-sizes">QTY</p>
                  <p className="products-sizes detail">
                    <InputNumber
                      min={1}
                      value={1}
                      defaultValue={1}
                      onChange={onChange}
                      size="middle"
                      className="input"
                    />
                  </p>
                </div>
                <div>
                  <p className="products-sizes">Total Price</p>
                  <p className="products-sizes detail">${totalPrice}</p>
                </div>
              </div>
              <Button
                className="pricelist-addcart "
                onClick={e => addItemToCart(e)}
              >
                Add TO CART
              </Button>
            </div>
          </div>
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
