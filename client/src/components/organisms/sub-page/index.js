import SubpageData from 'components/molecules/sub-pagedata'
import React from 'react'
import PropTypes from 'prop-types'
// import Techtabllist from '../Technical-tablist'
const SubItem = ({ datasubpage }) => {
  console.log('sub', datasubpage)
  return (
    <>
      {datasubpage.map((down, i) => (
        <SubpageData {...down} key={i} />
      ))}
    </>
  )
}
SubItem.propTypes = {
  datasubpage: PropTypes.object,
}

export default SubItem
