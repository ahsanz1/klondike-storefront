import React from 'react'

import PropTypes from 'prop-types'
import './style.scss'

import Button from 'components/atoms/button'

const BulkOrder = ({
  handleChangePackage,
  handleAddtoCart,
  handleAddRow,
  productstitle,
  inputList,
  handleRemoveClick,
}) => {
  const handleSubmit = e => {
    e.preventDefault()
  }
  let titleArray = productstitle
  let InputList = inputList

  return (
    <div>
      <div className="partname-and-qty">
        <p>Part Number</p>
        <p>Liters</p>
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        {InputList.map((x, i) => {
          return (
            <div key={i}>
              <div className="text-fields">
                <div>
                  <input
                    list="partnumber"
                    name="partnumber"
                    className="part-number"
                    placeholder="Enter Part Name"
                    value={x.partnumber}
                    onChange={e => handleChangePackage(e, i)}
                  />

                  <datalist id="partnumber">
                    {titleArray.map((item, i) => {
                      return <option key={i} value={item} />
                    })}
                  </datalist>
                </div>

                <div>
                  <input
                    name="quantity"
                    className="quantity-number"
                    type="number"
                    value={x.quantity}
                    onChange={e => handleChangePackage(e, i)}
                  />
                </div>
                <div className="remove-rowbtn">
                  {InputList.length > 1 && InputList.length - 1 === i && (
                    <Button
                      className="remove-row"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove Row
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        <div className="submit-btns">
          <Button className="row-btn" onClick={handleAddRow}>
            ADD ROW
          </Button>
          <Button className="add-btn" onClick={() => handleAddtoCart()}>
            ADD TO CART
          </Button>
        </div>
      </form>
    </div>
  )
}
BulkOrder.propTypes = {
  handleChangePackage: PropTypes.func,
  handleChange2Package: PropTypes.func,
  handleAddtoCart: PropTypes.func,
  handleAddRow: PropTypes.func,
  productstitle: PropTypes.array,
  inputList: PropTypes.array,
  handleRemoveClick: PropTypes.func,
}

export default BulkOrder
