import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'

import ImageOnlyButton from 'components/atoms/image-only-button'

const CustomizeTheBox = ({ customCaseS, onChange }) => {
  const [userSize, setUserSize] = useState()
  const [customCase, setCustomCase] = useState(customCaseS.flavors)

  useEffect(() => {
    let t = 0
    if (customCaseS) {
      customCaseS.flavors.forEach(falvor => {
        t = falvor.quantity + t
      })
      setUserSize(t)
    }
  }, [customCaseS])

  useEffect(() => {
    let t = 0
    if (customCase) {
      customCase.forEach(flavor => {
        t = t + parseInt(flavor.quantity)
      })
      setUserSize(t)
    }
  }, [customCase])

  useEffect(() => {
    onChange(userSize === customCaseS.total, customCase)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSize, customCase])

  return (
    <div className="custom-case">
      <Label className="custom-case__title">CHOOSE YOUR FLAVORS</Label>
      <div className="custom-case__wrapper">
        <div className="custom-case__header">
          <div>{customCaseS.title}</div>
          <div
            style={{
              color: userSize !== customCaseS.total ? 'red' : '#1db638',
            }}
          >
            {userSize}/{customCaseS.total}
          </div>
        </div>
        <div className="custom-case__list">
          {customCase.map((box, index) => (
            <div key={index} className="custom-case__list-item">
              <div>{box.flavor.toLowerCase()}</div>
              <div className="custom-case__quantity-section">
                <div className="customizer-quantity-wrap">
                  <input
                    // type="number"
                    className="quantity"
                    value={box.quantity}
                  />
                  <span> Box</span>
                </div>
                <ImageOnlyButton
                  imgSrc="/static/icons/pdp-item-decrease.svg"
                  imgAlt="alt"
                  className="quantity-button qty-sub allow-zero no-highlight"
                  cssId="decrease-qty"
                  onClick={() => {
                    let temp = [...customCase]
                    if (parseInt(temp[index].quantity) !== 0) {
                      temp[index].quantity = parseInt(temp[index].quantity) - 1
                      setCustomCase([...temp])
                    }
                  }}
                />
                <ImageOnlyButton
                  imgSrc="/static/icons/pdp-item-increase.svg"
                  imgAlt="alt"
                  className="quantity-button qty-add increase-qty qty-sub allow-zero no-highlight"
                  onClick={() => {
                    let temp = [...customCase]
                    temp[index].quantity = parseInt(temp[index].quantity) + 1
                    setCustomCase([...temp])
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {userSize !== customCaseS.total && (
          <Label
            style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#c0392b',
              marginTop: '30px',
            }}
          >
            * Total quantity should be exactly {customCaseS.total}
          </Label>
        )}
      </div>
    </div>
  )
}

CustomizeTheBox.propTypes = {
  customCaseS: PropTypes.object,
  onChange: PropTypes.func,
}

export default CustomizeTheBox
