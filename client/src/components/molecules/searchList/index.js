import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'

const SearchList = ({ image, category, title }) => {
  return (
    <div className="search-Items">
      <div className="search-img">
        <img src={image.url} alt="" />
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
}
export default SearchList
