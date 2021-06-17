import React from 'react'

import PropTypes from 'prop-types'
import InputTextField from 'components/atoms/input'
import Image from 'components/atoms/image'
import './style.scss'
import Button from 'components/atoms/button'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const antIcon = <LoadingOutlined className="loader-spin" spin />

const IconInput = ({
  img = '',
  inputProps = {},
  inputClassName = '',
  imgClassName = '',
  buttonClassName = '',
  buttonType = '',
  inputValue = '',
  onChangeHandler,
  loading = false,
}) => {
  return (
    <div className="input_container">
      <InputTextField
        type="text"
        className={`input ${inputClassName}`}
        {...inputProps}
        value={inputValue}
        onChange={({ value }) => {
          onChangeHandler(value)
        }}
      />
      {loading && <Spin indicator={antIcon} className="newsletter-loader" />}
      <Button iconOnly buttonClassNane={buttonClassName} type={buttonType}>
        <Image src={img} className={`input_img ${imgClassName}`} alt="" />
      </Button>
    </div>
  )
}

IconInput.propTypes = {
  img: PropTypes.string,
  imgClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  buttonType: PropTypes.string,
  inputProps: PropTypes.object,
  inputValue: PropTypes.string,
  onChangeHandler: PropTypes.func,
  loading: PropTypes.bool,
}

export default IconInput
