import SubpageData from 'components/molecules/sub-pagedata'
import React from 'react'
import PropTypes from 'prop-types'
import Techtabllist from '../Technical-tablist'
import './style.scss'
const SubItem = ({ datasubpage }) => {
  console.log('sub', datasubpage)
  return (
    <div className="sub-pages-container">
      <Techtabllist
        className="sub-pages__techtablist"
        itemName="OEM Approvals"
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
  datasubpage: PropTypes.object,
}

export default SubItem
