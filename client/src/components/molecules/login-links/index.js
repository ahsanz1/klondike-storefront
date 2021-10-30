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
            onClick={e => callModal(e)}
          >
            {el.text}
          </button>
        ))}
      </div>
      <Modal visible={isModalVisible} onCancel={e => handleCancel(e)}>
        <input
          type="email"
          className="input-email"
          onChange={e => setEmail(e)}
        />
        <button type="button" onClick={e => forgotPassword(e)}>
          Send Email
        </button>
      </Modal>
    </>
  )
}

LoginLinks.propTypes = {
  links: PropTypes.array,
}

export default LoginLinks
