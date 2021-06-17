import React, { useContext } from 'react'
import { AppContext } from 'libs/context'
import './style.scss'
import Image from 'components/atoms/image'
import Link from 'components/atoms/link'
import Button from 'components/atoms/button'

const CheckoutBreadcrumbs = () => {
  const { setStep, enableSecondStep, enableThirdStep, step } = useContext(
    AppContext,
  )
  return (
    step !== 4 && (
      <div className="breadcrumbs">
        <Link className="breadcrumbs-link active" to="/cart">
          Cart
        </Link>
        <Image
          src="/static/icons/bread-crumb-separator.svg"
          alt="bread-crumb-separator"
          className="bread-crumb-separator"
        />
        <Button className="breadcrumbs-link" onClick={() => setStep(1)}>
          Information
        </Button>
        <Image
          src="/static/icons/bread-crumb-separator.svg"
          alt="bread-crumb-separator"
          className="bread-crumb-separator"
        />
        <Button
          className={
            enableSecondStep ? 'breadcrumbs-link active' : 'disabled-link'
          }
          onClick={() => setStep(2)}
          disabled={!enableSecondStep}
        >
          Shipping
        </Button>
        <Image
          src="/static/icons/bread-crumb-separator.svg"
          alt="bread-crumb-separator"
          className="bread-crumb-separator"
        />
        <Button
          className={
            enableThirdStep ? 'breadcrumbs-link active' : 'disabled-link'
          }
          onClick={() => setStep(3)}
          disabled={!enableThirdStep}
        >
          Payment
        </Button>
      </div>
    )
  )
}

export default CheckoutBreadcrumbs
