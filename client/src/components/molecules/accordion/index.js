/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'

// import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import './style.scss'
import Link from 'components/atoms/link'
import ProductAccordion from '../productaccordian'

const Accordion = ({
  // product,
  // packageSize,
  // part,
  // perCase,
  // perPallet,
  // unitPrice,
  // tableData = [],
  links = [],
  isOpen = false,
  question = '',
  answer = '',
  table = false,
  isOpenHandler,
  faqId = 0,
  short = false,
  footerAccount = '',
}) => {
  console.log('check links footer:', links)
  let userLoginInfo = localStorage.getItem('userPersonalInfo')
  userLoginInfo = JSON.parse(userLoginInfo)
  return (
    <>
      <div className="accordion-faqs">
        <Row className="accordion-item">
          <Col md={2} xs={6} sm={6} className="test">
            <h4
              className="accordion-question notranslate"
              onClick={() => {
                isOpenHandler(faqId)
              }}
            >
              {question}
            </h4>
          </Col>
          <Col md={2} xs={6} sm={6} className="test">
            <div className="accordion-arrow">
              {isOpen ? (
                <Image
                  src="/static/icons/arrow-up.png"
                  alt=""
                  onClick={() => {
                    isOpenHandler(faqId)
                  }}
                />
              ) : (
                <Image
                  src="/static/icons/arrow-down.png"
                  alt=""
                  onClick={() => {
                    isOpenHandler(faqId)
                  }}
                />
              )}
            </div>
          </Col>
          <Col md={table ? 24 : 22} xs={24} sm={18}>
            <div
              className={
                isOpen
                  ? 'accordion-content accordion-show'
                  : 'accordion-content accordion-hide'
              }
            >
              {table ? (
                <ProductAccordion question={question} />
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${answer}`,
                  }}
                ></p>
              )}

              {links &&
                links.map((obj, index) => {
                  return (
                    <Link
                      to={obj.url === '' ? '/account/login' : obj.url}
                      key={index}
                    >
                      <div className="footerLinks">
                        {' '}
                        {obj.text === '' && !userLoginInfo
                          ? footerAccount
                          : obj.text}
                      </div>
                    </Link>
                  )
                })}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

Accordion.propTypes = {
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
  footerAccount: PropTypes.string,
}

export default Accordion
