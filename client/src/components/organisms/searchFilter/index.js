import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import SearchList from 'components/molecules/searchList'
import Dropdown from 'components/atoms/dropdown'
import './style.scss'
import { searchFilters, fetchItems } from 'libs/services/algolia'

const SearchFilter = ({ searchHeading }) => {
  const filters = {}
  let [ps, setPS] = useState()
  let [pn, setPN] = useState('Part Number')
  let [uom, setUOM] = useState()
  let {
    searchFilter,
    setSearchFilter,
    searchKey,
    getSearchParam,
    setGetSearchParam,
    setItemList,
  } = useContext(AppContext)
  const [product, setProduct] = useState()
  const [isCalled, setIsCalledState] = useState(false)
  const [holdSearch, setHoldSearchState] = useState('')
  const [unit, setUnit] = useState()
  const [size, setSize] = useState()

  useEffect(() => {
    console.log(
      'check search loc:',
      location.search.split('?')[1].slice(6, location.search.length),
    )
    const getSerachedValue = location.search
      .split('?')[1]
      .slice(6, location.search.length)
    setGetSearchParam(getSerachedValue)
    fetchItems(getSerachedValue, 500, 0, true)
      .then(list => {
        setItemList(list.hits)
        setSearchFilter(list.hits)
      })
      .catch(error => console.log('Search Error:', error))
  }, [])

  const removeDuplicateValues = (items = []) => {
    let newFilterValues = []
    if (items.length) {
      newFilterValues.push(items[0])
    }
    for (let i = 0; i < items.length; i++) {
      const filterFound = newFilterValues.find(
        newFilter => newFilter.value === items[i].value,
      )
      if (!filterFound) {
        /**
         * NOTE: Added extra check to prevent adding "Bulk:" to size array, this should be removed
         * once "Bulk:" has been changed to "Bulk" from PIM
         */
        if (items[i].value !== 'Bulk:') {
          newFilterValues.push(items[i])
        }
      }
    }
    return newFilterValues
  }

  useEffect(() => {
    const setFilters = async searchFilter => {
      let res = await setFilterResult(searchFilter)
      console.log('is called state', isCalled)

      if (res?.product.length > 0 && isCalled !== true) {
        // const { unit = [], size = [], product = [] } = res
        setSize(removeDuplicateValues(res?.unit))
        setProduct(removeDuplicateValues(res?.product))
        setUnit(removeDuplicateValues(res?.size))
        setHoldSearchState(searchFilter)
        setIsCalledState(true)
        console.log('ress', res)
      }
    }

    setFilters(searchFilter)
  }, [searchFilter])

  const setFilterResult = async searchFilters => {
    let arrProduct = []
    let arrSize = []
    let arrUnit = []
    let objProduct = {}
    let objSize = {}
    let objUnit = {}

    searchFilters &&
      searchFilters.map((data, index) => {
        if (data?.isVariant === false) {
          data['Part Number'] &&
            (objProduct = {
              label: data['Part Number'] ? data['Part Number'] : '',
              value: data['Part Number'] ? data['Part Number'] : '',
            })
          data['Unit of Measurement'] &&
            (objSize = {
              label: data['Unit of Measurement'],
              value: data['Unit of Measurement'],
            })
          data['Package Size'] &&
            (objUnit = {
              label: data['Package Size'],
              value: data['Package Size'],
            })

          arrProduct.push(objProduct)
          arrSize.push(objSize)
          arrUnit.push(objUnit)
        }
      })

    return {
      product: arrProduct,
      size: arrSize,
      unit: arrUnit,
    }
  }

  const changePN = async e => {
    setPN(e)
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

    console.log('payloadHereY', payload)
    await searchFilters(payload).then(res => {
      setSearchFilter(res)
    })
  }

  const resetFilter = e => {
    let data = holdSearch
    setSearchFilter(data)
    setFilterResult(data)
    setUOM('UNIT/CASE')
    setPN('PART NUMBER')
    setPS('SIZE')

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
          {searchKey || getSearchParam} ({searchFilter.length})
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
          value={uom !== undefined ? uom.toString() : 'UNIT / CASE'}
          items={unit}
          className="third-drop"
        />
        <button className="btn reset-button" onClick={e => resetFilter(e)}>
          Reset Filter
        </button>
      </div>
      <div className="products">
        <ul>
          {searchFilter && searchFilter.length > 0 ? (
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
            ))
          ) : (
            <p style={{ color: '#fff' }}>no item found</p>
          )}
        </ul>
      </div>
    </div>
  )
}
SearchFilter.propTypes = {
  searchHeading: PropTypes.string,
}
export default SearchFilter
