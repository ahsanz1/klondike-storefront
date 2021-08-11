import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const TechResources = ({ techResources }) => {
  return (
    <div className="tech-resources">
      <ul>
        {techResources.length &&
          techResources.map((item, i) => <li key={i}>{item.name}</li>)}
      </ul>
    </div>
  )
}
TechResources.propTypes = {
  techResources: PropTypes.array,
}
export default TechResources
