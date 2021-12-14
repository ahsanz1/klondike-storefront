import React, { useState } from 'react'

import PropTypes from 'prop-types'
import Techtabllist from 'components/organisms/Technical-tablist'
import './style.scss'

import { useWindowSize } from 'libs/custom-hooks'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'

import MobileTabListTech from '../Technical-tablist/mobile-tab'

const Catlog = ({ heading, catData, image }) => {
  // console.log('zdfgsdf',cataogData)
  const size = useWindowSize()
  const [readMore, setReadMore] = useState(false)
  const renderCatlogdata = () => {
    return (
      <>
        <div className="catlog-main">
          <div className="catlog-tab"></div>
          <div className="catlog-warp">
            <Label className="catlog-label">{heading}</Label>
            <div className="img-deading">
              <div className="imge-catlog">
                <Image src={image.url} alt={image.alt} />
              </div>
              <div className="heading-catlog">
                {catData &&
                  catData.map((data, i) => {
                    return size[0] > 768 ? (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data.text.replace(/your/gi, ''),
                        }}
                      ></p>
                    ) : (
                      <div className="overview-detail-section-mobile">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: readMore
                              ? data.text.slice(0, data.text.length)
                              : data.text.slice(0, 480),
                          }}
                        ></p>

                        {data.text.length > 300 && (
                          <span
                            className={readMore ? 'read-less' : 'read-more'}
                          >
                            <Button
                              href
                              className="button"
                              onClick={() => {
                                setReadMore(!readMore)
                              }}
                            >
                              {readMore ? 'Read Less' : 'Read More'}
                            </Button>
                          </span>
                        )}
                      </div>
                    )
                  })}
                <br />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  // const [size, setSize] = useState(useWindowSize)
  return size[0] > 768 ? (
    <>
      <div className="tech-page-wrapper">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="catlog-tablist"
              itemName="Catalog"
              // categories={categories}
            />
          </div>
          {renderCatlogdata()}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabListTech className="warranty-tablist" itemName="Catalog">
          <div className="tech-page-wrapper">{renderCatlogdata()}</div>
        </MobileTabListTech>
      </div>
    </>
  )
}
// Catlog.propTypes = {
//   heading: PropTypes.string,
//   categories: PropTypes.array,
//   itemName: PropTypes.string,
// }

Catlog.propTypes = {
  catData: PropTypes.object,
  heading: PropTypes.string,
  franch: PropTypes.string,
  english: PropTypes.string,
  categories: PropTypes.array,
  itemName: PropTypes.string,
  image: PropTypes.string,
}
export default Catlog
