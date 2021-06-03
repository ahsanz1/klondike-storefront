/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import { Autocomplete } from '@react-google-maps/api'
import axios from 'axios'
import { useGeoLocation } from 'libs/custom-hooks'
import InputTextField from 'components/atoms/input'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
import { FORMATTED_ADDRESS_URL, SEARCH_LOCATION_URL } from './constant'
import './styles.scss'

const LocationInput = ({ setUserLocation, apiKey }) => {
  const [geoLocation, updateLocation] = useGeoLocation()
  const [query, setQuery] = useState()
  const [autoComplete, setAutoComplete] = useState()

  useEffect(() => {
    if (geoLocation) {
      axios.get(FORMATTED_ADDRESS_URL(geoLocation, apiKey)).then(res => {
        const address = res.data.results[0].formatted_address
        setQuery(address)
        setUserLocation({
          cord: {
            lat: geoLocation.lat,
            lng: geoLocation.lng,
          },
          address,
        })
      })
    }
  }, [geoLocation])

  const onPlaceChanged = () => {
    const place = autoComplete.getPlace()
    if (place.geometry) {
      setQuery(place.formatted_address)
      setUserLocation({
        cord: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        address: place.formatted_address,
      })
    } else {
      axios.get(SEARCH_LOCATION_URL(place.name, apiKey)).then(res => {
        setUserLocation({
          cord: res.data.candidates[0].geometry.location,
          address: query,
        })
      })
    }
  }

  return (
    <div className="location-input">
      <Label className="input-label">Current Location</Label>
      <Row align="middle">
        <Col span={24} lg={19}>
          <div className="location-input__input-wrapper">
            <Autocomplete
              onLoad={autocomplete => {
                setAutoComplete(autocomplete)
              }}
              onPlaceChanged={onPlaceChanged}
            >
              <InputTextField
                value={query}
                placeholder="Enter a location"
                onChange={({ value }) => {
                  setQuery(value)
                }}
                className="location-input__input"
              />
            </Autocomplete>
          </div>
          <Button
            className="location-input__find-icon"
            onClick={() => {
              updateLocation()
            }}
          >
            <img
              src="//cdn.shopify.com/s/files/1/1682/9837/t/98/assets/sca.location-find-location.png?v=5188621365772541388"
              alt=""
            />
          </Button>
        </Col>
        <Col span={24} md={5}>
          <Button
            className="location-input__find-btn"
            onClick={() => {
              updateLocation()
            }}
          >
            FIND MY LOCATION
          </Button>
        </Col>
      </Row>
    </div>
  )
}

LocationInput.propTypes = {
  setUserLocation: PropTypes.func,
  apiKey: PropTypes.string,
}

export default LocationInput
