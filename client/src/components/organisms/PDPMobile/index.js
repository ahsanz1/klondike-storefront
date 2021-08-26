import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Image from 'components/atoms/image'
// import Button from 'components/atoms/button'
// import PDPInformation from 'components/molecules/pdpinforamation'
import { Radio, InputNumber } from 'antd'
// import { ShareAltOutlined } from '@ant-design/icons'
import Heading from 'components/atoms/heading'

const PDPMobile = ({ pdpdata }) => {
  console.log('responsive', pdpdata)
  const { data, imgdata, heading } = pdpdata
  const [value, setValue] = React.useState(1)

  const onChange = e => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
    // setDisab(!disab)
  }
  const onChang = value => {
    console.log('changed', value)
    // setPackgdisabl(true)
    // setBulkdisabl(false)
  }
  return (
    <div className="pdp_mobile-wraper">
      <div className="pdp_mobile-container">
        {imgdata.map((content, i) => (
          <div className="product-img" key={i}>
            <Image src={content.image.url} className="slider-image" />
          </div>
        ))}
        <Heading className="pdp_mobile-heading">{heading && heading}</Heading>
        <div className="radio_btn_container">
          <Radio.Group
            onChange={onChange}
            value={value}
            className="radio-group"
          >
            <Radio
              value={1}
              className=""
              // disabled={bulksdisabl}
              // onChange={packageHandler}
            >
              Packaged ORDER
            </Radio>
            <Radio
              value={2}
              className=""
              // disabled={packgdisabl}
              // onClick={() => {
              //   console.log('foucs')
              // }}
              // onChange={bulkHandler}
            >
              Bulk ORDER
            </Radio>
          </Radio.Group>
        </div>
        {data.map((content, id) => (
          <div className="item-list-warapper" key={id}>
            <div className="item">
              <span>SIZE</span>
              <p>{content.size}</p>
            </div>

            <div className="item">
              <span>UNIT/CASE</span>
              <p>{content.unit}</p>
            </div>
            <div className="item">
              <span> PART NUM</span>
              <p>{content.part}</p>
            </div>
            <div className="item">
              <span>Price</span>
              <p>${(content.price = parseFloat(content.price).toFixed(2))}</p>
            </div>
            <div className="item">
              <span>QTy</span>
              <p>
                <InputNumber
                  min={0}
                  max={100}
                  defaultValue={0}
                  onChange={onChang}
                />
              </p>
            </div>
            <div className="item">
              <span>Total Price</span>
              <p>${(content.price = parseFloat(content.price).toFixed(2))}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
PDPMobile.propTypes = {
  pdpdata: PropTypes.string,
  data: PropTypes.array,
  heading: PropTypes.string,
  imgdata: PropTypes.array,
}
export default PDPMobile
