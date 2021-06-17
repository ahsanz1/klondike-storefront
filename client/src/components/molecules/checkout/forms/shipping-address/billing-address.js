import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { AppContext } from 'libs/context'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FloatInput from 'components/atoms/floating-input'
import FloatDropdown from 'components/atoms/floating-dropdown'

const items = [
  {
    label: 'USA',
    value: 'US',
  },
]

const states = [
  {
    label: 'Alabama',
    value: 'AL',
  },
  {
    label: 'Alaska',
    value: 'AK',
  },
  {
    label: 'Arizona',
    value: 'AZ',
  },
  {
    label: 'Arkansas',
    value: 'AR',
  },
  {
    label: 'California',
    value: 'CA',
  },
  {
    label: 'Colorado',
    value: 'CO',
  },
  {
    label: 'Connecticut',
    value: 'CT',
  },
  {
    label: 'Delaware',
    value: 'DE',
  },
  {
    label: 'District Of Columbia',
    value: 'DC',
  },
  {
    label: 'Florida',
    value: 'FL',
  },
  {
    label: 'Georgia',
    value: 'GA',
  },
  {
    label: 'Guam',
    value: 'GU',
  },
  {
    label: 'Hawaii',
    value: 'HI',
  },
  {
    label: 'Idaho',
    value: 'ID',
  },
  {
    label: 'Illinois',
    value: 'IL',
  },
  {
    label: 'Indiana',
    value: 'IN',
  },
  {
    label: 'Iowa',
    value: 'IA',
  },
  {
    label: 'Kansas',
    value: 'KS',
  },
  {
    label: 'Kentucky',
    value: 'KY',
  },
  {
    label: 'Louisiana',
    value: 'LA',
  },
  {
    label: 'Maine',
    value: 'ME',
  },
  {
    label: 'Maryland',
    value: 'MD',
  },
  {
    label: 'Massachusetts',
    value: 'MA',
  },
  {
    label: 'Michigan',
    value: 'MI',
  },
  {
    label: 'Minnesota',
    value: 'MN',
  },
  {
    label: 'Mississippi',
    value: 'MS',
  },
  {
    label: 'Missouri',
    value: 'MO',
  },
  {
    label: 'Montana',
    value: 'MT',
  },
  {
    label: 'Nebraska',
    value: 'NE',
  },
  {
    label: 'Nevada',
    value: 'NV',
  },
  {
    label: 'New Hampshire',
    value: 'NH',
  },
  {
    label: 'New Jersey',
    value: 'NJ',
  },
  {
    label: 'New Mexico',
    value: 'NM',
  },
  {
    label: 'New York',
    value: 'NY',
  },
  {
    label: 'North Carolina',
    value: 'NC',
  },
  {
    label: 'North Dakota',
    value: 'ND',
  },
  {
    label: 'Ohio',
    value: 'OH',
  },
  {
    label: 'Oklahoma',
    value: 'OK',
  },
  {
    label: 'Oregon',
    value: 'OR',
  },
  {
    label: 'Palau',
    value: 'PW',
  },
  {
    label: 'Pennsylvania',
    value: 'PA',
  },
  {
    label: 'Rhode Island',
    value: 'RI',
  },
  {
    label: 'South Carolina',
    value: 'SC',
  },
  {
    label: 'South Dakota',
    value: 'SD',
  },
  {
    label: 'Tennessee',
    value: 'TN',
  },
  {
    label: 'Texas',
    value: 'TX',
  },
  {
    label: 'Utah',
    value: 'UT',
  },
  {
    label: 'Vermont',
    value: 'VT',
  },
  {
    label: 'Virgin Islands',
    value: 'VI',
  },
  {
    label: 'Virginia',
    value: 'VA',
  },
  {
    label: 'Washington',
    value: 'WA',
  },
  {
    label: 'West Virginia',
    value: 'WV',
  },
  {
    label: 'Wisconsin',
    value: 'WI',
  },
  {
    label: 'Wyoming',
    value: 'WY',
  },
]

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Enter a first name')
    .min(3, 'Enter atleast 3 characters'),
  lastName: Yup.string()
    .required('Enter a last name')
    .min(3, 'Enter atleast 3 characters'),
  address: Yup.string().required('Enter an address'),
  apartmentOptional: Yup.string().optional(),
  city: Yup.string().required('Enter a city'),
  country: Yup.string().required('Enter a shipping country'),
  zipCode: Yup.string().required('Enter a ZIP / postal code'),
  mobileNumber: Yup.string().required('Enter a valid phone number'),
})

