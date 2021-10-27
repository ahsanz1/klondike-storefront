import React from 'react'
import { oamdata } from './data'
import './style.scss'
import PCPBottom from 'components/organisms/pcpBottom'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import PropTypes from 'prop-types'
import { useWindowSize } from 'libs/custom-hooks'
import Image from 'components/atoms/image'
import Techtabllist from 'components/organisms/Technical-tablist'
import MobileTabListTech from '../Technical-tablist/mobile-tab'
import Link from 'components/atoms/link'
const Oamspprovaldata = () => {
  const { oam } = oamdata
  return (
    <>
      <div className="oam-main">
        <div className="oam-wrap">
          <h1>OEM Approvals</h1>
          {oam.map(data => {
            return (
              <>
                <div className="oam-data">
                  <div className="img-oam">
                    <Image src={data.img} />
                  </div>
                  <div className="data-warp">
                    <div className="heading-oam">{data.heading}</div>
                    <div className="descr-oam">{data.description}</div>
                    <Link className="arow-img">
                      Discover More
                      <span>
                        <Image className="img-arow" src={data.lebal} />
                      </span>
                    </Link>
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
const Oamspproval = () => {
  const size = useWindowSize()
  return size[0] > 768 ? (
    <>
      <WebpagesHeroImages {...technicalBanner} />
      <div className="oaem-page-wrapper">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="catlog-tablist"
              itemName="OEM Approvals"
              // categories={categories}
            />
          </div>
          <Oamspprovaldata />
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
          itemName="OEM Approvals"
        >
          <div className="oaem-page-wrapper">
            <Oamspprovaldata />
          </div>
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
}
export default Oamspproval
