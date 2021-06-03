import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import Image from 'components/atoms/image'
import Heading from 'components/atoms/heading'
import Label from 'components/atoms/label'
import './style.scss'
const InviteFooter = ({ heading = '', icons = [] }) => {
  return (
    <div className="refer-footer">
      <Heading className="rf-heading">{heading}</Heading>
      <Row>
        {icons &&
          icons.map((icon, index) => (
            <Col xs={24} sm={24} md={8} key={index}>
              <Image src={icon.icon.url} />
              <Label>{icon.text}</Label>
            </Col>
          ))}
      </Row>
    </div>
  )
}

InviteFooter.propTypes = {
  heading: PropTypes.string,
  icons: PropTypes.array,
}

export default InviteFooter
