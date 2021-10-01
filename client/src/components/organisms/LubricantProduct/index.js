import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import AlternateTextImage from 'components/molecules/alternate-text-image'

const LubricantProduct = ({ LubricantContent, headingtext }) => {
  return (
    <>
      <div className="LubricantProduct-wrapper">
        {headingtext && <h1>{headingtext.headingtext}</h1>}
      </div>
      {LubricantContent.map((aboutUsSingle, id) => (
        <AlternateTextImage {...aboutUsSingle} key={id} />
      ))}
    </>
  )
}

LubricantProduct.propTypes = {
  LubricantContent: PropTypes.string,
  headingtext: PropTypes.string,
}

export default LubricantProduct
