import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/button'
import './style.scss'

const SelectedPlpCategory = ({ name = '', desc = '' }) => {
  const [readMore, setReadMore] = useState(200)
  const [string, setString] = useState('')
  const truncate = (str, maxlength) => {
    console.log('check str:', str, maxlength)
    str.length > maxlength
      ? setString(str.slice(0, maxlength - 1) + '…')
      : setString(str)
  }
  useEffect(() => {
    truncate(desc, readMore)
  }, [desc])
  const more = () => {
    setReadMore(desc.length)
    setString(desc)
  }
  return (
    <div className="selected-category">
      <h2>{name}</h2>
      <p>{string}</p>
      {desc.length > 0 && readMore !== desc.length && (
        <Button onClick={more}>Read more</Button>
      )}
    </div>
  )
}
SelectedPlpCategory.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
}
export default SelectedPlpCategory
