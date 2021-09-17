import React from 'react'
import './style.scss'

const selectedPlpCategory = ({ name, desc }) => {
  return (
    <div className="selected-category">
      <h2>{name}</h2>
      <p>{desc}</p>
    </div>
  )
}
export default selectedPlpCategory
