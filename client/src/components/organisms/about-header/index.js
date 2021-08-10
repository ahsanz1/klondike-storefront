import React from 'react'
import { aboutHeader } from 'libs/data/data'
import './style.scss'

export default function AboutHeader () {
  return (
    <div className="about-header">
      <ul>
        {aboutHeader.length &&
          aboutHeader.map((item, i) => <li key={i}>{item.name}</li>)}
      </ul>
    </div>
  )
}
