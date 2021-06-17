import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { updateCartApi } from 'libs/services/api/cart'
import { getItem } from 'libs/services/localStorage'
import { getLocalCart } from 'libs/services/cart-service'

const useAddToCart = () => {
  const { updateCart } = useContext(AppContext)
  const updateCartApiCall = async (itemId, quantity) => {
    const cartItems = await JSON.parse(getItem('CART_ITEMS'))
    const localCartId = await getLocalCart()
    let matchedItemIndex = cartItems.findIndex(item => item.itemId === itemId)

    let updateCartItemPayload

    if (matchedItemIndex > -1) {
      const item = cartItems[matchedItemIndex]
      console.log({ item })
      if (item.quantity + quantity < 1) {
        console.log('Minimum quantity can be 1 only')
      }
      updateCartItemPayload = {
        items: [
          {
            lineItemId: item.lineItemId,
            itemId: item.itemId,
            sku: item.sku || '',
            quantity: quantity + item.quantity,
            price: {
              currency: 'USD',
              sale: item.salePrice,
              base: item.price,
              discount: { price: item.discountPrice },
            },
          },
        ],
      }
    } else {
      console.log('Unable to find matching item in cart')
      return {
        error: true,
        data: null,
        message: 'Unable to update product. Try again',
        code: '',
      }
    }

    let updatedCart = await updateCartApi(localCartId, updateCartItemPayload)
    if (updatedCart.error) {
      // toast.error('Unable to update product. Try again')
      console.log('Unable to update matching item in cart')
      return {
        error: true,
        data: null,
        message: 'Unable to update product. Try again',
        code: '',
      }
    }
    const item = {
      itemId: itemId,
      quantity: quantity,
    }
    updateCart(item, updatedCart.data)
  }
  return { updateCartApiCall }
}

export default useAddToCart
