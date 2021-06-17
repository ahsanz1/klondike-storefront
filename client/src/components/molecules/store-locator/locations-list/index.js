import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import LocationItem from 'components/molecules/store-locator/location-item'
import { NO_RESULT } from './constant'
import './styles.scss'

const LocationsList = ({ locations, onLocationSelect }) => {
  const [collapse, setActivecollapse] = useState(-1)
  return (
    <div className="locations-list">
      {locations.length < 1 && (
        <div>
          <strong>{NO_RESULT.title}</strong>
          <Label>{NO_RESULT.description}</Label>
        </div>
      )}
      {locations.map(
        ({ name, address, city, state, zip, distance, directions }, index) => (
          <LocationItem
            key={index}
            address={address}
            name={name}
            city={city}
            state={state}
            zip={zip}
            onSelect={onLocationSelect}
            index={index}
            distance={distance}
            directions={directions}
            collapse={collapse}
            setActivecollapse={setActivecollapse}
          />
        ),
      )}
    </div>
  )
}

LocationsList.propTypes = {
  onLocationSelect: PropTypes.func,
  locations: PropTypes.arrayOf(PropTypes.object),
}

export default LocationsList
