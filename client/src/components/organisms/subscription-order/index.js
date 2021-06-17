import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Heading from 'components/atoms/heading'
// import Link from 'components/atoms/link'
// import Button from 'components/atoms/button'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
// import { getAllSubscriptioned } from 'libs/services/api/subscriptions.api'
import SubscriptionTable from './components/SubscriptionTable'

// import {
//   useGetSubscriptions,
//   useGetItemsWithId,
// } from 'libs/api-hooks/useSubscriptionItems'

import requireAuth from 'libs/hoc/authHOC'
import './style.scss'
import useSubscriptions from 'libs/api-hooks/useSubscriptions'
import { AppContext } from 'libs/context'

const SubscriptionOrderDetails = ({ Orderaddress }) => {
  const { user } = useContext(AppContext)
  const { subscriptions, fetchSubscriptions } = useSubscriptions(
    user.accessToken,
  )
  // const { subscriptions, setSubscriptions } = useGetSubscriptions()
  // const { productItems, setProductItems } = useGetItemsWithId()
  // const [allSubscriptions, setAllSubscriptions] = useState([])

  // useEffect(() => {
  //   if (isEmpty(subscriptions) || !productItems.length) {
  //     setSubscriptions()
  //     setProductItems([
  //       1000019298,
  //       1000012000,
  //       1000019294,
  //       1000019290,
  //       1000019286,
  //       1000019280,
  //       1000019276,
  //     ])
  //   }
  // }, [subscriptions, setProductItems, productItems])

  // useEffect(() => {
  //   if (!isEmpty(subscriptions) && productItems.length) {
  //     const _allSubscriptions = makeSubscriptions(
  //       subscriptions.subscriptions,
  //       productItems,
  //     )

  //     setAllSubscriptions(_allSubscriptions)
  //   }
  // }, [subscriptions, productItems])

  // const makeSubscriptions = (subs, items) => {
  //   const _subscriptions = [...subs]
  //   let _allSubscriptions = []

  //   _subscriptions.forEach((subscription, i) => {
  //     const _item = items[i]
  //     const _subscription = { ...subscription, ..._item }
  //     _allSubscriptions.push(_subscription)
  //   })
  //   return _allSubscriptions
  // }

  const columns = [
    'Product',
    'Quantity',
    'USD',
    'Frequency',
    'Next Charge Date',
    'Actions',
  ]

  // console.log('allSubscriptions: ', allSubscriptions)

  return (
    <div className="subscription-order">
      <MyAccountLeftMenu />

      <div className="wrapper">
        <div className="subscription-details">
          <Heading className="top-heading">subscription order</Heading>

          {/* <div className="Orderaddress">
            <span>{Orderaddress}</span>
            <Link to="/">Edit</Link>
          </div> */}

          <div className="SingleOrdertable">
            <SubscriptionTable
              fetchSubscriptions={fetchSubscriptions}
              columns={columns}
              rows={subscriptions}
            />

            {/* <div className="buttonHolder">
              <Button>Apply Discount Code</Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

SubscriptionOrderDetails.propTypes = {
  cutomerFirstName: PropTypes.string,
  cutomerLastName: PropTypes.string,
  productTitle: PropTypes.string,
  sku: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  frequency: PropTypes.string,
  chargeDate: PropTypes.string,
  Orderaddress: PropTypes.string,
}

export default requireAuth(SubscriptionOrderDetails)
