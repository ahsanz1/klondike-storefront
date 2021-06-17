/* eslint-disable eqeqeq */
import { useEffect, useMemo, useState, useContext } from 'react'
import { AppContext } from 'libs/context'
import { getAllSubscriptions } from 'libs/services/api/subscriptions.api'
import { getProductByIds } from 'libs/services/api/pdp.api'
import usePricing from './usePricing'

// const itemIds = [
//   1000012023,
//   1000012023,
//   1000012023,
//   1000012000,
//   1000012023,
//   1000012023,
//   1000012023,
// ]
// const priceListIds = [
//   '100130',
//   '100130',
//   '100130',
//   '100143',
//   '100130',
//   '100130',
//   '100130',
// ]

const embedValues = (apiSubscriptions, itemsPrice, products) => {
  console.log('asd', itemsPrice)
  if (apiSubscriptions && apiSubscriptions.length) {
    let tempSubs = [...apiSubscriptions]
    let subscriptions = []
    tempSubs.forEach((sub, i) => {
      let price
      let product
      if (itemsPrice && itemsPrice.length) {
        price = itemsPrice.find(item => item.itemId == sub.itemID) // sub.itemId
      }

      if (products && products.length) {
        product = products.find(item => item.itemId == sub.itemID) // sub.itemId
      }

      subscriptions.push({
        ...sub,
        ...(price && { price: price.offers[0].price }),
        ...(product && { productTitle: product.title }),
      })
    })

    return subscriptions
  }
}
const useSubscriptions = accessToken => {
  const { user } = useContext(AppContext)
  const [apiSubscriptions, setApiSubscriptions] = useState([])
  const [products, setProducts] = useState([])
  const { itemsPrice, getByPriceListId } = usePricing()
  const subscriptions = useMemo(
    () => embedValues(apiSubscriptions, itemsPrice, products),
    [apiSubscriptions, itemsPrice, products],
  )

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  useEffect(() => {
    if (apiSubscriptions && apiSubscriptions.length > 0) {
      let items = []
      let itemWithIds = []
      apiSubscriptions.map((item, i) => {
        itemWithIds.push(item.itemID)
        items.push({
          itemId: item.itemID,
          priceListId: +item.priceListID,
        })
      })
      getByPriceListId(items)
      getProductByIds(itemWithIds).then(({ hasError, response }) => {
        if (!hasError) {
          setProducts(response.data)
        }
      })
    }
  }, [apiSubscriptions])

  const fetchSubscriptions = () => {
    const userId = user && Object.keys(user).length > 0 && user._id
    getAllSubscriptions(accessToken, userId).then(({ hasError, response }) => {
      if (!hasError) {
        console.log('all', response.data.data.subscriptions)
        setApiSubscriptions([...response.data.data.subscriptions])
      }
    })
  }

  console.log('final', subscriptions)

  return { subscriptions, fetchSubscriptions }
}

export default useSubscriptions
