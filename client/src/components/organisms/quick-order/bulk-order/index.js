import React from 'react'

import PropTypes from 'prop-types'

import Button from 'components/atoms/button'
import Label from 'components/atoms/label'

const BulkOrder = ({
  handleChangePackage,
  handleChangePackageqty,
  handleAddtoCart,
  handleAddRow,
  bulkdata,
  inputList,
  handleRemoveClick,
  addingToCart,
  qtyerror,
}) => {
  const [validation, setValidation] = React.useState(false)
  const handleSubmit = e => {
    e.preventDefault()
  }

  let titleArray = bulkdata
  let InputList = inputList

  const cartHandler = () => {
    if (
      inputList[0].partnumber === '' ||
      inputList[0].quantity === '' ||
      inputList[0].quantity < 1
    ) {
      setValidation(true)
    } else {
      setValidation(false)
      handleAddtoCart()
    }
  }

  const rowHandler = () => {
    setValidation(false)
    handleAddRow()
  }

  return (
    <div>
      <div className="partname-and-qty">
        <p>
          Part Number<Label className="quick-order-asterisk">*</Label>
        </p>
        <p>
          Liters<Label className="quick-order-asterisk">*</Label>
        </p>
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
                    placeholder="Enter Part Number"
                    value={x.partnumber}
                    autoComplete="off"
                    onChange={e => handleChangePackage(e, i)}
                  />
                  {validation && inputList[0].partnumber === '' && (
                    <div style={{ color: 'red' }} className="validation">
                      Please Enter Part Number
                    </div>
                  )}
                  <datalist id="partnumber">
                    {titleArray.map((item, i) => {
                      console.log('itbulk', item)
                      return <option key={i} value={item.value} />
                    })}
                  </datalist>
                </div>

                <div>
                  <input
                    min="1"
                    name="quantity"
                    className="quantity-number"
                    type="number"
                    value={x.quantity}
                    onChange={e => handleChangePackageqty(e, i)}
                    onKeyUp={e => {
                      if (e.target.value < 0) {
                        e.target.value = e.target.value * -1
                      }
                    }}
                  />
                  {qtyerror && (
                    <span className="packageqty-error">Please Entre QTY</span>
                  )}
                  {validation && inputList[0].quantity === '' && (
                    <div style={{ color: 'red' }} className="validation">
                      Please Enter Liters
                    </div>
                  )}
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
          <Button className="row-btn" onClick={rowHandler}>
            ADD ROW
          </Button>

          <Button className="add-btn" onClick={cartHandler}>
            {addingToCart ? 'Adding...' : 'ADD TO CART'}
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
  bulkdata: PropTypes.array,
  inputList: PropTypes.array,
  handleRemoveClick: PropTypes.func,
  handleChangePackageqty: PropTypes.func,
  addingToCart: PropTypes.bool,
  qtyerror: PropTypes.bool,
}

export default BulkOrder
