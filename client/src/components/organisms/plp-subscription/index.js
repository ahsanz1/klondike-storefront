/* eslint-disable indent */
import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import { Row, Col, Skeleton, Pagination } from 'antd'
import { useLocation } from '@reach/router'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import Heading from 'components/atoms/heading'
import ProductItemSubscribed from 'components/molecules/product-item-subscribed'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
import {
  getSubscriptionById,
  getPriceByPriceId,
} from 'libs/services/api/subscriptions.api'
import { getProductByIds } from 'libs/services/api/pdp.api'
import ProductSearch from './components/ProductSearch'
import requireAuth from 'libs/hoc/authHOC'

import './styles.scss'

const PLPSusbcribed = () => {
  const [loading, setLoading] = useState(true)
  const {
    subscribedItemData,
    setSubscribedItemData,
    subscribedPlpData,
    setSubscribedPlpData,
  } = useContext(AppContext)
  const location = useLocation()

  useEffect(() => {
    const gett = async () => {
      const getSubscription = new URLSearchParams(location.search).get('subId')
      const getSubscriptionIdData =
        getSubscription && (await getSubscriptionById(getSubscription))
      getSubscriptionIdData && console.log({ getSubscriptionIdData })
      const subscribedItemPlanIds =
        getSubscriptionIdData &&
        getSubscriptionIdData.response &&
        getSubscriptionIdData.response.data &&
        getSubscriptionIdData.response.data.data &&
        getSubscriptionIdData.response.data.data.subscription &&
        getSubscriptionIdData.response.data.data.subscription.planID &&
        getSubscriptionIdData.response.data.data.subscription.planID.products &&
        getSubscriptionIdData.response.data.data.subscription.planID.products
          .length &&
        getSubscriptionIdData.response.data.data.subscription.planID.products.map(
          product => product.itemId,
        )
      const getSubscribedItemData = await getProductByIds(subscribedItemPlanIds)
      const getByPriceId =
        getSubscribedItemData &&
        (await getPriceId(
          getSubscriptionIdData.response.data.data.subscription,
        ))
      getByPriceId &&
        getSubscribedItemData &&
        (await getSubscribedItemPLPData(
          getSubscribedItemData.response.data,
          getByPriceId.response.data,
          getSubscriptionIdData.response.data.data.subscription,
        ))
      getByPriceId &&
        getSubscribedItemData &&
        (await getPLPSwapItems(
          getSubscribedItemData.response.data,
          getByPriceId.response.data,
          getSubscriptionIdData.response.data.data.subscription,
        ))
    }
    gett()
  }, [])

  useEffect(() => {
    if (
      subscribedItemData &&
      Object.keys(subscribedItemData).length > 0 &&
      subscribedPlpData &&
      subscribedPlpData.length > 0
    ) {
      setLoading(false)
    }
  }, [subscribedItemData, subscribedPlpData])

  const getSubscribedItemPLPData = async (
    subscribedItemDataData,
    priceListId,
    subscription,
  ) => {
    if (subscription && priceListId) {
      const subscribedItemDetails = subscribedItemDataData.find(
        subscribedItem => subscribedItem.itemId === Number(subscription.itemID),
      )
      const subscribedItemPrice = priceListId.find(
        priceId => priceId.itemId === Number(subscription.itemID),
      )
      const payload = {
        price: subscribedItemPrice.offers[0].price.sale,
        image: subscribedItemDetails.images[0].source[0].url,
        title: subscribedItemDetails.title,
        quantity: subscription.quantity,
        frequency: subscription.frequency,
        frequencyType: subscription.frequencyType,
        itemId: subscribedItemDetails.itemId,
        sku: subscribedItemDetails.sku,
        subscriptionId: new URLSearchParams(location.search).get('subId'),
      }
      setSubscribedItemData(payload)
    }
  }

  const getPLPSwapItems = async (
    subscribedItemDataData,
    priceListId,
    subscription,
  ) => {
    const plpSwapItems = []
    if (subscribedItemDataData && priceListId) {
      subscribedItemDataData.forEach(item => {
        const userIdCartItem = priceListId.filter(
          ({ itemId }) => itemId === item.itemId,
        )[0]
        if (userIdCartItem) {
          const payload = {
            price: userIdCartItem.offers[0].price.sale,
            image: item.images[0].source[0].url,
            title: item.title,
            quantity: subscription.quantity,
            frequency: subscription.frequency,
            frequencyType: subscription.frequencyType,
            itemId: item.itemId,
            sku: item.sku,
            subId: subscription._id,
          }
          plpSwapItems.push(payload)
        }
      })
    }
    setSubscribedPlpData(plpSwapItems)
  }

  const getPriceId = async subscriptioData => {
    const getPriceList =
      subscriptioData &&
      subscriptioData.planID &&
      subscriptioData.planID.products &&
      subscriptioData.planID.products.length &&
      subscriptioData.planID.products.map(product => {
        return {
          itemId: product.itemId,
          priceListId: +product.priceListId,
        }
      })
    const itemPricing = await getPriceByPriceId(getPriceList)
    return itemPricing
  }

  const onSearch = query => {
    if (query) {
      const _products = [...subscribedPlpData]
      const searchOut = _products.filter(product =>
        product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
      setSubscribedPlpData(searchOut)
    } else {
      setSubscribedPlpData(subscribedPlpData)
    }
  }

  const renderSkeltonList = () => {
    return (
      <Row className="subs-products-list">
        {[1, 2, 3, 4].map((skelton, index) => (
          <Col span={24} md={12} lg={6} key={index} style={{ padding: '20px' }}>
            <Skeleton.Image />
            <Skeleton active />
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <div className="subscripton-plp">
      <MyAccountLeftMenu />
      <div color="#fff" className="main-container">
        <div className="subs-product-masthead">
          <Heading className="subs-product-heading">Swap Product</Heading>
          {loading ? (
            <Skeleton.Image />
          ) : (
            <ProductItemSubscribed
              horizontal={true}
              separate={true}
              subscriptionData={subscribedItemData}
            />
          )}
          <ProductSearch onSearch={onSearch} />
        </div>
        {loading ? (
          renderSkeltonList()
        ) : subscribedPlpData && subscribedPlpData.length ? (
          <>
            {console.log({ subscribedPlpData })}
            <Row className="subs-products-list">
              {subscribedPlpData.map((productt, index) => (
                <Col
                  span={24}
                  sm={12}
                  lg={6}
                  key={index}
                  style={{ padding: '20px' }}
                >
                  <Link
                    to={`/account/subscription/swap/detail?itemId=${productt.itemId}`}
                  >
                    <img
                      src={productt.image}
                      alt={productt.title}
                      className="plp-items"
                    />
                  </Link>
                  <h6 className="plp-items-price">{productt.title}</h6>
                  <h6 className="plp-items-price">{productt.price}</h6>
                </Col>
              ))}
            </Row>
            <Pagination
              defaultCurrent={1}
              total={subscribedPlpData.length}
              pageSize={10}
            />
          </>
        ) : (
          <Label>No products found</Label>
        )}
      </div>
    </div>
  )
}

PLPSusbcribed.defaultProps = {
  subscribed: null,
  products: [],
}

PLPSusbcribed.propTypes = {
  subscribed: PropTypes.object,
  products: PropTypes.array,
}

export default requireAuth(PLPSusbcribed)
