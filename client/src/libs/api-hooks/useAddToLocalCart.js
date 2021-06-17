/* eslint-disable indent */

const useAddToLocalCart = () => {
  const addToLocalCart = async (
    apiCallCartData,
    plpData,
    size,
    algoliaCartData,
    frequency,
    frequencyType,
    purchaseType,
  ) => {
    const isPdp = algoliaCartData.hasOwnProperty('attributes')
    const pricing = {
      base: isPdp ? algoliaCartData.price.base : algoliaCartData['Base Price'],
      sale: isPdp ? algoliaCartData.price.sale : algoliaCartData['Sale Price'],
    }
    const requiredCartItem = apiCallCartData.items.find(
      cartItem => cartItem.itemId === algoliaCartData.itemId,
    )

    // const requiredSizeCloth = apiCallCartData.items.filter(
    //   cartItem => cartItem.itemId === algoliaCartData.map(item => item.itemId),
    // )
    const requiredSizeCloth =
      size &&
      algoliaCartData.find(o1 =>
        apiCallCartData.items.some(o2 => o1.itemId === o2.itemId),
      )
    const requiredClothItem =
      size &&
      apiCallCartData.items.find(o1 =>
        algoliaCartData.some(o2 => o1.itemId === o2.itemId),
      )
    let localCartData = {}
    if (requiredCartItem) {
      localCartData = {
        // subscription: !!(purchaseType && purchaseType === 1),
        subscription: (frequency && frequencyType) || purchaseType === 1,
        mainImage: isPdp
          ? algoliaCartData.images[0].source[0].url
          : algoliaCartData.images[0].source[0].url,
        title:
          (frequency && frequencyType) || purchaseType === 1
            ? `${requiredCartItem.title} (Subscription)`
            : requiredCartItem.title,
        price:
          requiredCartItem.price.discount.discountAmount > 0
            ? requiredCartItem.price.discount.price
            : requiredCartItem.price.sale
            ? requiredCartItem.price.sale
            : requiredCartItem.price.base,
        salePrice: pricing.sale ? pricing.sale : false,
        discountPrice: 0,
        itemId: algoliaCartData.itemId,
        priceListId: requiredCartItem.priceListId,
        lineItemId: requiredCartItem.lineItemId,
        totalBars: plpData && plpData.TotalBars && plpData.TotalBars,
        weight: algoliaCartData.weight ? algoliaCartData.weight : '1',
        height: algoliaCartData.height ? algoliaCartData.height : '1',
        width: algoliaCartData.width ? algoliaCartData.width : '1',
        length: algoliaCartData.length ? algoliaCartData.length : '1',
        size: algoliaCartData.size,
        color: algoliaCartData.color,
        quantity: requiredCartItem.quantity,
        sku: algoliaCartData.sku,
        deliveryType: algoliaCartData['delivery type'],
        category: algoliaCartData.category || '',
        totalPrice:
          requiredCartItem.price.discount.discountAmount > 0
            ? requiredCartItem.quantity * requiredCartItem.price.discount.price
            : requiredCartItem.price.sale
            ? requiredCartItem.quantity * requiredCartItem.price.sale
            : requiredCartItem.quantity * requiredCartItem.price.price,
      }
    }
    let shirtCartData = {}
    if (requiredSizeCloth) {
      shirtCartData = {
        mainImage: isPdp
          ? requiredSizeCloth.images[0].source[0].url
          : requiredSizeCloth.images[0].source[0].url,
        title: requiredClothItem.title,
        price: requiredSizeCloth.price ? requiredSizeCloth.price.base : false,
        salePrice: requiredSizeCloth.price.sale
          ? requiredSizeCloth.price.sale
          : false,
        discountPrice: 0,
        itemId: requiredSizeCloth.itemId,
        lineItemId: requiredClothItem.lineItemId,
        weight: requiredSizeCloth.weight ? requiredSizeCloth.weight : '1',
        height: requiredSizeCloth.height ? requiredSizeCloth.height : '1',
        width: requiredSizeCloth.width ? requiredSizeCloth.width : '1',
        length: requiredSizeCloth.length ? requiredSizeCloth.length : '1',
        size: size,
        color: requiredSizeCloth.color,
        quantity: requiredClothItem.quantity,
        sku: requiredSizeCloth.sku,
        deliveryType: requiredSizeCloth['delivery type'],
        category: requiredSizeCloth.category || '',
        totalPrice:
          localCartData.discountPrice > 0
            ? localCartData.quantity * localCartData.discountPrice
            : localCartData.salePrice
            ? localCartData.quantity * localCartData.salePrice
            : localCartData.quantity * localCartData.price,
      }
    }

    return size ? shirtCartData : localCartData
  }
  return { addToLocalCart }
}

export default useAddToLocalCart
