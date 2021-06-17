import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { LoadScript } from '@react-google-maps/api'
import Heading from 'components/atoms/heading'
import LocationsList from 'components/molecules/store-locator/locations-list'
import ClusterMap from 'components/molecules/store-locator/cluster-map'
import StoreLocatorForm from 'components/molecules/store-locator/store-locator-form'
import { getDistance } from 'libs/utils/helper'
import { MAP_LIBS, METER_TO_UNIT, DIRECTION_URL } from './constant'
import './styles.scss'
import { useWindowSize } from 'libs/custom-hooks'

const StoreLocator = ({ apiKey, locations }) => {
  const [filteredLocations, setFilteredLocations] = useState(locations)
  // const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(-1)
  const [userLocation, setUserLocation] = useState()
  const [activeTab, setactiveTab] = useState(0)
  const [width] = useWindowSize()

  // useEffect(() => {
  //   fetch(
  //     'https://cdn.secomapp.com/storelocator/assets/cdn/allshops/data/smart-energy-bar/1612449239.json?formattedAddress=&boundsNorthEast=&boundsSouthWest=',
  //   )
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         setLocations(result)
  //         setFilteredLocations(result)
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       error => {
  //         console.log(error)
  //       },
  //     )
  // }, [])

  const onLocationSelect = (index, tab) => {
    console.log('tab', tab)
    setactiveTab(tab)
    setSelectedLocation({ ...filteredLocations[index], index })
  }

  const onInfoWindowClose = () => {
    setSelectedLocation({ ...selectedLocation, index: -1 })
  }
  const onFilter = (p1, radius, unit) => {
    let temp = []
    const divider = METER_TO_UNIT[unit]

    locations.forEach(location => {
      const rad = parseInt(radius)
      const { lat, lng } = location
      const p2 = { lat: Number(lat), lng: Number(lng) }
      const distanceBetween = getDistance(p1, p2) / divider

      if (rad === -1 || distanceBetween < rad) {
        temp.push({
          ...location,
          distance: distanceBetween.toFixed(2) + ' ' + unit,
          directions: DIRECTION_URL(
            userLocation.address,
            location.address,
            location.city,
            location.state,
            location.zip,
          ),
        })
      }
      setFilteredLocations([...temp])
    })
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={MAP_LIBS}>
      <div className="store-locator">
        <Heading className="store-locator__heading">STORE LOCATOR</Heading>
        <StoreLocatorForm
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          apiKey={apiKey}
          onFilter={onFilter}
        />
        <div className="store-locator__tabs">
          <ul className="tabList">
            <li
              className={activeTab === 0 ? 'active' : ''}
              onClick={() => {
                setactiveTab(0)
              }}
              aria-hidden="true"
            >
              List
            </li>

            <li
              className={activeTab === 1 ? 'active' : ''}
              onClick={() => {
                setactiveTab(1)
              }}
              aria-hidden="true"
            >
              Map
            </li>
          </ul>

          <div className="store-locator__body store-locator__locations-map">
            {(width > 768 || activeTab === 0) && (
              <LocationsList
                locations={filteredLocations}
                onLocationSelect={onLocationSelect}
              />
            )}
            {(width > 768 || activeTab === 1) && (
              <ClusterMap
                onInfoWindowClose={onInfoWindowClose}
                locations={filteredLocations}
                selectedLocation={selectedLocation}
                onLocationSelect={onLocationSelect}
              />
            )}
          </div>
        </div>
      </div>
    </LoadScript>
  )
}

StoreLocator.propTypes = {
  apiKey: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.object),
}

export default StoreLocator
