import React from 'react'
import PropTypes from 'prop-types'

const SearchList = ({ image, title }) => {
  return (
    <div className="search-Items">
      <div className="search-img">
        <img src={image.url} alt="" />
      </div>
      <div className="search-title">{title}</div>
    </div>
  )
}
SearchList.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}
export default SearchList
