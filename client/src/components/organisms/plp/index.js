import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from 'libs/context'
import Category from 'components/organisms/category'
import PlpTabList from 'components/organisms/plp-tab-list'
import PLPBottomSection from 'components/organisms/plpBottom'
import SelectedCategory from 'components/molecules/selectedPlpCategory'
import Button from 'components/atoms/button'
import PropTypes from 'prop-types'
import RightArrow from 'images/right-arrow.png'
import Image from 'components/atoms/image'
import './styles.scss'

const PLP = props => {
  const { setStep, plpredirect, setPlpRedirect } = useContext(AppContext)
  const [desc, setDesc] = useState('')
  const [subItem, setSubItem] = useState({})
  const [showTab, setShowtab] = useState(true)
  const [contextPlp, setContextPlp] = useState(plpredirect)
  console.log('contextPlp', contextPlp)
  setPlpRedirect(contextPlp)
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
  console.log('PLP-props:', props.mobileBanner)
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
      <Image
        src={props.mobileBanner.url}
        alt={props.mobileBanner.alt}
        style={{ marginBottom: '23px' }}
        className="mobile-banner"
      />
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
  mobileBanner: PropTypes.object,
}

export default PLP
