import React, { useContext, useState, useEffect } from 'react'
import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import './style.scss'
import { AppContext } from 'libs/context'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import FloatInput from 'components/atoms/floating-input'

const validationSchema = Yup.object().shape({
  isEmail: Yup.string().required('Enter a valid email'),
})

const UserEmailLogin = ({ bindSubmitForm }) => {
  const {
    logout,
    personalInfo,
    sigunUpforExclusiveOffers,
    setSigunUpforExclusiveOffers,
    setCheckoutEmail,
    setEmailDone,
    checkoutEmail,
  } = useContext(AppContext)

  const [dummy, setDummy] = useState('')

  useEffect(() => {
    dummy && console.log({ dummy })
    setEmailDone(true)
    setCheckoutEmail(dummy)
  }, [dummy])

  const handleLogout = () => {
    logout()
  }
  return (
    <div className="user-contact-info">
      <div className="user-contact-headings">
        <Label className="contact-info-heading">Contact information</Label>
        {Object.keys(personalInfo).length === 0 && (
          <Label className="contact-info-login">
            Already have an account?
            <Link
              to="/account/login?redirect=/checkout"
              className="contact-info-login-link"
            >
              {' '}
              Log in
            </Link>
          </Label>
        )}
      </div>
      {personalInfo && Object.keys(personalInfo).length > 0 ? (
        <div className="contact-info-boxq">
          {/* <div className="contact-info-box-avatar" /> */}
          <Image
            src="/static/icons/account-avatar.png"
            alt="avatar"
            className="contact-info-box-avatar"
          />
          <div className="contact-info-box-details">
            <Label className="contact-info-box-title">
              {`${personalInfo.firstName} ${personalInfo.lastName} (${personalInfo.email})`}
            </Label>
            <Link
              onClick={handleLogout}
              to="/checkout"
              className="contact-info-box-link"
            >
              Log out
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Formik
            initialValues={{
              isEmail: checkoutEmail ? checkoutEmail.isEmail : '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              setDummy(values)
              setSubmitting(false)
              console.log({ values }, 'email')
            }}
            validationSchema={validationSchema}
          >
            {values => {
              bindSubmitForm(values.submitForm)
              return (
                <form onSubmit={values.handleSubmit}>
                  <div className="contact-info-email">
                    <FloatInput
                      label="Email"
                      name="isEmail"
                      type="email"
                      value={values.values.isEmail}
                    />
                  </div>
                </form>
              )
            }}
          </Formik>
        </>
      )}
      <div className="signup-offer">
        <Checkbox
          className="signup-offer-checkbox"
          onClick={() =>
            setSigunUpforExclusiveOffers(!sigunUpforExclusiveOffers)
          }
        />
        <Label>
          Sign up for exclusive offers and news via text messages email.
        </Label>
      </div>
    </div>
  )
}
UserEmailLogin.propTypes = {
  bindSubmitForm: PropTypes.func,
}
export default UserEmailLogin
