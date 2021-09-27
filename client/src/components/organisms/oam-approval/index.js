import React from 'react'
import { oamdata } from './data'
import './style.scss'
import Image from 'components/atoms/image'
import Techtabllist from 'components/organisms/Technical-tablist'
const Oamspproval = () => {
  const { oam } = oamdata
  return (
    <>
      <div className="oam-main">
        <Techtabllist />
        <div className="oam-wrap">
          {oam.map(data => {
            return (
              <>
                <div className="oam-data">
                  <h1>OEM Approvals</h1>
                  <div className="img-oam">
                    <Image src={data.img} />
                  </div>
                  <div className="data-warp">
                    <div className="heading-oam">{data.heading}</div>
                    <div className="descr-oam">{data.description}</div>
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
export default Oamspproval
