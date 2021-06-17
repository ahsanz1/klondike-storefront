/* eslint-disable no-self-assign */
/* eslint-disable indent */
import { getCartByCartId } from 'libs/services/api/cart'
import { getItem, removeItem } from 'libs/services/localStorage'
import { getItemsBySkus } from 'libs/services/api/item'

export const getLocalCart = async () => {
  const getCart = JSON.parse(getItem('CART'))
  const getLocalCartId =
    getCart && getCart.hasOwnProperty('_id') && getCart._id !== null
      ? getCart._id
      : null
  return getLocalCartId
}

export const fetchCart = async cartId => {
  removeItem('orderId')
  let cartResponse
  try {
    cartResponse = await getCartByCartId(cartId)
    if (cartResponse.error && cartResponse.data.code === 'CART_NOT_FOUND') {
      clearCart()
      console.log('CART_NOT_FOUND')
    } else if (cartResponse.error) {
      console.log(cartResponse.error)
    } else {
      const processCartResponse = await processCart(cartResponse)
      console.log({ processCartResponse })
      return { cartResponse, processCartResponse }
    }
  } catch (e) {
    console.log(e.message)
    console.log(e.response)
  }
}

export const processCart = async cartResponse => {
  if (cartResponse.error) {
    console.log(cartResponse.message)
    return
  }

  const cartItems = cartResponse.data.items

  // 2. Get local copy of cart items from local storage
  let localCartItems = getItem('CART_ITEMS')

  if (!localCartItems) {
    localCartItems = []
  } else {
    localCartItems = JSON.parse(localCartItems)
    console.log({ localCartItems })
  }

  // Remove all the items from local copy which are not present in actual cart
  const cartItemIds = cartItems.map(item => item.itemId)
  localCartItems.filter(item => cartItemIds.includes(item.itemId))
  // console.log(localCartItems, 'removed local copy')
  // console.log({ cartItemIds })
  // 3. Update quantity and price of local items and keep record of items not present in local copy of cart items
  const missingItems = []
  cartItems.forEach(item => {
    // Find item in local cart items and update quantity, price
    const requiredLocalItemIndex = localCartItems.findIndex(
      mItem => mItem.itemId === item.itemId,
    )
    // If item is not present, Add its sku in missing items array so that we can fetch is separately
    if (!(requiredLocalItemIndex > -1)) {
      missingItems.push(item.sku)
    } else {
      // Extract local cart item
      const mItem = localCartItems[requiredLocalItemIndex]

      // Update prices of product
      // Sale price
      mItem.salePrice = item.price.sale
      // Base price
      mItem.price =
        item.price.discount.discountAmount > 0
          ? item.price.discount.price
          : item.price.sale
          ? item.price.sale
          : item.price.base
      // Discount price
      mItem.discountPrice = item.price.discount.price

      // Update quantity
      mItem.quantity = item.quantity

      // Total price (price * quantity)
      mItem.totalPrice = mItem.totalPrice

      // Replace item in local cart items with new data
      localCartItems[requiredLocalItemIndex] = mItem
    }
  })

  /* 4 => Now, If there are missing items i.e not present in local copy of cart items,
      then fetch them and insert them.
   */
  // console.log({ missingItems })
  if (missingItems.length > 0) {
    const getItemBySkusPayload = {
      skus: missingItems,
    }
    let missingItemsResponse = await getItemsBySkus(getItemBySkusPayload)
    console.log(missingItemsResponse)
    if (missingItemsResponse.error) {
      console.log(missingItemsResponse.message)
      // console.log(missingItemsResponse.message);
      return
    }

    missingItemsResponse.data.forEach(item => {
      // Find item in cart items and make a local cart copy object
      const requiredCartItemIndex = cartItems.findIndex(
        mItem => mItem.itemId === item.itemId,
      )
      console.log(item, 'item')
      if (requiredCartItemIndex > -1) {
        const requiredCartItem = cartItems[requiredCartItemIndex]
        const localItem = {
          itemId: requiredCartItem.itemId,
          price: requiredCartItem.price.base,
          salePrice: requiredCartItem.price.sale,
          discountPrice: requiredCartItem.price.discount.price,
          image: item.images.length ? item.images[0] : '',
          quantity: requiredCartItem.quantity,
          lineItemId: requiredCartItem.lineItemId,
          title: requiredCartItem.title,
          length: '',
          width: '',
          height: '',
          weight: '',
        }

        // Total Price
        localItem.totalPrice =
          localItem.discountPrice > 0
            ? localItem.discountPrice * localItem.quantity
            : localItem.salePrice > 0
            ? localItem.salePrice * localItem.quantity
            : localItem.price * localItem.quantity

        // Add this item to local copy of cart items
        localCartItems.push(localItem)
      }
    })
  }

  return localCartItems
}

export const clearCart = () => {
  removeItem('CART')
  removeItem('CART_ITEMS')
}
