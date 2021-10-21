import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { tableProAccoData } from './data'

// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// import Label from 'components/atoms/label'
import './style.scss'
import Link from 'components/atoms/link'
const Technicaldata = () => {
  const { tableData } = tableProAccoData

  // const onOk = () => {
  //   setIsModalVisible(false)
  // }

  return (
    <>
      {/* <Panel header="This is panel header 2" key="2"> */}
      <div className="table-wrapper-technical">
        <Row className="title flex">
          <Col lg={8}>
            <p>PRODUCT</p>
          </Col>
          <Col lg={4}>
            <p>PSD ENGLISH</p>
          </Col>
          <Col lg={3}>
            <p>PSD FRENCH</p>
          </Col>
          <Col lg={3}>
            <p className="text-class-center">SDS ENGLISH</p>
          </Col>
          <Col lg={3}>
            <p className="text-class-right">SDS FRENCH</p>
          </Col>
          {/* <Col lg={3}>
            <p className="text-class-right">UNIT PRICE</p>
          </Col> */}
        </Row>

        {tableData &&
          tableData.map((data, i) => {
            return (
              <>
                <Row className="table-content flex" key={i}>
                  <Col lg={8} className="custom-width">
                    <p className="text-setting-table">{data.product}</p>
                  </Col>
                  <Col lg={4} className="custom-width">
                    <Link to={data.PSDENGLISH} className="light-text-weight">
                      view
                    </Link>
                  </Col>
                  <Col lg={3} className="custom-width">
                    <Link to={data.PSDFRENCH}>view</Link>
                  </Col>
                  <Col lg={3} className="custom-width">
                    <Link to={data.SDSENGLISH} className="text-class-center">
                      view
                    </Link>
                  </Col>
                  <Col lg={3} className="custom-width">
                    <Link to={data.SDSFRENCH} className="text-class-center">
                      {' '}
                      view
                    </Link>
                  </Col>
                  {/* <Col lg={3} className="custom-width">
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
                  </div> */}
                </Row>
              </>
            )
          })}
      </div>
    </>
  )
}

// const { array } = PropTypes
Technicaldata.propTypes = {
  // ProductAccordion: PropTypes.array,
  question: PropTypes.array,
}
export default Technicaldata
