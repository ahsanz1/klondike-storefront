/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context/index'
import { saveItem, getItem } from 'libs/services/localStorage'
import { fetchCart } from 'libs/services/cart-service'
import { useLocation, useNavigate } from '@reach/router'
import { init } from 'libs/utils/gtm'
import Header from 'components/organisms/header'
import Footer from 'components/organisms/footer'
import { footerConstants } from 'components/organisms/app-shell/footer-constants'
import { Header as HeaderData } from 'components/organisms/app-shell/header.constant'
import './styles.scss'

const AppShell = ({ children = null }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { setLocalCart, user } = useContext(AppContext)
  useEffect(() => {
    const fetchData = async () => {
      const getLocalCart = await JSON.parse(window.localStorage.getItem('CART'))
      let getfetch = getLocalCart && (await fetchCart(getLocalCart._id))
      getfetch && saveItem('CART', JSON.stringify(getfetch.cartResponse.data))
      getfetch && setLocalCart(getfetch.processCartResponse)
    }
    fetchData()
  }, [])
  // console.log({
  //   gc: getJSON('gc'),
  // })

  useEffect(() => {
    if (
      location.pathname === '/collections/wholesale' &&
      (!user || (user && !user.isWholeSaleUser))
    ) {
      navigate('/')
    } else if (
      location.pathname === '/collections/all-bars' &&
      user &&
      user.isWholeSaleUser
    ) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    init()
  }, [])
  const getLocal = JSON.parse(getItem('gc'))
  console.log({ getLocal })
  // const gc = getJSON('gc')
  const headetGc = (getLocal &&
    getLocal.find(item => item.id === 'Header')) || {
    params: HeaderData,
  }
  const footerGc = (getLocal &&
    getLocal.find(item => item.id === 'Footer')) || {
    params: footerConstants,
  }
  return (
    <div
      className="app-shell"
      ref={r => {
        if (r) {
          r.style.opacity = '1'
        }
      }}
    >
      {location.pathname !== '/checkout' && <Header {...headetGc.params} />}
      {children}
      {location.pathname !== '/checkout' && <Footer {...footerGc.params} />}
    </div>
  )
}

AppShell.propTypes = {
  children: PropTypes.node,
}

export default AppShell
