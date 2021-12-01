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
  let recentArr = JSON.parse(localStorage.getItem('recentData'))
    ? JSON.parse(localStorage.getItem('recentData'))
    : []
  const [searchValue, setSearchValue] = useState('')
  // const [itemList, setItemList] = useState([])
  // const [recent, setRecent] = useState([])
  const [showRecent, setShowRecent] = useState(false)
  const [localRecent, setLocalRecent] = useState([])
  const { setSearchFilter, setSearchKey, itemList, setItemList } = useContext(
    AppContext,
  )
  const [searchName, setSearchName] = useState('')

  const searchValueHandler = async ({ value }) => {
    setSearchName(value)
    setSearchValue(value)
    setShowRecent(false)
    // const list = await fetchItems(value)
    // console.log('check Search list:', list.hits)
    // setItemList(list.hits)
    // setSearchFilter(list.hits)
    // Promise Start
    await fetchItems(value, 500, 0, true)
      .then(async list => {
        let hits = []
        await list.hits.map((data, i) => {
          if (data['isVariant'] === false) {
            hits.push(data)
          }
        })
        setItemList(hits)
        setSearchFilter(hits)
        console.log('hits', hits)
      })

      .catch(error => console.log('Search Error:', error))
    // Promise End
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
    console.log('check.. recentArr:', recentArr)
    recentArr.push(searchValue)
    // setRecent([...recentArr])
    console.log('check.. recent:', recentArr)
    setShowRecent(false)
    let storeData = recentArr.filter((item, index) => {
      return recentArr.indexOf(item) === index
    })
    // let storeData = [...new Set(recentArr)]
    console.log('check store Data:', storeData)
    localStorage.setItem('recentData', JSON.stringify(storeData))
    setLocalRecent(JSON.parse(localStorage.getItem('recentData')))
    navigate(`/search-filter?${searchName}`)
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
    // setRecent(JSON.parse(localStorage.getItem('recentData')))
  }, [])

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
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={true}
            />
          </form>
          <Button onClick={clear} className="clear">
            <img
              src={props.clearIcon && props.clearIcon.url}
              alt={props.clearIcon && props.clearIcon.alt}
            />
          </Button>
        </div>
        {itemList.length > 0 && !showRecent && searchValue && (
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
          {!showRecent && (
            <>
              <div className="suggestion-name">
                <Suggestion
                  itemList={searchValue ? itemList : []}
                  close={props.toggleSearch}
                />
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
                          sku={item.sku}
                          close={props.toggleSearch}
                        />
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}
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
