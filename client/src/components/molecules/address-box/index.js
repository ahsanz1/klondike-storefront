import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/atoms/label'
const AddressBox = ({
  firstname,
  lastname,
  address1,
  address2,
  city,
  country,
  zipCode,
  phone,
  isDefault,
}) => {
  return (
    <>
      {isDefault && (
        <Label
          className="default-name"
          style={{
            fontWeight: 'bold',
          }}
        >
          Default
        </Label>
      )}
      <Label className="default-name">
        {firstname} {lastname}
      </Label>
      <Label className="default-name">{address1}</Label>
      <Label className="default-name">{address2}</Label>
      <Label className="default-name">
        {city} {zipCode}
      </Label>
      <Label className="default-name">{country}</Label>
      <Label className="default-name">{phone}</Label>
    </>
  )
}

const { string } = PropTypes.string
AddressBox.propTypes = {
  isDefault: PropTypes.bool,
  firstname: string,
  lastname: string,
  address1: string,
  address2: string,
  city: string,
  country: string,
  zipCode: string,
  phone: string,
}

export default AddressBox
