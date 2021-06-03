import { updateShipTo } from 'libs/services/api/checkout'
import { getLocalCart } from 'libs/services/cart-service'
import { getItem } from 'libs/services/localStorage'

const useUpdateShipTo = () => {
  const updateShip = async payload => {
    const cartId = await getLocalCart()
    const cart = JSON.parse(getItem('CART'))
    console.log({ cart })
    const updateShippingPayload = cart.items.map(cartItem => ({
      itemId: cartItem.itemId,
      lineItemId: cartItem.lineItemId,
      shipToId: payload._id,
    }))
    let checkoutApiCall = await updateShipTo(cartId, updateShippingPayload)
    return checkoutApiCall
  }
  return { updateShip }
}

export default useUpdateShipTo
