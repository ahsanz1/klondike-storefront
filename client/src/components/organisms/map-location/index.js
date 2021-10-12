import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import PropTypes from 'prop-types'
// import Heading from 'components/atoms/heading'
import React from 'react'
import './styles.scss'

const mapContainerStyle = {
  height: '350px',
  width: '100%',
}

const MapLocation = ({
  apiKey,
  locations,
  // positionLat,
  // positionLng,
  // // title,
  // description,
}) => {
  const maplocations = locations
  return (
    <div className="map-location">
      <>
        <div
          className="map-location__description"
          dangerouslySetInnerHTML={{ __html: maplocations[0].description }}
        />

        <div className="map">
          <LoadScript
            googleMapsApiKey={apiKey}
            // libraries={MAP_LIBS}
          >
            <div className="map-map">
              <GoogleMap
                id="marker-example"
                mapContainerStyle={mapContainerStyle}
                zoom={2.5}
                center={{
                  lat: Number(maplocations[0].positionLat),
                  lng: Number(maplocations[0].positionLng),
                }}
              >
                {maplocations.map((location, i) => {
                  const { positionLat, positionLng } = location
                  console.log('map mapp', positionLat)
                  return (
                    <Marker
                      key={i}
                      // onLoad={onLoad}
                      position={{
                        lat: Number(positionLat),
                        lng: Number(positionLng),
                      }}
                    />
                  )
                })}
              </GoogleMap>
            </div>
          </LoadScript>
        </div>
      </>
    </div>
  )
}

MapLocation.propTypes = {
  apiKey: PropTypes.string,
  locations: PropTypes.array,
  // positionLat: PropTypes.string,
  // positionLng: PropTypes.string,
  // // title: PropTypes.string,
  // description: PropTypes.string,
}

export default MapLocation
