import React from 'react'
import PropTypes from 'prop-types'
import Invitation from 'components/molecules/invitation'
import Container from 'components/molecules/container'
import Image from 'components/atoms/image'
import Heading from 'components/atoms/heading'
import Label from 'components/atoms/label'

import './style.scss'
const ReferEarn = ({
  bannerImage,
  title,
  textBody,
  emailPrimaryText,
  emailSecondaryText,
  namePrimaryText,
  nameSecondaryText,
  emailPlaceholder,
  namePlaceholder,
  getInviteButtonText,
  inviteFooterheading,
  inviteFooterIcons,
}) => {
  return (
    <Container className="refer-earn" color="#fff" maxWidth="920px">
      <div className="top-bar">
        <Image src="/static/logo.svg" />
      </div>
      <div className="hands-img">
        <Image src={bannerImage.url} alt={bannerImage.altText} />
      </div>
      <div className="refer-data">
        <Heading className="refer-heading">{title}</Heading>
        <Label className="refer-desp">{textBody}</Label>
      </div>
      <Invitation
        emailPrimaryText={emailPrimaryText}
        emailSecondaryText={emailSecondaryText}
        namePrimaryText={namePrimaryText}
        nameSecondaryText={nameSecondaryText}
        emailPlaceholder={emailPlaceholder}
        namePlaceholder={namePlaceholder}
        getInviteButtonText={getInviteButtonText}
        inviteFooterHeading={inviteFooterheading}
        inviteFooterIcons={inviteFooterIcons}
      />
    </Container>
  )
}

ReferEarn.propTypes = {
  bannerImage: PropTypes.object,
  title: PropTypes.string,
  textBody: PropTypes.string,
  emailPrimaryText: PropTypes.string,
  emailSecondaryText: PropTypes.string,
  namePrimaryText: PropTypes.string,
  nameSecondaryText: PropTypes.string,
  emailPlaceholder: PropTypes.string,
  namePlaceholder: PropTypes.string,
  getInviteButtonText: PropTypes.string,
  inviteFooterheading: PropTypes.string,
  inviteFooterIcons: PropTypes.array,
}

export default ReferEarn
