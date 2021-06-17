import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import Link from 'components/atoms/link'
import Label from 'components/atoms/label'

const HaadingParagraph = ({
  heading,
  firstPart,
  linkText,
  linkUrl,
  secondPart,
  bgColor,
}) => {
  return (
    <div
      className={
        bgColor ? 'header-paragraph-wrap color' : 'header-paragraph-wrap'
      }
    >
      <div className="header-paragraph">
        <Label className="header-paragraph-heading">{heading}</Label>
        <Label className="header-paragraph-paragraph">
          {firstPart}
          <Link to={linkUrl} className="header-paragraph-email-link">
            {' '}
            {linkText}
          </Link>
          <br /> {secondPart}
        </Label>
      </div>
    </div>
  )
}

const { string, bool } = PropTypes
HaadingParagraph.propTypes = {
  heading: string,
  firstPart: string,
  linkText: string,
  linkUrl: string,
  secondPart: string,
  bgColor: bool,
}

export default HaadingParagraph
