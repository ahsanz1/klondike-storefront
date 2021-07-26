import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import PDPInformation from 'components/molecules/pdpinforamation'
import { Radio, InputNumber, Tooltip } from 'antd'

const PDP = ({ pdpdata, pdpdatasheet }) => {
  const { data, imgdata, heading } = pdpdata
  const [value, setValue] = React.useState(1)
  const onChange = e => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  // eslint-disable-next-line space-before-function-paren
  function onChang(value) {
    console.log('changed', value)
  }
  const a = value
  console.log('aaaaaaa', a)
  const text = (
    <div className="toltip-container">
      <h1>Note on Ordering</h1>
      <p>
        This order already has an item for bulk delivery in cart. To order
        products that are not in bulk, please place a separate order.
      </p>
    </div>
  )

  return (
    <div className="PDPs-wrapper">
      <div className="PDP-container">
        <div className="left-side">
          {imgdata.map((content, i) => (
            <>
              <div className="img-wrapper" key={i}>
                <Image src={content.image.url} className="slider-image" />
              </div>
              <Button>{content.btntxt}</Button>
            </>
          ))}
        </div>
        <div className="right-side">
          {heading && <h1>{heading}</h1>}
          <Radio.Group onChange={onChange} value={value}>
            <Tooltip placement="bottomLeft" title={text}>
              <Radio value={1}>Packaged ORDER</Radio>
            </Tooltip>
            <Tooltip placement="bottomLeft" title={text}>
              <Radio value={2}>Bulk ORDER</Radio>
            </Tooltip>
          </Radio.Group>
          <p className="item-list-warapper">
            <span>SIZE</span>
            <span>UNIT/CASE</span>
            <span>PART NUM</span>
            <span>Price</span>
            <span>QTy</span>
            <span>Total Price</span>
          </p>
          {data.map((content, id) => (
            <div className="item-list-warapper" key={id}>
              <div>
                <p>{content.size}</p>
                <p></p>
              </div>
              <div>
                <p>{content.unit}</p>
              </div>
              <div>
                <p>{content.part}</p>
              </div>
              <div>
                <p>${content.price}</p>
              </div>
              <div>
                <p>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue={1}
                    onChange={onChang}
                  />
                </p>
              </div>
              <div>
                <p>${content.price * a}</p>
              </div>
            </div>
          ))}
          <p className="right-align">$5000 </p>
          <hr></hr>
          <p className="item-bulk-warappers">
            <span>BULK</span>
            <span>Price/LitRE</span>
            <span>PART NUM</span>
            <span>LITRES</span>
            <span></span>
          </p>
          <div className="item-bulk-warappers">
            <p></p>
            <p>20</p>
            <p>item</p>
            <p>
              <InputNumber
                min={1}
                max={100}
                defaultValue={1}
                onChange={onChang}
              />
            </p>
            <p>totalprice</p>
          </div>
          <hr></hr>
          <Button className="add-to-cart">ADD TO CART</Button>
        </div>
      </div>
      <PDPInformation pdpdatasheet={pdpdatasheet} />
    </div>
  )
}

PDP.propTypes = {
  data: PropTypes.array,
  size: PropTypes.string,
  imgdata: PropTypes.array,
  paragraph: PropTypes.string,
  heading: PropTypes.string,
  pdpdatasheet: PropTypes.string,
  pdpdata: PropTypes.string,
}
export default PDP
