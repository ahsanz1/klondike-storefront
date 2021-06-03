import Button from 'components/atoms/button'
import Heading from 'components/atoms/heading'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const SubscriptionSidebar = ({ headingText, firstBtnTxt, secondBtnTxt }) => {
  return (
    <div className="subscription-sidebar">
      <Heading className="subscription-sidebar__heading">{headingText}</Heading>
      <Button>{firstBtnTxt}</Button>
      <Button>{secondBtnTxt}</Button>
    </div>
  )
}

SubscriptionSidebar.propTypes = {
  headingText: PropTypes.string,
  firstBtnTxt: PropTypes.string,
  secondBtnTxt: PropTypes.string,
}

export default SubscriptionSidebar
