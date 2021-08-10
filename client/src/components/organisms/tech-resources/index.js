import React from 'react'
import { techResources } from 'libs/data/data'
import './style.scss'

export default function TechResources () {
  return (
    <div className="tech-resources">
      <ul>
        {techResources.length &&
          techResources.map((item, i) => <li key={i}>{item.name}</li>)}
      </ul>
    </div>
  )
}
