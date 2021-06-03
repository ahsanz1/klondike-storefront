/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api'
import LocationItem from 'components/molecules/store-locator/location-item'
import './styles.scss'

const containerStyle = {
  height: '530px',
  border: '1px solid #ccc',
  borderRadius: '4px',
}

const ClusterMap = ({
  locations,
  selectedLocation,
  onLocationSelect,
  onInfoWindowClose,
}) => {
  const [map, setMap] = useState(null)
  const center = { lat: 38.625997496, lng: -90.187832582 }

  const onLoad = useCallback(map => {
    // const bounds = new window.google.maps.LatLngBounds()
    // map.fitBounds(bounds)
    map.panTo(center)
    setMap(map)
  }, [])

  useEffect(() => {
    if (selectedLocation) {
      if (map) {
        map.panTo({
          lat: Number(selectedLocation.lat),
          lng: Number(selectedLocation.lng),
        })
        // if (map.zoom > 7) map.setZoom(7)
        setMap(map)
      }
    }
  }, [selectedLocation])

  const onUnmount = map => {
    setMap(null)
  }
  const createKey = location => {
    return location.lat + location.lng
  }
  return (
    <div className="google-maps">
      <GoogleMap
        zoom={2}
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MarkerClusterer>
          {clusterer =>
            locations.map(
              ({ lat, lng, address, name, city, state, zip }, index) => (
                <Marker
                  key={createKey({ lat, lng })}
                  position={{ lat: Number(lat), lng: Number(lng) }}
                  clusterer={clusterer}
                  onClick={() => {
                    onLocationSelect(index, 1)
                  }}
                >
                  {selectedLocation.index === index && (
                    <InfoWindow
                      id={index}
                      key={index}
                      cluster={clusterer}
                      onCloseClick={() => {
                        onInfoWindowClose()
                      }}
                    >
                      <LocationItem
                        key={index}
                        address={address}
                        name={name}
                        city={city}
                        state={state}
                        zip={zip}
                        index={index}
                      />
                    </InfoWindow>
                  )}
                </Marker>
              ),
            )
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  )
}

ClusterMap.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
  selectedLocation: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  onLocationSelect: PropTypes.func,
  onInfoWindowClose: PropTypes.func,
}

export default ClusterMap
