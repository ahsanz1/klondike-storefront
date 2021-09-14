import React, { useState } from 'react'
import './style.scss'
import axios from 'axios'

import Dropdown from 'components/atoms/dropdown'
import { tableOatsData } from './data'
import Button from 'components/atoms/button'

const Oats = () => {
  const { mainHeading, listItem } = tableOatsData

  const [otsdata, setOtsdata] = useState([])
  const [query, setQuery] = useState('')

  const getproducts = () => {
    const url = [
      `https://klondike-ws-canada.phoenix.earlweb.net/search?q=${query}&token=LiEoiv0tqygb`,
    ]
    axios.get(url).then(response => {
      let results = response.data.equipment_list
      setOtsdata(results)
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

  return (
    <>
      <div className="img">
        <div className="oats">
          <h1 className="heading">{mainHeading}</h1>
          <div className="wrapper">
            <input
              onChange={filterData}
              className="input_model"
              placeholder="Enter code  model"
              value={query}
            />
            <div className="wrapper-two">
              <Dropdown className="cars" items={listItem} />

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
            <Dropdown className="year_range" />
            <Dropdown className="series " />
            <Dropdown className="family " />
            <Dropdown className="manufecturer " />
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
                  const {
                    productgroup,
                    manufacturer,
                    model,
                    year,
                    fueltype,
                  } = data

                  return (
                    <div className="table-content flex" key={i}>
                      <p className="custom-grid">{productgroup}</p>
                      <p className="custom-grid">{manufacturer}</p>
                      <p className="custom-grid">{model}</p>
                      <p className="custom-grid">{year}</p>
                      <p className="custom-grid">{fueltype}</p>
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
