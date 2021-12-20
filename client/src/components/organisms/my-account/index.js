import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { Tabs } from 'antd'

import { AppContext } from 'libs/context'

import TabsDropdown from 'components/molecules/tab-dropdown'
import PageHeader from './components/PageHeader'
import AccountTabPane from './components/AccountTabPane'
import Link from 'components/atoms/link'
import { getUserInfo } from './utils'

import './style.scss'

const { TabPane } = Tabs

const MyAccount = ({ title, logoutBtnText, accountTabsData }) => {
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [tabKey, setTabKey] = useState('0')
  const { user, logout } = useContext(AppContext)

  useEffect(() => {
    const setData = async () => {
      if (user.accessToken) {
        setLoading(true)
        const _name = await getUserInfo(user)
        setUserName(_name)
        setLoading(false)
      } else {
        navigate('/account/login')
      }
    }

    setData()
  }, [user])

  const logoutWord = logoutBtnText.split(' ')
  const logoutCapital = []
  logoutWord.forEach(element => {
    logoutCapital.push(element.charAt(0).toUpperCase() + element.substring(1))
  })
  const log = logoutCapital.join(' ')
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
                  className="account-dropdown"
                  activeKey={tabKey}
                  onTabClick={key => setTabKey(key)}
                >
                  {accountTabsData &&
                    accountTabsData.map((item, index) => (
                      <TabPane tab={item.tabTitle} key={index}>
                        <AccountTabPane
                          data={item.data}
                          title={item.tabTitle}
                        />
                      </TabPane>
                    ))}
                </TabsDropdown>
              </div>
              <div className="pricesheet-container">
                <Link to="/price-list">View Price List</Link>
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
