import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import InviteFooter from 'components/molecules/invitation/invite-footer'
import Button from 'components/atoms/button'
import LabelInput from 'components/molecules/invitation/label-input'
import './style.scss'

const Invitation = ({
  emailPrimaryText = '',
  emailSecondaryText = '',
  namePrimaryText = '',
  nameSecondaryText = '',
  getInviteButtonText = '',
  emailPlaceholder = '',
  namePlaceholder = '',
  inviteFooterHeading,
  inviteFooterIcons,
}) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const getInviteHandler = () => {
    console.log(email, name)
  }
  const inviteFooterProps = {
    heading: inviteFooterHeading,
    icons: inviteFooterIcons,
  }

  return (
    <>
      <Row className="refer-form">
        <Col
          xs={{ span: 20, offset: 2 }}
          sm={{ span: 16, offset: 4 }}
          md={{ span: 12, offset: 6 }}
        >
          <form>
            <LabelInput
              label={emailPrimaryText}
              secondaryLabel={emailSecondaryText}
              placeholder={emailPlaceholder}
              value={email}
              type="email"
              required
              onChangeHandler={(id, value) => {
                setEmail(value)
              }}
            />
            <LabelInput
              label={namePrimaryText}
              secondaryLabel={nameSecondaryText}
              placeholder={namePlaceholder}
              value={name}
              onChangeHandler={(id, value) => {
                setName(value)
              }}
            />
            <Button
              className="get-invite-btn"
              type="submit"
              onClick={getInviteHandler}
            >
              {getInviteButtonText}
            </Button>
          </form>
        </Col>
      </Row>
      <InviteFooter {...inviteFooterProps} />
    </>
  )
}

Invitation.propTypes = {
  emailPrimaryText: PropTypes.string,
  emailSecondaryText: PropTypes.string,
  namePrimaryText: PropTypes.string,
  nameSecondaryText: PropTypes.string,
  getInviteButtonText: PropTypes.string,
  emailPlaceholder: PropTypes.string,
  namePlaceholder: PropTypes.string,
  inviteFooterHeading: PropTypes.string,
  inviteFooterIcons: PropTypes.array,
}

export default Invitation
