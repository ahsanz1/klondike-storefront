import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const OrderList = ({ list = [] }) => {
  return (
    <div className="">
      <ul className="">
        {/* {list.length &&
          list.map(list => (
            // <li>
            //   {list.heading && <h3>{list.heading}</h3>}
            //   <p>{list.text}</p>
            // </li>
          ))} */}
      </ul>
    </div>
  )
}

OrderList.propTypes = {
  heading: PropTypes.string,
  list: PropTypes.array,
}

export default OrderList
