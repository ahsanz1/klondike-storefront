import React, { useState } from 'react'
import PropTypes from 'prop-types'
import RequestForm from 'components/molecules/request-forms/request-form'
import axios from 'libs/services/axios'
import { apiDomain } from 'libs/general-config'
import './styles.scss'

const SimpleForm = ({
  buttonLabel = '',
  formTitle = '',
  mobileFormTitle = '',
  formInputs = [],
  subtitle,
}) => {
  const [openAlert, setOpenAlert] = useState(false)
  const [alertData, setAlertData] = useState({})

  const handleKlayvioTrigger = ({ data, formTitle = 'contactForm' }) => {
    axios.klayvio
      .post(`${apiDomain}/ext-klaviyo/abc/generic/api`, {
        action: 'contactForm',
        payload: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phoneNumber,
          reasonForMessage: data.reasonForMsg,
          message: data.message,
          klaviyoApiKey: 'U7Eb42',
        },
      })
      .then(res => {
        console.log({
          res,
        })
        const args = {
          // message: 'Email Sent',
          description: `Thanks for reaching out! We'll be in touch shortly`,
          duration: 0,
          type: 'error',
        }
        setAlertData(args)
        setOpenAlert(true)
      })
      .catch(exp => {
        console.log({
          exp,
        })
        const args = {
          // message: 'Email was not sent',
          description: `Sorry we were not able to recieve you message. Please try again !`,
          duration: 0,
          type: 'error',
        }
        setAlertData(args)
        setOpenAlert(true)
      })
  }
  const onFormSubmit = data => {
    console.log('data', data)

    handleKlayvioTrigger({ data, formTitle })

    const klaviyoObj = {
      $event_id: Date.now(),
      $email: 'usman@yopmail.com',
      ...data,
    }
    console.log('data1', { data, klaviyoObj })
    if (window && window._learnq) {
      window._learnq.push(['track', formTitle, klaviyoObj])
      console.log('data2.1', { data, klaviyoObj })
    } else {
      console.log('LEARNQ NOT FOUND FOR KLAYVIO', { window })
    }
    console.log('data3', { data, klaviyoObj })
  }

  return (
    <div className="simple-form">
      <RequestForm
        form={{
          buttonLabel,
          formTitle,
          mobileFormTitle,
          formInputs,
          subtitle,
        }}
        formBgColor={'#002a3a'}
        onFormSubmit={onFormSubmit}
        alertData={alertData}
        openAlert={openAlert}
      />
    </div>
  )
}

SimpleForm.propTypes = {
  buttonLabel: PropTypes.string,
  formTitle: PropTypes.string,
  mobileFormTitle: PropTypes.string,
  formInputs: PropTypes.array,
  subtitle: PropTypes.string,
}

export default SimpleForm
