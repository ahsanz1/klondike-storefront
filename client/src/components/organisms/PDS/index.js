import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import PdsData from 'components/molecules/pds-data'

const PDS = ({ pcpbottom }) => {
  console.log(pcpbottom, 'pcp')
  return (
    <div className="pds-bottom-section">
      {pcpbottom.map((down, i) => (
        <PdsData {...down} key={i} />
      ))}
    </div>
  )
}

PDS.propTypes = {
  pcpbottom: PropTypes.string,
}

export default PDS
