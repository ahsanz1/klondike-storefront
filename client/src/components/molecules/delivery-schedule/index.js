import React from 'react'
import Link from 'components/atoms/link'
import './style.scss'
import PropTypes from 'prop-types'
import { Skeleton } from 'antd'

const DeliveryScheduleTable = ({ loading, deliveryProducts }) => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

  const formateDate = date =>
    new Date(date).toLocaleDateString('en-US', dateOptions)

  const renderScheduleSpan = (date, index) => <span>{formateDate(date)}</span>

  const renderDates = dates => {
    if (!dates.length) return null

    return (
      <div className="deliver-dates-bar">
        <span className="deliver-date-label">Delivery dates:</span>
        <div className="deliver-dates-spans">
          {dates.map((date, index) => renderScheduleSpan(date, index))}
        </div>
      </div>
    )
  }

  return (
    <div className="table-holder">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>PRODUCTS</th>
            <th>QUANTITY</th>
            <th>USD</th>
            <th>TYPE</th>
            <th>SKIP</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div
              style={{
                marginBottom: '30px',
                paddingBottom: '30px',
                borderBottom: '3px solid #cecece',
              }}
            >
              <Skeleton active paragraph={false} />
            </div>
          ) : (
            deliveryProducts &&
            deliveryProducts.length &&
            deliveryProducts.map(
              ({ productName, quantity, price, subId, deliveryDates }, i) => {
                return (
                  <>
                    <tr
                      className="responsive-table-row upper"
                      key={`table-row-${i}-1`}
                    >
                      <td>{productName}</td>
                      <td>{quantity}</td>
                      <td>${price}</td>
                      <td>Recurring</td>
                      <td>
                        <Link
                          to={`/account/subscription/cancel-subsciption?subId=${subId}&product=${productName}`}
                          className="items-link"
                        >
                          Skip
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/subscription/delivery-status?subId=${subId}`}
                          className="items-link"
                        >
                          {' '}
                          Edit
                        </Link>
                      </td>
                    </tr>
                    <tr
                      className="responsive-table-row lower"
                      key={`table-row-${i}-2`}
                    >
                      <td colSpan="6">{renderDates(deliveryDates)}</td>
                    </tr>
                  </>
                )
              },
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

DeliveryScheduleTable.propTypes = {
  loading: PropTypes.bool,
  deliveryProducts: PropTypes.array,
}

export default DeliveryScheduleTable
