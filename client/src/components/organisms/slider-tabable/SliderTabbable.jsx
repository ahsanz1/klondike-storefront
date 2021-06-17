import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Label from 'components/atoms/label'
import Container from 'components/molecules/container'
import Heading from 'components/molecules/heading'

import SliderNutrient from './SliderNutrient'

import './styles.scss'

const SliderTabbable = ({
  desktopHeading,
  mobileHeading,
  desktopHeadline,
  mobileHeadline,
  color,
  nutrients,
}) => {
  const [bgColor, setBgColor] = useState('')
  const [textColor, setTextColor] = useState({})

  useEffect(() => {
    setBgColor(nutrients[0].bgColor)
    setTextColor({ color: color })
  }, [nutrients, color])

  const handleOnChange = index => {
    setBgColor(nutrients[index].bgColor)
  }

  return (
    <Container color={bgColor}>
      <div className="section-tabbable" style={textColor}>
        <hgroup className="headings-group">
          <Heading
            desktopPrefix={desktopHeading}
            mobilePrefix={mobileHeading}
            headingColor={color}
          />
          <Label className="headline d-none d-sm-block" style={textColor}>
            {desktopHeadline}
          </Label>
          <Label className="headline d-sm-none" style={textColor}>
            {mobileHeadline}
          </Label>
        </hgroup>

        <SliderNutrient
          color={textColor}
          nutrients={nutrients}
          onChange={handleOnChange}
        />
      </div>
    </Container>
  )
}

SliderTabbable.defaultProps = {
  desktopHeading: '',
  mobileHeading: '',
  desktopHeadline: '',
  mobileHeadline: '',
  color: '',
  nutrients: [],
}

SliderTabbable.propTypes = {
  desktopHeading: PropTypes.string,
  mobileHeading: PropTypes.string,
  desktopHeadline: PropTypes.string,
  mobileHeadline: PropTypes.string,
  color: PropTypes.string,
  nutrients: PropTypes.arrayOf(
    PropTypes.shape({
      imgUrl: PropTypes.string,
      imgAlt: PropTypes.string,
      mobileTitleImg: PropTypes.string,
      mobileTitleImgAlt: PropTypes.string,
      nutrientName: PropTypes.string,
      nutrientHeading1: PropTypes.string,
      nutrientText: PropTypes.string,
      nutrientHeading2: PropTypes.string,
      benifits: PropTypes.array,
      readmore: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      bgColor: PropTypes.string,
      activeTabColor: PropTypes.string,
    }),
  ),
}

export default memo(SliderTabbable)
