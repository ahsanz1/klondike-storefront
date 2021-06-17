import React from 'react'

import PropTypes from 'prop-types'
import Link from 'components/atoms/link'

const LinkIcon = ({
  link = '',
  src = '',
  alt = '',
  linkClassName = '',
  imgClassName = '',
}) => {
  return (
    <Link to={link} className={linkClassName}>
      {src && <img className={imgClassName} src={src} alt={alt} />}
    </Link>
  )
}

export default LinkIcon

LinkIcon.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  link: PropTypes.string,
  linkClassName: PropTypes.string,
  imgClassName: PropTypes.string,
}
