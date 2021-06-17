/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'

import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import './style.scss'

const FaqsQuestions = ({
  isOpen = false,
  question = '',
  answer = '',
  isOpenHandler,
  faqId = 0,
}) => {
  return (
    <div>
      <Row className="faq-item">
        <Col md={2} xs={3} sm={3}>
          <div className="faq-arrow">
            {isOpen ? (
              <Image
                src="/static/icons/faqs_close.svg"
                alt=""
                onClick={() => {
                  isOpenHandler(faqId)
                }}
              />
            ) : (
              <Image
                src="/static/icons/faqs_add.svg"
                alt=""
                onClick={() => {
                  isOpenHandler(faqId)
                }}
              />
            )}
          </div>
        </Col>
        <Col md={22} xs={21} sm={21}>
          <h4
            className="faq-question"
            onClick={() => {
              isOpenHandler(faqId)
            }}
          >
            {question}
          </h4>
          <div
            className={isOpen ? 'faq-content faq-show' : 'faq-content faq-hide'}
          >
            <Label className="faq-answer">
              <div dangerouslySetInnerHTML={{ __html: answer }}></div>
            </Label>
          </div>
        </Col>
      </Row>
    </div>
  )
}

FaqsQuestions.propTypes = {
  isOpen: PropTypes.bool,
  question: PropTypes.string,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isOpenHandler: PropTypes.func,
  faqId: PropTypes.number,
}

export default FaqsQuestions
