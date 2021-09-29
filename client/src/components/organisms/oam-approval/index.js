import React from 'react'
import { oamdata } from './data'
import './style.scss'
import PCPBottom from 'components/organisms/pcpBottom'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import PropTypes from 'prop-types'
import Image from 'components/atoms/image'
import Techtabllist from 'components/organisms/Technical-tablist'
import Label from 'components/atoms/label'
const Oamspproval = ({ categories }) => {
  const { oam } = oamdata
  return (
    <>
      <WebpagesHeroImages {...technicalBanner} />
      <div className="oam-main">
        <div className="oam-tab">
          <Techtabllist
            className="list"
            itemName="OEM Approvals"
            categories={categories}
          />
        </div>
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
                    <Label className="arow-img">
                      Discover More
                      <Image src={data.lebal} />
                    </Label>
                  </div>
                </div>
              </>
            )
          })}
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
Oamspproval.DefaultProps = {
  categories: [],
}

Oamspproval.propTypes = {
  categories: PropTypes.array,
}
export default Oamspproval
