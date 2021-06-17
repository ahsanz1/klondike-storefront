import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { addToCart } from 'libs/services/api/cart'
import { saveItem, getItem } from 'libs/services/localStorage'
import { getLocalCart } from 'libs/services/cart-service'
import { getProductBySKU } from 'libs/services/api/pdp.api'
import useAddToLocalCart from 'libs/api-hooks/useAddToLocalCart'

const useAddToCart = () => {
  const { addProduct, showModal } = useContext(AppContext)
  const { addToLocalCart } = useAddToLocalCart()
  const addToCartApiCall = async cartData => {
    const localCartId = await getLocalCart()
    const userAuthToken = await JSON.parse(getItem('x-sd-user'))
    let getGroupFromSKU = await getProductBySKU(cartData.sku)
    getGroupFromSKU && console.log({ getGroupFromSKU })
    const isPdp = cartData.hasOwnProperty('price')
    const pricing = {
      base:
        isPdp && cartData.price
          ? cartData.price.base
          : cartData['Base Price'] ||
            (getGroupFromSKU.response.data.product.price &&
              getGroupFromSKU.response.data.product.price.base),
      sale: isPdp
        ? cartData.price.sale
        : cartData['Sale Price'] ||
          (getGroupFromSKU.response.data.product.price &&
            getGroupFromSKU.response.data.product.price.sale),
    }
    const Data = {
      price: {
        base: pricing.base ? pricing.base : false,
        sale: pricing.sale ? pricing.sale : false,
        currency: 'USD',
        discount: {
          price: 0,
        },
      },
      itemId: cartData.itemId,
      quantity: isPdp ? cartData.quantity : 1,
      size: cartData.size ? cartData.size : false,
      sku: cartData.sku,
      group: getGroupFromSKU.response.data.product.group,
      extra: {},
      ...(cartData.priceListId && { priceListId: +cartData.priceListId }),
    }

    const dataCartData = {
      cartId: localCartId,
      userAuthToken: userAuthToken ? userAuthToken.accessToken : null,
      registeredUser: !!userAuthToken,
      items: [Data],
    }
    console.log(dataCartData, 'datacartdata')

    let response = await addToCart(dataCartData)
    if (response.error) {
      console.log(response.message)
      return response
    }
    saveItem('CART', JSON.stringify(response.data))
    const addToCartAppCall = await addToLocalCart(
      response.data,
      cartData,
      cartData.size,
      cartData.size
        ? getGroupFromSKU.response.data.items
        : getGroupFromSKU.response.data.product,
      cartData.frequency && cartData.frequency,
      cartData.frequencyType && cartData.frequencyType,
      cartData.purchaseType,
    )
    addProduct(addToCartAppCall, response.data)
    showModal()

    if (response && response.data) {
      return response
    }
  }
  return { addToCartApiCall }
}

export default useAddToCart
