import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'
import Button from 'components/atoms/button'
// import PropTypes from 'prop-types'

const SubpageData = ({ heading, Paragraph, image }) => {
  const [readMore, setReadMore] = React.useState(false)
  const more = () => {
    setReadMore(true)
  }
  return (
    <>
      <div className="subpage-warp">
        <div className="main-heading-subpage">
          <Label>{heading}</Label>
        </div>
        <div className="data-warp-subpage">
          <div className="Paragraph">
            <p
              dangerouslySetInnerHTML={
                readMore
                  ? {
                    __html: Paragraph,
                  }
                  : {
                    __html: Paragraph.slice(0, 150) + '...',
                  }
              }
            ></p>
            {!readMore && (
              <Button className="read-more" onClick={more}>
                Read More
              </Button>
            )}
          </div>
          <div className="image-subpage">
            <div className="image-one">
              <Link>
                <Image src={image.url} />
              </Link>
            </div>
            <div className="image-two">
              <Link>
                <Image src={image.url} />
              </Link>
            </div>
            <div className="image-three">
              <Link>
                <Image src={image.url} />
              </Link>
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
}
export default SubpageData
