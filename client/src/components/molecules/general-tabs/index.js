import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'
import { Tabs } from 'antd'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'

const GeneralTabs = ({ tabs }) => {
  const { TabPane } = Tabs

  return (
    <div className="all-tabs">
      <Tabs defaultActiveKey="1">
        {tabs.map((tab, i) => (
          <TabPane
            tab={
              <Image
                src={tab.tabImage}
                alt="alt"
                className="tab-select-image"
              />
            }
            key={i + 1}
            className="tabs-pan"
          >
            <div className="tab-description">
              <Link to={tab.tabDescLink} className="tab-link">
                <Image
                  src={tab.tabDescImage}
                  alt="alt"
                  className="tab-desc-image"
                />
              </Link>
              <Link to={tab.tabDescLink} className="tab-link">
                <Label className="tab-desc-text">{tab.tabDescText}</Label>
              </Link>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

GeneralTabs.propTypes = {
  tabs: PropTypes.array,
}

export default GeneralTabs
