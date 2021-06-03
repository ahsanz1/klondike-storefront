import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import PaginationItem from 'components/molecules/site-search/paginationItem'
import {
  PAGE,
  PREV,
  NEXT,
} from 'components/molecules/site-search/paginationItem/constant'
import './styles.scss'

const SearchResults = ({
  results = [],
  totalResults,
  pageSize,
  currentPage,
  onPageChange,
  title = '',
}) => {
  const itemRender = (current, type, originalElement) => {
    if (type === PAGE || type === PREV || type === NEXT) {
      return (
        <PaginationItem
          isActive={type === PAGE && current === currentPage}
          type={type}
          current={current}
        />
      )
    }
    return originalElement
  }

  return (
    <div className="search-results">
      <div className="search-results__content">
        <Label className="search-results__title">{title}</Label>
        {results.map(({ title, link }, index) => (
          <div key={index}>
            <Link className="search-results__result" to={link}>
              {title}
            </Link>
            {index !== results.length - 1 && (
              <hr className="search-results__divider" />
            )}
          </div>
        ))}
        <Pagination
          hideOnSinglePage
          current={currentPage}
          onChange={page => {
            onPageChange && onPageChange(page)
          }}
          pageSize={pageSize}
          showLessItems
          size="small"
          total={totalResults}
          itemRender={itemRender}
          showSizeChanger={false}
          style={{
            marginTop: '20px',
          }}
        />
      </div>
    </div>
  )
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  totalResults: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  title: PropTypes.string,
}

export default SearchResults
