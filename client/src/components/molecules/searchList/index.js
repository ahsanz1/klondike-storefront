import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import './style.scss'

const SearchList = ({ image, category, title, sku, close }) => {
  return (
    <div className="search-Items">
      <div className="search-img">
        <Link to={`/PDP?sku=${sku}`} onClick={close}>
          <img src={image.url} alt="" />
        </Link>
      </div>
      <div>
        <Label className="search-category">{category}</Label>
        <Label className="search-title">{title}</Label>
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
