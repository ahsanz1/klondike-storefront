import React from 'react'
import PropTypes from 'prop-types'

import Heading from 'components/atoms/heading'
import IconInput from 'components/molecules/icon-input'
import './styles.scss'

import { STATIC_FOLDER } from 'libs/global-constants'

const SearchField = ({
  onSearch,
  title = '',
  inputPlaceholder = '',
  query = '',
  onQueryChange,
  headerComponent,
}) => {
  const onSubmit = e => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={onSubmit} className="search-field">
      {headerComponent || (
        <Heading className="search-field__title">{title}</Heading>
      )}
      <div className="search-field__input-wrapper">
        <IconInput
          inputProps={{
            placeholder: inputPlaceholder,
          }}
          inputClassName="site-search__input"
          img={`${STATIC_FOLDER}/icons/site-search.svg`}
          imgClassName="site-search__input-icon"
          buttonType="submit"
          onChangeHandler={value => {
            onQueryChange && onQueryChange(value)
          }}
          inputValue={query}
        />
      </div>
    </form>
  )
}

SearchField.propTypes = {
  onSearch: PropTypes.func,
  inputPlaceholder: PropTypes.string,
  title: PropTypes.string,
  query: PropTypes.string,
  onQueryChange: PropTypes.func,
  headerComponent: PropTypes.any,
}

export default SearchField
