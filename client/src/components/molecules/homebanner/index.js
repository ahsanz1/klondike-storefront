import React from 'react'
import { string } from 'yup/lib/locale'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import './style.scss'

const HomeBanner = ({ bannerheading, bannerbutton }) => {
  return (
    <>
      <div className="content-wrapper">
        <h1 className="banner-heading">{bannerheading}</h1>
        {bannerbutton && (
          <Button>
            <Link to="/contact-us">{bannerbutton}</Link>
          </Button>
        )}
      </div>
    </>
  )
}

HomeBanner.propTypes = {
  bannerheading: string,
  bannerbutton: string,
}

export default HomeBanner
