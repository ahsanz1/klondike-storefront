import React, { memo, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Accounts from 'components/molecules/accounts-page'
import { AppContext } from 'libs/context'
// import { Pagination, Skeleton } from 'antd'
import { Skeleton } from 'antd'
import { getOrdersByUser } from 'libs/services/api/orders.api'

const AccountTabPane = ({ data, title }) => {
  const perPageItems = 3
  const { creditLimit, user, personalInfo } = useContext(AppContext)
  // const [totalOrders, setTotalOrders] = useState(0)
  const [shipmentDetails, setShipmentDetails] = useState('')

  useEffect(() => {
    fetchShipment(0)
  }, [])

  const fetchShipment = async offset => {
    const ordersByUser = await getOrdersByUser(
      user.accessToken,
      offset,
      perPageItems,
    )
    let data = ordersByUser.response.data
    setShipmentDetails(data.orders)
    // setTotalOrders(data?.query?.count)
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
                      <select>
                        <option>All</option>
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
          <p className="credit-price">${creditLimit}</p>
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
