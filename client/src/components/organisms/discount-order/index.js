import React from 'react'
import Container from 'components/molecules/container'
import DiscountOrderChild from 'components/molecules/discount-order-child'
import './styles.scss'
const DiscountOrder = props => {
  return (
    <div id="discount">
      <Container>
        <DiscountOrderChild {...props} />
      </Container>
    </div>
  )
}

export default DiscountOrder
