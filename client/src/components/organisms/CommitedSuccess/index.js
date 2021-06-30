import React from 'react'
import PropTypes from 'prop-types'
// import './style.scss'
import Commited from 'components/molecules/commited'

const LubricantProduct = ({ commited }) => {
  return (
    <>
      {commited.map((content, i) => (
        <Commited {...content} key={i} />
      ))}
    </>
  )
}

LubricantProduct.propTypes = {
  commited: PropTypes.string,
}

export default LubricantProduct
