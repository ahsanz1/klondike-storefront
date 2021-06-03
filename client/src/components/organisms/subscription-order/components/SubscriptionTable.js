/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import { Skeleton } from 'antd'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import { editASubscription } from 'libs/services/api/subscriptions.api'

const SubscriptionTable = ({ columns = [], rows = [], fetchSubscriptions }) => {
  const [loading, setLoading] = useState('')
  const { setSubscriptionBillingInfo } = useContext(AppContext)
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }

  useEffect(() => {
    rows &&
      rows.length &&
      setSubscriptionBillingInfo({
        firstName: rows[0].billTo.name.firstName,
        lastName: rows[0].billTo.name.lastName,
        address: rows[0].billTo.streetAddress.street1,
        city: rows[0].billTo.city,
        zipCode: rows[0].billTo.zipCode,
        country: rows[0].billTo.country,
        email: rows[0].customerID.customerEmail,
      })
  }, [rows])

  const renderColumns = () =>
    columns.map((column, i) => (
      <Label key={`table-column-${i}`} className="label">
        {column}
      </Label>
    ))

  const activateSubscription = id => {
    setLoading(id)
    const payload = {
      status: 'ACTIVE',
    }
    editASubscription(id, payload).then(({ hasError, response }) => {
      fetchSubscriptions()
    })
  }

  useEffect(() => {
    setLoading('')
  }, [rows])

  const renderRows = () => {
    return rows.map(
      ({
        itemId,
        productTitle,
        quantity,
        price,
        frequency,
        frequencyType,
        discount,
        nextPaymentDate,
        status,
        _id,
      }) => (
        <>
          {loading === _id ? (
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
            <div key={`table-row-${itemId}`} className="tableRowsData">
              <div className="row">
                <div to="/account/singleorderdetail">
                  {productTitle ? (
                    <span>{productTitle}</span>
                  ) : (
                    <div>
                      <Skeleton paragraph={false} active />
                    </div>
                  )}
                </div>
              </div>

              <div className="row">
                <div>{quantity}</div>
              </div>

              <div className="row">
                <div>
                  {price ? (
                    (price.base * ((100 - discount) / 100)).toFixed(2)
                  ) : (
                    <div>
                      <Skeleton
                        style={{
                          width: '10px',
                        }}
                        paragraph={false}
                        active
                      />
                    </div>
                  )}
                </div>
                {/* missing quantity */}
              </div>

              <div className="row">
                <div>
                  {frequency} {frequencyType}
                </div>
              </div>

              <div className="row">
                {status === 'ACTIVE' && (
                  <div>
                    {new Date(nextPaymentDate).toLocaleDateString(
                      'en-US',
                      dateOptions,
                    )}
                  </div>
                )}
                {status === 'PAUSE' && <div>PAUSED</div>}
                {status === 'CANCEL' && <div>Cancelled</div>}
              </div>

              <div className="row">
                {status === 'ACTIVE' && (
                  <div className="actionLinks">
                    <Link
                      className="link"
                      to={`/subscription/delivery-status?subId=${_id}`}
                    >
                      Edit
                    </Link>
                    <Link
                      className="link"
                      to={`/account/subscription/cancel-subsciption?subId=${_id}&product=${productTitle}`}
                    >
                      Cancel
                    </Link>
                  </div>
                )}
                {(status === 'PAUSE' || status === 'CANCEL') && (
                  <span
                    className="link"
                    onClick={() => {
                      activateSubscription(_id)
                    }}
                  >
                    Re-active
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      ),
    )
  }

  const renderEmptyRows = () => <Skeleton active />
  console.log('rows', rows)
  return (
    <div className="tableHolder">
      <div className="tableColumn">
        <div className="tableHeadings">{renderColumns()}</div>
        {rows.length ? renderRows() : renderEmptyRows()}
      </div>
    </div>
  )
}

SubscriptionTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  fetchSubscriptions: PropTypes.func,
}

export default SubscriptionTable
