import React, { useEffect, useState, Fragment, useContext } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import { Skeleton } from 'antd'
import { getSubscribableItems } from 'libs/services/api/subscriptions.api'
import Heading from 'components/atoms/heading'
import ProductItemSubscribed from 'components/molecules/product-item-subscribed'
import ProductItemSubscribeNew from 'components/molecules/product-item-subscribe-new'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
import requireAuth from 'libs/hoc/authHOC'

import './styles.scss'

const PDPSusbcription = () => {
  const [loading, setLoading] = useState(true)
  const [planss, setPlans] = useState([])
  const [swapItemData, setSwapItemData] = useState({})
  const { subscribedPlpData } = useContext(AppContext)
  useEffect(() => {
    const getItemPlans = async () => {
      const itemId = new URLSearchParams(location.search).get('itemId')
      const getPlans = itemId && (await getSubscribableItems([itemId]))
      const item =
        subscribedPlpData &&
        subscribedPlpData.find(
          data => data.itemId.toString() === itemId.toString(),
        )
      item && setSwapItemData(item)
      getPlans && (await itemIdPlans(getPlans.response.data.data, itemId))
    }
    getItemPlans()
  }, [])

  useEffect(() => {
    if (
      planss &&
      planss.length > 0 &&
      swapItemData &&
      Object.keys(swapItemData).length > 0
    ) {
      planss && console.log({ planss })
      swapItemData && console.log({ swapItemData })
      setLoading(false)
    }
  }, [planss, swapItemData])

  const itemIdPlans = async (plans, itemId) => {
    const activePlans = plans[itemId].filter(plan => plan.status === 'ACTIVE')
    const gettingPlans = activePlans.map(plan => {
      return {
        frequency: plan.frequency,
        frequencyType: plan.frequencyType,
        value: `${plan.frequency} ${plan.frequencyType}`,
        label: `${plan.frequency} ${plan.frequencyType}`,
      }
    })
    gettingPlans && setPlans(gettingPlans)
  }

  return (
    <div color="#fff" className="main-container">
      <MyAccountLeftMenu />
      <requireAuth />
      <div className="main-container-section">
        <div className="subs-product-masthead">
          <Heading className="subs-product-heading">Swap Product</Heading>
          {loading ? (
            <Skeleton.Image />
          ) : (
            <Fragment>
              <ProductItemSubscribed horizontal={true} separate={true} />
            </Fragment>
          )}
        </div>

        <ProductItemSubscribeNew
          PSusbcribeNewItem={swapItemData}
          plans={planss}
        />
      </div>
    </div>
  )
}

PDPSusbcription.defaultProps = {
  subscribed: null,
  PSusbcribeNewItem: null,
}

PDPSusbcription.propTypes = {
  subscribed: PropTypes.object,
  PSusbcribeNewItem: PropTypes.object,
}

export default requireAuth(PDPSusbcription)
