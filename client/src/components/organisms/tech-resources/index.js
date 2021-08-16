import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const TechResources = ({ techResources }) => {
  console.log('resources check:', techResources)
  return (
    <div className="tech-resources">
      <ul>
        {techResources.length &&
          techResources.map((item, i) => <li key={i}>{item.label}</li>)}
      </ul>
    </div>
  )
}
TechResources.propTypes = {
  techResources: PropTypes.array,
}
export default TechResources
