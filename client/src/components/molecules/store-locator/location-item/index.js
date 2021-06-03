/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'
import './styles.scss'
import { useWindowSize } from 'libs/custom-hooks'

const LocationItem = ({
  name,
  address,
  city,
  state,
  zip,
  index,
  distance,
  directions,
  onSelect,
  collapse,
  setActivecollapse,
}) => {
  const [width] = useWindowSize()

  return (
    <div
      className="location-item"
      onClick={() => {
        width > 768 && onSelect && onSelect(index)
        width < 768 && setActivecollapse(index)
      }}
    >
      <div className="location-item__content">
        <strong>{name}</strong>
        <div>
          <span>{address}</span>
        </div>
        <div>
          <span>{city}</span>
          <span className="location-item__ml">{state}</span>
          <span className="location-item__ml">{zip}</span>
        </div>
        {distance && (
          <div>
            <span>{distance}</span>
          </div>
        )}
        {directions && (
          <div>
            <Link className="location-item__link" to={directions}>
              Directions
            </Link>
          </div>
        )}
      </div>

      {width < 768 && (
        <button
          className={
            collapse === index
              ? 'location-item__mapBtn show '
              : 'location-item__mapBtn hide'
          }
          onClick={() => {
            onSelect(index, 1)
          }}
        >
          View Map
        </button>
      )}
    </div>
  )
}

LocationItem.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
  index: PropTypes.number,
  distance: PropTypes.string,
  directions: PropTypes.string,
  onSelect: PropTypes.func,
  collapse: PropTypes.number,
  setActivecollapse: PropTypes.func,
}

export default LocationItem
