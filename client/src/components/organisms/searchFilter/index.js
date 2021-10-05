import React, { useContext } from 'react'
import { AppContext } from 'libs/context'
// import { fetchItems } from 'libs/services/algolia'
import SearchList from 'components/molecules/searchList'
import './style.scss'
const SearchFilter = () => {
  const { searchFilter } = useContext(AppContext)
  console.log('check filter array11:', searchFilter)
  return (
    <div className="search-filter">
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
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
export default SearchFilter
