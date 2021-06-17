import { getItem } from 'libs/services/localStorage/localStorage'
import { getItemsBySkus } from '../api/item'

export const processCart = async (cartResponse, props) => {
  if (cartResponse.error) {
    console.log(cartResponse.message)

    return
  }

  const cartItems = cartResponse.data.items

  // 2. Get local copy of cart items from local storage
  let localCartItems = getItem('mItems')
  if (!localCartItems) {
    localCartItems = []
  } else {
    localCartItems = JSON.parse(localCartItems)
  }

  // Remove all the items from local copy which are not present in actual cart
  const cartItemIds = cartItems.map(item => item.itemId)
  localCartItems.filter(item => !cartItemIds.includes(item.itemId))

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
      mItem.price = item.price.base
      // Discount price
      mItem.discountPrice = item.price.discount.price

      // Update quantity
      mItem.quantity = item.quantity

      // Total price (price * quantity)
      mItem.totalPrice =
        mItem.discountPrice > 0
          ? mItem.discountPrice * mItem.quantity
          : mItem.salePrice > 0
            ? mItem.salePrice * mItem.quantity
            : mItem.price * mItem.quantity

      // Replace item in local cart items with new data
      localCartItems[requiredLocalItemIndex] = mItem
    }
  })

  /* 4 => Now, If there are missing items i.e not present in local copy of cart items,
        then fetch them and insert them.
     */
  if (missingItems.length > 0) {
    const getItemBySkusPayload = {
      skus: missingItems,
    }
    let missingItemsResponse = await getItemsBySkus(getItemBySkusPayload)

    if (missingItemsResponse.error) {
      // toast.error
      console.log(missingItemsResponse.message)
      // console.log(missingItemsResponse.message);
      return
    }

    missingItemsResponse.data.forEach(item => {
      // Find item in cart items and make a local cart copy object
      const requiredCartItemIndex = cartItems.findIndex(
        mItem => mItem.itemId === item.itemId,
      )
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

        // Find delivery type of item in attributes
        const deliveryType = item.attributes.find(
          attr => attr.name.toUpperCase() === 'delivery type'.toUpperCase(),
        )

        // If delivery type is parcel then extract length, width etc from item's attributes
        // If delivery type is available, use it, else use parcel as default
        // Note: length, width etc are only required for parcel type product
        let length, width, height, weight
        if (
          (deliveryType &&
            deliveryType.value.toUpperCase() === 'parcel'.toUpperCase()) ||
          !deliveryType
        ) {
          localItem.deliveryType = 'parcel'
          length = item.attributes.find(
            attr => attr.name.toUpperCase() === 'length'.toUpperCase(),
          )
          width = item.attributes.find(
            attr => attr.name.toUpperCase() === 'width'.toUpperCase(),
          )
          height = item.attributes.find(
            attr => attr.name.toUpperCase() === 'height'.toUpperCase(),
          )
          weight = item.attributes.find(
            attr => attr.name.toUpperCase() === 'weight'.toUpperCase(),
          )

          // If these attributes are not present, use default value as 1.
          // NOTE: weight is int, others are strings
          localItem.length = length ? length.value : '1'
          localItem.width = width ? width.value : '1'
          localItem.height = height ? height.value : '1'
          localItem.weight = weight ? weight.value : 1
        } else {
          localItem.deliveryType = 'delivery'
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

  // set cart response and local copies data in redux
  props.setCart(cartResponse.data)
  props.setLocalCart(localCartItems)
}
