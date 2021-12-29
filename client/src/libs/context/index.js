import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { getItem } from 'libs/services/localStorage/localStorage'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import { CartReducer, sumItems } from './app-reducer'
import { setUserCart } from 'libs/utils/user-cart'

const AppContext = React.createContext({})
const AppProvider = ({ children }) => {
  const [cartAmount, setCartAmount] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [searchFilter, setSearchFilter] = useState([])
  const [plpredirect, setPlpRedirect] = useState('nano')
  const [plpDescription, setPlpDescription] = useState([])
  const [loginBottom, setLoginBottom] = useState(false)
  const [step, setStep] = useState(1)
  const [checked, setChecked] = useState(0)
  const [AllOrders, setAllOrders] = useState('')
  const [orders, setOrders] = useState([])
  const [totalOrders, setTotalOrders] = useState(0)
  const [shippingServicePrice, setShippingServicePrice] = useState('')
  const [shippingServiceName, setShippingServiceName] = useState('')
  const [formikValues, setFormikValues] = useState({})
  const [submitPayment, setSubmitPayment] = useState(false)
  const [shippingAddress, setShippingAddress] = useState('')
  const [enableSecondStep, setEnableSecondStep] = useState(false)
  const [enableThirdStep, setEnableThirdStep] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [cartPopupModal, setCartPopupModal] = useState(false)
  const [cartProducts, setCartProducts] = useState([])
  const [pdpPurchaseType, setPdpPurchaseType] = useState(1)
  const [pdpSubscriptionType, setPdpSubscriptionType] = useState(
    'ShipEveryWeek',
  )
  const [pdpSwagSize, setPdpSwagSize] = useState('')
  const [getCartItems, setGetCartItemsState] = useState('')
  const [pdpProductData, setPdpProductData] = useState({})
  const [pdpWholeItemQuantity, setPdpWholeItemQuantity] = useState(1)
  const [pdpUserSize, setPdpUserSize] = useState()
  const [pdpCustomCaseFlavour, setPdpCustomCaseFlavour] = useState([])
  const [pdpCustomCaseTotal, setPdpCustomCaseTotal] = useState(1)
  const [demoCart, setDemoCart] = useState({})
  const [apiButtonCalled, setApiButtonCalled] = useState(false)
  const [shippingRates, setShippingRates] = useState([])
  const [paymentInfo, setPaymentInfo] = useState({})
  const [billingAddress, setBillingAddress] = useState({})
  const [shippingDone, setShippingDone] = useState(false)
  const [billingDone, setBillingDone] = useState(false)
  const [emailDone, setEmailDone] = useState(false)
  const [payDone, setPayDone] = useState(false)
  const [paymentIndex, setPaymentIndex] = useState(0)
  const [billingIndex, setBillingIndex] = useState(0)
  const [cartData, setCartData] = useState({})
  const [cartState, setCartState] = useState('')
  const [checkoutData, setCheckoutData] = useState({})
  const [size] = useWindowSize()
  const initialState = {
    personalInfo: getItem('userPersonalInfo')
      ? JSON.parse(getItem('userPersonalInfo'))
      : {},
    user: getItem('x-sd-user') ? JSON.parse(getItem('x-sd-user')) : {},
    cartItems: [],
    shippinggAddress: {},
    ...sumItems([]),
  }
  const [state, dispatch] = useReducer(CartReducer, initialState)
  const [myAccountForm, setMyAccountForm] = useState([])
  const [isNewAddress, setIsNewAddress] = useState(false)
  const [miniCartLoading, setMiniCartLoading] = useState(false)
  const [totalCheckoutCost, setTotalCheckoutCost] = useState('')
  const [sigunUpforExclusiveOffers, setSigunUpforExclusiveOffers] = useState(
    false,
  )
  const [payNowSpinner, setPayNowSpinner] = useState(false)
  const [checkoutEmail, setCheckoutEmail] = useState({})
  const [sameBillingShippingAddress, setSameBillingShippingAddress] = useState(
    true,
  )
  const [subscribed, setSubscribed] = useState(true)
  const [subscribedItemData, setSubscribedItemData] = useState({})
  const [subscribedPlpData, setSubscribedPlpData] = useState([])
  const [subscriptionBillingInfo, setSubscriptionBillingInfo] = useState({})
  const [getSearchParam, setGetSearchParam] = useState('')
  const [itemList, setItemList] = useState([])
  const [loadingState, setLoadingState] = useState(false)
  const [creditLimit, setCreditLimit] = useState(
    initialState?.personalInfo?.creditLimit || 5000,
  )

  const [appLanguage, setAppLanguage] = useState('')

  const handleAppLanguage = (appLang = '/auto/en') => {
    window.localStorage.setItem('kd-lang', JSON.stringify(appLang))

    setAppLanguage(appLang)
  }

  const handleDisplayForm = () => {
    setIsNewAddress(!isNewAddress)
  }

  const showModal = async () => {
    setMiniCartLoading(true)
    setIsModalVisible(true)

    if (size > 768) {
      document.body.style.overflow = 'visible'
    }

    setGetCartItemsState(await setUserCart())
    setMiniCartLoading(false)
  }

  const showcartPOPModal = () => {
    setCartPopupModal(true)
    document.body.style.overflow = 'visible'
  }
  const closePopUpModal = () => {
    setCartPopupModal(false)
    document.body.style.overflow = 'visible'
  }

  const closeModal = () => {
    setIsModalVisible(false)
    document.body.style.overflow = 'visible'
  }

  const addProduct = (payload, apiCart) => {
    dispatch({ type: 'ADD_ITEM', payload: payload, apiCart: apiCart })
  }

  const removeProduct = payload => {
    dispatch({ type: 'REMOVE_ITEM', payload })
  }

  const setLocalCart = payload => {
    payload && dispatch({ type: 'SET_LOCAL_CART', payload })
  }

  const setCurrentUser = payload => {
    dispatch({
      type: 'SET_CURRENT_USER',
      payload,
    })
  }

  const setPersonalInfo = payload => {
    dispatch({
      type: 'SET_PERSONAL_INFO',
      payload,
    })
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    })
  }

  const settShippingAddress = payload => {
    dispatch({
      type: 'SET_SHIPPING_ADDRESS',
      payload,
    })
  }

  const removeProductFromCart = (payload, lineItemId) => {
    dispatch({
      type: 'REMOVE_PRODUCT_FROM_CART',
      payload: payload,
      lineItemId: lineItemId,
    })
  }

  const updateCart = (item, cartResponse) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { item, cartResponse },
    })
  }

  const clearLocalCart = () => {
    dispatch({
      type: 'CLEAR_LOCAL_CART',
    })
  }

  const goToNextStep = () => {
    return setStep(step + 1)
  }

  const goToPreviousStep = () => {
    return setStep(step - 1)
  }

  const handleCheckedChange = (e, id, name) => {
    setShippingServiceName(name)
    console.log({ name })
    setShippingServicePrice(e.target.value)
    setChecked(id)
    const totalPrice = parseInt(state.subTotal) + parseInt(shippingServicePrice)
    setTotalCheckoutCost(totalPrice)
  }

  const setSubmit = () => {
    console.log('setSubmit called')
    return setSubmitPayment(true)
  }
  const removeFormAddress = key => {
    window.confirm('Are you sure you wish to delete this item?') &&
      setMyAccountForm(myAccountForm.filter(item => item.id !== key))
    scrollToTop()
  }
  const scrollToTop = () => {
    return window.scrollTo(0, 0)
  }

  return (
    <AppContext.Provider
      value={{
        setCartState,
        cartState,
        setCartAmount,
        cartAmount,
        removeProduct,
        addProduct,
        searchKey,
        setSearchKey,
        searchFilter,
        setSearchFilter,
        plpredirect,
        setPlpRedirect,
        plpDescription,
        setPlpDescription,
        loginBottom,
        setLoginBottom,
        step,
        setStep,
        goToNextStep,
        goToPreviousStep,
        checked,
        setChecked,
        shippingServicePrice,
        setShippingServicePrice,
        handleCheckedChange,
        shippingServiceName,
        setShippingServiceName,
        AllOrders,
        setAllOrders,
        formikValues,
        setFormikValues,
        submitPayment,
        setSubmit,
        setOrders,
        orders,
        setTotalOrders,
        totalOrders,
        setSubmitPayment,
        shippingAddress,
        setShippingAddress,
        enableSecondStep,
        setEnableSecondStep,
        enableThirdStep,
        setEnableThirdStep,
        isModalVisible,
        showModal,
        cartPopupModal,
        cartProducts,
        setCartProducts,
        setCartPopupModal,
        showcartPOPModal,
        closePopUpModal,
        closeModal,
        getCartItems,
        miniCartLoading,
        setMiniCartLoading,
        setGetCartItemsState,
        pdpPurchaseType,
        setPdpPurchaseType,
        pdpSubscriptionType,
        setPdpSubscriptionType,
        pdpWholeItemQuantity,
        setPdpWholeItemQuantity,
        pdpSwagSize,
        setPdpSwagSize,
        pdpUserSize,
        setPdpUserSize,
        pdpCustomCaseFlavour,
        setPdpCustomCaseFlavour,
        pdpCustomCaseTotal,
        setPdpCustomCaseTotal,
        demoCart,
        setDemoCart,
        myAccountForm,
        setMyAccountForm,
        removeFormAddress,
        isNewAddress,
        handleDisplayForm,
        scrollToTop,
        setCurrentUser,
        setPersonalInfo,
        logout,
        setLocalCart,
        updateCart,
        apiButtonCalled,
        setApiButtonCalled,
        removeProductFromCart,
        totalCheckoutCost,
        shippingRates,
        setShippingRates,
        sigunUpforExclusiveOffers,
        setSigunUpforExclusiveOffers,
        paymentInfo,
        setPaymentInfo,
        billingAddress,
        setBillingAddress,
        clearLocalCart,
        payNowSpinner,
        setPayNowSpinner,
        checkoutEmail,
        setCheckoutEmail,
        sameBillingShippingAddress,
        setSameBillingShippingAddress,
        subscribed,
        setSubscribed,
        subscribedItemData,
        setSubscribedItemData,
        subscribedPlpData,
        setSubscribedPlpData,
        subscriptionBillingInfo,
        setSubscriptionBillingInfo,
        shippingDone,
        setShippingDone,
        emailDone,
        setEmailDone,
        settShippingAddress,
        billingDone,
        setBillingDone,
        payDone,
        setPayDone,
        paymentIndex,
        setPaymentIndex,
        billingIndex,
        setBillingIndex,
        pdpProductData,
        setPdpProductData,
        cartData,
        setCartData,
        checkoutData,
        setCheckoutData,
        creditLimit,
        setCreditLimit,
        getSearchParam,
        setGetSearchParam,
        itemList,
        setItemList,
        loadingState,
        setLoadingState,
        appLanguage,
        handleAppLanguage,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.object,
}

export { AppContext, AppProvider }
