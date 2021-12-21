import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from 'libs/context'
import Category from 'components/organisms/category'
import PlpTabList from 'components/organisms/plp-tab-list'
import SelectedCategory from 'components/molecules/selectedPlpCategory'
import Button from 'components/atoms/button'
import PropTypes from 'prop-types'
import RightArrow from 'images/right-arrow.png'
import Image from 'components/atoms/image'
import './styles.scss'
// import { navigate } from '@reach/router'

const PLP = props => {
  const { setStep, plpredirect, plpDescription } = useContext(AppContext)
  const [subItem, setSubItem] = useState({})
  const [showTab, setShowtab] = useState(true)
  const [contextPlp, setContextPlp] = useState(plpredirect)

  useEffect(() => {
    setStep(1)
    // navigate(
    //   `/category?category=${contextPlp
    //     .split(' ')
    //     .join('-')
    //     .toLowerCase()}`,
    // )
  }, [])
  useEffect(() => {
    setContextPlp(plpredirect)
    console.log('name pro:', plpredirect, contextPlp)
    // if (plpredirect !== 'Products Overview') {
    // navigate(`/category?category=${contextPlp.split(' ').join('-')}`)
    // }
  }, [plpredirect])
  const clickCategoryHandler = (name, desc) => {
    setContextPlp(name)
  }
  const subItemHandler = list => {
    setSubItem(list)
  }
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
      <SelectedCategory name={contextPlp} desc={plpDescription} />
      <div className="custom-plp">
        {showTab && (
          <PlpTabList
            categories={props.categories}
            itemName={contextPlp}
            clickCategoryHandler={clickCategoryHandler}
            subItem={subItem}
            categoryName={contextPlp}
            subItemHandler={subItemHandler}
          />
        )}
        <div className="productItem">
          <Category categoryName={contextPlp} subItemHandler={subItemHandler} />
        </div>
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
