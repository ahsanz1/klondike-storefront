import React, { useState, useEffect } from 'react'
import { Modal, Spin, message } from 'antd'
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons'

// import { klaviyoService } from 'libs/general-config'
import { subscribeNewsletter } from 'libs/api/klaviyo'
import { setJSONCookie, getJSONCookie } from 'libs/services/tiny-cookie'
import Input from 'components/atoms/input'
import Button from 'components/atoms/button'
import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import { newsletterData } from 'libs/data/data'
import './style.scss'

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: 'black',
    }}
    spin
  />
)
const NewsLetterModal = () => {
  const {
    title,
    subTitle,
    image,
    alertTitle,
    successImage,
    successAlertText,
    successCode,
  } = newsletterData
  // const { newsletter } = klaviyoService
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [successSubscription, setsuccessSubscription] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let newUser = getJSONCookie('NEW_USER')
    if (!newUser) {
      setTimeout(() => {
        setIsModalVisible(true)
        setJSONCookie('NEW_USER', true)
      }, 5000)
    }
  }, [])

  const signUpNewsletterHandler = async e => {
    e.preventDefault()
    const subscribeNewsletterPayload = {
      profiles: [{ email: email }],
      newsletterId: 'RhvEDG',
    }
    try {
      setLoading(true)
      let subscribeNewsletterResponse = await subscribeNewsletter(
        subscribeNewsletterPayload,
      )

      if (
        !subscribeNewsletterResponse.error &&
        subscribeNewsletterResponse.data.status === 'OK'
      ) {
        setsuccessSubscription(true)
        setEmail('')
      } else {
        subscribeNewsletterResponse.message &&
          message.info(subscribeNewsletterResponse.message)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log('Unable to subscribe. Try again')
    }
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  return (
    <>
      <Modal
        bodyStyle={{
          padding: '0',
        }}
        destroyOnClose
        centered
        wrapClassName="newsletter-modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="newsletter">
          {successSubscription ? (
            <div>
              <Image src={successImage} alt="" />
              <Label className="discount-title">
                <strong>{successAlertText}</strong>
              </Label>
              <Label className="heading-code">
                <strong>Use code: {successCode}</strong>
              </Label>
            </div>
          ) : (
            <div>
              <Label className="heading">
                <strong>{title}</strong>
              </Label>
              <Label className="sub-title">{subTitle}</Label>
              <Image src={image} alt="" />
              <form onSubmit={signUpNewsletterHandler}>
                <Input
                  placeholder="Email address"
                  required={true}
                  value={email}
                  type="email"
                  onChange={({ value }) => {
                    setEmail(value)
                  }}
                />
                <Button type="submit">
                  {loading ? <Spin indicator={antIcon} /> : 'SIGN UP'}
                </Button>
              </form>
              <Label className="discount-title">
                <strong>{alertTitle}</strong>
              </Label>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

NewsLetterModal.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  image: PropTypes.string,
  alertTitle: PropTypes.string,
}

export default NewsLetterModal
