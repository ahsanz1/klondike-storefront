import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchResults from 'components/molecules/site-search/search-results'
import SearchField from 'components/molecules/site-search/search-field'
import { fetchItems } from 'libs/services/algolia'
import {
  NO_RESULTS,
  PAGESIZE,
  SEARCH_FIELD_PLACEHOLDER,
  SEARCH_FIELD_TITLE,
  SEARCH_RESULT_TITLE,
} from './constant'
import './styles.scss'

const SiteSearch = ({ pdpUrl = '/products' }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState()

  const onPageChange = page => {
    performAlgoliaSearch(query, page)
    setCurrentPage(page)
  }
  const onSearch = query => {
    if (query.length > 0) {
      performAlgoliaSearch(query, currentPage)
    }
  }

  const performAlgoliaSearch = async (term, pageNumber) => {
    try {
      const results = await fetchItems(term, PAGESIZE, pageNumber - 1)
      let serverResults = (results || { hits: [] }).hits
      if (serverResults && serverResults.length > 0) {
        let temp = []
        serverResults.forEach(({ title, sku }) => {
          temp.push({
            title,
            link: pdpUrl + '?sku=' + sku,
          })
        })
        setResults([...temp])
        setTotalResults(results.nbHits)
      } else {
        setResults(NO_RESULTS)
        setTotalResults(0)
      }
    } catch (e) {
      setResults(NO_RESULTS)
    }
  }

  return (
    <div className="site-search">
      <SearchField
        onSearch={onSearch}
        title={SEARCH_FIELD_TITLE}
        inputPlaceholder={SEARCH_FIELD_PLACEHOLDER}
        query={query}
        onQueryChange={setQuery}
      />
      {results && results.length > 0 && (
        <SearchResults
          results={results}
          totalResults={totalResults}
          pageSize={PAGESIZE}
          currentPage={currentPage}
          onPageChange={onPageChange}
          title={SEARCH_RESULT_TITLE}
        />
      )}
    </div>
  )
}

SiteSearch.propTypes = {
  pdpUrl: PropTypes.string,
}

export default SiteSearch
