import React, { useState } from 'react'
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
  const searchValueHandler = async ({ value }) => {
    const list = await fetchItems(value)
    console.log('check search:', list)
    setSearchValue(value)
    setItemList(list.hits)
  }
  const clear = () => {
    setSearchValue('')
  }
  console.log('itemLIst:', itemList)
  return (
    <>
      <div className="serach-flow">
        <div className="serach-input">
          <Input
            placeholder="Serach"
            value={searchValue}
            onChange={searchValueHandler}
          />
          <Button onClick={clear} className="clear">
            <img src={props.clearIcon} alt="clear Icon" />
          </Button>
        </div>
        <Label className="suggestion-heading">Suggestion</Label>
        <div className="search-list">
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
}
export default SearchFlow
