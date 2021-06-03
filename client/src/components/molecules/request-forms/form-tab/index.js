import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/button'
import Label from 'components/atoms/label'
import './styles.scss'

const RequestFormTab = ({
  title = '',
  buttonLabel = '',
  index,
  onTabChange,
}) => {
  return (
    <div key={index} className="form-tab">
      <Label className="form-tab__title">{title}</Label>
      <Button
        className="form-tab__button"
        onClick={() => {
          onTabChange && onTabChange(index)
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}

RequestFormTab.propTypes = {
  title: PropTypes.string,
  buttonLabel: PropTypes.string,
  index: PropTypes.number,
  onTabChange: PropTypes.func,
}

export default RequestFormTab
