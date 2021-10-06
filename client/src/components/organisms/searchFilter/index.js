import React, { useContext } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import SearchList from 'components/molecules/searchList'
import Dropdown from 'components/atoms/dropdown'
import './style.scss'
const SearchFilter = ({ searchHeading }) => {
  const { searchFilter, searchKey } = useContext(AppContext)
  console.log('check filter array11:', searchHeading, searchKey)
  return (
    <div className="search-filter">
      <div className="filter-search-heading">
        <Label>{searchHeading}</Label>
      </div>
      <div className="search-key">
        <Label>
          {searchKey}
          <span>({searchFilter.length})</span>
        </Label>
      </div>
      <div className="filter-dropdown">
        <Dropdown
          items={[
            { label: 'size 1' },
            { label: 'size 2' },
            { label: 'size 3' },
          ]}
          className="first-drop"
        />
        <Dropdown
          items={[
            { label: 'part number 1' },
            { label: 'part number 2' },
            { label: 'part number 3' },
          ]}
          className="second-drop"
        />
        <Dropdown
          items={
            [
              // { label: 'Unit/case 1' },
              // { label: 'Unit/case 2' },
              // { label: 'Unit/case 3' },
            ]
          }
          className="second-drop"
        />
      </div>
      <div className="products">
        <ul>
          {searchFilter &&
            searchFilter.map((item, i) => (
              <li key={i}>
                <SearchList
                  image={{
                    url: item['Image URL']
                      ? item['Image URL']
                      : item['Image 1 URL'],
                  }}
                  title={item.title}
                  category={item.Category}
                  sku={item.sku}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
SearchFilter.propTypes = {
  searchHeading: PropTypes.string,
}
export default SearchFilter
