/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import { Modal } from 'antd'
import { termOfService, refundPolicy, textMarketing } from 'libs/data/data'

import './style.scss'

const CheckoutFooter = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showRefundPolicy, setShowRefundPolicy] = useState(false)
  const [showShippingPolicy, setShowShippingPolicy] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [tos, setTos] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="checkout-footer">
      <div className="checkout-policy-links">
        <div
          className="checkout-policy-link"
          onClick={() => {
            showModal()
            setShowRefundPolicy(true)
            setShowShippingPolicy(false)
            setMarketing(false)
            setTos(false)
          }}
        >
          Refund Policy
        </div>
        {showRefundPolicy && (
          <Modal
            title="Refund Policy"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <p dangerouslySetInnerHTML={{ __html: refundPolicy }}></p>
          </Modal>
        )}
        <div
          className="checkout-policy-link"
          onClick={() => {
            showModal()
            setShowShippingPolicy(true)
            setShowRefundPolicy(false)
            setMarketing(false)
            setTos(false)
          }}
        >
          Shipping Policy
        </div>
        {showShippingPolicy && (
          <Modal
            title="Shipping policy"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <p>We offer free shipping in the US for all orders of $20+.</p>
          </Modal>
        )}
      </div>
      <div
        className="checkout-policy-link"
        onClick={() => {
          showModal()
          setShowShippingPolicy(false)
          setShowRefundPolicy(false)
          setMarketing(true)
          setTos(false)
        }}
      >
        {textMarketing}
      </div>
      {marketing && (
        <Modal
          title={textMarketing}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <p dangerouslySetInnerHTML={{ __html: textMarketing }}></p>
        </Modal>
      )}
      <div
        className="tos-link checkout-policy-link"
        onClick={() => {
          showModal()
          setShowShippingPolicy(false)
          setShowRefundPolicy(false)
          setMarketing(true)
          setTos(true)
        }}
      >
        Terms of service
      </div>
      {tos && (
        <Modal
          title="Terms of Services"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <p dangerouslySetInnerHTML={{ __html: termOfService }}></p>
        </Modal>
      )}
    </div>
  )
}

export default CheckoutFooter
