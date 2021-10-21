import React, { useState } from 'react'
import Button from 'components/atoms/button'
import PropTypes from 'prop-types'
import './style.scss'

const SelectedPlpCategory = ({ name, desc }) => {
  const [readMore, setReadMore] = useState(200)
  const truncate = (str, maxlength) => {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str
  }
  const more = () => {
    setReadMore(desc.length)
  }
  return (
    <div className="selected-category">
      <h2>{name}</h2>
      <p>{truncate(desc, readMore)}</p>
      {desc.length > 0 && readMore !== desc.length && (
        <Button onClick={more}>Read more</Button>
      )}
    </div>
  )
}
SelectedPlpCategory.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.array,
}
export default SelectedPlpCategory
