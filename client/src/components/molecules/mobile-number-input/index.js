/* eslint-disable jsx-a11y/no-onchange */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'

import './style.scss'

import MobileOutlined from '../../../../static/icons/mobile-phone.svg'
import DropDown from '../../../../static/icons/drop-down.svg'

import Image from 'components/atoms/image'
import InputMask from 'react-input-mask'
import CountriesData from 'libs/data/countryDialCodes.json'

const MobileNumberInput = () => {
  const [countryDialCode, setCountryDialCode] = useState('1')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('US')
  const [showDropDown, setShowDropDown] = useState(false)
  const getCountryData = data => {
    const findCountryName = CountriesData.findIndex(
      country => country.countryDialCode === data,
    )
    setCountryDialCode(CountriesData[findCountryName].countryDialCode)
    setCountryCode(CountriesData[findCountryName].countryCode)
  }
  return (
    <div className="mobile-input-box">
      <div className="remember-mobile-img-div">
        <Image
          src={MobileOutlined}
          alt="MobileOutlined"
          className="remember-mobile-img"
        />
      </div>
      <InputMask
        mask={`+${countryDialCode.replace(/9/g, '\\9')} 999 999 9999`} // `replace` to escape 9
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        alwaysShowMask={true}
        maskChar=" "
        type="tel"
        className="remember-me-input-field"
      />
      <label className="label-float">Mobile Phone Number</label>
      <div className="country-selector">
        <Image
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
          alt="flag"
          className="country-selector-flag"
          onClick={() => setShowDropDown(!showDropDown)}
        />
        <Image src={DropDown} alt="dropdown" className="remember-me-dropdown" />
        {showDropDown && (
          <select
            className="country-select-dropdown"
            onClick={e => getCountryData(e.target.value)}
          >
            {CountriesData.map((menuItem, i) => {
              return (
                <option
                  key={menuItem.countryDialCode}
                  value={menuItem.countryDialCode}
                >
                  {menuItem.countryName} (+{menuItem.countryDialCode})
                </option>
              )
            })}
          </select>
        )}
      </div>
    </div>
  )
}

export default MobileNumberInput
