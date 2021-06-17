import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from 'libs/context'
import { Tabs } from 'antd'
import TabsDropdown from 'components/molecules/tab-dropdown'
import Category from 'components/organisms/category'
// import { categoriesXPM as categories } from './data'
import PropTypes from 'prop-types'
import './styles.scss'

const { TabPane } = Tabs

const PLP = props => {
  const [tabKey, setTabKey] = useState('0')
  // console.log({
  //   props,
  // })
  console.log({
    props,
  })
  const { categories } = props
  const { setStep } = useContext(AppContext)

  useEffect(() => {
    setStep(1)
  }, [])
  return (
    <div className="plp">
      <TabsDropdown
        activeKey={tabKey}
        onTabClick={key => {
          setTabKey(key)
        }}
      >
        <TabPane tab={'All products'} key={'0'}>
          <div className="plp__all-products">
            {categories &&
              categories.length &&
              categories.map((item, index) => (
                <Category
                  className="plp__products-section"
                  categoryName={item.categoryName}
                  key={index}
                />
              ))}
          </div>
        </TabPane>
        {categories &&
          categories.length &&
          categories.map((item, index) => (
            <TabPane tab={item.title} key={index + 1}>
              <Category categoryName={item.categoryName} />
            </TabPane>
          ))}
      </TabsDropdown>
    </div>
  )
}

PLP.propTypes = {
  categories: PropTypes.array,
}

export default PLP
