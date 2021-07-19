import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import PDPInformation from 'components/molecules/pdpinforamation'

const PDP = ({ pdpdata, pdpdatasheet }) => {
  const { data, imgdata, heading } = pdpdata

  return (
    <div className="PDPs-wrapper">
      <div className="PDP-container">
        <div className="left-side">
          {imgdata.map((content, i) => (
            <>
              <div className="img-wrapper" key={i}>
                <Image src={content.image.url} className="slider-image" />
              </div>
              <Button>{content.btntxt}</Button>
            </>
          ))}
        </div>
        <div className="right-side">
          {heading && <h1>{heading}</h1>}
          <p className="item-list-warapper">
            <span>SIZE</span>
            <span>UNIT/CASE</span>
            <span>PART NUM</span>
          </p>
          {data.map((content, id) => (
            <div className="item-list-warapper" key={id}>
              <div>
                <p>{content.size}</p>
                <p></p>
              </div>
              <div>
                <p>{content.unit}</p>
              </div>
              <div>
                <p>{content.part}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PDPInformation pdpdatasheet={pdpdatasheet} />
    </div>
  )
}

PDP.propTypes = {
  data: PropTypes.array,
  size: PropTypes.string,
  imgdata: PropTypes.array,
  paragraph: PropTypes.string,
  heading: PropTypes.string,
  pdpdatasheet: PropTypes.string,
  pdpdata: PropTypes.string,
}
export default PDP
