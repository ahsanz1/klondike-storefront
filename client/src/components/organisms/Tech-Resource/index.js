import React from 'react'
import './style.scss'
import { PcpBottom, techresource } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import PCPBottom from 'components/organisms/pcpBottom'
import { techdata } from './data'

const TechResource = () => {
  const { tech } = techdata
  return (
    <>
      <div className="tech-resource">
        <WebpagesHeroImages {...techresource} />
        <Image className="banner-img" src="/static/images/you.png" />
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
    </>
  )
}

export default TechResource
