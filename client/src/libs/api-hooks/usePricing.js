import { useState } from 'react'
import { getItemsInPricing } from 'libs/services/api/pdp.api'
import { getPriceByPriceListId } from 'libs/services/api/offers.api'

const usePricing = () => {
  const [itemsPrice, setItemsPrice] = useState([])

  const getItemsPrice = itemIds => {
    getItemsInPricing(itemIds).then(({ hasError, response }) => {
      if (!hasError) {
        setItemsPrice(response.data)
      }
    })
  }

  const getByPriceListId = items => {
    getPriceByPriceListId(items).then(({ hasError, response }) => {
      if (!hasError) {
        setItemsPrice(response.data)
      }
    })
  }

  return { itemsPrice, getItemsPrice, getByPriceListId }
}

export default usePricing
