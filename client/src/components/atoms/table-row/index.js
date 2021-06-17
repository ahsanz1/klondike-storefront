import React from 'react'
import PropTypes from 'prop-types'

const DataTableRow = ({ header, columns, data }) => {
  return (
    <div className={`table-row-wrapper${header ? ' table-header' : ''}`}>
      <div className="table-row">
        {columns.map(({ title, value, column, align, className, width }, i) => (
          <div
            key={i}
            className={`table-cell${column ? ` column-${column}` : ''}${
              align ? ` text-${align}` : ''
            }${className ? ` ${className}` : ''}`}
            style={width ? { flexBasis: `${width}`, flexGrow: 0 } : null}
          >
            {header ? title : data ? data[value] : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

DataTableRow.propTypes = {
  header: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
}

export default DataTableRow
