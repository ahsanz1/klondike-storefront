import React, { useContext, useEffect } from 'react'
import './style.scss'
import CheckoutPageData from 'components/organisms/checkout-page/data'

import { AppContext } from 'libs/context'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
import ContactOrderInfoBox from 'components/molecules/checkout/checkout-header-info-box'
// import useGetShippingRates from 'libs/api-hooks/useGetShippingRates'

const ShippingAddressForm = () => {
  const {
    checked,
    handleCheckedChange,
    setShippingServicePrice,
    goToNextStep,
    goToPreviousStep,
    setShippingServiceName,
    shippingRates,
    setEnableSecondStep,
  } = useContext(AppContext)
  // const { getShippingRatesCall } = useGetShippingRates()
  useEffect(() => {
    // const fetchData = async () => {
    //   let fetched = await getShippingRatesCall()
    //   console.log({ fetched })
    // }
    window.scrollTo(0, 0)
    console.log(shippingRates, 'shippingRates')
    setShippingServiceName(CheckoutPageData[0].serviceName)
    setShippingServicePrice(CheckoutPageData[0].price)
    setEnableSecondStep(true)
    // fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setShippingServicePrice, setShippingServiceName])
  return (
    <div className="shipping-method">
      <ContactOrderInfoBox />
      <div className="shipping-method-form">
        <Label className="shipping-method-p">Shipping cost</Label>
        <div className="shipping-method-form-fields">
          {CheckoutPageData.map((single, id) => {
            const { serviceName, deliveryDays, price, method } = single
            return (
              <div className="shipping-method-form-fields-field" key={id}>
                <input
                  type="radio"
                  name={method}
                  onChange={e => {
                    handleCheckedChange(e, id, serviceName)
                  }}
                  checked={checked === id}
                  value={price}
                />
                <div
                  className="shipping-method-service-info"
                  onChange={e => {
                    handleCheckedChange(e, id, serviceName)
                  }}
                >
                  <Label className="shipping-method-service-name">
                    {serviceName}
                  </Label>
                  <Label className="shipping-method-service-days">
                    {deliveryDays}
                  </Label>
                </div>
                <div className="shipping-method-service-price">{price}</div>
              </div>
            )
          })}
        </div>
        <div className="shipping-form-footer">
          <Button
            onClick={goToPreviousStep}
            className="shipping-form-footer-link-button"
          >
            Return to information
          </Button>
          <Button className="continue-to" onClick={goToNextStep}>
            Continue to payment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShippingAddressForm
