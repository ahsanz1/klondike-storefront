import { useContext, useState } from 'react'
import { AppContext } from 'libs/context'
import { removeItemFromCart } from 'libs/services/api/cart'
import { getLocalCart } from 'libs/services/cart-service'

const useRemoveFromCart = () => {
  const { removeProductFromCart, setApiButtonCalled } = useContext(AppContext)
  const [error, setError] = useState(false)
  const removeFromCart = async lineItemId => {
    const localCartId = await getLocalCart()
    let response
    try {
      setApiButtonCalled(true)
      response = await removeItemFromCart(localCartId, lineItemId)
      if (!response) {
        console.log('Unable to update item')
        setApiButtonCalled(false)
        setError(true)
        return
      }
      if (!response.error) {
        removeProductFromCart(response.data, lineItemId)
        setApiButtonCalled(false)
        setError(false)
      } else {
        setError(true)
      }
    } catch (e) {
      console.log(e.message)
      console.log(e.response)
    }
  }
  return { removeFromCart, error }
}

export default useRemoveFromCart
