import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DetailsSvg from 'components/molecules/product-description-page/details-svg'

const StyledDetailsSvg = styled(DetailsSvg)`
  path,
  text,
  line {
    fill: ${props => props.color} !important;
    letter-spacing: 0.05em;
  }

  path,
  circle,
  line {
    stroke: ${props => props.color} !important;
  }

  .sugar-box {
    stroke: ${props => props.color} !important;
    fill: ${props => props.color} !important;
  }

  path.ignore-stroke {
    stroke: none !important;
  }
`

const StyledPdpSvg = ({ color }) => {
  return <StyledDetailsSvg color={color} />
}

StyledPdpSvg.propTypes = {
  color: PropTypes.string,
}
export default StyledPdpSvg
