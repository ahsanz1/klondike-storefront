import React from 'react'
import PropTypes from 'prop-types'
import { Empty } from 'antd'

import './styles.scss'

const SampleXPMComponent = ({ title, id }) => {
  return (
    <div className="sample-xpm-component">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div className="empty-description">
            <h1>{title || id}</h1>
            <p>{`This is a sample XPM Component, to create new do the following:`}</p>
            <ul>
              <li>{`Create a new Organism by following Atomic Design Pattern`}</li>
              <li>{`Export the component with the same KEY ID as used in XPM`}</li>
              <li>{`Export using the organisms/index.js`}</li>
            </ul>
          </div>
        }
      />
    </div>
  )
}

SampleXPMComponent.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
}

export default SampleXPMComponent
