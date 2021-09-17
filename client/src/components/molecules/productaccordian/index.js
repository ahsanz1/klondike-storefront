import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
// import { tableProAccoData } from './data'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import { fetchCategory } from 'libs/services/algolia'
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
                      <Button className="hover-button">ADD TO CART</Button>
                    </div>
                  </div>
                </Row>
              </>
            )
          })}
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
