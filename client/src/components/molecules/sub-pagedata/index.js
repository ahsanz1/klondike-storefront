/* eslint-disable indent */
import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import React from 'react'
import { useWindowSize } from 'libs/custom-hooks'
import './style.scss'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'
import Button from 'components/atoms/button'
// import PropTypes from 'prop-types'

const SubpageData = ({ heading, Paragraph, image, link }) => {
  const [readMore, setReadMore] = React.useState(false)
  const size = useWindowSize()
  const more = () => {
    setReadMore(true)
  }
  return (
    <>
      <div className="subpage-warp">
        <div className="main-heading-subpage">
          {heading && <Label>{heading}</Label>}
        </div>
        <div className="data-warp-subpage">
          <div className="Paragraph">
            {Paragraph && (
              <p
                dangerouslySetInnerHTML={
                  !readMore && size[0] < 768
                    ? {
                        __html: Paragraph.slice(0, 150) + '...',
                      }
                    : {
                        __html: Paragraph,
                      }
                }
              ></p>
            )}
            {!readMore && size[0] < 768 && (
              <Button className="read-more" onClick={more}>
                Read More
              </Button>
            )}
          </div>
          <div className="image-subpage">
            <div className="image-one">
              {image.url && (
                <Link to={link}>
                  <Image src={image.url} />
                </Link>
              )}
            </div>
            <div className="image-two">
              {image.url && (
                <Link to={link}>
                  <Image src={image.url} />
                </Link>
              )}
            </div>
            <div className="image-three">
              {image.url && (
                <Link to={link}>
                  <Image src={image.url} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
SubpageData.propTypes = {
  heading: PropTypes.string,
  Paragraph: PropTypes.string,
  image: PropTypes.string,
  link: PropTypes.string,
}
export default SubpageData
