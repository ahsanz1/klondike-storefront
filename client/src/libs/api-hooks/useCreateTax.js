/* eslint-disable indent */
import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { createTax } from 'libs/services/api/checkout'

const useCreateTax = () => {
  const { cartItems, shippingAddress, setPayNowSpinner } = useContext(
    AppContext,
  )
  const createTaxTo = async () => {
    console.log('useCreateTax')
    const createTaxPayload = {
      lineItems: [],
      type: 'SalesOrder',
      addresses: {
        shipTo: {
          street1: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          country: shippingAddress.country,
          zipCode: shippingAddress.zipCode,
        },
        shipFrom: {
          street1: '317 Adelaide St W',
          city: 'Toronto',
          state: 'Ontario',
          country: 'CA',
          zipCode: 'M5V 1P9',
        },
      },
    }
    createTaxPayload.lineItems = cartItems.map(cartItem => {
      const price =
        cartItem.discountPrice > 0
          ? cartItem.discountPrice
          : cartItem.salePrice > 0
          ? cartItem.salePrice
          : cartItem.price
      return {
        price: parseInt(price),
        quantity: cartItem.quantity,
        taxCode: 'FR02000',
        title: cartItem.title,
        sku: cartItem.sku,
        lineItemId: cartItem.lineItemId,
      }
    })
    let createTaxCall = await createTax(createTaxPayload)
    console.log({ createTaxCall })
    if (createTaxCall.error) {
      setPayNowSpinner(false)
      console.log(createTaxCall.message)
    } else {
      return createTaxCall
    }
  }
  return { createTaxTo }
}

export default useCreateTax
