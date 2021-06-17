import { useState } from 'react'
// import { getItemsInPricing } from 'libs/services/api/pdp.api'

import {
  getSubscribableItems,
  getAllSubscriptioned,
} from 'libs/services/api/subscriptions.api'

import { getProductByIds } from 'libs/services/api/pdp.api'

const useSubscriptionItems = () => {
  const [subscriptionItems, setSubscriptionItems] = useState({})

  const getSubscriptionItems = itemIds => {
    getSubscribableItems(itemIds).then(({ hasError, response }) => {
      if (!hasError) {
        setSubscriptionItems({ ...response.data.data })
      }
    })
  }

  return { subscriptionItems, getSubscriptionItems }
}

export default useSubscriptionItems

export const useGetSubscriptions = () => {
  const [subscriptions, setAllsubscriptions] = useState({})

  const setSubscriptions = () => {
    getAllSubscriptioned().then(({ hasError, response }) => {
      if (!hasError) {
        setAllsubscriptions({ ...response.data.data })
      }
    })
  }

  return { subscriptions, setSubscriptions }
}

export const useGetItemsWithId = () => {
  const [productItems, setItems] = useState([])

  const setProductItems = ids => {
    getProductByIds(ids).then(({ hasError, response }) => {
      if (!hasError) {
        setItems([...response.data])
      }
    })
  }

  return { productItems, setProductItems }
}

// const usePricing = () => {
//   const [itemsPrice, setItemsPrice] = useState([])

//   const getItemsPrice = itemIds => {
//     getItemsInPricing(itemIds).then(({ hasError, response }) => {
//       if (!hasError) {
//         console.log(response.data)
//         setItemsPrice(response.data)
//       }
//     })
//   }

//   return { itemsPrice, getItemsPrice }
// }

// export default usePricing
