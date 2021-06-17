import React, { useEffect, useContext, useState } from 'react'
import { AppContext } from 'libs/context'
import {
  getDeliverySchedule,
  getPriceByPriceId,
} from 'libs/services/api/subscriptions.api'
import { getProductByIds } from 'libs/services/api/pdp.api'
import { Skeleton } from 'antd'
import './style.scss'
import Label from 'components/atoms/label'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
import DeliveryScheduleTable from 'components/molecules/delivery-schedule'
import requireAuth from 'libs/hoc/authHOC'

const DeliverySchedule = () => {
  const { user } = useContext(AppContext)
  const [deliveryProducts, setDeliveryProducts] = useState([])
  const [billingDetails, setBillingDetails] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const gett = async () => {
      setLoading(true)
      const userId = user && Object.keys(user).length > 0 && user._id
      const userAuthToken =
        user && Object.keys(user).length > 0 && user.accessToken
      const userOrders =
        userId && (await getDeliverySchedule(userId, userAuthToken))
      const getPriceIds =
        userOrders &&
        !userOrders.hasError &&
        userOrders.response &&
        userOrders.response.data.data.scheduledSubscriptions.map(order => {
          return {
            itemId: order.subscription.itemID,
            priceListId: parseFloat(order.subscription.priceListID),
          }
        })
      const getItemIds =
        userOrders &&
        !userOrders.hasError &&
        userOrders.response &&
        userOrders.response.data.data.scheduledSubscriptions.map(
          order => order.subscription.itemID,
        )
      const getPrice = await getPriceByPriceId(getPriceIds)
      const getProducts = await getProductByIds(getItemIds)

      let result =
        userOrders &&
        !userOrders.hasError &&
        userOrders.response &&
        userOrders.response.data.data.scheduledSubscriptions.map(x => {
          let item = getPrice.response.data.find(
            item =>
              item.priceListId.toString() ===
              x.subscription.priceListID.toString(),
          )
          return {
            itemId: x.subscription.itemID,
            quantity: x.subscription.quantity,
            price: item.offers[0].price.sale,
            subId: x.subscription._id,
            deliveryDates: x.scheduled.map(product => product.deliveryDate),
          }
        })

      let deliveryitem =
        result &&
        result.length > 0 &&
        result.map(x => {
          let item =
            getProducts &&
            getProducts.response.data.find(
              item => item.itemId.toString() === x.itemId.toString(),
            )
          return {
            itemId: x.itemId,
            quantity: x.quantity,
            price: x.price,
            subId: x.subId,
            productName: item.title,
            deliveryDates: x.deliveryDates,
          }
        })

      result && result.length > 0 && setDeliveryProducts(deliveryitem)

      const dummy = [
        {
          billingAddress:
            userOrders.response.data.data.scheduledSubscriptions[0].subscription
              .billTo,
          deliveryDate:
            userOrders.response.data.data.scheduledSubscriptions[0].scheduled[0]
              .deliveryDate,
        },
      ]

      dummy && setBillingDetails(dummy)
      setLoading(false)
    }
    gett()
  }, [])

  return (
    <div className="delivery-schedule">
      <MyAccountLeftMenu />
      <div className="delivery-schedule-section">
        <Label className="delivery-schedule-heading">Delivery Schedule</Label>
        <Label className="delivery-schedule-text">
          Delivery schedule dates are when your order will be placed. Future
          deliveries will be added to your schedule as the date appraches
        </Label>

        {loading ? (
          <Skeleton active paragraph={false} />
        ) : (
          <Label>
            Billing Address:{' '}
            {billingDetails &&
              billingDetails.length &&
              billingDetails[0].billingAddress.streetAddress.street1}{' '}
            {billingDetails &&
              billingDetails.length &&
              billingDetails[0].billingAddress.city}{' '}
            {billingDetails &&
              billingDetails.length &&
              billingDetails[0].billingAddress.state}{' '}
            {billingDetails &&
              billingDetails.length &&
              billingDetails[0].billingAddress.zipCode}
          </Label>
        )}
        <DeliveryScheduleTable
          deliveryProducts={deliveryProducts}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default requireAuth(DeliverySchedule)
