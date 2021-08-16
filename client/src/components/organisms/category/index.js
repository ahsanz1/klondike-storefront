import React, { useState, useEffect } from 'react'
import { Row, Col, Skeleton } from 'antd'
import PropTypes from 'prop-types'
import ProductItem from 'components/molecules/product-item'
import { fetchCategory } from 'libs/services/algolia'
import { productListing } from 'libs/utils/gtm'
import './style.scss'
import useSubscriptionItems from 'libs/api-hooks/useSubscriptionItems'
// import { subscribeItems } from 'libs/data/data'

const Category = ({ categoryName, tproducts, subItemHandler, productList }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { subscriptionItems, getSubscriptionItems } = useSubscriptionItems()

  useEffect(() => {
    const data = tproducts
    if (!data) {
      perfomeAlgoliaSearch(categoryName, 0)
    } else {
      setProducts(tproducts)
    }
  }, [])
  useEffect(() => {
    setProducts(productList)
  }, [productList])

  const dData = {
    isDeleted: false,
    deletedAt: null,
    _id: '603510cc4d5a120008acf564',
    title: 'Harvest Plan',
    description:
      'the best plan to improve your health and well-being.  Complete health formula with prebiotics.',
    products: [
      {
        _id: '6050821b297308000842b58b',
        itemId: '1000019264',
        priceListId: '100000',
      },
    ],
    frequency: 6,
    frequencyType: 'Monthly',
    status: 'ACTIVE',
    discount: 10,
    shippingCost: 5,
    merchantAccountId: '8739392294',
    merchantAccount: '5f328bf0b7c15700071233b9',
    createdAt: '2021-02-23T14:27:24.279Z',
    updatedAt: '2021-03-16T10:02:03.779Z',
    __v: 10,
  }

  useEffect(() => {
    categoryName && console.log('check category', { categoryName })
    perfomeAlgoliaSearch(categoryName, 0)
  }, [categoryName])

  const perfomeAlgoliaSearch = async (category, pageNumber = 0) => {
    try {
      setLoading(true)
      const results = await fetchCategory(category, pageNumber)
      let serverResults = (results || { hits: [] }).hits
      serverResults.sort((a, b) =>
        a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0,
      )
      if (pageNumber === 0) {
        productListing(results.nbHits, category)
      }
      setProducts(serverResults)

      setLoading(false)
      console.log('check results:', results)
      subItemHandler(results)
    } catch (e) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (products && products.length > 0) {
      let itemIds = []
      products.forEach(item => {
        itemIds.push(item.itemId)
      })
      console.log('plp ids', itemIds)
      getSubscriptionItems(itemIds)
    }
    products && products.length > 0 && console.log({ products })
  }, [products])

  useEffect(() => {
    console.log('plp itms', subscriptionItems)
  }, [subscriptionItems])

  return (
    <div
      className={
        categoryName === 'SINGLE FLAVORS'
          ? 'grey-bg-category product-contanier'
          : 'product-contanier'
      }
    >
      {/* <h2 className="category-title">{categoryName}</h2> */}
      <Row>
        {loading ? (
          [1, 2, 3].map((skelton, index) => (
            <Col
              span={24}
              md={12}
              lg={8}
              key={index}
              style={{
                padding: '20px',
              }}
            >
              <Skeleton.Image />
              <Skeleton active />
            </Col>
          ))
        ) : (
          <>
            {products &&
              products.map((product, index) => (
                <Col span={12} md={12} lg={8} key={index}>
                  <ProductItem
                    item={{
                      ...product,
                      subscriptions: subscriptionItems[product.itemId] || [
                        { ...dData },
                      ],
                    }}
                    id={index}
                  />
                </Col>
              ))}
          </>
        )}
      </Row>
    </div>
  )
}

Category.propTypes = {
  categoryName: PropTypes.string,
  tproducts: PropTypes.array,
  subItemHandler: PropTypes.func,
  productList: PropTypes.array,
}

export default Category
