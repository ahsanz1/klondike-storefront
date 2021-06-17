import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'

import './styles.scss'

const BulletHeading = ({ headings = [] }) => {
  return (
    <div className="bullet-points">
      {headings.map((heading, id) => (
        <div className="bullet-point" key={id}>
          <Image
            src={heading.bulletUrl}
            alt="list-icon"
            className="bullet-icon"
          />
          <Label className="bullet-label">{heading.bulletPoint}</Label>
        </div>
      ))}
    </div>
  )
}

BulletHeading.propTypes = {
  children: PropTypes.node,
  url: PropTypes.string,
  headings: PropTypes.array,
}

export default BulletHeading
