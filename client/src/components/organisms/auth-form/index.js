/* eslint-disable indent */
import React, { useContext, useState, useEffect } from 'react'
import { navigate, useLocation } from '@reach/router'
import PropTypes from 'prop-types'
// import LoginLinks from 'components/molecules/login-links'
import RequestForm from 'components/molecules/request-forms/request-form'
import CancelButton from 'components/molecules/cancel-button'
import {
  createUser,
  loginUser,
  forgotPassword,
  verifyResetToken,
  resetPassword,
} from 'libs/api/user'
import { accountCreated, klaviyoforgotPassword } from 'libs/api/klaviyo'
import { klaviyoService } from 'libs/general-config'
import { getCartByUserId, mergeCart } from 'libs/services/api/cart'
import { getItemsBySkus } from 'libs/services/api/item'
import { getLocalCart, clearCart } from 'libs/services/cart-service'
import { saveItem, removeItem } from 'libs/services/localStorage'
import { getUserDetails } from 'libs/services/api/user'
import { getSubscribableItems } from 'libs/services/api/subscriptions.api'

import { AppContext } from 'libs/context'

import './style.scss'

const AuthForm = ({
  formId = '',
  formBgColor = '',
  formTitle = '',
  mobileFormTitle = '',
  buttonLabel = '',
  formInputs = [],
  links = [], // login
  accountResetLink = '/', // register
  resetText = '', // register
  cancelBtnText = '', // forget pw
  cancelBtnLink = '', // forget pw
  showCancelBtn = false, // forget pw
  resetDetailTitle = '', // forget pw
  resetTitle = '', // forget pw
  expiredTokenTitle = '', // reset pw
  expiredTokenDescription = '', // reset pw
}) => {
  const {
    setCurrentUser,
    setPersonalInfo,
    user,
    logout,
    setLocalCart,
    clearLocalCart,
  } = useContext(AppContext)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [redirect, setRedirect] = useState('')
  const [resetPasswordLink, setResetPasswordLink] = useState()
  const [load, setLoad] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetToken, setResetToken] = useState('')
  const [isExpiredResetToken, setIsExpiredResetToken] = useState(true)
  const [resetTokenResponse, setResetTokenResponse] = useState()
  const location = useLocation()

  const form = {
    formTitle,
    mobileFormTitle,
    buttonLabel,
    formInputs,
    resetTitle,
    resetDetailTitle,
  }

  const resetLink = {
    link: accountResetLink,
    text: resetText,
  }

  const cancelButton = {
    show: showCancelBtn,
    text: cancelBtnText,
    to: cancelBtnLink,
  }

  const expiredToken = {
    title: expiredTokenTitle,
    description: expiredTokenDescription,
  }

  const mergeCartToUser = async accessToken => {
    const apiCart = await getLocalCart()
    if (apiCart) {
      const cartMerge = await mergeCart(apiCart, accessToken)
      removeItem('CART')
      removeItem('CART_ITEM')
      cartMerge && (await cartByUserId(accessToken))
    } else {
      await cartByUserId(accessToken)
    }
  }

  const cartByUserId = async accessToken => {
    const userIdCart = await getCartByUserId(accessToken)
    const skuIds =
      userIdCart &&
      userIdCart.data.items &&
      userIdCart.data.items.map(i => i.sku)
    const itemIds =
      userIdCart &&
      userIdCart.data.items &&
      userIdCart.data.items.map(i => i.itemId)
    const getPlans =
      itemIds && itemIds.length && (await getSubscribableItems(itemIds))
    const fetchItemsbySku =
      skuIds && skuIds.length && (await getItemsBySkus(skuIds))
    let createNewCart = []
    if (userIdCart && fetchItemsbySku) {
      const { items } = userIdCart.data
      items.forEach(item => {
        const userIdCartItem =
          fetchItemsbySku &&
          fetchItemsbySku.data &&
          fetchItemsbySku.data.find(({ sku }) => sku === item.sku)
        const totalBars =
          userIdCartItem &&
          userIdCartItem.attributes.find(({ name }) => {
            return name === 'TotalBars'
          })
        const size =
          userIdCartItem &&
          userIdCartItem.attributes.find(({ name }) => {
            return name === 'Size'
          })
        const findPlans =
          getPlans.response.data.data[item.itemId] &&
          getPlans.response.data.data[item.itemId].length > 0 &&
          getPlans.response.data.data[item.itemId]
            .map(plan =>
              plan.products.find(
                product =>
                  product.itemId.toString() === item.itemId.toString() &&
                  product.priceListId.toString() ===
                    item.priceListId.toString(),
              ),
            )
            .filter(i => i !== undefined)
        if (userIdCartItem && fetchItemsbySku) {
          const newItem = {
            mainImage: userIdCartItem.images[0].source[0].url,
            title:
              findPlans && findPlans.length > 0
                ? `${userIdCartItem.title} (Subscription)`
                : userIdCartItem.title,
            quantity: item.quantity,
            totalBars: totalBars && totalBars.value,
            size: size && size.value,
            price:
              item.price.discount.discountAmount > 0
                ? item.price.discount.price
                : item.price.sale
                ? item.price.sale
                : item.price.base,
            discountPrice: 0,
            itemId: item.itemId,
            lineItemId: item.lineItemId,
            weight: item.weight ? item.weight : '1',
            color: item.color ? item.color : false,
            sku: item.sku,
            totalPrice:
              item.price.discount.discountAmount > 0
                ? item.quantity * item.price.discount.price
                : item.price.sale
                ? item.quantity * item.price.sale
                : item.quantity * item.price.price,
          }
          createNewCart.push(newItem)
        }
      })
    }
    userIdCart && saveItem('CART', JSON.stringify(userIdCart.data))
    createNewCart && setLocalCart(createNewCart)
  }

  const logoutDone = () => {
    clearCart()
    clearLocalCart()
  }

  useEffect(() => {
    setError('')
    setSuccess('')
    setResetPasswordLink()
    setLoading(false)
    const redirectTo = new URLSearchParams(location.search).get('redirect')
    setRedirect(redirectTo)
    const isLogout = new URLSearchParams(location.search).get('logout')
    const token = new URLSearchParams(location.search).get('token')
    const invalidToken = new URLSearchParams(location.search).get(
      'invalid_token',
    )
    if (invalidToken) {
      setError('Password reset error.')
    }

    setResetToken(token)
    if (window.location.pathname === '/set-password') {
      if (token) {
        verifyResetToken(token)
          .then(res => {
            console.log('in then block bc')
            setResetTokenResponse(res.data)
          })
          .catch(e => {
            console.log('in catch block bc')
            setIsExpiredResetToken(false)
            setError('Invalid or expired token')
          })
      } else {
        console.log('in else block bc')
        setIsExpiredResetToken(false)
        setTimeout(() => {
          navigate('/account/login?invalid_token=true')
        }, 3000)
      }
    }

    if (isLogout) {
      logout()
      logoutDone()
      navigate('/account/login', { replace: true })
    } else if (user.accessToken) {
      navigate('/account', { replace: true })
    }
    setLoad(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data, formsIndex) => {
    console.log('login Data:', data, formsIndex)
    setLoading(true)

    if (formsIndex === 0) {
      setError('')

      // Extract values from login form
      const email = data.email
      const password = data.password

      // Construct login payload to send to Fabric for user login
      const payload = {
        username: email,
        password: password,
      }
      console.log('payload:', payload)
      const loginCall = await loginUser(payload)
      // loginUser(payload)
      //   .then(({ hasError, response }) => {
      const { response } = loginCall && loginCall
      if (!loginCall.hasError) {
        // setLoading(false)
        const nameInfo = response.data.name
        const userPersonalInfo = {
          firstName: nameInfo.first,
          middleName: nameInfo.middle,
          lastName: nameInfo.last,
          email: data.email,
          creditLimit: 5000,
        }

        const userTags =
          loginCall &&
          (await getUserDetails(response.data.accessToken, response.data._id))

        let isWholeSale = false

        if (
          userTags &&
          userTags.response.data.tags &&
          userTags.response.data.tags.includes('wholesale')
        ) {
          isWholeSale = true
        }

        const tempResponse = {
          ...response.data,
          isWholeSaleUser: isWholeSale,
        }
        setCurrentUser(tempResponse)
        setPersonalInfo(userPersonalInfo)
        setLoading(false)
        if (redirect) {
          navigate(redirect)
        } else {
          if (isWholeSale) {
            navigate(`/account`)
          } else {
            navigate(`/`)
          }
        }
        await mergeCartToUser(response.data.accessToken)
      } else {
        setError(response.error)
        setLoading(false)
      }
    }

    if (formsIndex === 2) {
      // Extract values from sign up form
      // const { firstName, lastName, email, password } = data

      const userFirstName = data.firstName
      const userLastName = data.lastName
      const userEmail = data.email
      const userPassword = data.password

      try {
        setError('')
        setResetPasswordLink()
        const response = await createUser(
          userFirstName,
          userLastName,
          '',
          userEmail,
          userPassword,
        )

        if (response) {
          setLoading(false)

          const userPersonalInfo = {
            firstName: userFirstName,
            middleName: data.hasOwnProperty('middleName')
              ? data.middleName
              : '',
            lastName: userLastName,
            email: userEmail,
          }
          const accountCreatedPayLoad = {
            klaviyoApiKey: klaviyoService.trackApiId.trackApiKey,
            email: userEmail,
            name: {
              first: userFirstName,
              last: userLastName,
            },
            phone: '',
          }
          accountCreated(accountCreatedPayLoad).then(res => {
            // if (!res.error) {
            setPersonalInfo(userPersonalInfo)
            setCurrentUser(response.data)
            navigate(`/`)
            // } else {
            //   setLoading(false)
            //   setResetPasswordLink()
            //   setError('Unable to create account. Try again')
            // }
          })
        } else {
          setLoading(false)
          setResetPasswordLink()
          setError('Unable to create account. Try again')
        }
      } catch (e) {
        setLoading(false)

        if (e.response.status === 406) {
          setError(
            'This email address is already associated with an account. If this account is yours, you can ',
          )
          setResetPasswordLink({
            link: '/account/forgetpassword',
            text: ' reset your password',
          })
        } else if (e.response.data.message) {
          setResetPasswordLink()
          setError(e.response.data.message)
        } else {
          setResetPasswordLink()
          setError('Unable to create account. Try again')
        }
      }
    }

    if (formsIndex === 3) {
      setError('')
      setSuccess('')

      forgotPassword(data.email)
        .then(({ hasError, response }) => {
          if (!hasError) {
            const klaviyoForgotPasswordPayload = {
              klaviyoApiKey: klaviyoService.trackApiId.trackApiKey,
              email: data.email,
              token: response.data.token,
            }

            klaviyoforgotPassword(klaviyoForgotPasswordPayload).then(res => {
              if (!res.error) {
                setLoading(false)
                setError('')
                setSuccess(
                  'An Email has been sent successfully to reset your password...!',
                )
              } else {
                setLoading(false)
                setError(
                  'Sorry, Something went wrong. Could not proceed further...',
                )
                // setError(res.message)
              }
            })
          } else if (hasError) {
            console.log('in else if kbc')
            setLoading(false)
            setError(response.error)
          } else {
            console.log('in else kbc')
            setLoading(false)
            setError('User not found.')
          }
        })
        .catch(e => {
          console.log('e catch fff', e)
          setLoading(false)
          setError('Sorry, Something went wrong.')
        })
    }

    if (formsIndex === 4) {
      setError('')
      setSuccess('')
      console.log('data check', data)
      if (data.password === data.resetpassword) {
        const resetPasswordPayload = {
          resetToken: resetToken,
          userId: resetTokenResponse.userId,
          newPassword: data.password,
        }

        try {
          const response = await resetPassword(resetPasswordPayload)
          setLoading(false)
          if (!response.error) {
            setSuccess('Password has been reset successfully.')
            setTimeout(() => navigate('/account/login'), 3000)
          }
        } catch (e) {
          setSuccess('')
          setLoading(false)
          setError(e.response.data.message)
        }
      } else {
        setError(
          "Sorry! Password and Confirm password does not match, couldn't proceed further",
        )
        setSuccess('')
        setLoading(false)
      }
    }
  }

  return (
    <div className="generic--form--container">
      {load && (
        <>
          {isExpiredResetToken ? (
            <>
              {' '}
              <RequestForm
                resetPasswordLink={resetPasswordLink}
                success={success}
                loading={loading}
                formBgColor={formBgColor}
                form={form}
                onFormSubmit={onSubmit}
                formsIndex={Number(formId)}
                error={error}
                resetLink={resetLink}
                links={links}
              />
              {cancelButton.show && <CancelButton data={cancelButton} />}
              {/* {links && <LoginLinks links={links} />} */}
            </>
          ) : (
            <div className="tokenExpiredTitle">
              <h1>{expiredToken.title}</h1>
              <p className="expiredText">{expiredToken.description}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

AuthForm.propTypes = {
  formId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formBgColor: PropTypes.string,
  formTitle: PropTypes.string,
  mobileFormTitle: PropTypes.string,
  buttonLabel: PropTypes.string,
  formInputs: PropTypes.string,
  links: PropTypes.array,
  accountResetLink: PropTypes.string,
  resetText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  cancelBtnLink: PropTypes.string,
  showCancelBtn: PropTypes.bool,
  expiredTokenTitle: PropTypes.string,
  expiredTokenDescription: PropTypes.string,
  resetTitle: PropTypes.string,
  resetDetailTitle: PropTypes.string,
}

export default AuthForm
