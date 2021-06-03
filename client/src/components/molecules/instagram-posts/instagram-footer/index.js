import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import './styles.scss'
const options = { month: 'long', day: 'numeric' }

const InstagramFooter = ({ date, link }) => {
  return (
    <div className="instagram-footer">
      <Label className="instagram-footer__date">
        {new Date(date).toLocaleDateString('en-US', options)}
      </Label>
      <a className="instagram-footer__link" target="__blank" href={link}>
        View on instagram
      </a>
    </div>
  )
}

InstagramFooter.propTypes = {
  date: PropTypes.string,
  link: PropTypes.string,
}

export default InstagramFooter
