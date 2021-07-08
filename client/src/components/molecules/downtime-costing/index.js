import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/button'
import './style.scss'
// import OrderList from '../OrderList'

const DowntimeCosting = ({
  image,
  heading,
  text,
  buttontxt,
  list,
  Paragraph,
}) => {
  return (
    <div className="internal">
      <img src={image.url} alt="alt" className="downtime-img" />
      <h1>{heading}</h1>
      <p>{text}</p>
      <ul className="">
        {list.length &&
          list.map((list, i) => (
            <li key={i}>
              {list.heading && <h3>{list.heading}</h3>}
              <p>{list.text}</p>
            </li>
          ))}
      </ul>
      <p className="last-item">{Paragraph}</p>
      {/* <OrderList {...list} /> */}
      <Button>{buttontxt}</Button>
    </div>
  )
}
DowntimeCosting.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  heading: PropTypes.string,
  list: PropTypes.array,
  buttontxt: PropTypes.string,
  Paragraph: PropTypes.string,
}
export default DowntimeCosting
