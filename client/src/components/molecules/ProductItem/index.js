import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'
import './style.scss'
import { AppContext } from 'libs/context'

const ProductItem = ({ image, title }) => {
  const { setPlpRedirect } = useContext(AppContext)
  return (
    <>
      <div className="overviewtitle">
        <div className="outr-border">
          <div className="productimg-wraper">
            <Link to="plp-page" onClick={() => setPlpRedirect(title)}>
              <img src={image.url} alt="" />
            </Link>
          </div>
        </div>
        <div className="title-wrapper">
          <p className="notranslate">{title}</p>
        </div>
      </div>
    </>
  )
}

ProductItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}

export default ProductItem
