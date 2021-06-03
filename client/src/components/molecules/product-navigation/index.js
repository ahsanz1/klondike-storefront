import React from 'react'
import PropTypes from 'prop-types'
import CheckButton from 'components/atoms/check-button'
import './styles.scss'
const ProductNavigation = ({ newId, buttonData, hoverColor, onClick }) => {
  return (
    <div className="product-navigation">
      {buttonData.map((res, index) => (
        <CheckButton
          key={res.btnId}
          className={newId === res.btnId ? 'button-active' : ''}
          hoverColor={hoverColor}
          onClick={() => onClick(res.btnId)}
        >
          {res.btnText}
        </CheckButton>
      ))}
    </div>
  )
}

ProductNavigation.propTypes = {
  newId: PropTypes.string,
  buttonData: PropTypes.arrayOf(
    PropTypes.shape({ btnText: PropTypes.string, btnId: PropTypes.string }),
  ),
  hoverColor: PropTypes.string,
  onClick: PropTypes.func,
}

export default ProductNavigation
