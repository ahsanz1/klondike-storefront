/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useStripe } from '@stripe/react-stripe-js'

// const useStripeHook = () => {
//   const stripe = useStripe()
//   const stripeApiCall = async () => {
//     const stripePayload = {
//       number: '4242424242424242',
//       cvc: '121',
//       exp_month: '02',
//       exp_year: '22',
//     }
//     stripe.setPublishableKey(
//       'pk_test_51IH7BXEKU8ssE5zm7TPEdytSsHfRdUF2nElH9ml4oTEFW3N5u3oTy7UfGOyCO4I9m6gbFekbTwVHjUaYjoae9KFe00B5STeu9i',
//     )
//     return stripe.createToken(stripePayload, (status, response) => {
//       console.log(status, response)
//     })
//   }
//   return { stripeApiCall }
// }

// export default useStripeHook

import React, { useMemo, useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from '@stripe/react-stripe-js'

// import useResponsiveFontSize from '../../useResponsiveFontSize'

const useResponsiveFontSize = () => {
  const getFontSize = () => (window.innerWidth < 450 ? '16px' : '18px')
  const [fontSize, setFontSize] = useState(getFontSize)

  useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize())
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return fontSize
}

const useOptions = () => {
  const fontSize = useResponsiveFontSize()
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize],
  )

  return options
}

export const CardForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    console.log('[PaymentMethod]', payload)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement
          options={options}
          onReady={() => {
            console.log('CardElement [ready]')
          }}
          onChange={event => {
            console.log('CardElement [change]', event)
          }}
          onBlur={() => {
            console.log('CardElement [blur]')
          }}
          onFocus={() => {
            console.log('CardElement [focus]')
          }}
        />
      </label>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  )
}

const StripeElement = () => {
  const stripePromise = loadStripe(
    'pk_test_51IH7BXEKU8ssE5zm7TPEdytSsHfRdUF2nElH9ml4oTEFW3N5u3oTy7UfGOyCO4I9m6gbFekbTwVHjUaYjoae9KFe00B5STeu9i',
  )
  return (
    <Elements stripe={stripePromise}>
      <CardForm />
    </Elements>
  )
}
export default StripeElement
