import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'libs/context'
import { fetchItems } from 'libs/services/algolia'
const SearchFilter = props => {
  const [filter, setFilter] = useState([])
  const { searchFilter } = useContext(AppContext)
  console.log('check filter array:', searchFilter)
  useEffect(() => {
    const list = fetchItems(searchFilter)
    console.log('array check:', props)
    setFilter(list.hits)
  }, [])
  console.log('filter array:', filter)
  return <div></div>
}
export default SearchFilter
