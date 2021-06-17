/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import { useWindowSize } from 'libs/custom-hooks'
import Dropdown from 'components/atoms/native-dropdown'
import { MOBILE_RES } from './constant'
import './styles.scss'
const TabsDropdown = ({ activeKey, onTabClick, children }) => {
  const [width] = useWindowSize()

  const toItems = panes => {
    let items = []
    panes.forEach(pane => {
      if (Array.isArray(pane)) {
        pane.forEach(subPane => {
          items.push({
            value: subPane.key,
            label: subPane.props.tab,
          })
        })
      } else {
        items.push({
          value: pane.key,
          label: pane.props.tab,
        })
      }
    })
    return items
  }
  return (
    <Tabs
      className="tabs-dropdown"
      activeKey={activeKey}
      onTabClick={onTabClick}
      renderTabBar={
        width <= MOBILE_RES
          ? tabProps => (
              <div className="tabs-dropdown__dropdown-wrapper">
                <Dropdown
                  className="tabs-dropdown__dropdown"
                  items={toItems(tabProps.panes)}
                  value={activeKey}
                  onChange={onTabClick}
                />
              </div>
            )
          : undefined
      }
    >
      {children}
    </Tabs>
  )
}

TabsDropdown.propTypes = {
  activeKey: PropTypes.string,
  onTabClick: PropTypes.func,
  children: PropTypes.node,
}

export default TabsDropdown
