/* eslint-disable indent */
// import Link from 'components/atoms/link'
import React from 'react'
// import PropTypes from 'prop-types'
import { array, object, string } from 'yup/lib/locale'
// import ReadMoreReact from 'read-more-react'
import './style.scss'

const PDPInformation = props => {
  const [more, setMore] = React.useState(false)
  console.log('tech info check:', props.techInfo[0])
  return (
    <>
      <div className="Pdp-content">
        {/* <p className='center'>{subheading}</p>
        <h1 className='center'>{heading}</h1>
        <Link href='#'>{pds}</Link>
        <br />
        <Link href='#'>{sds}</Link>
        {paragraph.map((data, i) => (
          <>
            <ReadMoreReact
              text={data.text}
              dangerouslySetInnerHTML={{ __html: value }}
              min={500}
              ideal={700}
              max={1000}
              readMoreText={Readmore}
            />
          </>
        ))} */}
        {props.techInfo?.map((item, i) => (
          <>
            {console.log(item, 'itemm')}
            <p className="coat">KLONDIKE - BRAVING THE FORCE OF MOVEMENT®</p>
            <p key={i} className="name-info">
              {item.name}
            </p>
            <p
              dangerouslySetInnerHTML={
                more
                  ? {
                      __html: item.value,
                    }
                  : {
                      __html: item.value.slice(0, 600) + '...',
                    }
              }
              className="info-desc"
            ></p>
            {!more && (
              <p>
                <button onClick={() => setMore(true)} className="button-pdp">
                  Read more
                </button>
              </p>
            )}
          </>
        ))}
      </div>
    </>
  )
}

PDPInformation.propTypes = {
  pdpdatasheet: object,
  subheading: string,
  techInfo: array,
}

export default PDPInformation
