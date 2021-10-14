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
  let [pn, setPN] = useState()
  let [uom, setUOM] = useState()
  let { searchFilter, setSearchFilter, searchKey } = useContext(AppContext)
  const [product, setProduct] = useState()
  const [unit, setUnit] = useState()
  const [size, setSize] = useState()
  // const [selectedFilterList, setSelectFilterList] = useState([])
  // const [products, setProducts] = useState([])
  // const [filterCount, setFilterCount] = useState(0)
  // const [loading, setLoading] = useState(false)

  // let productitem = []
  useEffect(() => {
    let newarr =
      searchFilter &&
      searchFilter.map(data => {
        // productitem.push(data.sku)
        return { value: data['Part Number'] }
      })
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

  const changePN = async e => {
    setPN(e)
    console.log(e, 'partnub')
    filters['Part Number'] = e
    algoliaApi()
  }

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

  // const perfomeAlgoliaSearch = async (category, pageNumber = 0) => {
  //   try {
  //     setLoading(true)
  //     const results = await fetchCategory(category, pageNumber)
  //     let serverResults = (results || { hits: [] }).hits
  //     serverResults.sort((a, b) =>
  //       a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0,
  //     )
  //     // if (pageNumber === 0) {
  //     //   productListing(results.nbHits, category)
  //     // }
  //     setProducts(serverResults)

  //     setLoading(false)
  //   } catch (e) {
  //     setLoading(false)
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
          value={ps !== undefined ? ps : 'Size'}
        />
        <Dropdown
          items={product}
          value={pn !== undefined ? pn : 'Part Number'}
          // setSelectFilterList={setSelectFilterList}
          onChange={e => changePN(e)}
          className="second-drop"
        />
        <Dropdown
          onChange={e => changeUOM(e)}
          value={uom !== undefined ? uom : 'Unit of Measurement'}
          items={unit}
          className="third-drop"
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
