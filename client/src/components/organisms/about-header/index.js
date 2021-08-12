import React from 'react'
import PropTypes from 'prop-types'
// import { aboutHeader } from 'libs/data/data'
import './style.scss'

const AboutHeader = aboutHeader => {
  console.log('check about:', aboutHeader)
  return (
    <div className="about-header">
      <ul>
        {aboutHeader.aboutHeader.length > 0 &&
          aboutHeader.aboutHeader.map((item, i) => {
            return <li key={i}>{item.label}</li>
          })}
      </ul>
    </div>
  )
}
AboutHeader.propTypes = {
  aboutHeader: PropTypes.array,
}
export default AboutHeader
