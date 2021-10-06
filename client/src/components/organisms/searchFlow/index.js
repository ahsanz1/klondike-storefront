import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context'
import Input from 'components/atoms/input'
// import ProductItem from 'components/molecules/ProductItem'
import SearchList from 'components/molecules/searchList'
import './style.scss'
import { fetchItems } from 'libs/services/algolia'
import Suggestion from 'components/molecules/searchSuggestions'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
import { navigate } from '@reach/router'

const SearchFlow = props => {
  const [searchValue, setSearchValue] = useState('')
  const [itemList, setItemList] = useState([])
  const [recent, setRecent] = useState([])
  const [showRecent, setShowRecent] = useState(false)
  const [localRecent, setLocalRecent] = useState([])
  const { setSearchFilter, setSearchKey } = useContext(AppContext)

  const searchValueHandler = async ({ value }) => {
    setSearchValue(value)
    setShowRecent(false)
    const list = await fetchItems(searchValue)
    console.log('check list:', list.hits)
    setItemList(list.hits)
    setSearchFilter(list.hits)
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
    // const list = await fetchItems(searchValue)
    // setItemList(list.hits)
    setShowRecent(false)
    let storeData = [...new Set(recent)]
    localStorage.setItem('recentData', JSON.stringify([...storeData]))
    setLocalRecent(JSON.parse(localStorage.getItem('recentData')))
    navigate('/search-filter')
    props.toggleSearch()
    setSearchKey(searchValue)
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
  console.log('bugssss...')
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
            <img
              src={props.clearIcon && props.clearIcon.url}
              alt={props.clearIcon && props.clearIcon.alt}
            />
          </Button>
        </div>
        {itemList.length > 0 && (
          <Label className="suggestion-heading">Suggestion</Label>
        )}
        <div className="search-list">
          {showRecent && localRecent && localRecent.length > 0 && (
            <div className="recentSearch">
              <Label className="recent-heading">Recent Searches</Label>
              {localRecent.length > 0 &&
                localRecent.map((item, i) => (
                  <li key={i}>
                    <Button onClick={() => recentSelect(item)}>{item}</Button>
                    <Button onClick={() => clearRecent(item)} className="clear">
                      <img
                        src={props.clearIcon && props.clearIcon.url}
                        alt="clear Icon"
                      />
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
  clearIcon: PropTypes.object,
  toggleSearch: PropTypes.func,
}
export default SearchFlow
