// import Accordiondocment from 'components/molecules/accordion'
// import PropTypes from 'prop-types'
// import Heading from 'components/atoms/heading'
import './style.scss'
import React, { useState, useEffect } from 'react'
import PCPBottom from 'components/organisms/pcpBottom'
import Accordiondocment from 'components/molecules/accordion-document'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Techtabllist from '../Technical-tablist'
import PropTypes from 'prop-types'
import { faqsDatadoc } from './data'

const Technical = ({
  isOpen = false,

  short = false,
  categories,
}) => {
  const { faq } = faqsDatadoc

  const [faqs, setFaqs] = useState([...faq])

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
      <WebpagesHeroImages {...technicalBanner} />

      <div className="technacil-wriper">
        <div className="custom-tech">
          <Techtabllist
            itemName="Technical Documents"
            categories={categories}
            // itemName={itemName}
            //   clickCategoryHandler={clickCategoryHandler}
            // subItem={subItem}
          />

          {/* <div className="productItem">
          <Category
            // categoryName={itemName}
            subItemHandler={subItemHandler}
            // productList={productList}
          />
        </div> */}
        </div>
        <div className="technical-data">
          <div className="accordin-warp">
            <div className="heading-tech">
              <h1>Technical Documents</h1>
              <p>
                At KLONDIKE our products are backed by a dedicated team of
                experts who are available to you with educational information
                and a commitment to ensuring technical excellence across all our
                innovations. Below you will find technical documents including
                Product Data Sheets (PDSs) and Material Safety Data Sheets
                (MSDSs) available for download.
              </p>
            </div>

            {faqs &&
              faqs.map((faq, index) => (
                <Accordiondocment
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
        </div>
      </div>

      <div className="technical-bottom">
        <div className="technical-bottom-section">
          {PcpBottom &&
            PcpBottom.map((item, i) => (
              <>
                <PCPBottom
                  image={item.image}
                  button={item.button}
                  mobileButton={item.mobileButton}
                />
              </>
            ))}
        </div>
      </div>
    </>
  )
}
Technical.propTypes = {
  categories: PropTypes.array,
  size: PropTypes.array,
  partNumber: PropTypes.array,
  unit: PropTypes.array,
  untitled: PropTypes.array,
  plpBottom: PropTypes.array,
  short: PropTypes.bool,
  isOpen: PropTypes.bool,
}

export default Technical