const BillingAddressForm = ({ bindSubmitForm, isModalOpen }) => {
  const { step, setBillingAddress, shippingAddress } = useContext(AppContext)

  //   const [dummy, setDummy] = useState({})

  //   useEffect(() => {
  //     dummy && console.log({ dummy })
  //     // settShippingAddress(dummy)
  //     setShippingDone(true)
  //     setShippingAddress(dummy)
  //   }, [dummy])

  //   const subm = values => {
  //     setDummy(values)
  //     // setShippingDone('true')
  //     settShippingAddress(values)
  //   }

  return (
    <Formik
      initialValues={{
        firstName:
          step === 1
            ? shippingAddress.firstName
              ? shippingAddress.firstName
              : ''
            : '',
        lastName:
          step === 1
            ? shippingAddress.lastName
              ? shippingAddress.lastName
              : ''
            : '',
        address:
          step === 1
            ? shippingAddress.address
              ? shippingAddress.address
              : ''
            : '',
        apartmentOptional:
          step === 1
            ? shippingAddress.apartmentOptional
              ? shippingAddress.apartmentOptional
              : ''
            : '',
        city:
          step === 1 ? (shippingAddress.city ? shippingAddress.city : '') : '',
        country:
          step === 1
            ? shippingAddress.country
              ? shippingAddress.country
              : 'US'
            : 'US',
        zipCode:
          step === 1
            ? shippingAddress.zipCode
              ? shippingAddress.zipCode
              : ''
            : '',
        mobileNumber:
          step === 1
            ? shippingAddress.mobileNumber
              ? shippingAddress.mobileNumber
              : ''
            : '',
        state:
          step === 1
            ? shippingAddress.state
              ? shippingAddress.state
              : 'AL'
            : 'AL',
      }}
      //   onSubmit={subm}
      // onSubmit={(values, { setSubmitting }) => {
      //   console.log(values, 'address')
      //   console.log(step, 'step')
      //   values && setShippingDone('true')
      //   values && setShippingAddress(values)
      //   setSubmitting(false)

      //   // if (step === 1) {
      //   // }
      //   // if (step === 1) {
      //   //   setShippingAddress(values)
      //   //   setShippingDone(true)
      //   // }
      // }}
      validationSchema={validationSchema}
    >
      {({ values, submitForm }) => {
        step === 3 && setBillingAddress(values)
        // if (values.isValid) {
        //   setShippingDone(true)
        // } else {
        //   setShippingDone(false)
        // }
        bindSubmitForm(submitForm)
        return (
          <Form>
            <div className="shipping-address-form-fields">
              <div className="shipping-address-first-last-name">
                <div className="shipping-address-first-name">
                  <FloatInput
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                  />
                </div>
                <div className="shipping-address-last-name">
                  <FloatInput
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                  />
                </div>
              </div>
              <FloatInput
                label="Address"
                name="address"
                value={values.address}
              />
              <FloatInput
                label="Apartment, suite, etc. (optional)"
                name="apartmentOptional"
                value={values.apartmentOptional}
              />
              <FloatInput label="City" name="city" value={values.city} />
              <div className="shipping-address-country-postalcode">
                <div className="shipping-address-country">
                  <FloatDropdown
                    label="Country/Region"
                    name="country"
                    textInput={false}
                    items={items}
                    value={values.country}
                  />
                  {/* <FloatInput label="City" name="shippingCity" /> */}
                </div>
                {values.country === 'US' && (
                  <div className="shipping-address-country">
                    <FloatDropdown
                      label="State"
                      name="state"
                      textInput={false}
                      items={states}
                      value={values.state}
                    />
                  </div>
                )}
                <div className="shipping-address-postalcode">
                  <FloatInput
                    label="Postal Code"
                    name="zipCode"
                    value={values.zipCode}
                  />
                </div>
              </div>
              <div className="mobile-number-input">
                <FloatInput
                  label="Mobile Phone"
                  name="mobileNumber"
                  value={values.mobileNumber}
                />
                <div className="mobile-number-tooltip">
                  <div className="mobile-number-tooltip-button">
                    <div className="mobile-number-tooltip-button-absolute">
                      <img
                        className="mobile-number-tooltip-logo"
                        src="/static/icons/question-mark.svg"
                        alt="lll"
                      />
                    </div>
                    <span className="mobile-number-tooltip">
                      In case we need to contact you about your order
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

BillingAddressForm.propTypes = {
  bindSubmitForm: PropTypes.func,
  isModalOpen: PropTypes.bool,
}

export default BillingAddressForm
