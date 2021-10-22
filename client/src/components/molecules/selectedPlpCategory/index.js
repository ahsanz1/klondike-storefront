import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useWindowSize } from 'libs/custom-hooks'
import Button from 'components/atoms/button'
import './style.scss'

const SelectedPlpCategory = ({ name = '', desc = '' }) => {
  const size = useWindowSize()
  const [readMore, setReadMore] = useState(size[0] < 768 ? 200 : desc.length)
  const [string, setString] = useState('')
  const truncate = (str, maxlength) => {
    console.log('check str:', str, maxlength)
    str.length > maxlength && size[0] < 768
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
      {desc.length > 0 &&
        desc.length > readMore &&
        readMore !== desc.length &&
        size[0] < 768 && <Button onClick={more}>Read more</Button>}
    </div>
  )
}
SelectedPlpCategory.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
}
export default SelectedPlpCategory
