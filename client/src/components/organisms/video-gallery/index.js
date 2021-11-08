import './style.scss'
import React from 'react'
import { useWindowSize } from 'libs/custom-hooks'
// import PCPBottom from 'components/organisms/pcpBottom'
// import { PcpBottom } from 'libs/data/data'

import Techtabllist from '../Technical-tablist'
import PropTypes from 'prop-types'
// import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
// import Link from 'components/atoms/link'
import MobileTabListTech from '../Technical-tablist/mobile-tab'
// import { bigVideodata, smallVideodata } from './data'

const VideoGallery = ({ bigVideodata, smallVideodata, heading, paragraph }) => {
  const size = useWindowSize()

  const renderVideoGallery = () => {
    return (
      <>
        <div className="video-gallery-page">
          <div className="technacil-wriper">
            <div className="technical-data">
              <div className="video-gallery-wrap">
                <Label className="video-gallery-title">{heading}</Label>

                <div className="heading-tech">
                  <Label>{paragraph}</Label>
                </div>
                <div className="videos">
                  <div className="big-videos">
                    {bigVideodata &&
                      bigVideodata.map((item, i) => {
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

                            <p
                              className="details"
                              dangerouslySetInnerHTML={{
                                __html: item.details,
                              }}
                            ></p>
                          </div>
                        )
                      })}
                  </div>
                  <div className="small-videos">
                    {smallVideodata &&
                      smallVideodata.map((item, i) => {
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
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item.details,
                                }}
                              ></p>
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

  return size[0] > 768 ? (
    <>
      <div className="video-page">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="viedo-gallery"
              itemName="Video Gallery"
              // categories={categories}
            />
          </div>
          {renderVideoGallery()}
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
          <div className="video-page">{renderVideoGallery()}</div>
        </MobileTabListTech>
      </div>
    </>
  )
}
VideoGallery.DefaultProps = {
  bigVideodata: [],
  smallVideodata: [],
  heading: '',
  paragraph: '',
}

VideoGallery.propTypes = {
  bigVideodata: PropTypes.array,
  smallVideodata: PropTypes.array,
  heading: PropTypes.string,
  paragraph: PropTypes.string,
}

export default VideoGallery
