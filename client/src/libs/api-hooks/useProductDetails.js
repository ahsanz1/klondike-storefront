import { useEffect, useState } from 'react'
import { message } from 'antd'
import { getProductBySKU } from 'libs/services/api/pdp.api'
import { extractData } from 'libs/utils/extractors'
import getSymbolFromCurrency from 'currency-symbol-map'
import useInventory from './useInventory'
import usePricing from './usePricing'
import useSubscriptionItems from './useSubscriptionItems'

const useProductDetails = () => {
  const [apiData, setApiData] = useState({})
  const [product, setProduct] = useState({})
  const [rawProduct, setRawProduct] = useState({})
  const [productNotFound, setProductNotFound] = useState(false)
  const { itemsStatus, getItemsStatus } = useInventory()
  const { itemsPrice, getItemsPrice } = usePricing()
  const { subscriptionItems, getSubscriptionItems } = useSubscriptionItems()

  // useEffect(() => {
  //   getProductBySKU(sku).then(({ hasError, response }) => {
  //     if (!hasError) {
  //       setApiData(response.data)
  //     } else {
  //       setProductNotFound(true)
  //       message.error('Something went wrong. Try refreshing the page')
  //     }
  //   })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const fetchProduct = sku => {
    getProductBySKU(sku).then(({ hasError, response }) => {
      if (!hasError) {
        setApiData(response.data)
        setProductNotFound(false)
      } else {
        setProductNotFound(true)
        message.error('Something went wrong. Try refreshing the page')
      }
    })
  }

  useEffect(() => {
    const { product, items } = apiData
    if (product) {
      let itemIds = []
      itemIds.push(product.itemId)
      if (items && items.length > 0) {
        items.forEach(item => {
          itemIds.push(item.itemId)
        })
      }

      const defaultProduct =
        items.length > 0 ? items.find(item => item.isDefault) : product

      getItemsStatus(itemIds)
      getItemsPrice(itemIds)
      getSubscriptionItems(itemIds)
      setRawProduct(defaultProduct)
      setProduct(extractData(defaultProduct, items))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData])

  const changeProduct = sku => {
    const { items } = apiData
    if (items && items.length) {
      items.some(item => {
        if (item.sku.toLowerCase() === sku.toLowerCase()) {
          setRawProduct(item)
          setProduct(extractData(item, items))
          return true
        }
        return false
      })
    }
  }

  const embedStock = currentProduct => {
    if (itemsStatus.length > 0) {
      const productStock = itemsStatus.find(
        item => product.itemId === item.itemId,
      )
      if (productStock) {
        currentProduct = {
          ...currentProduct,
          inStock: productStock.inStock,
          availableStockQuantity: productStock.availableStockQuantity,
        }
      }
    }
    return currentProduct
  }
  const embedPrice = currentProduct => {
    if (itemsPrice.length > 0) {
      const productPrice = itemsPrice.find(
        item => product.itemId === item.itemId,
      )
      if (productPrice) {
        currentProduct = {
          ...currentProduct,
          price: {
            ...productPrice.offers[0]?.price,
            currency: getSymbolFromCurrency(
              productPrice.offers[0]?.price?.currency,
            ),
          },
        }
      }
    }
    return currentProduct
  }

  const embedSubscriptions = currentProduct => {
    if (subscriptionItems) {
      const subscriptions = subscriptionItems[product.itemId]
      if (subscriptions) {
        currentProduct = {
          ...currentProduct,
          subscriptions,
        }
      }
    }
    return currentProduct
  }

  let currentProduct = { ...product }
  currentProduct = embedStock({ ...currentProduct })
  currentProduct = embedPrice({ ...currentProduct })
  currentProduct = embedSubscriptions({ ...currentProduct })

  return {
    currentProduct,
    rawProduct,
    changeProduct,
    productNotFound,
    fetchProduct,
  }
}

export default useProductDetails
