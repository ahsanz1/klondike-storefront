import React from 'react'
import { useFormikContext } from 'formik'

import './style.scss'
// import { AppContext } from 'libs/context'
import Link from 'components/atoms/link'
// import Button from 'components/atoms/button'

const ChangeFormStep = () => {
  // const { goToNextStep } = useContext(AppContext)
  const { handleSubmit } = useFormikContext()
  return (
    <div className="shipping-form-footer">
      <Link to="/cart" className="return-to-link">
        Return to cart
      </Link>
      <button className="continue-to" onClick={handleSubmit}>
        Continue to shipping
      </button>
    </div>
  )
}

export default ChangeFormStep
