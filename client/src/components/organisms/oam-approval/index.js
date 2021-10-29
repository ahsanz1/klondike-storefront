import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import { useWindowSize } from 'libs/custom-hooks'
import Image from 'components/atoms/image'
import Techtabllist from 'components/organisms/Technical-tablist'
import MobileTabListTech from '../Technical-tablist/mobile-tab'
import Label from 'components/atoms/label'
const Oamspproval = ({ oam, heading }) => {
  const size = useWindowSize()
  const renderOamspprovaldata = () => {
    return (
      <>
        <div className="oam-main">
          <div className="oam-wrap">
            <h1>{heading}</h1>
            {oam &&
              oam.map(data => {
                return (
                  <>
                    <div className="oam-data">
                      <div className="img-oam">
                        <Image src={data.image.url} alt={data.image.altText} />
                      </div>
                      <div className="data-warp">
                        <div className="heading-oam">{data.heading}</div>
                        <div
                          className="descr-oam"
                          dangerouslySetInnerHTML={{ __html: data.description }}
                        ></div>
                        <Label className="arow-img">
                          Discover More
                          <span>
                            <Image
                              className="img-arow"
                              src={data.lebal.url}
                              alt={data.lebal.altText}
                            />
                          </span>
                        </Label>
                      </div>
                    </div>
                  </>
                )
              })}
          </div>
        </div>
      </>
    )
  }

  return size[0] > 768 ? (
    <>
      <div className="oaem-page-wrapper">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="catlog-tablist"
              itemName="OEM Approvals"
              // categories={categories}
            />
          </div>
          {renderOamspprovaldata()}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabListTech
          className="warranty-tablist"
          itemName="OEM Approvals"
        >
          <div className="oaem-page-wrapper">{renderOamspprovaldata()}</div>
        </MobileTabListTech>
      </div>
    </>
  )
}
Oamspproval.DefaultProps = {
  categories: [],
}

Oamspproval.propTypes = {
  categories: PropTypes.array,
  oam: PropTypes.object,
  heading: PropTypes.string,
}
export default Oamspproval
