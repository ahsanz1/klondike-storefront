import React, { memo, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Accounts from 'components/molecules/accounts-page'
import { AppContext } from 'libs/context'
// import { Pagination, Skeleton } from 'antd'
import { Skeleton } from 'antd'
import { getOrdersByUser } from 'libs/services/api/orders.api'

const AccountTabPane = ({ data, title }) => {
  const {
    creditLimit,
    user,
    personalInfo,
    setTotalOrders,
    setOrders,
    AllOrders,
  } = useContext(AppContext)
  const [shipmentDetails, setShipmentDetails] = useState('')

  useEffect(() => {
    fetchShipment(0)
  }, [])

  const fetchShipment = async offset => {
    const ordersByUser = await getOrdersByUser(user.accessToken, offset, 2)
    let data = ordersByUser?.response?.data
    setShipmentDetails(data?.orders)
  }

  const orderFilter = value => {
    switch (value) {
      case 'All':
        setOrders(AllOrders?.orders)
        setTotalOrders(AllOrders?.query?.count)
        break

      case 'Created':
        filter('ORDER_CREATED')
        break

      case 'Confirmed':
        filter('ORDER_CONFIRMED')
        break

      case 'Cancelled':
        filter('ORDER_CANCELLED')
        break

      case 'Shipped':
        filter('ORDER_SHIPPED')
        break

      case 'Delivered':
        filter('ORDER_DELIVERED')
        break
    }

    console.log('filter', value)
  }

  const filter = async status => {
    let bulk = []
    await AllOrders?.orders.map(v => {
      if (v.status === status) {
        bulk.push(v)
      }
    })

    setOrders(bulk)
    setTotalOrders(AllOrders?.query?.statusCounts[status])
  }

  return (
    <div className="account-tabpane-content">
      {title === 'Profile' ? (
        <>
          <Label className="session">{data.session && data.session}</Label>
          <Label className="zip">
            {`${personalInfo.firstName &&
              personalInfo.firstName} ${personalInfo.lastName &&
              personalInfo.lastName}`}
          </Label>
          <Label className="profile-mail">
            {personalInfo.email && personalInfo.email}
          </Label>
          {!shipmentDetails ? (
            <div className="addresses-skeleton">
              <div className="ship-address">
                <Skeleton title={false} paragraph={{ rows: 3 }} active />
                <Skeleton title={false} paragraph={{ rows: 3 }} active />
              </div>
            </div>
          ) : null}
          {shipmentDetails &&
            shipmentDetails.length > 0 &&
            shipmentDetails.map(
              (row, i) =>
                row.shipTo &&
                row.shipTo.map((innerRow, rowIndex) => {
                  let address =
                    innerRow?.address?.name !== undefined
                      ? innerRow?.address
                      : innerRow?.pickupPerson
                  return (
                    <div className="ship-address" key={rowIndex}>
                      <div>
                        {data.heading && (
                          <strong className="ship-address-heading">
                            {data.heading}
                          </strong>
                        )}
                        {address && address?.name && (
                          <Label>{`${address?.name?.first &&
                            address?.name?.first} ${address?.name?.last &&
                            address?.name?.last}`}</Label>
                        )}
                        <Label>
                          {address?.street1 && address?.street1}
                          {address?.state && address?.state}
                        </Label>
                        <Label>{address?.zipCode && address?.zipCode}</Label>
                      </div>
                      <div className="ship-address-details">
                        <strong className="ship-address-heading drop-shipping-address">
                          {data.dropHeading}
                        </strong>
                        <Label>{`${address?.name?.first &&
                          address?.name?.first} ${address?.name?.last &&
                          address?.name?.last}`}</Label>
                        <Label>
                          {address?.street1 && address?.street1}
                          {address?.state && address?.state}
                        </Label>
                        <Label>{address?.zipCode && address?.zipCode}</Label>
                      </div>
                    </div>
                  )
                }),
            )}
          {/* <div className="page-no" key="pagination-shipment">
            <Pagination
              defaultCurrent={1}
              pageSize={perPageItems}
              total={totalOrders}
              onChange={e => fetchShipment(e)}
            />
          </div> */}
        </>
      ) : title === 'All Orders' ? (
        <>
          {shipmentDetails && shipmentDetails.length === 0 ? (
            'No Orders Found!'
          ) : (
            <>
              <div>
                {data.orderArray && (
                  <div className="order-filter">
                    <Label>
                      FILTER BY STATUS{' '}
                      <select onInput={e => orderFilter(e.currentTarget.value)}>
                        <option>All</option>
                        <option>Created</option>
                        <option>Confirmed</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                        <option>Shipped</option>
                      </select>
                    </Label>
                  </div>
                )}
              </div>
              {<Accounts />}
            </>
          )}
        </>
      ) : (
        <>
          <Label className="credit-limit">{data.limit && data.limit}</Label>
          <p className="credit-price">
            ${Number(creditLimit).toLocaleString()}
          </p>
        </>
      )}
    </div>
  )
}

AccountTabPane.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
}

export default memo(AccountTabPane)
