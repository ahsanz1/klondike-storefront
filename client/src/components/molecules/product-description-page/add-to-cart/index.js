import React, { useContext } from 'react'
import StyledButton from 'components/atoms/styled-button'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context'

const AddToCart = ({ cart = {} }) => {
  const { addQuantityProduct } = useContext(AppContext)

  return (
    <div
      style={{
        marginLeft: '35px',
        flex: '1',
      }}
    >
      <StyledButton
        className="add-to-cart"
        color="#65493B"
        onClick={() => addQuantityProduct(cart)}
      >
        ADD TO CART
      </StyledButton>
    </div>
  )
}

AddToCart.propTypes = {
  cart: PropTypes.object,
}

export default AddToCart
