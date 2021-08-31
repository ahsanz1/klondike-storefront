import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Accordion from 'components/molecules/accordion'
import Heading from 'components/atoms/heading'
// import { tableAccoData } from './data'
import './style.scss'

const Faqs = ({
  product,
  packageSize,
  part,
  perCase,
  perPallet,
  unitPrice,
  faqsData = [],
  desktopHeading = '',
  mobileHeading = '',
  introduction = '',
  short = false,
}) => {
  const [faqs, setFaqs] = useState([...faqsData])
  // const { tableData } = faqsData

  useEffect(() => {
    let newFaqs = [...faqs]
    newFaqs.map((faq, i) => {
      newFaqs[i] = { ...faq, isOpen: false }
    })
    setFaqs([...newFaqs])
  }, [])

  const isOpenHandler = faqId => {
    let newFaqs = [...faqs]
    newFaqs[faqId].isOpen = !newFaqs[faqId].isOpen
    setFaqs([...newFaqs])
  }
  return (
    <>
      <div className="accordion-heading-container">
        <Heading className="accordion-heading desktop-heading">
          {desktopHeading}
        </Heading>
        <Heading className="accordion-heading mobile-heading">
          {mobileHeading}
        </Heading>
      </div>
      <div color="#fff" className="accordion-container">
        <p
          className="privacy-intro"
          dangerouslySetInnerHTML={{
            __html: `${introduction || '<p></p>'}`,
          }}
        ></p>

        {faqs &&
          faqs.map((faq, index) => (
            <Accordion
              short={short}
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={faq.isOpen}
              table={faq.table}
              isOpenHandler={isOpenHandler}
              faqId={index}
            />
          ))}
      </div>
    </>
  )
}

Faqs.propTypes = {
  product: PropTypes.string,
  packageSize: PropTypes.string,
  part: PropTypes.string,
  perCase: PropTypes.string,
  perPallet: PropTypes.string,
  unitPrice: PropTypes.string,
  faqsData: PropTypes.array,
  desktopHeading: PropTypes.string,
  mobileHeading: PropTypes.string,
  introduction: PropTypes.string,
  short: PropTypes.bool,
}

export default Faqs
