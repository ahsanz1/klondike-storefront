import Link from 'components/atoms/link'
import React from 'react'
// import PropTypes from 'prop-types'
import { object, string } from 'yup/lib/locale'
import ReadMoreReact from 'read-more-react'
import './style.scss'

const PDPInformation = ({ pdpdatasheet }) => {
  const { heading, subheading, pds, sds, Readmore, paragraph } = pdpdatasheet
  return (
    <>
      <div className="Pdp-content">
        <p className="center">{subheading}</p>
        <h1 className="center">{heading}</h1>
        <Link href="#">{pds}</Link>
        <br />
        <Link href="#">{sds}</Link>
        {paragraph.map((data, i) => (
          <>
            {/* <p dangerouslySetInnerHTML={{ __html: data.text }} key={i}></p> */}
            <ReadMoreReact
              text={data.text}
              dangerouslySetInnerHTML={{ __html: data.text }}
              min={500}
              ideal={700}
              max={1000}
              readMoreText={Readmore}
            />
          </>
        ))}
      </div>
    </>
  )
}

PDPInformation.propTypes = {
  pdpdatasheet: object,
  subheading: string,
}

export default PDPInformation
