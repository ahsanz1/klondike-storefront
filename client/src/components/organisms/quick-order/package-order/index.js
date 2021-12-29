import React from 'react'

import PropTypes from 'prop-types'

import Button from 'components/atoms/button'
import Label from 'components/atoms/label'

const PackageOrder = ({
  handleChangePackage,
  handleChangePackageqty,
  handleAddtoCart,
  handleAddRow,
  productstitle,
  inputList,
  handleRemoveClick,
  addingToCart,
  qtyerror,
}) => {
  const [validation, setValidation] = React.useState(false)
  const handleSubmit = e => {
    e.preventDefault()
  }

  let titleArray = productstitle
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
          Part Number<Label className="quick-order-asterisk"> *</Label>
        </p>
        <p>
          Qty<Label className="quick-order-asterisk"> *</Label>
        </p>
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        {InputList.map((x, i) => {
          console.log('InputList', x)
          return (
            <div key={i}>
              <div className="text-fields" style={{ paddingBottom: 0 }}>
                <div>
                  <input
                    list="partnumber"
                    name="partnumber"
                    className="part-number"
                    placeholder="Enter Part Number"
                    // autoComplete="off"
                    value={x.partnumber}
                    onChange={e => handleChangePackage(e, i)}
                  />
                  {validation && inputList[0].partnumber === '' && (
                    <div style={{ color: 'red' }} className="validation">
                      Please Enter Part Number
                    </div>
                  )}
                  <datalist id="partnumber">
                    {titleArray.map((item, i) => {
                      return <option key={i} value={item.value} />
                    })}
                  </datalist>
                </div>

                <div
                  className="package-qty"
                  style={{ width: 'min-content', textAlign: 'center' }}
                >
                  <input
                    min="1"
                    name="quantity"
                    className="quantity-number"
                    type="number"
                    value={x.quantity}
                    step={1}
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
                  {/* {!qtyerror && validation && inputList[0].quantity === '' && ( */}
                  <div
                    style={{
                      color: 'red',
                      opacity:
                        !qtyerror && validation && inputList[0].quantity === ''
                          ? 1
                          : 0,
                    }}
                    className="validation"
                  >
                    Please Enter Quantity
                  </div>
                  {/* )} */}
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
        <div className="submit-btns" style={{ paddingTop: 0 }}>
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

PackageOrder.propTypes = {
  handleChangePackage: PropTypes.func,
  handleChange2Package: PropTypes.func,
  handleAddtoCart: PropTypes.func,
  handleAddRow: PropTypes.func,
  productstitle: PropTypes.array,
  inputList: PropTypes.array,
  handleRemoveClick: PropTypes.func,
  handleChangePackageqty: PropTypes.func,
  caceqty: PropTypes.func,
  addingToCart: PropTypes.bool,
  qtyerror: PropTypes.bool,
}

export default PackageOrder
