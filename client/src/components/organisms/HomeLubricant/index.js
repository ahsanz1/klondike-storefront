import React from 'react'
// import './style.scss'
import BannerLubricant from 'components/molecules/BannerLubricant'

const HomeLubricant = props => {
  console.log('net props:', props)
  return <BannerLubricant {...props} />
}
export default HomeLubricant
