import styled from 'styled-components'
import { Radio } from 'antd'

export const StyledRadio = styled(Radio)`
  & .ant-radio-checked::after {
    border-color: ${props => (props.color ? props.color : '#111')};
  }

  & .ant-radio-inner {
    width: 26px;
    height: 26px;
    border-width: 3px;
    border-color: #ccc !important;
    box-shadow: none !important;

    &::after {
      width: 14px;
      height: 14px;
      background-color: ${props => (props.color ? props.color : '#111')};
    }
  }
`
