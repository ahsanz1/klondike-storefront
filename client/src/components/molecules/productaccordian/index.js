import React from 'react'
// import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { tableProAccoData } from './data'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// import Label from 'components/atoms/label'
import './style.scss'

const ProductAccordion = () => {
  const { tableData } = tableProAccoData

  return (
    <>
      {/* <Panel header="This is panel header 2" key="2"> */}
      <div className="table-wrapper">
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

        {tableData &&
          tableData.map((data, i) => {
            const {
              product,
              packageSize,
              part,
              perCase,
              perPallet,
              unitPrice,
              hoverButton,
              productImage,
            } = data
            return (
              <>
                <Row className="table-content flex" key={i}>
                  <Col lg={8} className="custom-width">
                    <p className="text-setting-table">{product}</p>
                  </Col>
                  <Col lg={4} className="custom-width">
                    <p className="light-text-weight">{packageSize}</p>
                  </Col>
                  <Col lg={3} className="custom-width">
                    <p>{part}</p>
                  </Col>
                  <Col lg={3} className="custom-width">
                    <p className="text-class-center">{perCase}</p>
                  </Col>
                  <Col lg={3} className="custom-width">
                    <p className="text-class-center">{perPallet}</p>
                  </Col>
                  <Col lg={3} className="custom-width">
                    <p className="text-class-right text-setting-table">
                      {unitPrice}
                    </p>
                  </Col>
                  <div className="hover-details">
                    <div className="table-image">
                      <Image src={productImage} className="table-image" />
                    </div>
                    <div className="table-button">
                      <Button className="hover-button">{hoverButton}</Button>
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
}
export default ProductAccordion
