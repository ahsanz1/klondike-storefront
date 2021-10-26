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
  // caceqty,
}) => {
  const handleSubmit = e => {
    e.preventDefault()
  }
  console.log(productstitle, 'productstitle')
  let titleArray = productstitle
  let InputList = inputList

  return (
    <div>
      <div className="partname-and-qty">
        <p>
          Part Number<Label className="quick-order-asterisk"> *</Label>
        </p>
        <p>
          Case Qty<Label className="quick-order-asterisk"> *</Label>
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
                    onChange={e => handleChangePackage(e, i)}
                  />

                  <datalist id="partnumber">
                    {titleArray.map((item, i) => {
                      console.log('it', item)
                      return <option key={i} value={item.value} />
                    })}
                  </datalist>
                </div>

                <div>
                  <input
                    name="quantity"
                    className="quantity-number"
                    type="number"
                    value={x.quantity}
                    step={1}
                    onChange={e => handleChangePackageqty(e, i)}
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
}

export default PackageOrder
