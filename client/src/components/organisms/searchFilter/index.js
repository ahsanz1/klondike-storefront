import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import SearchList from 'components/molecules/searchList'
import Dropdown from 'components/atoms/dropdown'
import './style.scss'
import { searchFilters } from 'libs/services/algolia'

const SearchFilter = ({ searchHeading }) => {
  const filters = {}
  let [ps, setPS] = useState()
  let [pn, setPN] = useState('Part Number')
  let [uom, setUOM] = useState()
  let { searchFilter, setSearchFilter, searchKey } = useContext(AppContext)
  const [product, setProduct] = useState()
  const [isCalled, setIsCalledState] = useState(false)
  const [holdSearch, setHoldSearchState] = useState('')
  const [unit, setUnit] = useState()
  const [size, setSize] = useState()
  // const [selectedFilterList, setSelectFilterList] = useState([])
  // const [products, setProducts] = useState([])
  // const [filterCount, setFilterCount] = useState(0)
  // const [loading, setLoading] = useState(false)

  // let productitem = []
  useEffect(() => {
    const setFilters = async searchFilter => {
      await setFilterResult(searchFilter)
      console.log('is called state', isCalled)
      if (isCalled !== true) {
        setHoldSearchState(searchFilter)
        setIsCalledState(true)
      }
    }

    setFilters(searchFilter)
  }, [searchFilter])

  const setFilterResult = async searchFilters => {
    let arrProduct = []
    let arrSize = []
    let arrUnit = []

    searchFilters &&
      searchFilters.map((data, index) => {
        let objProduct = {
          label: data['Part Number'],
          value: data['Part Number'],
        }
        let objSize = {
          label: data['Unit of Measurement'],
          value: data['Unit of Measurement'],
        }
        let objUnit = {
          label: data['Package Size'],
          value: data['Package Size'],
        }
        arrProduct.push(objProduct)
        arrSize.push(objSize)
        arrUnit.push(objUnit)
      })

    if (isCalled !== true) {
      setProduct(arrProduct)
      setUnit(arrSize)
      setSize(arrUnit)
    }
  }

  const changePN = async e => {
    setPN(e)
    console.log(e, 'partnub')
    filters['Part Number'] = e
    algoliaApi()
  }

  useEffect(() => {
    console.log('TESTING', pn)
  }, [pn])

  const changeSize = async e => {
    setPS(e)
    filters['Package Size'] = e
    algoliaApi()
  }

  const changeUOM = async e => {
    setUOM(e)
    filters['Unit of Measurement'] = e
    algoliaApi()
  }

  const algoliaApi = async () => {
    let payload = []
    let res = Object.entries(filters)
    console.log(pn, uom, ps, 'aaaddd')

    await res.map(v => {
      payload.push(`${v[0]}:${v[1]}`)
    })

    await searchFilters(payload).then(res => {
      setSearchFilter(res)
    })
  }

  const resetFilter = e => {
    let data = holdSearch
    setSearchFilter(data)
    setFilterResult(data)

    console.log('products', product)
  }

  // const perfomeAlgoliaSearch = async (category, pageNumber = 0) => {
  //   try {
  //     // setLoading(true)
  //     const results = await fetchCategory(category, pageNumber)
  //     let serverResults = (results || { hits: [] }).hits
  //     serverResults.sort((a, b) =>
  //       a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0,
  //     )
  //     // if (pageNumber === 0) {
  //     //   produconsolectListing(results.nbHits, category)
  //     // }
  //     setProducts(serverResults)

  // setLoading(false)
  // } catch (e) {
  // setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   let payload = []
  //   if (selectedFilterList.length > 0) {
  //     for (const filteredItem of selectedFilterList) {
  //       payload.push(`${filteredItem.value}:true`)
  //     }

  //     filterItems(payload).then(results => {
  //       const serverResults = results.hits || []
  //       setProducts(serverResults)
  //       let count = searchFilter.filter(item => item.sku === '628946213607')
  //       setFilterCount(count.length)
  //     })
  //   } else {
  //     perfomeAlgoliaSearch('Category')
  //     setFilterCount(0)
  //   }
  // }, [selectedFilterList])
  return (
    <div className="search-filter">
      <div className="filter-search-heading">
        <Label>{searchHeading}</Label>
      </div>
      <div className="search-key">
        <Label>
          {searchKey} ({searchFilter.length})
        </Label>
      </div>
      <div className="filter-dropdown">
        <Dropdown
          onChange={e => changeSize(e)}
          items={size}
          className="first-drop"
          value={ps !== undefined ? ps : 'SIZE'}
        />
        <Dropdown
          items={product}
          value={pn}
          // setSelectFilterList={setSelectFilterList}
          onChange={e => changePN(e)}
          className="second-drop"
        />
        <Dropdown
          onChange={e => changeUOM(e)}
          value={uom !== undefined ? uom : 'UNIT / CASE'}
          items={unit}
          className="third-drop"
        />
        <button className="btn btn-primary" onClick={e => resetFilter(e)}>
          Reset Filter
        </button>
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
