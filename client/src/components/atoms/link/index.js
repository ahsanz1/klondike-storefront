import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from '@reach/router'
import { genericHashLink } from 'libs/utils/hash-link'

import './style.scss'
const HashLink = genericHashLink(RouterLink)

const Link = ({
  children,
  to = '',
  replace = false,
  ref,
  getProps,
  state = {},
  className = '',
  style = {},
  onClick,
}) => {
  const isInternalURL = to => {
    try {
      const url = new URL(to, window.location.origin)
      return url.hostname === window.location.hostname
    } catch {
      return false
    }
  }
  if (isInternalURL(to)) {
    return (
      <HashLink
        className={`c-link ${className}`}
        style={style}
        replace={replace}
        ref={() => {
          ref && ref()
        }}
        getProps={() => {
          getProps && getProps()
        }}
        state={state}
        to={to}
        onClick={() => {
          onClick && onClick()
        }}
      >
        <span className="h-links">{children}</span>
      </HashLink>
    )
  } else {
    return (
      <a
        href={to}
        rel="noreferrer"
        target="_blank"
        className={`c-link ${className}`}
        style={style}
        onClick={() => {
          onClick && onClick()
        }}
      >
        {children}
      </a>
    )
  }
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  replace: PropTypes.bool,
  getProps: PropTypes.func,
  state: PropTypes.object,
  ref: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
}

export default Link
