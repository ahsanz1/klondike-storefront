import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import PDPInformation from 'components/molecules/pdpinforamation'
import { Radio, InputNumber, Tooltip } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
import PDPMobile from '../PDPMobile'
import Link from 'components/atoms/link'

const PDP = ({ pdpdata, pdpdatasheet, RadioData }) => {
  const { data, imgdata, heading } = pdpdata
  const [disable, setDisable] = useState(false)
  const [packages, setPackages] = useState(true)
  const [packagedisabl, setPackagedisabl] = useState(false)
  const [bulksdisable, setBulkdisable] = useState(false)
  const [bulks, setBulks] = useState(true)
  const { packagedata, bulk, text2, text1 } = RadioData
  const [value, setValue] = React.useState(1)
  const onChange = e => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
    setDisable(!disable)
  }
  const packageHandler = () => {
    setPackages(true)
    setBulks(false)
  }
  const bulkHandler = () => {
    setPackages(false)
    setBulks(true)
  }
  // const packagees = () => {
  //   setPackg(true)
  // }

  // eslint-disable-next-line space-before-function-paren
  function onChang(value) {
    console.log('changed', value)
    setPackagedisabl(true)
    setBulkdisable(false)
  }
  const onChanging = value => {
    console.log('bulk', value)
    setBulkdisable(true)

    setPackagedisabl(false)
  }
  const a = value
  const text = (
    <div className="toltip-container">
      <h1>{packagedata}</h1>
      <p>{text1}</p>
    </div>
  )
  const secondtext = (
    <div className="toltip-container">
      <h1>{bulk}</h1>
      <p>{text2}</p>
    </div>
  )
  let newdata = data.reduce((accu, curn) => {
    return accu + parseInt(curn.price)
  }, 0)
  return (
    <div className="PDPs-wrapper">
      <div className="PDP-container">
        <div className="left-side">
          {imgdata.map((content, i) => (
            <>
              <div className="img-wrapper" key={i}>
                <Image src={content.image.url} className="slider-image" />
              </div>
              <Button className="how_buy">{content.btntxt}</Button>
            </>
          ))}
        </div>
        <div className="right-side">
          <div className="share-icon">
            <p
              className="right-align"
              // onClick={() => {
              //   window.open(
              //     `https://facebook.com/sharer.php?u=${'https://dev.klondike.fabric.zone/'}`,
              //     '_blank',
              //   )
              // }}
            >
              <ShareAltOutlined />
            </p>
          </div>
          {heading && <h1>{heading}</h1>}
          <Radio.Group
            onChange={onChange}
            value={value}
            className="radio-group"
          >
            <Tooltip placement="bottomLeft" title={text}>
              <Radio
                value={1}
                className={`package   ${disable ? 'disabledradio' : ''}`}
                disabled={bulksdisable}
                onChange={packageHandler}
              >
                <Link to="/Order" className="pack_order_link">
                  Packaged ORDER
                </Link>
              </Radio>
            </Tooltip>
            <Tooltip placement="bottomLeft" title={secondtext}>
              <Radio
                value={2}
                className={`bulk   ${!disable ? 'disabledradio' : ''}`}
                disabled={packagedisabl}
                onClick={() => {
                  console.log('foucs')
                }}
                onChange={bulkHandler}
              >
                <Link to="/bulk" className="pack_order_link">
                  Bulk ORDER
                </Link>
              </Radio>
            </Tooltip>
          </Radio.Group>
          <div
            className={
              !packages
                ? 'test  bulk_overlay_top hide-packg'
                : 'test bulk_overlay_top'
            }
          >
            {!packages && <div className="bulk_overlay"></div>}
            <p className="item-list-warapper mobile-hide">
              <span>SIZE</span>
              <span>UNIT/CASE</span>
              <span>PART NUM</span>
              <span>Price</span>
              <span>QTy</span>
              <span>Total Price</span>
            </p>
            {data.map((content, id) => (
              <>
                <div className="item-list-warapper" key={id}>
                  <div>
                    <span className="desktop-hide">SIZE</span>
                    <p>{content.size}</p>
                  </div>

                  <div>
                    <span className="desktop-hide">UNIT/CASE</span>
                    <p>{content.unit}</p>
                  </div>
                  <div>
                    <span className="desktop-hide"> PART NUM</span>
                    <p>{content.part}</p>
                  </div>
                  <div>
                    <span className="desktop-hide">Price</span>
                    <p>
                      ${(content.price = parseFloat(content.price).toFixed(2))}
                    </p>
                  </div>
                  <div>
                    <span className="desktop-hide">QTy</span>
                    <p>
                      <InputNumber
                        min={0}
                        max={100}
                        defaultValue={0}
                        onChange={onChang}
                      />
                    </p>
                  </div>
                  <div>
                    <span className="desktop-hide">Total Price</span>
                    <p>
                      $
                      {(content.price = parseFloat(content.price).toFixed(2)) *
                        a}
                    </p>
                  </div>
                </div>
              </>
            ))}
            <p className="right-align">
              ${(newdata = parseFloat(newdata).toFixed(2))}
            </p>
          </div>
          <div className={!bulks ? 'hide-bulk' : 'pdp_bulk_order'}>
            <hr></hr>
            <div className="top_overlay">
              {!bulks && <div className="overlay"></div>}

              <p
                className={`item-bulk-warappers   ${
                  !disable ? 'disabledradio' : ''
                }`}
              >
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
                    min={0}
                    max={100}
                    defaultValue={0}
                    onChange={onChanging}
                  />
                </p>
                <p>$50</p>
              </div>
            </div>
            <hr></hr>
          </div>
          <Button className="add-to-cart">ADD TO CART</Button>
        </div>
      </div>
      <PDPInformation pdpdatasheet={pdpdatasheet} />
      <PDPMobile pdpdata={pdpdata} />
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
  RadioData: PropTypes.string,
}
export default PDP
