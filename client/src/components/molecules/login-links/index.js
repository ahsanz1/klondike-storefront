import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import './style.scss'
import { resetPasswordEmail } from 'libs/services/api/pdp.api'

const LoginLinks = ({ links = [] }) => {
  let [targetEmail, setTargetEmail] = useState('')
  let [isModalVisible, setIsModalVisibleState] = useState(false)

  const callModal = e => {
    setIsModalVisibleState(true)
    console.log('modal calling')
  }

  const handleCancel = e => {
    setIsModalVisibleState(false)
  }

  const setEmail = e => {
    setTargetEmail(e.currentTarget.value)
  }

  const forgotPassword = async e => {
    if (targetEmail === '') {
      return
    }

    let res = await resetPasswordEmail({ username: targetEmail })
    if (res.hasError === true) {
      console.log('error found', res)
      // send user not found msg
    } else {
      console.log('email send', res)
      // send email send msg confirmation msg
    }
  }

  return (
    <>
      <div className="links--container">
        {links.map((el, index) => (
          <button
            key={index}
            className="links"
            type="button"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={e => callModal(e)}
          >
            {el.text}
          </button>
        ))}
      </div>
      <Modal visible={isModalVisible} onCancel={e => handleCancel(e)}>
        <div className="forgot-password-container">
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              className="label-input__input"
              onChange={e => setEmail(e)}
            />
            <button
              type="button"
              className="c-button request-form__submit-button"
              onClick={e => forgotPassword(e)}
            >
              Send Email
            </button>
          </div>
          <div>
            <img src="/static/images/logo.png" alt="logo" />
          </div>
        </div>
      </Modal>
    </>
  )
}

LoginLinks.propTypes = {
  links: PropTypes.array,
}

export default LoginLinks
