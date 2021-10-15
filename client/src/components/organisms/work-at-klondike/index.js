import './style.scss'
import React from 'react'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import PCPBottom from 'components/organisms/pcpBottom'

import Label from 'components/atoms/label'

import { overviewData } from 'components/organisms/company-overview/data'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import { useWindowSize } from 'libs/custom-hooks'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import MobileTabList from '../mobile-tablist'

const WorkAtKlonedikePage = () => {
  const { workAtKlondikeData } = overviewData
  return (
    <div className="work-at-klondike-wrapper">
      {workAtKlondikeData.map((item, i) => {
        return (
          <div key={i} className="work-at-klondike-content">
            <Label className="title">{item.title}</Label>
            <Label className="paragraph">{item.paragraph}</Label>
            <Label className="paragraph more">{item.paragraph}</Label>
          </div>
        )
      })}
    </div>
  )
}

const WorkAtKlonedike = () => {
  const size = useWindowSize()
  return size[0] > 768 ? (
    <div className="work-at-klondike-page-wrapper">
      <WebpagesHeroImages {...technicalBanner} />

      <div className="technacil-wriper">
        <div className="custom-tech">
          <AboutUsTablist
            className="warranty-tablist"
            itemName="Work At Klondike"
            // categories={categories}
          />
        </div>
        <WorkAtKlonedikePage />
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
    </div>
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabList className="warranty-tablist" itemName="Work At Klondike">
          <div className="work-at-klondike-page-wrapper">
            <WorkAtKlonedikePage />
          </div>
        </MobileTabList>
      </div>
    </>
  )
}

export default WorkAtKlonedike
