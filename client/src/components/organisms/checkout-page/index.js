import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from '@reach/router'
import { AppContext } from 'libs/context'
import './style.scss'
import CheckoutPageCart from 'components/molecules/checkout/checkout-page-cart'
import CheckoutFormsPage from 'components/molecules/checkout/checkout-forms-page'
import CheckoutHeader from 'components/molecules/checkout/checkout-header'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { viewCheckout } from 'libs/utils/gtm'
import CheckoutFooter from 'components/molecules/checkout/checkout-footer'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const CheckoutPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { step, personalInfo } = useContext(AppContext)
  const handleGuestNavigation = () => {
    const userSignedIn = !!(
      personalInfo && Object.keys(personalInfo).length > 0
    )
    if (!userSignedIn) {
      const localCartItems = JSON.parse(
        window.localStorage.getItem('CART_ITEMS'),
      )
      localCartItems.forEach(cartItem => {
        if (cartItem.subscription) {
          navigate('/account/login')
        }
      })
    }
  }
  useEffect(() => {
    console.log('checkout')
    setLoading(true)
    const getLocalCart = JSON.parse(window.localStorage.getItem('CART_ITEMS'))
    if (getLocalCart && getLocalCart.length) {
      setLoading(false)
      getLocalCart && viewCheckout(getLocalCart)
    } else {
      navigate('/collections/all-bars')
    }
    handleGuestNavigation()
  }, [])
  return loading ? (
    <Spin indicator={antIcon} />
  ) : (
    <div className="checkout-page">
      <div className="checkout-header-form">
        <CheckoutHeader />
        <CheckoutFormsPage />
        {step !== 4 && <CheckoutFooter />}
      </div>
      <CheckoutPageCart />
    </div>
  )
}

export default CheckoutPage
