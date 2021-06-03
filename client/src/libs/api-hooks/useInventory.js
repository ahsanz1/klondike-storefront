import { useState } from 'react'
import { getItemInStockStatus } from 'libs/services/api/pdp.api'

const useInventory = () => {
  const [itemsStatus, setItemsStatus] = useState([])

  const getItemsStatus = itemIds => {
    getItemInStockStatus(itemIds).then(({ hasError, response }) => {
      if (!hasError) {
        console.log(response.data)
        setItemsStatus(response.data)
      }
    })
  }

  return { itemsStatus, getItemsStatus }
}

export default useInventory
