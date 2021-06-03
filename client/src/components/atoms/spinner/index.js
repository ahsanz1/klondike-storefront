import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './style.scss'

const antIcon = <LoadingOutlined style={{ fontSize: '24px' }} spin />

const Spinner = () => {
  return <Spin indicator={antIcon} />
}

export default Spinner
