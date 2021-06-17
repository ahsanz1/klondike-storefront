import TagManager from 'react-gtm-module'
import { isDevEnvironment, gtm } from 'libs/general-config'

const mapItemsToGtmEventsForAlgolia = (items, index = 0) => {
  items = Array.isArray(items) ? items : [items]
  items = items.map(e => {
    index++
    return {
      name: e.title,
      id: e.sku,
      price: e['Sale Price'] ? e['Sale Price'] : e['Base Price'],
      category: e.Category,
      list_name: e.Category,
      list_id: e.Category,
      index,
    }
  })
  // console.log("----- gtm mapping -----", items);
  return items
}

const mapItemsToGtmEventsForPim = (items, index = 0) => {
  try {
    items = Array.isArray(items) ? items : [items]
    items = items.map(e => {
      index++
      if (e) {
        return {
          name: e.title,
          id: e.sku,
          price: (e.price.sale ? e.price.sale : e.price.base) || 0,
          category: e.category,
          list_name: e.category,
          list_id: e.category,
          index,
        }
      }
    })
    return items
  } catch (e) {
    return items
  }

  // console.log("----- gtm mapping -----", items);
}

const mapItemsToGtmEventsForATC = (items, index = 0) => {
  // console.log("----- gtm mapping BEFORE -----", items);
  items = Array.isArray(items) ? items : [items]
  items = items.map(e => {
    index++
    return {
      name: e.title,
      id: e.sku,
      price: (e.salePrice ? e.salePrice : e.price) || 0,
      category: e.category,
      list_name: e.category,
      list_id: e.category,
      quantity: e.quantity || 1,
      index,
    }
  })
  // console.log("----- gtm mapping -----", items);
  return items
}

const mapItemsToGtmEventsForOMS = (items, index = 0) => {
  items = Array.isArray(items) ? items : [items]
  items = items.map(e => {
    index++
    return {
      name: e.title,
      id: e.sku,
      price: (e.salePrice ? e.salePrice : e.price) || 0,
      category: e.category,
      list_name: e.category,
      list_id: e.category,
      index,
      quantity: e.quantity,
    }
  })
  return items
}

const push = (eventName, body) => {
  TagManager.dataLayer({
    dataLayer: {
      event: eventName,
      ecommerce: {
        ...body,
      },
    },
  })
}

export const init = () => {
  const tagManagerArgs = {
    gtmId: isDevEnvironment ? gtm.devScriptId : gtm.prodScriptId,
  }

  TagManager.initialize({
    ...tagManagerArgs,
  })
}

export const productListing = (totalItem, category) => {
  push('viewCategory', {
    pageCategory: [
      {
        name: category,
        id: category,
        itemCount: totalItem,
      },
    ],
  })
}

export const productListingClick = items => {
  console.log({ items })
  items = mapItemsToGtmEventsForAlgolia(items)
  push('select_item', { items })
}

export const productView = items => {
  // console.log(items, 'view_item')
  items = mapItemsToGtmEventsForPim(items)
  push('view_item', {
    detail: {
      products: items,
    },
  })
}

export const addToCart = items => {
  console.log(items, 'gtmAddToCart')
  items = mapItemsToGtmEventsForATC(items)
  push('addToCart', {
    currencyCode: 'USD',
    add: {
      products: items,
    },
  })
}

export const removeFromCart = items => {
  items = mapItemsToGtmEventsForPim(items)
  push('remove_from_cart', { items })
}

export const viewCheckout = items => {
  items = mapItemsToGtmEventsForOMS(items)
  push('checkout', {
    checkout: {
      products: items,
      currencyCode: 'USD',
      actionField: {
        step: 1,
        option: '',
        action: 'checkout',
      },
    },
  })
}

export const paymentCheckout = items => {
  items = mapItemsToGtmEventsForOMS(items)

  push('checkout_payment', { items })
}

export const endCheckout = orderId => {
  const getLocalCart = JSON.parse(window.localStorage.getItem('CART'))
  const getCartItems = JSON.parse(window.localStorage.getItem('CART_ITEMS'))
  let totalTax = 0
  let totalValue = getLocalCart ? getLocalCart.totalAmount.amount : 0
  let shipping = 0
  let couponCode = getLocalCart.selectedPromo ? getLocalCart.selectedPromo : ''

  let body = {
    purchase: {
      actionField: {
        id: orderId,
        affiliation: 'Online Store',
        value: totalValue.toFixed(2),
        tax: totalTax,
        currency: getLocalCart ? getLocalCart.totalAmount.currency : 'USD',
        revenue: totalValue.toFixed(2),
        shipping: shipping,
        coupon: couponCode,
      },
      products: getCartItems.map(item => {
        return {
          name: item.title,
          id: item.sku,
          price: item.price,
          quantity: item.quantity,
          variant: item.totalBars ? item.totalBars : item.size ? item.size : '',
        }
      }),
    },
  }

  push('purchaseSuccess', body)
}
