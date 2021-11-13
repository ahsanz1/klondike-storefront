import SubpageData from 'components/molecules/sub-pagedata'
import React from 'react'
import PropTypes from 'prop-types'
import Techtabllist from '../Technical-tablist'
import './style.scss'
const SubItem = ({ ActiveSubItem, datasubpage }) => {
  console.log('sub', ActiveSubItem)
  return (
    <div className="sub-pages-container">
      <Techtabllist
        className="sub-pages__techtablist"
        itemName="OEM Approvals"
        subItemName={ActiveSubItem}
      />
      <div className="sub-pages__subpages">
        {datasubpage.map((down, i) => (
          <SubpageData {...down} key={i} />
        ))}
      </div>
    </div>
  )
}
SubItem.propTypes = {
  ActiveSubItem: PropTypes.string,
  datasubpage: PropTypes.object,
}

export default SubItem
