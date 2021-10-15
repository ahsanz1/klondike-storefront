import React, { useState, useEffect } from 'react'
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
  const [abale, setAble] = useState(false)
  const [year, setYear] = useState([])
  const [series, setSeries] = useState([])
  const [family, setFamily] = useState([])
  const [manufacturer, setManufacturer] = useState([])
  const [manuquery, setManuQuery] = useState('')
  const [familyquery, setFamilyQuery] = useState('')
  const [seriesQuery, setSeriesQuery] = useState('')
  const [yearQuery, setYearQuery] = useState('')
  const getproducts = () => {
    const url = [
      `https://klondike-ws-canada.phoenix.earlweb.net/search?&q=${query}&manufacturer=${manuquery}&family=${familyquery}&series=${seriesQuery}&year=${yearQuery}&token=LiEoiv0tqygb`,
    ]
    axios.get(url).then(response => {
      let results = response.data.equipment_list
      console.log('res', results)
      setOtsdata(results)
      let yearsArray = [{ label: 'WITHIN YEAR RANGE' }]
      let seriesArray = [{ label: 'SERIES' }]
      let familyArray = [{ label: 'FAMILY' }]
      let manufacturerArray = [{ label: 'MANUFACTURER' }]
      response &&
        Object.entries(
          response &&
            response.data &&
            response.data.facets &&
            response.data.facets.year &&
            response.data.facets.year.buckets &&
            response.data.facets.year.buckets,
        ).map(year => {
          yearsArray && yearsArray.push({ label: year[0], value: year[0] })
        })
      setYear(yearsArray)
      Object.entries(
        response &&
          response.data &&
          response.data.facets &&
          response.data.facets.series &&
          response.data.facets.series.buckets &&
          response.data.facets.series.buckets,
      ).map(year => {
        seriesArray && seriesArray.push({ label: year[0], value: year[0] })
      })
      setSeries(seriesArray)
      Object.entries(
        response &&
          response.data &&
          response.data.facets &&
          response.data.facets.manufacturer &&
          response.data.facets.manufacturer.buckets &&
          response.data.facets.manufacturer.buckets,
      ).map(year => {
        manufacturerArray &&
          manufacturerArray.push({ label: year[0], value: year[0] })
      })
      setManufacturer(manufacturerArray)
      Object.entries(
        response &&
          response.data &&
          response.data.facets &&
          response.data.facets.family &&
          response.data.facets.family.buckets &&
          response.data.facets.family.buckets,
      ).map(year => {
        familyArray && familyArray.push({ label: year[0], value: year[0] })
      })
      setFamily(familyArray)
    })
  }
  const filterData = e => {
    setQuery(e.target.value)
  }
  const [bgImg, setBgimg] = useState(false)
  const searchQuery = () => {
    setBgimg(true)
    if (query) {
      getproducts()
      setAble(true)
    }
  }
  const manuFunc = value => {
    setManuQuery(value)
    getproducts()
  }
  const searchFamily = value => {
    console.log('family:', value)
    setFamilyQuery(value)
    getproducts()
  }
  const seriesFunc = value => {
    setSeriesQuery(value)
  }
  const yearFunc = value => {
    setYearQuery(value)
  }
  useEffect(() => {
    getproducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manuquery, familyquery, seriesQuery, yearQuery])

  return (
    <>
      <div className={`${bgImg ? 'bg-search' : 'img'}`}>
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

          {abale && otsdata && otsdata.equipment && (
            <div className="dropdown-wrapper">
              <Dropdown
                onChange={yearFunc}
                className="year_range"
                items={year}
              />
              <Dropdown
                onChange={seriesFunc}
                className="series "
                items={series}
              />
              <Dropdown
                className="family "
                items={family}
                onChange={searchFamily}
              />
              <Dropdown
                onChange={manuFunc}
                className="manufecturer "
                items={manufacturer}
              />
            </div>
          )}
          <div className="overflow">
            <div className="table-wrapper">
              {abale && otsdata && otsdata.equipment && (
                <div className="title flex">
                  <h3 className="custom-grid tiles">Category</h3>
                  <h3 className="custom-grid tiles">Manufacturer</h3>
                  <h3 className="custom-grid tiles">Model</h3>
                  <h3 className="custom-grid tiles">Year</h3>
                  <h3 className="custom-grid tiles">Fuel</h3>
                </div>
              )}
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
