import React, { useState } from 'react'
import './style.scss'
import axios from 'axios'

import Dropdown from 'components/atoms/dropdown'
import { tableOatsData } from './data'
import Button from 'components/atoms/button'
// import { object } from 'yup/lib/locale'

const Oats = () => {
  const { mainHeading } = tableOatsData

  const [otsdata, setOtsdata] = useState([])
  let [query, setQuery] = useState('')
  const [year, setYear] = useState()
  // console.log('year', year)
  const getproducts = () => {
    const url = [
      `https://klondike-ws-canada.phoenix.earlweb.net/search?&q=${query} & year=2020 &token=LiEoiv0tqygb`,
    ]
    axios.get(url).then(response => {
      let results = response.data.equipment_list
      setOtsdata(results)
      console.log('result', results)
      console.log('family', setYear(results.facets.year.buckets))
    })
  }
  const filterData = e => {
    setQuery(e.target.value)
  }
  const searchQuery = () => {
    if (query) {
      getproducts()
    }
  }
  const searchFamily = e => {
    if (year) {
      getproducts()
    }
  }
  // let droparray
  // setTimeout(() => {
  //   droparray = []
  //   for (const [key, value] of Object.entries(year)) {
  //     console.log(`my key:${key}, my value ${value}`)
  //     droparray.push({ label: key })
  //     console.log('push', droparray)
  //   }
  // }, 3000)

  // useEffect(() => {
  //   let droparray = []
  //   for (const [key, value] of Object.entries(year)) {
  //     console.log(`my key:${key}, my value ${value}`)
  //     droparray.push(key)
  //     console.log('push', droparray)
  //   }
  // }, [year])

  // let yeararray = [
  //   {
  //     label: 'year',
  //     value: year,
  //   },
  // ]
  // let first = Object.entries(yeararray)
  // console.log(first, 'first')
  return (
    <>
      <div className="img">
        <div className="oats">
          <h1 className="heading">{mainHeading}</h1>
          <div className="wrapper-oats">
            <input
              onChange={filterData}
              className="input_model"
              placeholder="Enter code  model"
              value={query}
            />
            <div className="wrapper-two">
              <Dropdown
                className="cars"
                items={[
                  { label: 'All' },
                  { label: 'Cars, SUVs & Pickups' },
                  { label: 'Light Trucks' },
                  { label: 'Trucks' },
                  { label: 'Agricultural' },
                  { label: 'Off-Highway' },
                  { label: 'Industrial' },
                ]}
              />

              <div className="search_bar">
                <Button className="btn-search" onClick={searchQuery}>
                  <img
                    src="/static/images/Frame.png"
                    alt="icon"
                    className="img-icon"
                  />
                </Button>
              </div>
            </div>
          </div>

          <div className="dropdown-wrapper">
            <Dropdown
              onChange={searchFamily}
              className="year_range"
              items={[
                { label: '2022' },
                { label: '2021' },
                { label: '2020' },
                { label: '2019' },
                { label: '2018' },
                { label: '2017' },
                { label: '2015' },
                { label: '2014' },
                { label: '2013' },
                { label: '2012' },
                { label: '2011' },
                { label: '2010' },
              ]}
            />
            <Dropdown
              onChange={searchQuery}
              className="series "
              items={[
                { label: 'Accord' },
                { label: 'CR-V' },
                { label: 'CR-Z' },
                { label: 'Civic' },
                { label: 'Clarity' },
                { label: 'Crosstour' },
                { label: 'Element' },
                { label: 'Fit' },
                { label: 'HR-V' },
                { label: 'Insight' },
                { label: 'Odyssey' },
                { label: 'Passport' },
              ]}
            />
            <Dropdown
              className="family "
              items={[
                { label: 'Family group' },
                { label: 'Cars, SUVs & Pickups' },
                { label: 'Agricultural' },
                { label: 'Trucks' },
                { label: 'Off-Highway' },
                { label: 'Industrial' },
              ]}
            />
            <Dropdown
              onChange={searchQuery}
              className="manufecturer "
              items={[
                { label: 'Manufacturer' },
                { label: 'AMMANN' },
                { label: 'DITCH WITCH' },
                { label: 'HONDA' },
                { label: 'STONE' },
                { label: 'WACKER NEUSON' },
              ]}
            />
          </div>
          <div className="overflow">
            <div className="table-wrapper">
              <div className="title flex">
                <h3 className="custom-grid">Category</h3>
                <h3 className="custom-grid">Manufacturer</h3>
                <h3 className="custom-grid">Model</h3>
                <h3 className="custom-grid">Year</h3>
                <h3 className="custom-grid">Fuel</h3>
              </div>
              {otsdata &&
                otsdata.equipment &&
                otsdata.equipment.map((data, i) => {
                  return (
                    <div className="table-content flex" key={i}>
                      <p className="custom-grid">{data && data.productgroup}</p>
                      <p className="custom-grid">{data && data.manufacturer}</p>
                      <p className="custom-grid">{data && data.model}</p>
                      <p className="custom-grid">{data && data.year}</p>
                      <p className="custom-grid">{data && data.alt_fueltype}</p>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Oats
