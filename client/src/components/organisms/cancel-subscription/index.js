import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from '@reach/router'
import PropTypes from 'prop-types'
import './style.scss'

import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import Heading from 'components/atoms/heading'
import SubscriptionTextArea from 'components/molecules/subcription-textarea'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
import { updateSubscription } from 'libs/services/api/subscriptions.api'
import requireAuth from 'libs/hoc/authHOC'

const CancelSubscription = ({
  sidebarData,
  headingText,
  secondaryText,
  swapProductBtnTxt,
  cancelSubBtnTxt,
  reasonsText,
  reasonsList,
}) => {
  const [showReasons, setShowReasons] = useState(false)
  const [showReasonTextArea, setShowReasonTextArea] = useState(false)
  const [reasonText, setReasonText] = useState('')
  const [productTitle, setProductTitle] = useState('')

  const [subId, setSubId] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const getSubscription = new URLSearchParams(location.search).get('subId')
    getSubscription && setSubId(getSubscription)
    const title = new URLSearchParams(location.search).get('product')
    title && setProductTitle(title)
  }, [])

  const handleCancelBtnClick = () => {
    setShowReasons(true)
  }

  const handleReasonSelect = text => {
    setShowReasons(false)
    setReasonText(text)
    setShowReasonTextArea(true)
  }

  useEffect(() => {
    console.log(reasonText)
  }, [reasonText])

  const cancelSubscription = async () => {
    const payload = {
      status: 'CANCEL',
      cancellationReason: reasonText,
    }
    const cancelSubscriptionCall =
      payload && subId && (await updateSubscription(payload, subId))
    ;(await cancelSubscriptionCall) &&
      !cancelSubscriptionCall.error &&
      navigate('/account/subscriptionOrderDetails')
  }
  return (
    <div className="container">
      <MyAccountLeftMenu />
      <div className="cancel-subscription">
        <Heading className="cancel-subscription__heading">
          {`Cancel ${productTitle} (subscription)`}
        </Heading>
        <p>{showReasons ? reasonsText : secondaryText}</p>
        {showReasons && reasonsList && reasonsList.length && (
          <div className="cancel-subscription__reasons">
            {reasonsList.map((reason, index) => (
              <Button key={index} onClick={() => handleReasonSelect(reason)}>
                {reason}
              </Button>
            ))}
          </div>
        )}
        {showReasonTextArea && (
          <div className="cancel-subscription__reasons-textarea">
            <SubscriptionTextArea
              buttonText={cancelSubBtnTxt}
              text={reasonText}
              onCancelClick={cancelSubscription}
            />
          </div>
        )}
        {!showReasons && !showReasonTextArea && (
          <>
            <Link to={`/account/subscription/swap?subId=${subId}`}>
              {swapProductBtnTxt}
            </Link>
            <Button onClick={handleCancelBtnClick}>{cancelSubBtnTxt}</Button>
          </>
        )}
      </div>
    </div>
  )
}

CancelSubscription.propTypes = {
  sidebarData: PropTypes.object,
  headingText: PropTypes.string,
  secondaryText: PropTypes.string,
  swapProductBtnTxt: PropTypes.string,
  cancelSubBtnTxt: PropTypes.string,
  reasonsText: PropTypes.string,
  reasonsList: PropTypes.arrayOf(PropTypes.string),
}

export default requireAuth(CancelSubscription)
