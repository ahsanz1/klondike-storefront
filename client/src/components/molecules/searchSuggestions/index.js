import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import './style.scss'

const searchSuggestions = ({ itemList, close }) => {
  console.log('suggestion:', itemList)
  return (
    <div className="search-suggestion">
      <ul>
        {itemList &&
          itemList.length > 0 &&
          itemList.map((item, i) => (
            <li key={i} className="notranslate">
              <Label>
                <Link to={`/PDP?sku=${item.sku}`} onClick={close}>
                  {item.title}
                </Link>
              </Label>
            </li>
          ))}
      </ul>
    </div>
  )
}
searchSuggestions.propTypes = {
  itemList: PropTypes.array,
  close: PropTypes.func,
}
export default searchSuggestions
