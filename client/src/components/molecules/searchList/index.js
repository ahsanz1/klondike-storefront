import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import { useWindowSize } from 'libs/custom-hooks'
import './style.scss'

const SearchList = ({ image, category, title, sku, close }) => {
  const size = useWindowSize()
  return (
    <div className="search-Items">
      <div className="search-img">
        <Link to={`/product?sku=${sku}`} onClick={close}>
          <img src={image.url} alt="" />
        </Link>
      </div>
      <div>
        <Label className="search-category">{category}</Label>
        <Label className="search-title notranslate">
          <span title={title}>
            {title.length > 15 && size[0] >= 768 && size[0] < 1440
              ? title.slice(0, 14) + '...'
              : title}
          </span>
        </Label>
      </div>
    </div>
  )
}
SearchList.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  sku: PropTypes.string,
  close: PropTypes.func,
}
export default SearchList
