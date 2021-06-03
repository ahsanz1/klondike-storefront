import Button from 'components/atoms/button'
import TextArea from 'components/atoms/text-area'
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const SubscriptionTextArea = ({ buttonText, onCancelClick, text }) => {
  return (
    <div className="subscription-textarea">
      <TextArea value={text} />
      <Button onClick={onCancelClick}>{buttonText}</Button>
    </div>
  )
}

SubscriptionTextArea.propTypes = {
  buttonText: PropTypes.string,
  onCancelClick: PropTypes.func,
  text: PropTypes.string,
}

export default SubscriptionTextArea
