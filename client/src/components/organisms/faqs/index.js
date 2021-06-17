import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import Container from 'components/molecules/container'
import FaqsQuestions from 'components/molecules/faqs-question'
import Heading from 'components/atoms/heading'

import './style.scss'

const Faqs = ({
  backgroundColor = '',
  faqsData = [],
  desktopHeading = '',
  mobileHeading = '',
}) => {
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    const newFaqs = [...faqsData]
    newFaqs.map((faq, i) => {
      newFaqs[i] = { ...faq, isOpen: false }
    })
    setFaqs([...newFaqs])
  }, [faqsData])

  const isOpenHandler = useCallback(
    faqId => {
      let newFaqs = [...faqs]
      newFaqs[faqId].isOpen = !newFaqs[faqId].isOpen
      setFaqs([...newFaqs])
    },
    [faqs],
  )

  return (
    <div id="faqs">
      <Container color={backgroundColor}>
        <div className="faqs-container">
          <Heading className="faqs-heading desktop-heading">
            {desktopHeading}
          </Heading>
          <Heading className="faqs-heading mobile-heading">
            {mobileHeading}
          </Heading>
          {faqs &&
            faqs.map((faq, index) => (
              <FaqsQuestions
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={faq.isOpen}
                isOpenHandler={isOpenHandler}
                faqId={index}
              />
            ))}
        </div>
      </Container>
    </div>
  )
}

Faqs.propTypes = {
  backgroundColor: PropTypes.string,
  faqsData: PropTypes.array,
  desktopHeading: PropTypes.string,
  mobileHeading: PropTypes.string,
}

export default Faqs
