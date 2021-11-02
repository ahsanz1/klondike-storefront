// import Accordiondocment from 'components/molecules/accordion'
// import PropTypes from 'prop-types'
// import Heading from 'components/atoms/heading'
import './style.scss'
import React, { useState, useEffect } from 'react'
import PCPBottom from 'components/organisms/pcpBottom'
import Accordiondocment from 'components/molecules/accordion-document'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import { useWindowSize } from 'libs/custom-hooks'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Techtabllist from '../Technical-tablist'
import PropTypes from 'prop-types'
import { faqsDatadoc } from './data'
import MobileTabListTech from '../Technical-tablist/mobile-tab'

const Technicaldata = ({
  isOpen = false,

  short = false,
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
      <div className="technacil-wriper">
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
                  question={faq?.question}
                  answer={faq?.answer}
                  isOpen={faq?.isOpen}
                  table={faq?.table}
                  isOpenHandler={isOpenHandler}
                  faqId={index}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
const Technical = () => {
  const size = useWindowSize()
  // const [size, setSize] = useState(useWindowSize)
  console.log('size', size)
  return size[0] > 768 ? (
    <>
      <WebpagesHeroImages {...technicalBanner} />
      <div className="">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="technical-document"
              itemName="Technical Documents"
              // categories={categories}
            />
          </div>
          <Technicaldata />
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
                    url={item.url}
                  />
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabListTech
          className="warranty-tablist"
          itemName="Technical Documents"
        >
          <div className="technacil-wriper">
            <Technicaldata />
          </div>
        </MobileTabListTech>
      </div>
    </>
  )
}
Technicaldata.propTypes = {
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
