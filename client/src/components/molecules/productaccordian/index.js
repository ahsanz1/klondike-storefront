import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Modal } from 'antd'
// import { tableProAccoData } from './data'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import { fetchCategory } from 'libs/services/algolia'
// import ProductAccordionModal from './product-pop/addtocartmodel'
// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// import Label from 'components/atoms/label'
import './style.scss'

const ProductAccordion = ({ question }) => {
  // const { tableData } = tableProAccoData
  const [itemdata, setItemData] = useState([])

  console.log('question', question)
  useEffect(() => {
    const data = async () => {
      const items = await fetchCategory(question)
      setItemData(items.hits)
    }

    data()
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
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
                      <Button onClick={showModal} className="hover-button">
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
              <img src="/static/images/pricelistimg.png" alt="img" />
            </div>
            <div className="prodct-data">
              <h1>ISO 680 EP Full Synthetic</h1>
              <div className="product-detail">
                <div>
                  <p className="products-sizes">Size</p>
                  <p className="products-sizes">1000 L / 275 GAL</p>
                </div>
                <div>
                  <p className="products-sizes">UNITS/CASE</p>
                  <p className="products-sizes">12</p>
                </div>
                <div>
                  <p className="products-sizes">Part Num</p>
                  <p className="products-sizes">medium</p>
                </div>
                <div>
                  <p className="products-sizes">Price</p>
                  <p className="products-sizes">medium</p>
                </div>
                <div>
                  <p className="products-sizes">QTY</p>
                  <p className="products-sizes">medium</p>
                </div>
                <div>
                  <p className="products-sizes">Total Price</p>
                  <p className="products-sizes">$109.10</p>
                </div>
              </div>
              <Button className="pricelist-addcart">Add TO CART</Button>
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
