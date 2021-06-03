// import { useContext } from 'react'
// import { AppContext } from 'libs/context'
// import { addToCart } from 'libs/services/api/cart'
// import { saveItem, getItem } from 'libs/services/localStorage'
// import { getLocalCart } from 'libs/services/cart-service'
// import { getProductBySKU } from 'libs/services/api/pdp.api'
// import useAddToLocalCart from 'libs/api-hooks/useAddToLocalCart'

// const useAddPayments = () => {
//   const { addProduct, showModal } = useContext(AppContext)
//   const { addToLocalCart } = useAddToLocalCart()
//   const addPaymentCall = async cartData => {
//     const localCartId = await getLocalCart()
//     const userAuthToken = await JSON.parse(getItem('x-sd-user'))
//     let getGroupFromSKU = await getProductBySKU(cartData.sku)
//     console.log(getGroupFromSKU.response.data.product)
//     const isPdp = cartData.hasOwnProperty('attributes')
//     const pricing = {
//       base: isPdp ? cartData.price.base : cartData['Base Price'],
//       sale: isPdp ? cartData.price.sale : cartData['Sale Price'],
//     }
//     const Data = {
//       price: {
//         base: pricing.base ? pricing.base : false,
//         sale: pricing.sale ? pricing.sale : false,
//         currency: 'USD',
//         discount: {
//           price: 0,
//         },
//       },
//       itemId: cartData.itemId,
//       quantity: isPdp ? cartData.quantity : 1,
//       size: cartData.size ? cartData.size : false,
//       sku: cartData.sku,
//       group: getGroupFromSKU.response.data.product.group,
//       extra: {},
//     }

//     const dataCartData = {
//       cartId: localCartId,
//       userAuthToken: userAuthToken ? userAuthToken.accessToken : null,
//       registeredUser: !!userAuthToken,
//       items: [Data],
//     }

//     let response = await addToCart(dataCartData)
//     if (response.error) {
//       console.log(response.message)
//       return response
//     }
//     saveItem('CART', JSON.stringify(response.data))
//     const addToCartAppCall = await addToLocalCart(
//       response.data,
//       getGroupFromSKU.response.data.product,
//     )
//     addProduct(addToCartAppCall, response.data)
//     showModal()

//     if (response && response.data) {
//       return response
//     }
//   }
//   return { addPaymentCall }
// }

// export default useAddPayments
