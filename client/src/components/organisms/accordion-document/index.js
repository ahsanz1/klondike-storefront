/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'

import Image from 'components/atoms/image'
import './style.scss'

import Link from 'components/atoms/link'

const Accordiondocment = ({
  // links = [],
  isOpen = false,
  question = '',
  // answer = '',
  // table = false,
  isOpenHandler,
  faqId = 0,
  // short = false,
  tableData,
}) => {
  // const { tableData } = tableProAccoData
  return (
    <>
      <div className="accordion-main">
        <Row className="accordion-item">
          <Col md={2} xs={6} sm={6}>
            <div className="accordion-arrow">
              {isOpen ? (
                <Image
                  src="/static/images/plus.png"
                  alt=""
                  onClick={() => {
                    isOpenHandler(faqId)
                  }}
                />
              ) : (
                <Image
                  src="/static/images/Vector.png"
                  alt=""
                  onClick={() => {
                    isOpenHandler(faqId)
                  }}
                />
              )}
            </div>
          </Col>
          <Col md={22} xs={18} sm={18}>
            <h4
              className="accordion-question notranslate"
              onClick={() => {
                isOpenHandler(faqId)
              }}
            >
              {question}
            </h4>
            <div
              className={
                isOpen
                  ? 'accordion-content accordion-show'
                  : 'accordion-content accordion-hide'
              }
            >
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
                              <p className="text-setting-table notranslate">
                                {data.product}
                              </p>
                            </Col>
                            <Col lg={4} className="custom-width">
                              <Link
                                to={data.PSDENGLISH}
                                className="light-text-weight"
                              >
                                view
                              </Link>
                            </Col>
                            <Col lg={3} className="custom-width">
                              <Link to={data.PSDFRENCH}>view</Link>
                            </Col>
                            <Col lg={3} className="custom-width">
                              <Link
                                to={data.SDSENGLISH}
                                className="text-class-center"
                              >
                                view
                              </Link>
                            </Col>
                            <Col lg={3} className="custom-width">
                              <Link
                                to={data.SDSFRENCH}
                                className="text-class-center"
                              >
                                {' '}
                                view
                              </Link>
                            </Col>
                          </Row>
                        </>
                      )
                    })}
                </div>
              </>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

Accordiondocment.propTypes = {
  product: PropTypes.string,
  packageSize: PropTypes.string,
  part: PropTypes.string,
  perCase: PropTypes.string,
  perPallet: PropTypes.string,
  unitPrice: PropTypes.string,
  isOpen: PropTypes.bool,
  question: PropTypes.string,
  answer: PropTypes.string,
  isOpenHandler: PropTypes.func,
  faqId: PropTypes.number,
  short: PropTypes.bool,
  links: PropTypes.array,
  table: PropTypes.bool,
  tableData: PropTypes.array,
}

export default Accordiondocment
