/* eslint-disable indent */
// import Link from 'components/atoms/link'
import React from 'react'
// import PropTypes from 'prop-types'
import { array, object, string } from 'yup/lib/locale'
// import ReadMoreReact from 'read-more-react'
import './style.scss'

const PDPInformation = ({ techInfo = [] }) => {
  const [more, setMore] = React.useState(false)

  return (
    <div className="Pdp-content">
      {techInfo.map((item, i) => (
        <div key={i}>
          <p className="coat">
            <span>KLONDIKE - BRAVING THE FORCE OF MOVEMENT®</span>
          </p>
          <p className="name-info">{item.name}</p>
          <p
            dangerouslySetInnerHTML={{
              __html:
                !more && item.value.length > 1500
                  ? item.value.slice(0, 1500) + '...'
                  : item.value,
            }}
            className="info-desc"
          ></p>
          {!more && item.value.length > 1500 && (
            <p className="r-more">
              <button onClick={() => setMore(true)} className="button-pdp">
                <span>Read more</span>
              </button>
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

PDPInformation.propTypes = {
  pdpdatasheet: object,
  subheading: string,
  techInfo: array,
}

export default PDPInformation
