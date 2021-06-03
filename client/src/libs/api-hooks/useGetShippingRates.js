import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { getShippingRates } from 'libs/services/api/checkout'

const useGetShippingRates = () => {
  const { subTotal, setShippingRates } = useContext(AppContext)
  const getShippingRatesCall = async () => {
    const getShippingRatesApi = await getShippingRates()
    const getShippingRatesForCart = getShippingRatesApi
      .map(apiShippingRate => {
        if (
          subTotal >= apiShippingRate.min_cart_value &&
          subTotal <= apiShippingRate.max_cart_value
        ) {
          return {
            price: apiShippingRate.flat_rate,
            method: apiShippingRate.method_type,
          }
        }
      })
      .filter(items => {
        // eslint-disable-next-line no-extra-boolean-cast
        return !!items ? items : null
      })
    setShippingRates(getShippingRatesForCart)
  }
  return { getShippingRatesCall }
}

export default useGetShippingRates
