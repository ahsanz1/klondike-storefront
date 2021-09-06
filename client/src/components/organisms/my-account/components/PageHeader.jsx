import React, { memo } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Button from 'components/atoms/button'
import Label from 'components/atoms/label'

const PageHeader = ({ title, userName, logoutBtnText, onClick }) => {
  return (
    <div className="account__masthead">
      <hgroup className="account__hgroup">
        <Label className="welcome-title" component="h4">
          Welcome {userName},
        </Label>
        <Label className="page-title" component="h2">
          {title}
        </Label>
      </hgroup>
      <div className="account-head-buttons">
        <Button className="account-logout-button" onClick={onClick}>
          {logoutBtnText}
        </Button>
      </div>
    </div>
  )
}

PageHeader.defaultProps = {
  title: '',
  userName: '',
  logoutBtnText: '',
  onClick: noop,
}

PageHeader.propTypes = {
  title: PropTypes.string,
  userName: PropTypes.string,
  logoutBtnText: PropTypes.string,
  onClick: PropTypes.func,
}

export default memo(PageHeader)
