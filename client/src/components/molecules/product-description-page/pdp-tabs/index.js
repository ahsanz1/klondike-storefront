import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import TabsDropdown from 'components/molecules/tab-dropdown'

const { TabPane } = Tabs

const PDPTabs = ({ descriptions = [] }) => {
  const [tabKey, setTabKey] = useState('0')
  const [tabData, setTabData] = useState([])

  useEffect(() => {
    if (!tabData.length && descriptions.length) {
      const order = ['Ingredients', 'description', 'Net Carbs']
      const _tabs = [...descriptions]

      _tabs.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title))
      _tabs.map(
        item =>
          item.title === 'Net Carbs' && (item.title = 'Nutrition & Net Carbs'),
      )

      setTabData(_tabs)
    }
  }, [descriptions, tabData.length])

  return (
    <TabsDropdown
      activeKey={tabKey}
      onTabClick={key => {
        setTabKey(key)
      }}
    >
      {tabData.map(({ title, description }, i) => (
        <TabPane key={i} tab={title}>
          <div className="ff">
            <div
              dangerouslySetInnerHTML={{
                __html: `${description || '<div></div>'}`,
              }}
            ></div>
          </div>
        </TabPane>
      ))}
    </TabsDropdown>
  )
}

PDPTabs.propTypes = {
  descriptions: PropTypes.array,
}

export default PDPTabs
