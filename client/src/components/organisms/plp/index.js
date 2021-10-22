import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from 'libs/context'
// import { Tabs } from 'antd'
import Category from 'components/organisms/category'
import PlpTabList from 'components/organisms/plp-tab-list'
// import PlpFilter from 'components/molecules/Plp-filter'
import PLPBottomSection from 'components/organisms/plpBottom'
import SelectedCategory from 'components/molecules/SelectedPlpCategory'
import Button from 'components/atoms/button'
// import { PlpBottom } from './data'
// import { sortProducts } from 'libs/services/algolia'
import PropTypes from 'prop-types'
import RightArrow from 'images/right-arrow.png'
import './styles.scss'
// import { categoriesXPM as categories } from 'components/organisms/plp/data'

// const { TabPane } = Tabs

const PLP = props => {
  const { setStep, plpredirect } = useContext(AppContext)
  // const [tabKey, setTabKey] = useState('0')
  // const [itemName, setItemName] = useState('')
  const [desc, setDesc] = useState('')
  const [subItem, setSubItem] = useState({})
  const [showTab, setShowtab] = useState(true)
  const [contextPlp, setContextPlp] = useState(plpredirect)
  useEffect(() => {
    setStep(1)
  }, [])
  useEffect(() => {
    setContextPlp(plpredirect)
  }, [plpredirect])
  const clickCategoryHandler = (name, desc) => {
    // setItemName(name)
    setContextPlp(name)
    setDesc(desc)
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
      <SelectedCategory name={contextPlp} desc={desc} />
      <div className="custom-plp">
        {showTab && (
          <PlpTabList
            categories={props.categories}
            itemName={contextPlp}
            clickCategoryHandler={clickCategoryHandler}
            subItem={subItem}
          />
        )}
        <div className="productItem">
          <Category categoryName={contextPlp} subItemHandler={subItemHandler} />
        </div>
      </div>
      <div className="plp-bottom-section">
        {props.plpBottom &&
          props.plpBottom.map((item, i) => (
            <>
              <PLPBottomSection
                image={item.plpBottomImage}
                button={item.button}
                mobileButton={item.mobileButton}
                buttonUrl={item.buttonUrl}
                mobileButtonUrl={item.mobileButtonUrl}
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
  plpBottom: PropTypes.array,
}

export default PLP
