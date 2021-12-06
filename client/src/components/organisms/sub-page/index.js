import SubpageData from 'components/molecules/sub-pagedata'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import React from 'react'
import PropTypes from 'prop-types'
import Techtabllist from '../Technical-tablist'
import './style.scss'
const SubItem = ({ ActiveSubItem, datasubpage }) => {
  const [size] = useWindowSize()
  console.log('sub', ActiveSubItem)
  return (
    <div className="sub-pages-container">
      {ActiveSubItem && (
        <Techtabllist
          className="sub-pages__techtablist"
          itemName="OEM Approvals"
          subItemName={ActiveSubItem}
          datasubpage={datasubpage}
        />
      )}
      {size > 768 ? (
        <div className="sub-pages__subpages">
          {datasubpage.length > 0 &&
            datasubpage.map((down, i) => <SubpageData {...down} key={i} />)}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
SubItem.propTypes = {
  ActiveSubItem: PropTypes.string,
  datasubpage: PropTypes.object,
}

export default SubItem
