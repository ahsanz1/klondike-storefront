import React from 'react'
import './style.scss'

import {
  contactUsBanner,
  simpleFormData,
  contactaddress,
  mapLocationData,
} from 'libs/data/data'

import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import SimpleForm from '../simple-form'
import ContactAddres from 'components/organisms/ContactAddres'
import MapLocation from 'components/organisms/map-location'

const ContactUs = () => {
  return (
    <>
      <div className="contact-us-wrapper">
        <WebpagesHeroImages {...contactUsBanner} key="112233446677" />

        <div className="contact-us-form">
          <SimpleForm {...simpleFormData} className="contact-us-form" />
        </div>
        <div className="contact-us-Address">
          <ContactAddres {...contactaddress} />
        </div>
        <div>
          <MapLocation {...mapLocationData} />
        </div>
      </div>
    </>
  )
}

export default ContactUs
