/* eslint-disable no-unused-expressions */
import { getItemInStockStatus } from 'libs/services/api/pdp.api'

export const checkItemsInStock = async payloadItems => {
  let itemsWithQty = []
  var itemsNotInStock = []
  payloadItems?.forEach(item => {
    itemsWithQty.push({
      itemId: item?.itemId,
      quantity: item?.quantity,
    })
  })

  let res = await getItemInStockStatus(itemsWithQty)
  console.log('itemsInNotStcok', res)
  let retreivedData = res?.response?.data
  retreivedData?.forEach(item => {
    if (!item?.inStock) {
      itemsNotInStock.push(
        payloadItems?.find(pItem => pItem?.itemId === item?.itemId),
      )
    }
  })
  console.log('itemsInNotStcok', itemsNotInStock)
  let filteredItems = []
  if (itemsNotInStock?.length) {
    itemsNotInStock?.forEach(item => {
      filteredItems.push({
        size: item?.size,
        sku: item?.sku,
      })
    })
  }
  return filteredItems
}
