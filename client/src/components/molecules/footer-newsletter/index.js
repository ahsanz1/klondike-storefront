import React, { useState } from 'react'

import PropTypes from 'prop-types'
import { validators } from 'libs/utils/validators'
import IconInput from 'components/molecules/icon-input'
import Label from 'components/atoms/label'
import { successSubscribeMsg, successCheckEmialMsg } from './constant'
import './style.scss'

const FooterNewsletter = ({
  iconInputProps = {},
  newsLetterTitle = '',
  newsLetterDesc = '',
  onFormSubmit,
  isInput = false,
  isSuccess = false,
  isError = false,
  loading = false,
}) => {
  const [inputValue, setInputValue] = useState('')
  // const [isInput, setIsInput] = useState(true)
  // const [isSuccess, setIsSuccess] = useState(false)
  // const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeHandler = value => {
    setInputValue(value)
    setErrorMsg('')
    // setIsError(false)
  }
  const onSubmit = e => {
    e.preventDefault()

    let isRequiredError = validators.isRequired(inputValue)
    let isEmailError = validators.isEmail(inputValue)
    if (!isRequiredError.status) {
      setErrorMsg(isRequiredError.errorMessage)
    } else if (!isEmailError.status) {
      setErrorMsg(isEmailError.errorMessage)
    }
    if (isRequiredError.status && isEmailError.status) {
      onFormSubmit(inputValue)
    }
  }

  return (
    <div className="footer-column newsletter-column">
      <h3>NewsLetter</h3>
      <form onSubmit={onSubmit}>
        {isInput && (
          <IconInput
            {...iconInputProps}
            onChangeHandler={onChangeHandler}
            inputValue={inputValue}
            loading={loading}
          />
        )}
        {isSuccess && (
          <>
            <Label className="success-thanks">{successSubscribeMsg}</Label>
            <Label className="success-email">{successCheckEmialMsg}</Label>
          </>
        )}
        <Label
          style={{
            color: 'red',
          }}
        >
          {errorMsg}
        </Label>
        {isError && (
          <Label
            style={{
              color: 'red',
            }}
          >
            Unable to subscribe. Try again
          </Label>
        )}
      </form>
      <div className="newsletter-inputwrap">
        <div className="newsletter-text">
          <Label>{newsLetterTitle}</Label>
          <Label>{newsLetterDesc}</Label>
        </div>
      </div>
    </div>
  )
}

FooterNewsletter.propTypes = {
  iconInputProps: PropTypes.object,
  newsLetterTitle: PropTypes.string,
  newsLetterDesc: PropTypes.string,
  onFormSubmit: PropTypes.func,
  isInput: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  loading: PropTypes.bool,
}

export default FooterNewsletter
