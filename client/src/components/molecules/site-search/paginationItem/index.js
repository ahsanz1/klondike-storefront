import React from 'react'
import PropTypes from 'prop-types'
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import { PREV, NEXT, PAGE } from './constant'
import './styles.scss'

const PaginationItem = ({ current, isActive, type }) => {
  return (
    <span className={`pagination-item ${isActive ? 'active' : ''}`}>
      {type === PREV && (
        <>
          <DoubleLeftOutlined /> Previous
        </>
      )}
      {type === PAGE && <>{current}</>}
      {type === NEXT && (
        <>
          Next <DoubleRightOutlined />
        </>
      )}
    </span>
  )
}

PaginationItem.propTypes = {
  current: PropTypes.number,
  isActive: PropTypes.bool,
  type: PropTypes.string,
}

export default PaginationItem
