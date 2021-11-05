import React from 'react'
import PropTypes from 'prop-types'

const EzeBox = EzeBox => {
  console.log('ezebox:', EzeBox)
  return (
    <div>
      <strong>EZE BOX</strong>
    </div>
  )
}
EzeBox.propTypes = {
  EzeBox: PropTypes.object,
}
export default EzeBox
