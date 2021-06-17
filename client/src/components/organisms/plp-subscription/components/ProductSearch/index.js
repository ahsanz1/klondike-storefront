import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Label from 'components/atoms/label'
import SearchField from 'components/molecules/site-search/search-field'

import './styles.scss'

const ProductSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const headerComponent = (
    <>
      <h4 className="search-title">Select product to swap</h4>
      <Label className="product-search-p">Search</Label>
    </>
  )

  const handleSearch = result => {
    setQuery(result)
    onSearch(result)
  }

  return (
    <div className="products-search">
      <SearchField
        onSearch={onSearch}
        title={'Search'}
        inputPlaceholder={'Search Products'}
        query={query}
        onQueryChange={handleSearch}
        headerComponent={headerComponent}
      />
    </div>
  )
}

ProductSearch.propTypes = {
  onSearch: PropTypes.func,
}

export default ProductSearch
