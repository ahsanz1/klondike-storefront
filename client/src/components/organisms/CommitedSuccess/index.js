import React from 'react'
import PropTypes from 'prop-types'
// import './style.scss'
import Commited from 'components/molecules/commited'

const CommitedSuccess = ({ commited }) => {
  return (
    <>
      {commited.map((content, i) => (
        <Commited {...content} key={i} />
      ))}
    </>
  )
}

CommitedSuccess.propTypes = {
  commited: PropTypes.string,
}

export default CommitedSuccess
