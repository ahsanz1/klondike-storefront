import './style.scss'
import React, { useState } from 'react'
import Accordiondocment from 'components/organisms/accordion-document'
import { useWindowSize } from 'libs/custom-hooks'
import Techtabllist from '../Technical-tablist'
import PropTypes from 'prop-types'
import MobileTabListTech from '../Technical-tablist/mobile-tab'

const Technical = ({ faq, title, paragraph }) => {
  const size = useWindowSize()

  const [faqs, setFaqs] = useState([...faq])
  // useEffect(() => {
  //   let newFaqs = [...faqs]
  //   newFaqs.map((faq, i) => {
  //     newFaqs[i] = { ...faq, isOpen: false }
  //   })
  //   setFaqs([...newFaqs])
  // }, [])

  const isOpenHandler = faqId => {
    let newFaqs = [...faqs]
    newFaqs[faqId].isOpen = !newFaqs[faqId].isOpen
    setFaqs([...newFaqs])
  }
  const renderTechnicaldata = () => {
    return (
      <>
        <div className="technacil-wriper">
          <div className="technical-data">
            <div className="accordin-warp">
              <div className="heading-tech">
                <h1>{title}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${paragraph}`,
                  }}
                ></p>
              </div>

              {faqs &&
                faqs.map((faq, index) => (
                  <Accordiondocment
                    key={index}
                    question={faq.question}
                    isOpen={faq.isOpen}
                    isOpenHandler={isOpenHandler}
                    faqId={index}
                    tableData={faq.tableData}
                  />
                ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  return size[0] > 768 ? (
    <>
      <div className="">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="technical-document"
              itemName="Technical Documents"
              // categories={categories}
            />
          </div>
          {renderTechnicaldata()}
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
          <div className="technacil-wriper">{renderTechnicaldata()}</div>
        </MobileTabListTech>
      </div>
    </>
  )
}
Technical.propTypes = {
  faq: PropTypes.array,
  title: PropTypes.string,
  paragraph: PropTypes.string,
}

export default Technical
