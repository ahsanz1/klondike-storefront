import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import PropTypes from 'prop-types'
import Heading from 'components/atoms/heading'
import React from 'react'
import './styles.scss'

const mapContainerStyle = {
  height: '350px',
  width: '100%',
}

const MapLocation = ({
  apiKey,
  positionLat,
  positionLng,
  title,
  description,
}) => {
  return (
    <div className="map-location">
      <Heading className="map-location__heading">{title}</Heading>
      <div
        className="map-location__description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <LoadScript
        googleMapsApiKey={apiKey}
        // libraries={MAP_LIBS}
      >
        <GoogleMap
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={1}
          center={{ lat: Number(positionLat), lng: Number(positionLng) }}
        >
          <Marker
            // onLoad={onLoad}
            position={{ lat: Number(positionLat), lng: Number(positionLng) }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

MapLocation.propTypes = {
  apiKey: PropTypes.string,
  positionLat: PropTypes.string,
  positionLng: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default MapLocation
