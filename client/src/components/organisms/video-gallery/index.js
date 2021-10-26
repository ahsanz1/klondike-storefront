import './style.scss'
import React from 'react'
import { useWindowSize } from 'libs/custom-hooks'
import PCPBottom from 'components/organisms/pcpBottom'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Techtabllist from '../Technical-tablist'
import PropTypes from 'prop-types'
// import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
// import Link from 'components/atoms/link'
import MobileTabListTech from '../Technical-tablist/mobile-tab'
import { bigVideodata, smallVideodata } from './data'

const VideoGallerydata = () => {
  return (
    <>
      <div className="video-gallery-page">
        <div className="technacil-wriper">
          <div className="technical-data">
            <div className="video-gallery-wrap">
              <Label className="video-gallery-title">Video Gallery</Label>

              <div className="heading-tech">
                <Label>
                  Click on the videos below to learn more about why KLONDIKE
                  Lubricants is becoming a leading player on the heavy duty oils
                  and lubricants market in Canada – from state-of-the-art
                  production plants through unmatched distribution capabilities
                  to industry applications, new products, and more! Watch
                  KLONDIKE in action now!
                </Label>
              </div>
              <div className="videos">
                <div className="big-videos">
                  {bigVideodata.map((item, i) => {
                    return (
                      <div className="big-video-element" key={i}>
                        <iframe
                          className="big-video-frame"
                          title={item.title}
                          loading="lazy"
                          src={item.src}
                          frameBorder="0"
                          allowFullScreen="allowfullscreen"
                        ></iframe>
                        <Label className="details">{item.details}</Label>
                      </div>
                    )
                  })}
                </div>
                <div className="small-videos">
                  {smallVideodata.map((item, i) => {
                    return (
                      <div className="small-video-element" key={i}>
                        <iframe
                          className="small-video-frame"
                          title={item.title}
                          loading="lazy"
                          src={item.src}
                          frameBorder="0"
                          allowFullScreen="allowfullscreen"
                        ></iframe>
                        <div className="details">
                          <Label>{item.details}</Label>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const VideoGallery = () => {
  const size = useWindowSize()
  // const [size, setSize] = useState(useWindowSize)
  console.log('size', size)
  return size[0] > 768 ? (
    <>
      <WebpagesHeroImages {...technicalBanner} />
      <div className="video-page">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="viedo-gallery"
              itemName="Video Gallery"
              // categories={categories}
            />
          </div>
          <VideoGallerydata />
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
          itemName="Video Gallery"
        >
          <div className="video-page">
            <VideoGallerydata />
          </div>
        </MobileTabListTech>
      </div>
    </>
  )
}
VideoGallery.DefaultProps = {
  categories: [],
}

VideoGallery.propTypes = {
  categories: PropTypes.array,
}

export default VideoGallery
