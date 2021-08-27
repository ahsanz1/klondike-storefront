import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from 'libs/context'
// import { Tabs } from 'antd'
import Category from 'components/organisms/category'
import PlpTabList from 'components/organisms/plp-tab-list'
// import PlpFilter from 'components/molecules/Plp-filter'
import PLPBottomSection from 'components/molecules/plpBottom'
import Button from 'components/atoms/button'
import { PlpBottom } from './data'
// import { sortProducts } from 'libs/services/algolia'
import PropTypes from 'prop-types'
import RightArrow from 'images/right-arrow.png'
import './styles.scss'
import { categoriesXPM as categories } from 'components/organisms/plp/data'

// const { TabPane } = Tabs

const PLP = props => {
  // const [tabKey, setTabKey] = useState('0')
  const [itemName, setItemName] = useState('')
  const [subItem, setSubItem] = useState({})
  // const [productList, setProductList] = useState([])
  const [showTab, setShowtab] = useState(true)
  console.log({
    props,
  })
  // const { categories } = props
  const { setStep } = useContext(AppContext)

  useEffect(() => {
    setStep(1)
  }, [])
  const clickCategoryHandler = name => {
    console.log('clicked:', name)
    setItemName(name)
  }
  const subItemHandler = list => {
    console.log('list check:', list)
    setSubItem(list)
  }
  // const changeHandler = async e => {
  //   console.log('check change:', e.target.value, itemName)
  //   let response = await sortProducts(itemName, e.target.value, 0)
  //   console.log('check resp:', response.hits)
  //   setProductList(response.hits)
  // }
  console.log('PLPBottom:', props)
  return (
    <div className="plp">
      <div className="navigation-button">
        <Button
          onClick={() => {
            setShowtab(!showTab)
          }}
        >
          Categories Navigation <img src={RightArrow} alt="pic" />
          <img src={RightArrow} alt="pic" />
        </Button>
      </div>
      {/* <div className="filter-section">
        <PlpFilter
          filterSelect={filterSelect}
          sizeProp={size}
          partNumberProp={partNumber}
          unitProp={unit}
          untitledProp={untitled}
          changeHandler={changeHandler}
        />
      </div> */}
      <div className="custom-plp">
        {showTab ? (
          <PlpTabList
            categories={categories}
            itemName={itemName}
            clickCategoryHandler={clickCategoryHandler}
            subItem={subItem}
          />
        ) : null}
        <div className="productItem">
          <Category
            categoryName={itemName}
            subItemHandler={subItemHandler}
            // productList={productList}
          />
        </div>
      </div>
      <div className="plp-bottom-section">
        {PlpBottom &&
          PlpBottom.map((item, i) => (
            <>
              <PLPBottomSection
                image={item.image}
                button={item.button}
                mobileButton={item.mobileButton}
              />
            </>
          ))}
      </div>
    </div>
  )
}

PLP.propTypes = {
  categories: PropTypes.array,
  size: PropTypes.array,
  partNumber: PropTypes.array,
  unit: PropTypes.array,
  untitled: PropTypes.array,
}

export default PLP
