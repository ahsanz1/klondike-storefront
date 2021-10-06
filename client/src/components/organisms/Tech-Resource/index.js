import React from 'react'
import './style.scss'
import { techresource } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import { techdata } from './data'

const TechResource = () => {
  const { tech } = techdata
  return (
    <>
      <WebpagesHeroImages {...techresource} />

      <div className="tech-heading">
        <Label className="main-heading">Tech Resources</Label>
        <Label className="dec-tech">
          As part of the KLONDIKE commitment to customer service we provide
          resources such as technical documents, OEM approval information and
          warranty details. Choose from the links below for more information.
        </Label>
      </div>
      <div className="oms">
        {tech.map(data => {
          return (
            <>
              <div className="section-one">
                <div className="tech-rec">
                  <div className="img-tech">
                    <Image src={data.img} />
                  </div>
                  <div className="tech-data">
                    <Label className="tech-h">{data.heading}</Label>
                    <Label className="parah">{data.description}</Label>
                    <Label className="more">
                      Discover More
                      <Image
                        className="img-arow"
                        src="/static/images/vec.png"
                      />
                    </Label>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}
export default TechResource
