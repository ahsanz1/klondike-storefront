import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Input from 'components/atoms/input'
// import ProductItem from 'components/molecules/ProductItem'
import SearchList from 'components/molecules/searchList'
import './style.scss'
import { fetchItems } from 'libs/services/algolia'
import Suggestion from 'components/molecules/searchSuggestions'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

const SearchFlow = props => {
  const [searchValue, setSearchValue] = useState('')
  const [itemList, setItemList] = useState([])
  const [recent, setRecent] = useState([])
  const [showRecent, setShowRecent] = useState(false)
  const [localRecent, setLocalRecent] = useState([])

  const searchValueHandler = async ({ value }) => {
    setSearchValue(value)
  }
  const clear = () => {
    setSearchValue('')
    setItemList([])
    setShowRecent(false)
    props.toggleSearch()
  }
  const clearRecent = item => {
    let clearItem = localRecent.filter(data => data !== item)
    console.log('clearRecent:', clearItem)
    localStorage.setItem('recentData', JSON.stringify(clearItem))
    setLocalRecent([...clearItem])
  }
  const recentSearch = async e => {
    e.preventDefault()
    let recentArr = recent
    recentArr.push(searchValue)
    setRecent([...recentArr])
    const list = await fetchItems(searchValue)
    setItemList(list.hits)
    setShowRecent(false)
    let storeData = [...new Set(recent)]
    localStorage.setItem('recentData', JSON.stringify([...storeData]))
    setLocalRecent(JSON.parse(localStorage.getItem('recentData')))
  }
  const focusInput = () => {
    setShowRecent(true)
    setLocalRecent(JSON.parse(localStorage.getItem('recentData')))
  }
  const recentSelect = value => {
    setSearchValue(value)
    setShowRecent(false)
  }
  useEffect(() => {
    setLocalRecent(JSON.parse(localStorage.getItem('recentData')))
  }, [])

  console.log('localRecent:', props)
  return (
    <>
      <div className="serach-flow">
        <div className="serach-input">
          <form onSubmit={recentSearch}>
            <Input
              placeholder="Search"
              value={searchValue}
              onChange={searchValueHandler}
              onFocus={focusInput}
            />
          </form>
          <Button onClick={clear} className="clear">
            <img src={props.clearIcon} alt="clear Icon" />
          </Button>
        </div>
        {itemList.length > 0 && (
          <Label className="suggestion-heading">Suggestion</Label>
        )}

        {/* {itemList.length === 0 ? (
          <Label className="empty-suggestion">No Suggestion Found!</Label>
        ) : (
          ''
        )} */}
        <div className="search-list">
          {showRecent && localRecent && localRecent.length > 0 && (
            <div className="recentSearch">
              <Label className="recent-heading">Recent Searches</Label>
              {localRecent.length > 0 &&
                localRecent.map((item, i) => (
                  <li key={i}>
                    <Button onClick={() => recentSelect(item)}>{item}</Button>
                    <Button onClick={() => clearRecent(item)} className="clear">
                      <img src={props.clearIcon} alt="clear Icon" />
                    </Button>
                  </li>
                ))}
            </div>
          )}
          <div className="suggestion-name">
            <Suggestion itemList={searchValue ? itemList : []} />
          </div>
          <div className="products">
            <ul>
              {searchValue &&
                itemList &&
                itemList.map((item, i) => (
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
      </div>
    </>
  )
}
SearchFlow.propTypes = {
  clearIcon: PropTypes.string,
  toggleSearch: PropTypes.func,
}
export default SearchFlow
