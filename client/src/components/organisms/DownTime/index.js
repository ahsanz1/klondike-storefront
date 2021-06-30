import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import DowntimeCosting from 'components/molecules/downtime-costing'

const DownTime = ({ downTimeCosting }) => {
  return (
    <>
      <div className="downtime-wrapper">
        {downTimeCosting.map((down, i) => (
          <DowntimeCosting {...down} key={i} />
        ))}
      </div>
    </>
  )
}

DownTime.propTypes = {
  downTimeCosting: PropTypes.string,
}

export default DownTime
