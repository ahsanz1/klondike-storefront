import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { Tabs } from 'antd'

import { AppContext } from 'libs/context'
import { getOrdersByUser } from 'libs/services/api/orders.api'

import TabsDropdown from 'components/molecules/tab-dropdown'
import PageHeader from './components/PageHeader'
import AccountTabPane from './components/AccountTabPane'
import Link from 'components/atoms/link'

import { accountTabs } from './static'
import {
  getUserInfo,
  getAllOrders,
  //  getTrackOrderData
} from './utils'

import './style.scss'

const { TabPane } = Tabs

const MyAccount = ({
  title,
  logoutBtnText,
  accountTabsData,
  accountOrderFormData,
  accountAddress,
}) => {
  console.log(
    'acount adresssss muzzzaminksad111',
    accountAddress,
    accountTabsData,
  )
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [tabKey, setTabKey] = useState('0')
  const [allOrders, setAllOrders] = useState([])
  const [userOrder, setUserOrder] = useState([])
  const { user, logout, personalInfo } = useContext(AppContext)
  console.log('user info', personalInfo)

  useEffect(() => {
    if (user.accessToken) {
      setLoading(true)
      const _name = getUserInfo(user)
      setUserName(_name)

      const fetchOrders = async () => {
        const ordersByUser = await getOrdersByUser(user.accessToken)
        const _allOrders = getAllOrders(ordersByUser)

        console.log('ordersByUser: ', ordersByUser)
        console.log('allOrders: ', _allOrders)

        setUserOrder(
          ordersByUser &&
            ordersByUser.response &&
            ordersByUser.response.data &&
            ordersByUser.response.data.orders,
        )
        setAllOrders(_allOrders)
        setLoading(false)
      }

      fetchOrders()
    } else {
      navigate('/account/login')
    }
  }, [user])
  const logoutWord = logoutBtnText.split(' ')
  const logoutCapital = []
  logoutWord.forEach(element => {
    logoutCapital.push(element.charAt(0).toUpperCase() + element.substring(1))
  })
  const log = logoutCapital.join(' ')

  console.log('check join:', log)

  console.log('orders: ', allOrders)
  console.log('accountTabs: yesss   ', accountTabs)
  console.log('response check: ', userOrder)
  const handleLogout = () => {
    logout()
    navigate('account/login')
  }

  return (
    <div className="account--container">
      {!loading && (
        <>
          <div className="outer-section">
            <PageHeader
              title={title}
              userName={userName}
              logoutBtnText={log}
              onClick={handleLogout}
            />
            <div className="accounts-tabs">
              <div className="tabs-container">
                <TabsDropdown
                  activeKey={tabKey}
                  onTabClick={key => setTabKey(key)}
                >
                  {accountTabsData &&
                    accountTabsData.map((item, index) => (
                      <TabPane tab={item.tabTitle} key={index}>
                        <AccountTabPane
                          data={item.data}
                          user={personalInfo}
                          title={item.tabTitle}
                          userOrder={userOrder}
                        />
                      </TabPane>
                    ))}
                </TabsDropdown>
              </div>
              <div className="pricesheet-container">
                <Link to="/Price-List">View Price List</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

MyAccount.defaultProps = {
  title: 'Account',
  logoutBtnText: 'Log out',
  accountTabsData: [],
  accountOrderFormData: [],
}

MyAccount.propTypes = {
  title: PropTypes.string,
  logoutBtnText: PropTypes.string,
  accountTabsData: PropTypes.array,
  accountOrderFormData: PropTypes.array,
  accountAddress: PropTypes.object,
}

export default MyAccount
