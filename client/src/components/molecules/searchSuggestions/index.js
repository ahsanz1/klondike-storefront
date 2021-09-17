import React from 'react'
import Label from 'components/atoms/label'
import './style.scss'

const searchSuggestions = ({ itemList }) => {
  console.log('suggestion:', itemList)
  return (
    <div className="search-suggestion">
      {/* <Label className="suggestion-heading">Suggestion</Label> */}
      <ul>
        {itemList &&
          itemList.length > 0 &&
          itemList.map((item, i) => (
            <li key={i}>
              <Label>{item.title}</Label>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default searchSuggestions
