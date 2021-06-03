/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import Button from 'components/atoms/button'
import Label from 'components/atoms/label'
import LocationInput from 'components/molecules/store-locator/location-input'
import NativeDropdown from 'components/atoms/native-dropdown'
import { SEARCH_RADIUS, RADIUS_UNIT } from './constant'
import './styles.scss'

const StoreLocatorForm = ({
  onFilter,
  apiKey,
  userLocation,
  setUserLocation,
}) => {
  const [radius, setRadius] = useState('20')
  const [unit, setUnit] = useState('miles')

  const [collapse, setActivecollapse] = useState(0)

  useEffect(() => {
    if (userLocation) {
      findLocation()
    }
  }, [userLocation])

  const findLocation = () => {
    onFilter(
      {
        lat: Number(userLocation.cord.lat),
        lng: Number(userLocation.cord.lng),
      },
      radius,
      unit,
    )
  }

  return (
    <div className="store-locator-form">
      <LocationInput setUserLocation={setUserLocation} apiKey={apiKey} />

      <div className={collapse === 0 ? 'more-fileds hide' : 'more-fileds show'}>
        <Label className="input-label">{SEARCH_RADIUS.label}</Label>
        <NativeDropdown
          value={radius}
          className="store-locator-form__select"
          onChange={val => {
            setRadius(val)
          }}
          items={SEARCH_RADIUS.radiusOptions}
        />
        <Label className="input-label">{RADIUS_UNIT.label}</Label>
        <NativeDropdown
          value={unit}
          className="store-locator-form__select"
          onChange={val => {
            setUnit(val)
          }}
          items={RADIUS_UNIT.unit}
        />
      </div>

      <div className="store-locator-form__footer">
        <hr />
        <Row>
          <Col span={8} md={5}>
            <Button
              className="store-locator-form__search-btn"
              onClick={userLocation && findLocation}
            >
              Search
            </Button>
          </Col>

          <Col span={8} md={5}></Col>

          <Col span={8} md={5}>
            <div className="store-locator-form__toggle-btn">
              <button
                onClick={() => {
                  setActivecollapse(1)
                }}
                className={collapse === 1 ? 'see-more hide' : 'see-more show'}
              >
                More »
              </button>

              <button
                onClick={() => {
                  setActivecollapse(0)
                }}
                className={collapse === 0 ? 'see-more hide' : 'see-more show'}
              >
                Less «{' '}
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

StoreLocatorForm.propTypes = {
  onFilter: PropTypes.func,
  apiKey: PropTypes.string,
  userLocation: PropTypes.object,
  setUserLocation: PropTypes.func,
}

export default StoreLocatorForm
