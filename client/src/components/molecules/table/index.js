import React from 'react'
import PropTypes from 'prop-types'

import DataTableRow from 'components/atoms/table-row'

import './styles.scss'

const DataTable = ({ options, data, rowData }) => {
  const { columns, expandedRow, rowDetails } = options
  return (
    <div className="data-table">
      {columns && columns.length > 0 ? (
        <DataTableRow header columns={columns}></DataTableRow>
      ) : (
        ''
      )}
      {data && data.length > 0
        ? data.map((list, i) => (
            <>
              <DataTableRow columns={columns} data={list}></DataTableRow>
              {expandedRow && rowDetails && rowDetails.length > 0
                ? rowDetails.map(({ title, value }, k) => (
                  <div className="table-row-wrapper" key={k}>
                    <div className="table-row">
                      <div className="table-cell">{title}</div>
                      <div className="table-cell text-right">
                        {rowData[value]}
                      </div>
                    </div>
                  </div>
                ))
                : ''}
            </>
        ))
        : ''}
    </div>
  )
}

DataTable.propTypes = {
  options: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  rowData: PropTypes.object,
}

export default DataTable
