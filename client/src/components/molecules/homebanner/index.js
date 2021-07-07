import React from 'react'
import { string } from 'yup/lib/locale'
import Button from 'components/atoms/button'
import './style.scss'

const HomeBanner = ({ bannerheading, bannerbutton }) => {
  return (
    <>
      <div className="content-wrapper">
        <h1>{bannerheading}</h1>
        {bannerbutton && <Button>{bannerbutton}</Button>}
      </div>
    </>
  )
}

HomeBanner.propTypes = {
  bannerheading: string,
  bannerbutton: string,
}

export default HomeBanner
