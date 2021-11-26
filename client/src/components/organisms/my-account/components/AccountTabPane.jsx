import React, { memo, useContext } from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Accounts from 'components/molecules/accounts-page'
import { AppContext } from 'libs/context'
import { Pagination } from 'antd'

const AccountTabPane = ({ data, user, title, userOrder }) => {
  const { creditLimit } = useContext(AppContext)

  const setPaginationData = page => {
    // let startIndex = page * perPageItems - perPageItems
    // let endIndex = startIndex + perPageItems
    // let data = techBlogData
    // data = data.slice(startIndex, endIndex)
    // setActiveCatagoryData(data)
  }

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
            userOrder.length > 0 &&
            userOrder.map(
              (row, i) =>
                row.shipTo &&
                row.shipTo.map((innerRow, rowIndex) => (
                  <div className="ship-address" key={rowIndex}>
                    <div>
                      {data.heading && <strong>{data.heading}</strong>}
                      {innerRow &&
                        innerRow?.address &&
                        innerRow?.address?.name && (
                        <Label>{`${innerRow.address.name.first &&
                            innerRow.address.name.first} ${innerRow.address.name
                          .last && innerRow.address.name.last}`}</Label>
                      )}
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
                      <Label>{`${innerRow?.address?.name?.first &&
                        innerRow?.address?.name?.first} ${innerRow?.address
                          ?.name?.last && innerRow?.address.name.last}`}</Label>
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
          <div className="page-no" key="pagination-shipment">
            <Pagination
              defaultCurrent={1}
              pageSize={10}
              total={100}
              onChange={e => setPaginationData(e)}
            />
          </div>
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
                      FILTER BY STATUS{' '}
                      <select>
                        <option>All</option>
                      </select>
                    </Label>
                  </div>
                )}
              </div>
              {<Accounts orders={userOrder} />}
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
  user: PropTypes.object,
  title: PropTypes.string,
  userOrder: PropTypes.array,
}

export default memo(AccountTabPane)
