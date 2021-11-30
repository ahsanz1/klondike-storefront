/* eslint-disable indent */
import {
  addToCart as gtmAddToCart,
  removeFromCart as gtmRemoveFromCart,
} from 'libs/utils/gtm'
import { saveItem, removeItem } from 'libs/services/localStorage/localStorage'

export const sumItems = cartItems => {
  let itemCount = 0
  let subTotal = 0
  try {
    itemCount =
      cartItems &&
      cartItems.reduce((total, product) => total + product.quantity, 0)
    subTotal =
      cartItems &&
      cartItems
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(2)
  } catch (e) {
    console.log(e)
  }
  return { itemCount, subTotal }
}

export const CartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const findSameItem = state.cartItems.findIndex(
        item =>
          item.itemId === action.payload.itemId &&
          item.priceListId === action.payload.priceListId,
      )

      if (findSameItem > -1) {
        const _item = state.cartItems[findSameItem]
        console.log({ _item })

        // Update price and quantity and total price of item
        _item.quantity = action.payload.quantity
        _item.totalPrice =
          _item.discountPrice > 0
            ? _item.discountPrice * _item.quantity
            : _item.salePrice
            ? _item.quantity * _item.salePrice
            : _item.quantity * _item.price

        // Replace item of new details with old details
        state.cartItems[findSameItem] = _item
      } else {
        state.cartItems.push(action.payload)
      }
      gtmAddToCart(action.payload)
      action.apiCart.items.forEach(citem => {
        let matchedItemIndex = state.cartItems.findIndex(
          mitem => mitem.itemId === citem.itemId,
        )

        if (matchedItemIndex > -1) {
          state.cartItems[matchedItemIndex].lineItemId = citem.lineItemId
          state.cartItems[matchedItemIndex].category = action.payload.category
        }
      })
      window.localStorage.setItem('CART_ITEMS', JSON.stringify(state.cartItems))
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      }
    case 'ADD_FORM':
      if (!state.myAccountForm.find(item => item.id === action.payload)) {
        state.cartItems.push({
          ...action.payload,
        })
      }
      return {
        myAccountForm: [...state.myAccountForm],
      }
    case 'SET_LOCAL_CART':
      saveItem('CART_ITEMS', JSON.stringify(action.payload))
      return {
        ...state,
        ...sumItems(action.payload),
        cartItems: [...action.payload],
      }
    case 'REMOVE_PRODUCT_FROM_CART':
      let currentItems = state.cartItems
      const itemToRemoveIndex = currentItems.findIndex(
        item => item.lineItemId === action.lineItemId,
      )

      if (itemToRemoveIndex > -1) {
        const itemToRemove = currentItems[itemToRemoveIndex]
        currentItems.splice(itemToRemoveIndex, 1)
        saveItem('CART_ITEMS', JSON.stringify(currentItems))

        if (currentItems.length === 0) {
          removeItem('CART')
          removeItem('CART_ITEMS')
        }
        action.payload.items.forEach(citem => {
          let matchedItemIndex = currentItems.findIndex(
            mitem => mitem.itemId === citem.itemId,
          )

          if (matchedItemIndex > -1) {
            currentItems[matchedItemIndex].lineItemId = citem.lineItemId
          }
        })
        // Remove checkout data so that new values must be calculated on checkout because changes are made on cart page
        removeItem('checkoutUserPersonalDetails')
        removeItem('checkoutShippingDetails')
        removeItem('selectedParcelInfo')
        saveItem('currentCheckoutFormName', 'personalDetails')
        console.log('itemToRemove', itemToRemove)
        gtmRemoveFromCart([itemToRemove])
      } else {
        console.log('Unable to remove item. Try again')
      }

      return {
        ...state,
        ...sumItems(currentItems),
        cartItems: [...currentItems],
      }

    case 'UPDATE_CART':
      const items = state.cartItems
      let itemToUpdateIndex = items.findIndex(
        item => item.itemId === action.payload.item.itemId,
      )

      if (itemToUpdateIndex > -1) {
        const _item = items[itemToUpdateIndex]
        _item.quantity = _item.quantity + action.payload.item.quantity
        _item.totalPrice = _item.salePrice
          ? _item.quantity * _item.salePrice
          : _item.quantity * _item.price
        items[itemToUpdateIndex] = _item

        saveItem('CART_ITEMS', JSON.stringify(items))
      } else {
        console.log('Unable to update cart item. Try again')
        return state
      }
      return {
        ...state,
        ...sumItems(items),
        cartItems: [...items],
      }
    case 'SET_CURRENT_USER':
      saveItem('x-sd-user', JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload,
      }

    case 'SET_PERSONAL_INFO':
      const info = {
        firstName: action.payload.firstName,
        middleName: action.payload.middleName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phone: action.payload.phone,
        creditLimit: action.payload.creditLimit,
      }
      saveItem('userPersonalInfo', JSON.stringify(info))
      return { ...state, personalInfo: info }

    case 'LOGOUT':
      removeItem('userPersonalInfo')
      removeItem('x-sd-user')
      return { ...state, personalInfo: {}, user: {} }

    case 'CLEAR_LOCAL_CART':
      return { ...state, cartItems: [], ...sumItems([]) }

    case 'SET_SHIPPING_ADDRESS':
      return { ...state, shippinggAddress: action.payload }

    default:
      return state
  }
}
