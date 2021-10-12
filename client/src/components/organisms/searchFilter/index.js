import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import SearchList from 'components/molecules/searchList'
import Dropdown from 'components/atoms/dropdown'
import './style.scss'
import { filterItems, fetchCategory } from 'libs/services/algolia'

const SearchFilter = ({ searchHeading }) => {
  const { searchFilter, searchKey } = useContext(AppContext)
  const [product, setProduct] = useState()
  const [unit, setUnit] = useState()
  const [size, setSize] = useState()
  const [selectedFilterList, setSelectFilterList] = useState([])
  const [products, setProducts] = useState([])
  const [filterCount, setFilterCount] = useState(0)
  const [loading, setLoading] = useState(false)

  console.log('check filter array11:', searchHeading, searchKey)
  console.log(searchFilter, products, filterCount, loading, 'searcing')
  // let productitem = []
  useEffect(() => {
    let newarr =
      searchFilter &&
      searchFilter.map(data => {
        // productitem.push(data.sku)
        return { value: data['Part Number'] }
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

  const perfomeAlgoliaSearch = async (category, pageNumber = 0) => {
    try {
      setLoading(true)
      const results = await fetchCategory(category, pageNumber)
      let serverResults = (results || { hits: [] }).hits
      serverResults.sort((a, b) =>
        a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0,
      )
      console.log(serverResults, 'serverResults')
      // if (pageNumber === 0) {
      //   productListing(results.nbHits, category)
      // }
      setProducts(serverResults)

      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(selectedFilterList, 'selectedFilterList')
    let payload = []
    if (selectedFilterList.length > 0) {
      for (const filteredItem of selectedFilterList) {
        payload.push(`${filteredItem.value}:true`)
      }

      filterItems(payload).then(results => {
        const serverResults = results.hits || []
        setProducts(serverResults)
        let count = searchFilter.filter(item => item.sku === '628946213607')
        console.log(count, 'count')
        setFilterCount(count.length)
      })
    } else {
      perfomeAlgoliaSearch('Category')
      setFilterCount(0)
    }
  }, [selectedFilterList])
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
        <Dropdown items={size} className="first-drop" value="size" />
        <Dropdown
          items={product}
          setSelectFilterList={setSelectFilterList}
          className="second-drop"
        />
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
