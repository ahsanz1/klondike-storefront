import React from 'react'
import PropTypes from 'prop-types'
// import { aboutHeader } from 'libs/data/data'
import './style.scss'

const AboutHeader = ({ aboutHeader }) => {
  console.log('check about:', aboutHeader)
  return (
    <div className="about-header">
      <ul>
        {aboutHeader.length &&
          aboutHeader.map((item, i) => <li key={i}>{item.name}</li>)}
      </ul>
    </div>
  )
}
AboutHeader.propTypes = {
  aboutHeader: PropTypes.array,
}
export default AboutHeader
