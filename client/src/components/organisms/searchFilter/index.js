import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import SearchList from 'components/molecules/searchList'
import Dropdown from 'components/atoms/dropdown'
import './style.scss'

const SearchFilter = ({ searchHeading }) => {
  const { searchFilter, searchKey } = useContext(AppContext)
  const [product, setProduct] = useState()
  const [unit, setUnit] = useState()
  const [size, setSize] = useState()
  console.log('check filter array11:', searchHeading, searchKey)
  console.log(searchFilter, 'searchFilter')
  // let productitem = []
  useEffect(() => {
    let newarr =
      searchFilter &&
      searchFilter.map(data => {
        // productitem.push(data.sku)
        return { value: data.sku }
      })
    console.log(newarr, 'dataa')
    setProduct(newarr)
  }, [searchFilter])
  useEffect(() => {
    let unitarr =
      searchFilter &&
      searchFilter.map(data => {
        // productitem.push(data.sku)
        return { value: data['Unit of Measurement'] }
      })
    setUnit(unitarr)
  }, [searchFilter])
  useEffect(() => {
    let sizearr =
      searchFilter &&
      searchFilter.map(data => {
        // productitem.push(data.sku)
        return { value: data['Package Size'] }
      })
    setSize(sizearr)
  }, [searchFilter])
  console.log(product, 'productitem')
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
        <Dropdown items={size} className="first-drop" />
        <Dropdown items={product} className="second-drop" />
        <Dropdown items={unit} className="third-drop" />
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
