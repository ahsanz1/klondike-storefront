import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'

const AccountTabPane = ({ data, user, title, userOrder }) => {
  console.log('check order:', userOrder)
  return (
    <div className="account-tabpane-content">
      {title === 'Profile' ? (
        <>
          <Label className="session">{data.session && data.session}</Label>
          <Label className="zip">
            {`${user.firstName && user.firstName} ${user.lastName &&
              user.lastName}`}
          </Label>
          <Label className="profile-mail">{user.email && user.email}</Label>
          {userOrder &&
            userOrder.map(
              (row, i) =>
                row.shipTo &&
                row.shipTo.map((innerRow, rowIndex) => (
                  <div className="ship-address" key={rowIndex}>
                    <div>
                      <strong>{data.heading}</strong>
                      <Label>{`${innerRow.address.name.first &&
                        innerRow.address.name.first} ${innerRow.address.name
                        .last && innerRow.address.name.last}`}</Label>
                      <Label>
                        {innerRow.address.street1 && innerRow.address.street1}
                        {innerRow.address.state && innerRow.address.state}
                      </Label>
                      <Label>
                        {innerRow.address.zipCode && innerRow.address.zipCode}
                      </Label>
                    </div>
                    <div>
                      <strong>{data.dropHeading}</strong>
                      <Label>{`${innerRow.address.name.first &&
                        innerRow.address.name.first} ${innerRow.address.name
                        .last && innerRow.address.name.last}`}</Label>
                      <Label>
                        {innerRow.address.street1 && innerRow.address.street1}
                        {innerRow.address.state && innerRow.address.state}
                      </Label>
                      <Label>
                        {innerRow.address.zipCode && innerRow.address.zipCode}
                      </Label>
                    </div>
                  </div>
                )),
            )}
        </>
      ) : title === 'All Orders' ? (
        <>
          {userOrder && userOrder.length === 0 ? (
            'No Orders Found!'
          ) : (
            <>
              <div>
                {data.orderArray && (
                  <div className="order-filter">
                    <Label>
                      FITER BY STATUS{' '}
                      <select>
                        <option>All</option>
                      </select>
                    </Label>
                  </div>
                )}
              </div>
              <div>
                {userOrder &&
                  userOrder.map((item, index) =>
                    item.items.map((dataItem, i) => (
                      <div className="order-image" key={index}>
                        {/* <div className="image">
                      <img src={item.image?.url} />
                    </div> */}
                        <div className="product-info">
                          <div>
                            <Label className="order-number">
                              {item.orderId}
                            </Label>
                            <Label className="price">{dataItem.price}</Label>
                            <Label className="link">{data.cart}</Label>
                            <Label className="link">{data.review}</Label>
                          </div>
                          <div className="order">
                            <Label className="price">{dataItem.price}</Label>
                            <Label>{data.reorder}</Label>
                          </div>
                          <div className="status">
                            <Label>{item.createdAt.slice(0, 10)}</Label>
                            <Label className="price">{item.orderTotal}</Label>
                            <Label>
                              Status:
                              {(item.status === 'ORDER_CREATED' &&
                                'ORDER CREATED') ||
                                item.status}
                            </Label>
                          </div>
                        </div>
                      </div>
                    )),
                  )}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <Label className="credit-limit">{data.limit && data.limit}</Label>
          <p className="credit-price">{data.price && data.price}</p>
        </>
      )}
    </div>
  )
}

AccountTabPane.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
  title: PropTypes.string,
  userOrder: PropTypes.array,
}

export default memo(AccountTabPane)
