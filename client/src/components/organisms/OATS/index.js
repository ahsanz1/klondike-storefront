/* eslint-disable indent */
import React, { useState, useEffect } from 'react'
import './style.scss'
import axios from 'axios'
import Dropdown from 'components/atoms/dropdown'
import { tableOatsData } from './data'
import Button from 'components/atoms/button'
import Label from 'components/atoms/label'
import { navigate } from '@reach/router'
// import { object } from 'yup/lib/locale'
const Oats = () => {
  const { mainHeading } = tableOatsData
  const [otsdata, setOtsdata] = useState({})
  const [mu, setMu] = useState()
  const [fa, setFa] = useState()
  const [fg, setFg] = useState(null)
  const [se, setSe] = useState()
  const [ya, setYa] = useState()
  let [query, setQuery] = useState('')
  const [focus] = useState(true)

  // eslint-disable-next-line no-unused-vars
  const [abale, setAble] = useState(false)
  const [year, setYear] = useState([])
  const [series, setSeries] = useState([])
  const [family, setFamily] = useState([])
  const [manufacturer, setManufacturer] = useState([])
  const [manuquery, setManuQuery] = useState('')
  const [familygroupquery, setfamilygroupquery] = useState([])
  const [familygroups, setfamilygroup] = useState('')

  const [familyquery, setFamilyQuery] = useState('')
  const [seriesQuery, setSeriesQuery] = useState('')
  const [yearQuery, setYearQuery] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [yousearch, setYousearch] = useState('')
  const [reset, setReset] = useState(false)
  useEffect(() => {
    const tstName = location.search.split('?')[1]
    console.log('bbbb', tstName)
    tstName !== 'undefined' && setYousearch(tstName)
  }, [])

  // console.log('search', yousearch)

  const [test, setTest] = useState(false)
  const getproducts = () => {
    setYousearch(query)
    const url = [
      `https://klondike-ws-canada.phoenix.earlweb.net/search?&q=${query ||
        yousearch}&familygroup=${familygroups}&manufacturer=${manuquery}&family=${familyquery}&series=${seriesQuery}&year=${yearQuery}&token=LiEoiv0tqygb`,
    ]
    console.log('urlss', url)
    setOtsdata([])

    axios.get(url).then(response => {
      if (response.data.equipment_list.equipment.length > 0) {
        setTest(false)
      } else {
        setTest(true)
      }
      let results = response.data.equipment_list
      console.log('res', results)

      // if (response.data.equipment_list.equipment.length <= 0) {
      //   setNotFound(true)
      // }
      setOtsdata(results)
      setReset(true)
      let yearsArray = [{ label: ' ' }]
      let seriesArray = [{ label: ' ' }]
      let familyArray = [{ label: ' ' }]
      let manufacturerArray = [{ label: ' ' }]
      let arrayFamily = [{ label: '' }, { label: 'All', value: '' }]

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
      console.log('innnn', yearsArray)
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
      response &&
        Object.entries(
          response &&
            response.data &&
            response.data.facets &&
            response.data.facets.familygroup &&
            response.data.facets.familygroup.buckets,
        ).map((year, i) => {
          arrayFamily && arrayFamily.push({ label: year[0], value: year[0] })
          if (
            Object.entries(
              response &&
                response.data &&
                response.data.facets &&
                response.data.facets.familygroup &&
                response.data.facets.familygroup.buckets,
            ).length -
              1 ===
            i
          ) {
            console.log('arrayfamily', arrayFamily)

            setfamilygroupquery([...arrayFamily])
          }
        })
      // console.log('arrayfamily' , arrayFamily)
    })
  }
  console.log('manufacturer', manufacturer)
  const filterData = e => {
    setTest('')
    setQuery(e.target.value)
    setNotFound(false)
  }
  // eslint-disable-next-line no-unused-vars
  const [bgImg, setBgimg] = useState(false)

  const searchQuery = () => {
    console.log('queryqueryqueryquery', query.length)
    // query.length <= 0 && setNotFound(true)
    // query.length <=0 && setNotFound(true)
    setBgimg(true)
    if (query) {
      navigate(`${location.pathname}?${query}`)
      getproducts()
      setAble(true)
      setYa()
      setYearQuery('')
      setSe()
      setSeriesQuery('')
      setMu()
      setManuQuery('')
      setFa()
      setFamilyQuery('')
    }
    query.length <= 0 && setNotFound(true)
  }
  const manuFunc = value => {
    setOtsdata([])
    // getproducts()
    setMu(value)
    setManuQuery(value)
  }

  // console.log('otsdata::', otsdata)
  const searchFamily = value => {
    console.log('family:', value)
    setFamilyQuery(value)
    setFa(value)
    // getproducts()
  }
  const seriesFunc = value => {
    setSeriesQuery(value)
    setSe(value)
  }
  const yearFunc = value => {
    setYearQuery(value)
    setYa(value)
  }
  const familygroup = value => {
    if (value === 1) {
      setfamilygroup('')
      setFg(value)
    } else {
      let encodeValue = encodeURI(value).replace('&', '%26')
      console.log('value', encodeValue)
      setfamilygroup(encodeValue)
      setFg(value)
    }
  }
  const handleKeyPress = event => {
    console.log('event ', event)
    if (event.key === 'Enter') {
      query.length <= 0 && setNotFound(true)
      searchQuery()
    }
  }
  useEffect(() => {
    console.log('manuquery', manuquery)
    getproducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manuquery, familyquery, seriesQuery, yearQuery, yousearch])
  const resetFunction = () => {
    setOtsdata([])
    setReset(true)
    setYearQuery('')
    setYa()
    setSeriesQuery('')
    setSe()
    setManuQuery('')
    setMu()
    setFamilyQuery('')
    setFa()
    setQuery('')
    // setfamilygroupquery([])
    setFg(null)
    setYousearch('')
    console.log('empty', otsdata)
  }
  return (
    <>
      <div
        className={`${
          (otsdata?.equipment || [])?.length || !reset || yousearch
            ? 'bg-search'
            : 'img'
        }`}
      >
        <div className="oats">
          <h1 className="heading">{mainHeading}</h1>
          <div className="wrapper-oats">
            <input
              onChange={filterData}
              className="input_model"
              placeholder="ENTER CODE &amp; MODEL"
              value={query}
              onKeyPress={handleKeyPress}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={focus}
            />
            {console.log('familygroupquery', familygroupquery)}
            <div className="wrapper-two">
              <Dropdown
                value={fg !== null ? fg : 'All'}
                onChange={familygroup}
                className="cars"
                items={familygroupquery}
              />
              <div className="search_bar">
                <Button className="btn-search" onClick={searchQuery}>
                  <img
                    src="/static/images/Frame.png"
                    alt="icon"
                    className="img-icon"
                  />
                </Button>

                <Button className="reset-button" onClick={resetFunction}>
                  Reset
                </Button>
              </div>
            </div>
          </div>
          {console.log('otsdata', otsdata, yousearch)}
          {otsdata && otsdata.equipment && yousearch && (
            <div className="dropdown-wrapper">
              <Dropdown
                onChange={yearFunc}
                className="year_range"
                items={year}
                value={ya !== undefined ? ya : ' WITHIN YEAR RANGE'}
              />
              <Dropdown
                onChange={seriesFunc}
                className="series "
                items={series}
                value={se !== undefined ? se : ' SERIES'}
              />
              <Dropdown
                className="family "
                items={family}
                onChange={searchFamily}
                value={fa !== undefined ? fa : ' FAMILY'}
              />
              <Dropdown
                onChange={e => manuFunc(e)}
                className="manufecturer "
                items={manufacturer}
                value={mu !== undefined ? mu : ' MANUFACTURER'}
              />
            </div>
          )}
          <div className="overflow">
            <div className="table-wrapper">
              {otsdata && otsdata.equipment && otsdata.equipment.length > 0 && (
                <div className="title flex">
                  <h3 className="custom-grid tiles">Category</h3>
                  <h3 className="custom-grid tiles">Manufacturer</h3>
                  <h3 className="custom-grid tiles">Model</h3>
                  <h3 className="custom-grid tiles">Year</h3>
                  <h3 className="custom-grid tiles">Fuel</h3>
                </div>
              )}
              {otsdata && otsdata.equipment && otsdata.equipment.length > 0
                ? otsdata.equipment.map((data, i) => {
                    console.log('dataHere', otsdata)
                    return (
                      <div className="table-content flex" key={i}>
                        <p className="custom-grid">
                          {data && data.productgroup}
                        </p>
                        <p className="custom-grid">
                          {data && data.manufacturer}
                        </p>
                        <p className="custom-grid">{data && data.model}</p>
                        {(data && data.yearfrom === data.yearto) ||
                        !data.yearto ? (
                          <>
                            <p className="custom-grid">{data.yearfrom}</p>
                          </>
                        ) : (
                          <>
                            <p className="custom-grid">
                              {data.yearfrom} - {data.yearto}
                            </p>
                          </>
                        )}
                        <p className="custom-grid">
                          {data && data.alt_fueltype}
                        </p>
                      </div>
                    )
                  })
                : ''}
              {notFound && (
                <Label className="not-found">
                  Sorry, no results matched your search!
                </Label>
              )}

              {test && query && yousearch !== '' && (
                <Label className="not-found-second">
                  Sorry, no results matched your search!
                </Label>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Oats
