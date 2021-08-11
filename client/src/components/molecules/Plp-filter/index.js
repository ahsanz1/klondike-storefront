import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
import './style.scss'

const PlpFilter = ({
  filterSelect,
  sizeProp,
  partNumberProp,
  unitProp,
  untitledProp,
  changeHandler,
}) => {
  const [size, setSize] = useState('')
  const [part, setPart] = useState('part 2')
  const [unit, setUnit] = useState('unit 8')
  const clearFunc = () => {
    setSize('')
    setPart('')
    setUnit('')
  }
  console.log('check filter:', filterSelect)
  return (
    <>
      <div className="multi-filter">
        <select
          onChange={e => setSize(e.target.value)}
          onBlur={e => setSize(e.target.value)}
        >
          {sizeProp &&
            sizeProp.length > 0 &&
            sizeProp.map((item, index) => (
              <option key={index}>{item.text}</option>
            ))}
        </select>
        <select
          onChange={e => setPart(e.target.value)}
          onBlur={e => setPart(e.target.value)}
        >
          {partNumberProp &&
            partNumberProp.length > 0 &&
            partNumberProp.map((item, index) => (
              <option key={index}>{item.text}</option>
            ))}
        </select>
        <select
          onChange={e => setUnit(e.target.value)}
          onBlur={e => setUnit(e.target.value)}
        >
          {unitProp &&
            unitProp.length > 0 &&
            unitProp.map((item, index) => (
              <option key={index}>{item.text}</option>
            ))}
        </select>
        <select>
          {untitledProp &&
            untitledProp.length > 0 &&
            untitledProp.map((item, index) => (
              <option key={index}>{item.text}</option>
            ))}
        </select>
      </div>
      <div className="sorting-filter">
        <Label className="selected-filter">
          <Label>
            {size}
            {size && (
              <Label className="close" onClick={e => setSize('')}>
                &times;
              </Label>
            )}
          </Label>
          <Label>
            {part}
            {part && (
              <Label className="close" onClick={e => setPart('')}>
                &times;
              </Label>
            )}
          </Label>
          <Label>
            {unit}
            {unit && (
              <Label className="close" onClick={e => setUnit('')}>
                &times;
              </Label>
            )}
          </Label>
          {size || part || unit ? (
            <Label>
              <Button onClick={clearFunc}>Clear All</Button>
            </Label>
          ) : null}
        </Label>
        <Label className="filter">
          Sort By:
          <select onChange={changeHandler} onBlur={changeHandler}>
            {filterSelect &&
              filterSelect.map((item, index) => (
                <option key={index}>{item.name}</option>
              ))}
          </select>
        </Label>
      </div>
    </>
  )
}
PlpFilter.propTypes = {
  filterSelect: PropTypes.array,
  changeHandler: PropTypes.func,
  sizeProp: PropTypes.array,
  partNumberProp: PropTypes.array,
  unitProp: PropTypes.array,
  untitledProp: PropTypes.array,
}
export default PlpFilter
