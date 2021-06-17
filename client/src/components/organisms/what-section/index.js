import React from 'react'
import PropTypes from 'prop-types'

import Container from 'components/molecules/container'
import Label from 'components/atoms/label'

import './style.scss'

const WhatSection = ({ bgColor = '', question = '', answer = '' }) => {
  return (
    <Container className="what-section" color={bgColor}>
      <div className="what-section-wrapper">
        <h3 className="what-heading">{question}</h3>
        <Label className="what-big-p">{answer}</Label>
      </div>
    </Container>
  )
}

WhatSection.propTypes = {
  bgColor: PropTypes.string,
  question: PropTypes.string,
  answer: PropTypes.string,
}

export default WhatSection
