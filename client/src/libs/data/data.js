export const merchandiseOptions = {
  bgColor: '#fff',
  heading: 'MERCHANDISING OPTIONS',
  cardsData: [
    {
      image: { url: '/static/icons/card_img3.webp', altText: 'alt' },
      primaryText: [{ title: 'Standard' }, { title: '12 Bar Caddie' }],
    },
    {
      image: { url: '/static/icons/card_img4.webp', altText: 'alt' },
      primaryText: [{ title: '96 Bar' }, { title: 'Shipper' }],
    },
    {
      image: { url: '/static/icons/card_img5.png', altText: 'alt' },
      primaryText: [{ title: '12 Bar' }, { title: 'Clip Strip' }],
    },
    {
      image: { url: '/static/icons/card_img6.png', altText: 'alt' },
      primaryText: [{ title: '16 Bar' }, { title: 'POS Caddie' }],
    },
  ],
  imageMaxWidth: '100%',
  cardItemsInRow: 4,
}

export const faqsData = {
  desktopHeading: 'FREQUENTLY ASKED QUESTIONS',
  mobileHeading: 'FAQ',
  faqsData: [
    {
      question: 'What are IQBARs?',
      answer:
        'IQBARs are protein bars meticulously formulated with nutrient-dense, clean-label ingredients that fuel the brain and body. Each IQBAR contains 6 brain nutrients, 12g plant protein, 1-1g sugar, and 3g net carbs.',
    },
    {
      question: 'Why is the product called “IQBAR”?',
      answer:
        'IQBARs are protein bars meticulously formulated with nutrient-dense, clean-label ingredients that fuel the brain and body. Each IQBAR contains 6 brain nutrients, 12g plant protein, 1-1g sugar, and 3g net carbs.',
    },
    {
      question: 'What are IQBARs?',
      answer:
        'IQBARs are protein bars meticulously formulated with nutrient-dense, clean-label ingredients that fuel the brain and body. Each IQBAR contains 6 brain nutrients, 12g plant protein, 1-1g sugar, and 3g net carbs.',
    },
    {
      question: 'Why is the product called “IQBAR”?',
      answer:
        'IQBARs are protein bars meticulously formulated with nutrient-dense, clean-label ingredients that fuel the brain and body. Each IQBAR contains 6 brain nutrients, 12g plant protein, 1-1g sugar, and 3g net carbs.',
    },
  ],
}

export const benefits = {
  bgColor: '#f7f7f7',
  heading: 'THE BENEFITS',
  cardsData: [
    {
      image: { url: '/static/icons/card_img.svg', altText: '' },
      primaryText: [{ title: 'One-of-a-Kind Bars' }],
      secondaryText: [
        { secondaryText: 'The only bars optimized for the brain and body!' },
      ],
    },
    {
      image: { url: '/static/icons/healthy-employees.svg', altText: '' },
      primaryText: [{ title: 'Healthy Employees' }],
      secondaryText: [
        { secondaryText: 'Tasty, functional, guilt-free snacks.' },
      ],
    },
    {
      image: { url: '/static/icons/card_img7.svg', altText: '' },
      primaryText: [{ title: 'Lower Costs' }],
      secondaryText: [
        { secondaryText: 'Heavily discounted wholesale pricing.' },
      ],
    },
    {
      image: { url: '/static/icons/productive-employees.svg', altText: '' },
      primaryText: [{ title: 'Productive employees' }],
      secondaryText: [
        { secondaryText: 'Less carb crashes - more brain and body fuel!' },
      ],
    },
  ],
  imageMaxWidth: '100px',
  cardItemsInRow: 4,
}

export const review = {
  bgColor: '#f7f7f7',
  desktopPrefix: 'HEAR FROM A CUSTOMER',
  // desktopSuffix: 'Reviews',
  mobilePrefix: 'HEAR FROM A CUSTOMER',
  // mobileSuffix: 'Reviews',
  // discount: '★★★★★',
  headingColor: '#000',
  discountColor: '#ffd17b',
  testimonials: [
    {
      desc:
        '“IQBAR provides a perfect combination of clean, mindful ingredients that fuel my body and keep me focused while teaching yoga classes - I keep the studio stocked!”',
      name: '- Taylor P., Portland, ME',
      testimonialImg: {
        url:
          'https://cdn.shopify.com/s/files/1/1682/9837/files/The_office.svg?v=1599119514',
        altText: 'Testimonial 1',
      },
    },
  ],
}

export const reviews = {
  bgColor: '#fff',
  desktopPrefix: '2,000+',
  desktopSuffix: 'Reviews',
  mobilePrefix: '3k+',
  mobileSuffix: 'Reviews',
  discount: '★★★★★',
  headingColor: '#000',
  discountColor: '#ffd17b',
  testimonials: [
    {
      desc:
        '“IQBAR provides a perfect combination of clean, mindful ingredients that fuel my body and keep me focused while teaching yoga classes - I keep the studio stocked!”',
      name: '- Taylor P., Portland, ME',
      testimonialImg: {
        url: 'static/images/testimonials_1.svg',
        altText: 'Testimonial 1',
      },
    },
    {
      desc:
        '“Killer! i am always reaching for these bars. It provides clean, mindful ingredients”',
      name: '- Taylor P., Portland, ME',
      testimonialImg: {
        url:
          'https://cdn.shopify.com/s/files/1/1682/9837/t/98/assets/testimonials_2.svg?v=4379779592663234370',
        altText: 'Testimonial 1',
      },
    },
  ],
}
// wholesale forms
export const requestFormData = {
  formBgColor: '#f7f7f7',
  requestForms: [
    {
      title: 'READY TO ORDER?',
      buttonLabel: 'Get Started',
      tabsBgColor: '#fff',
      formTitle: 'REQUEST WHOLESALE ACCOUNT',
      mobileFormTitle: 'GET STARTED',
      formButtonLabel: 'Get Started',
      formInputs: [
        {
          formRow: [
            {
              id: 'firstName',
              label: 'FIRST NAME',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
            {
              id: 'lastName',
              label: 'LAST NAME',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
          ],
        },
        {
          formRow: [
            {
              id: 'companyEmail',
              label: 'COMPANY EMAIL',
              validations_isRequired: true,
              validations_isEmail: true,
              validations_isPhoneNo: false,
              asterisk: true,
            },
            {
              id: 'phoneNumber',
              label: 'PHONE NUMBER',
              validations_isRequired: false,
              validations_isEmail: false,
              validations_isPhoneNo: true,
              asterisk: false,
            },
          ],
        },
        {
          formRow: [
            {
              id: 'companyName',
              label: 'COMPANY NAME',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
          ],
        },
      ],
    },
    {
      title: 'NEW TO IQBAR?',
      buttonLabel: 'Request sample',
      tabsBgColor: '#fff',
      formTitle: 'REQUEST SAMPLE',
      mobileFormTitle: 'REQUEST SAMPLE',
      formButtonLabel: 'Request Sample',
      formInputs: [
        {
          formRow: [
            {
              id: 'firstName',
              label: 'FIRST NAME',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
            {
              id: 'lastName',
              label: 'LAST NAME',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
          ],
        },
        {
          formRow: [
            {
              id: 'companyEmail',
              label: 'COMPANY EMAIL',
              validations_isRequired: true,
              validations_isEmail: true,
              validations_isPhoneNo: false,
              asterisk: true,
            },
            {
              id: 'phoneNumber',
              label: 'PHONE NUMBER',
              validations_isRequired: false,
              validations_isEmail: false,
              validations_isPhoneNo: true,
              asterisk: true,
            },
          ],
        },
        {
          formRow: [
            {
              id: 'companyName',
              label: 'COMPANY NAME',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
          ],
        },
        {
          formRow: [
            {
              id: 'companyAddress',
              label: 'COMPANY STREET ADDRESS',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
          ],
        },
        {
          formRow: [
            {
              id: 'city',
              label: 'CITY',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
            {
              id: 'state',
              label: 'STATE/REGION',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
          ],
        },
        {
          formRow: [
            {
              id: 'country',
              label: 'COUNTRY',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
            {
              id: 'postalCode',
              label: 'POSTAL CODE',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
          ],
        },
      ],
    },
  ],
}

// office form
export const requestFormOfficeData = {
  formBgColor: '#f7f7f7',
  requestForms: [
    {
      title: 'READY TO ORDER?',
      buttonLabel: 'Get started',
      tabsBgColor: '#fff',
      formTitle: 'REQUEST OFFICE ACCOUNT',
      mobileFormTitle: 'GET STARTED',
      formButtonLabel: 'Get Started',
      formInputs: [
        {
          formRow: [
            {
              id: 'firstName',
              label: 'FIRST NAME',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
            {
              id: 'lastName',
              label: 'LAST NAME',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
          ],
        },
        {
          formRow: [
            {
              id: 'companyEmail',
              label: 'COMPANY EMAIL',
              validations_isRequired: true,
              validations_isEmail: true,
              validations_isPhoneNo: false,
              asterisk: true,
            },
            {
              id: 'phoneNumber',
              label: 'PHONE NUMBER',
              validations_isRequired: false,
              validations_isEmail: false,
              validations_isPhoneNo: true,
              asterisk: false,
            },
          ],
        },
        {
          formRow: [
            {
              id: 'companyName',
              label: 'COMPANY NAME',
              validations_isRequired: true,
              validations_isEmail: false,
              validations_isPhoneNo: false,
              asterisk: true,
            },
          ],
        },
      ],
    },
  ],
}

export const whyEatIQBAR = {
  bgColor: '#f7f7f7',
  heading: 'WHY EAT IQBAR?',
  cardsData: [
    {
      image: { url: '/static/icons/card_img.svg', altText: '' },
      primaryText: [{ title: '6 Brain Nutrients' }],
      secondaryText: [
        {
          secondaryText:
            'Each bar has a unique combo of science-backed brain compounds.',
        },
      ],
    },
    {
      image: { url: '/static/icons/card_img2.svg', altText: '' },
      primaryText: [{ primaryText: '12G Plant Protein' }],
      secondaryText: [
        {
          secondaryText:
            '~25% of each bar is pure plant based protein for body health.',
        },
      ],
    },
    {
      image: { url: '/static/icons/card_img7.svg', altText: '' },
      primaryText: [{ title: '<1-1G sugar, 3G Net Carbs' }],
      secondaryText: [
        {
          secondaryText:
            'IQBARs have a super low glycemic impact, which means no afternoon crash!',
        },
      ],
    },
    {
      image: { url: '/static/icons/card_img8.svg', altText: '' },
      primaryText: [{ title: 'KETO, PALEO-FRIENDLY, VEGAN' }],
      secondaryText: [
        {
          secondaryText:
            'IQBAR nutrition labels comply with virtually every diet under the sun.',
        },
      ],
    },
    {
      image: { url: '/static/icons/card_img8.svg', altText: '' },
      primaryText: [{ title: '6-8G PREBIOTIC FIBER' }],
      secondaryText: [
        {
          secondaryText:
            'Each IQBAR contains 6-8g of fiber to support the gut microbiome.',
        },
      ],
    },
    {
      image: { url: '/static/icons/card_img8.svg', altText: '' },
      primaryText: [{ primaryText: 'NON-GMO AND CLEAN LABEL' }],
      secondaryText: [
        {
          secondaryText:
            'IQBARs contain zero GMOs, gluten,dairy, soy, or sugar alcohols.',
        },
      ],
    },
  ],
  imageMaxWidth: '100px',
  cardItemsInRow: 3,
}
export const whatSectionData = {
  bgColor: '#f7f7f7',
  question: 'WHAT ARE IQBARS?',
  answer:
    'IQBARs are protein bars formulated with clean-label ingredients rich in compounds shown to benefit the brain and body. Each bar contains 6 brain nutrients, 12g plant protein, 3g net carbs, and 1-1g sugar. IQBARs are keto, paleo friendly, vegan, kosher, and free from GMOs, gluten, dairy, soy, and sugar alcohols.',
}
export const myAccount = {
  title: 'MY ACCOUNT',
  subTitle: 'ORDER HISTORY',
  ordersPlaced: "You haven't placed any orders yet",
  accDetails: 'ACCOUNT DETAILS',
  viewStore: 'VIEW STORE',
  viewAddress: {
    text: 'View Addresses',
    to: 'account/address',
  },
  shopNowButton: {
    link: '/collections/all-bars',
    text: 'SHOP NOW',
  },
  orderHistory: {
    orderId: '42335',
    date: 'January 18, 2021',
    paymentStatus: 'Paid',
    fulfilmentStatus: 'unfulfilled',
    totalCost: '60.72',
  },
}

export const shippingAddress = {
  form: {
    formInputs: [
      [
        {
          id: 'firstname',
          label: 'FIRST NAME',
          type: 'text',
          validations: {
            isRequired: true,
            isEmail: false,
            isPhoneNo: false,
            isPassword: false,
          },
        },
        {
          id: 'lastname',
          label: 'LAST NAME',
          type: 'text',
          validations: {
            isRequired: true,
            isEmail: false,
            isPhoneNo: false,
            isPassword: false,
          },
        },
      ],
      [
        {
          id: 'company',
          label: 'Address',
          type: 'text',
          validations: {
            isRequired: true,
            isEmail: false,
            isPhoneNo: false,
            isPassword: false,
          },
        },
      ],
      [
        {
          id: 'address1',
          label: 'Apartment',
          type: 'text',
          validations: {
            isRequired: true,
            isEmail: false,
            isPhoneNo: false,
            isPassword: false,
          },
        },
      ],
      [
        {
          id: 'address2',
          label: 'City',
          type: 'text',
          validations: {
            isRequired: true,
            isEmail: false,
            isPhoneNo: false,
            isPassword: false,
          },
        },
      ],
      [
        {
          id: 'city',
          label: 'CITY',
          type: 'text',
          validations: {
            isRequired: true,
            isEmail: false,
            isPhoneNo: false,
            isPassword: false,
          },
        },
      ],
      [
        {
          id: 'country',
          label: 'COUNTRY',
          type: 'select',
          validations: {
            isRequired: true,
            isEmail: false,
            isPhoneNo: false,
            isPassword: false,
          },
        },
        {
          id: 'zipcode',
          label: 'POSTAL CODE',
          type: 'text',
          validations: {
            isRequired: true,
            isEmail: false,
            isPhoneNo: false,
            isPassword: false,
          },
        },
      ],
      [
        {
          id: 'phone',
          label: 'PHONE',
          type: 'text',
          validations: {
            isRequired: true,
            isEmail: false,
            isPhoneNo: true,
            isPassword: false,
          },
        },
      ],
    ],
  },
}

export const accountAddress = {
  account_title: 'MY ACCOUNT',
  account_subTitle: 'YOUR ADDRESSES',
  returnToAccountText: 'Return to Account Details',
  returnToAccountLink: 'account',
  addNewAddressBtnText: 'ADD A NEW ADDRESS',

  formBgColor: '#fffff',
  lblInputClass: 'lblInputCls',
  formTitle: 'ADD A NEW ADDRESS',
  formEditTitle: 'EDIT ADDRESS',
  mobileFormTitle: 'ADD A NEW ADDRESS',
  buttonLabel: 'ADD ADDRESS',
  cancelButtonLabel: 'CANCEL',
  checkboxText: 'SET AS DEFAULT ADDRESS',
  formInputs: [
    {
      formRow: [
        {
          id: 'firstname',
          label: 'FIRST NAME',
          fieldType: 'text',

          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'lastname',
          label: 'LAST NAME',
          fieldType: 'text',

          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'company',
          label: 'COMPANY',
          fieldType: 'text',

          validations_isRequired: false,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'address1',
          label: 'ADDRESS 1',
          fieldType: 'text',

          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'address2',
          label: 'ADDRESS 2',
          fieldType: 'text',

          validations_isRequired: false,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },

    // [
    //   {
    //     id: 'state',
    //     label: 'STATE',
    //     type: 'select',
    //     options: {
    //       id: 'state',
    //       name: 'state',
    //       values: [
    //         { label: 'Alabama', value: 'AL' },
    //         { label: 'Alaska', value: 'AK' },
    //         { label: 'American Samoa', value: 'AS' },
    //         { label: 'Arizona', value: 'AZ' },
    //         { label: 'Arkansas', value: 'AR' },
    //         { label: 'California', value: 'CA' },
    //         { label: 'Colorado', value: 'CO' },
    //         { label: 'Connecticut', value: 'CT' },
    //         { label: 'Delaware', value: 'DE' },
    //         { label: 'District Of Columbia', value: 'DC' },
    //         { label: 'Federated States Of Micronesia', value: 'FM' },
    //         { label: 'Florida', value: 'FL' },
    //         { label: 'Georgia', value: 'GA' },
    //         { label: 'Guam', value: 'GU' },
    //         { label: 'Hawaii', value: 'HI' },
    //         { label: 'Idaho', value: 'ID' },
    //         { label: 'Illinois', value: 'IL' },
    //         { label: 'Indiana', value: 'IN' },
    //         { label: 'Iowa', value: 'IA' },
    //         { label: 'Kansas', value: 'KS' },
    //         { label: 'Kentucky', value: 'KY' },
    //         { label: 'Louisiana', value: 'LA' },
    //         { label: 'Maine', value: 'ME' },
    //         { label: 'Marshall Islands', value: 'MH' },
    //         { label: 'Maryland', value: 'MD' },
    //         { label: 'Massachusetts', value: 'MA' },
    //         { label: 'Michigan', value: 'MI' },
    //         { label: 'Minnesota', value: 'MN' },
    //         { label: 'Mississippi', value: 'MS' },
    //         { label: 'Missouri', value: 'MO' },
    //         { label: 'Montana', value: 'MT' },
    //         { label: 'Nebraska', value: 'NE' },
    //         { label: 'Nevada', value: 'NV' },
    //         { label: 'New Hampshire', value: 'NH' },
    //         { label: 'New Jersey', value: 'NJ' },
    //         { label: 'New Mexico', value: 'NM' },
    //         { label: 'New York', value: 'NY' },
    //         { label: 'North Carolina', value: 'NC' },
    //         { label: 'North Dakota', value: 'ND' },
    //         { label: 'Northern Mariana Islands', value: 'MP' },
    //         { label: 'Ohio', value: 'OH' },
    //         { label: 'Oklahoma', value: 'OK' },
    //         { label: 'Oregon', value: 'OR' },
    //         { label: 'Palau', value: 'PW' },
    //         { label: 'Pennsylvania', value: 'PA' },
    //         { label: 'Puerto Rico', value: 'PR' },
    //         { label: 'Rhode Island', value: 'RI' },
    //         { label: 'South Carolina', value: 'SC' },
    //         { label: 'South Dakota', value: 'SD' },
    //         { label: 'Tennessee', value: 'TN' },
    //         { label: 'Texas', value: 'TX' },
    //         { label: 'Utah', value: 'UT' },
    //         { label: 'Vermont', value: 'VT' },
    //         { label: 'Virgin Islands', value: 'VI' },
    //         { label: 'Virginia', value: 'VA' },
    //         { label: 'Washington', value: 'WA' },
    //         { label: 'West Virginia', value: 'WV' },
    //         { label: 'Wisconsin', value: 'WI' },
    //         { label: 'Wyoming', value: 'WY' },
    //       ],
    //     },
    //     validations: {
    //       isRequired: true,
    //       isEmail: false,
    //       isPhoneNo: false,
    //       isPassword: false,
    //     },
    //   },
    // ],
    {
      formRow: [
        {
          id: 'city',
          label: 'CITY',
          fieldType: 'text',

          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'country',
          label: 'COUNTRY',
          fieldType: 'select',
          optionsType: 'countries',

          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'zipCode',
          label: 'POSTAL/ZIP CODE',
          fieldype: 'text',

          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'phone',
          label: 'PHONE',
          fieldType: 'text',

          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'isDefault',
          label: 'SET AS DEFAULT ADDRESS',
          fieldType: 'checkbox',
          validations_isRequired: false,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
  ],
}

export const mapLocationData = {
  apiKey: 'AIzaSyAtjWF9aNg_twldLxczJc___MluwCaRFkA',
  positionLat: '37.772',
  positionLng: '-122.214',
  title: `WHERE WE'RE AT`,
  description: `<p class="big-margin-b">
  Team IQBAR currently works out of the <a href="https://masschallenge.org/" target="_blank" rel="noreferrer">MassChallenge</a> office at <span class="bold">21 Drydock Ave, Boston, MA 02210.</span>
</p>`,
}

export const locationsData = {
  apiKey: 'AIzaSyAtjWF9aNg_twldLxczJc___MluwCaRFkA',
  locations: [
    {
      name: 'SUNSHINE HEALTH FOODS-DRY',
      address: '131 Court St.',
      city: 'Bath',
      state: 'ME',
      zip: '4530',
      lat: -31.56391,
      lng: 147.154312,
    },
    {
      name: 'SUNSHINE HEALTH FOODS-DRY',
      address: '131 Court St.',
      city: 'Bath',
      state: 'ME',
      zip: '4530',
      lat: -33.718234,
      lng: 150.363181,
    },
    {
      name: 'SUNSHINE HEALTH FOODS-DRY',
      address: '131 Court St.',
      city: 'Bath',
      state: 'ME',
      zip: '4530',
      lat: -33.727111,
      lng: 150.371124,
    },
    {
      name: 'SUNSHINE HEALTH FOODS-DRY',
      address: '131 Court St.',
      city: 'Bath',
      state: 'ME',
      zip: '4530',
      lat: -33.848588,
      lng: 151.209834,
    },
    {
      name: 'SUNSHINE HEALTH FOODS-DRY',
      address: '131 Court St.',
      city: 'Bath',
      state: 'ME',
      zip: '4530',
      lat: -32.848588,
      lng: 151.209834,
    },
    {
      name: 'SUNSHINE HEALTH FOODS-DRY Let Me KNow',
      address: '131 Court St.',
      city: 'Bath',
      state: 'ME',
      zip: '4530',
      lat: -31.848588,
      lng: 151.209834,
    },
    {
      name: 'SUNSHINE HEALTH FOODS-DRY',
      address: '131 Court St.',
      city: 'Bath',
      state: 'ME',
      zip: '4530',
      lat: -30.848588,
      lng: 151.209834,
    },
  ],
}

export const authLoginFormData = {
  formId: 1,
  formBgColor: '#ffffff',
  links: [
    { text: 'CREATE ACCOUNT', to: '/account/register' },
    { text: 'FORGOT YOUR PASSWORD', to: '/account/forgetpassword' },
  ],

  formTitle: 'LOGIN',
  mobileFormTitle: 'LOGIN',
  buttonLabel: 'SIGN IN',
  formInputs: [
    {
      formRow: [
        {
          id: 'email',
          placeholder: 'Email',
          validations_isRequired: true,
          validations_isEmail: true,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'password',
          placeholder: 'Password',
          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: true,
        },
      ],
    },
  ],
}

export const authRegisterFormData = {
  accountResetlink: '/account/forgetpassword',
  resetText: 'reset your password',

  formId: 2,
  formBgColor: '#ffffff',
  formTitle: 'REGISTER',
  mobileFormTitle: 'REGISTER',
  buttonLabel: 'CREATE',
  formInputs: [
    {
      formRow: [
        {
          id: 'firstName',
          placeholder: 'First Name',
          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'lastName',
          placeholder: 'Last Name',
          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'email',
          placeholder: 'Email',
          validations_isRequired: true,
          validations_isEmail: true,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'password',
          placeholder: 'Password',

          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: true,
        },
      ],
    },
  ],
}

export const authForgetPasswordFormData = {
  formId: 3,
  formBgColor: '#ffffff',
  cancelBtnText: 'CANCEL',
  cancelBtnLink: '/account/login',
  showCancelBtn: true,
  formTitle: 'LOGIN',
  resetTitle: 'RESET YOUR PASSWORD',
  resetDetailTitle: 'We will send you an email to reset your password.',
  mobileFormTitle: 'LOGIN',
  buttonLabel: 'SUBMIT',
  formInputs: [
    {
      formRow: [
        {
          id: 'email',
          placeholder: 'Email',
          validations_isRequired: true,
          validations_isEmail: true,
          validations_isPhoneNo: false,
          validations_isPassword: false,
        },
      ],
    },
  ],
}

export const authResetPasswordFormData = {
  formId: 4,
  formBgColor: '#ffffff',
  expiredTokenTitle: 'OOPS!',
  expiredTokenDescription: 'Token is invalid or expired!',
  formTitle: 'RESET PASSWORD',
  resetDetailTitle: 'Enter a new password for ',
  mobileFormTitle: 'RESET PASSWORD',
  buttonLabel: 'RESET PASSWORD',
  formInputs: [
    {
      formRow: [
        {
          id: 'password',
          label: 'New Password',
          placeholder: 'New Password',
          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: true,
          asterisk: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'confirmPassword',
          label: 'Confirm New Password',
          placeholder: 'Confirm New Password',
          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          validations_isPassword: true,
          asterisk: false,
        },
      ],
    },
  ],
}

export const referEarn = {
  bannerImage: {
    url: '/static/icons/referEarn.png',
    altText: 'alt text',
  },
  title: 'Refer your friends, get $10 off!',
  textBody:
    'Give your friends $10 off.When your friends buy from your invite link,you get $10 off!',
  emailPrimaryText: 'Your Email',
  emailSecondaryText: 'Referral info and updates will be sent to your email',
  emailPlaceholder: 'john@example.com',
  namePrimaryText: 'Your Name (optional)',
  nameSecondaryText: 'Invite link will be personalized',
  namePlaceholder: 'John',
  getInviteButtonText: 'Get Invite Link',
  inviteFooterHeading: 'How it works',
  inviteFooterIcons: [
    {
      icon: { url: '/static/icons/refer-msg.svg', altText: 'icon alt' },
      text: 'Share your link',
    },
    {
      icon: { url: '/static/icons/refer-buy.svg', altText: 'icon alt' },
      text: 'Your friend buys',
    },
    {
      icon: { url: '/static/icons/refer-reward.svg', altText: 'icon alt' },
      text: 'You get rewarded',
    },
  ],
}

export const shippingFormData = {
  formInputs: [
    [
      {
        id: 'cardNumber',
        label: 'Card number',
        validations: {
          isRequired: true,
          isEmail: false,
          isPhoneNo: false,
          isCreditCardNo: false,
        },
        type: 'number',
        isInput: true,
      },
    ],
    [
      {
        id: 'nameOnCard',
        label: 'Name on card',
        validations: {
          isRequired: true,
          isEmail: false,
          isPhoneNo: false,
          isCreditCardNo: false,
        },
        type: 'text',
        isInput: true,
        // dropdown: [
        //   {
        //     value: 'first',
        //     label: 'first',
        //   },
        //   {
        //     value: 'second',
        //     label: 'second',
        //   },
        // ],
      },
    ],
    [
      {
        id: 'expirationDate',
        label: 'Expiration date (MM / YY)',
        validations: {
          isRequired: true,
          isEmail: false,
          isPhoneNo: false,
          isCreditCardNo: false,
        },
        type: 'number',
        isInput: true,
      },
      {
        id: 'securityCode',
        label: 'Security code',
        validations: {
          isRequired: true,
          isEmail: false,
          isPhoneNo: false,
          isCreditCardNo: false,
        },
        type: 'number',
        isInput: true,
      },
    ],
  ],
}

export const category = {
  title: 'VARIETIES + DEALS',
  bgColor: '#fff',
  products: [
    {
      image:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/SamplerMainImage_17e01fb1-7123-423f-b2fa-eb105d6ce96d.png?v=1601044575',
      title: '7 Bar Sampler',
      price: 14.99,
      size: '(7 BARS)',
      subscription: true,
      customize: false,
      viewProduct: false,
      currencySymbol: '$',
      salePrice: '',
      buttonColor: 'red',
      subscribeItems: [
        {
          id: 0,
          label: 'One-Time Purchase',
          value: 'oneTimePurchase',
          disabled: false,
        },
        {
          id: 1,
          label: 'Subscribe & Save 10%',
          value: 'subscribe&save10',
          disabled: true,
        },
        {
          id: 2,
          label: 'Ship Every Week',
          value: 'ShipEveryWeek',
          disabled: false,
        },
        {
          id: 3,
          label: 'Ship Every 2 Week',
          value: 'ShipEvery2Week',
          disabled: false,
        },
        {
          id: 4,
          label: 'Ship Every 3 Week',
          value: 'ShipEvery3Week',
          disabled: false,
        },
        {
          id: 5,
          label: 'Ship Every 4 Week',
          value: 'ShipEvery4Week',
          disabled: false,
        },
      ],
    },
    {
      image: '/static/images/product2.png',
      title: 'CUSTOM CASE',
      price: 149.94,
      size: '(CASE OF 72)',
      subscription: false,
      customize: true,
      viewProduct: false,
      salePrice: 127.45,
      currencySymbol: '$',
      buttonColor: 'green',
      subscribeItems: [
        {
          id: 1,
          label: 'Ship Every Week',
          value: 'ShipEveryWeek',
        },
      ],
    },
    {
      image: '/static/images/product4.png',
      title: 'CHOCOLATE LOVERS BUNDLE',
      price: 149.94,
      size: '',
      currencySymbol: '$',
      subscription: false,
      customize: false,
      viewProduct: true,
      salePrice: 0,
      buttonColor: 'black',
      subscribeItems: [
        {
          id: 1,
          label: 'Ship Every Week',
          value: 'ShipEveryWeek',
        },
      ],
    },
  ],
}
export const singalFlavor = {
  title: 'VARIETIES + DEALS',
  bgColor: '#fff',
  products: [
    {
      image:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/singlebars-012.png?v=1606770039',
      title: '7 Bar Sampler',
      price: 14.99,
      size: '(7 BARS)',
      quickAdd: true,
      customize: false,
      viewProduct: false,
      salePrice: '',
      oneTimePurchase: [],
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/PeanutButterChip.png?v=1606770218',
      title: 'CUSTOM CASE',
      price: 149.94,
      size: '(CASE OF 72)',
      quickAdd: true,
      customize: false,
      viewProduct: false,
      salePrice: 127.45,
      oneTimePurchase: [],
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/AlmondButterChip.png?v=1606769872',
      title: 'CHOCOLATE LOVERS BUNDLE',
      price: 149.94,
      size: '(CASE OF 72)',
      quickAdd: true,
      customize: false,
      viewProduct: false,
      salePrice: 127.45,
      oneTimePurchase: [],
    },
  ],
}

export const findUsBanner = {
  desktopImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardFIND_US_12.jpg',
  },
  mobileImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardfind_us_mobile__1.jpg',
    alt: 'Mobile hero image',
  },
}

export const officeBanner = {
  desktopImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardOFFICE_fdab78ca-c990-4d7f-a92c-f7d68abc4843_1600x.jpg?v=1594396137',
    altText: 'Desktop hero image',
  },
  mobileImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardoffice_mobile_7c2e91fc-99ea-41c2-acf2-00ea04ebe45d_700x.jpg?v=1594396149',
    altText: 'Mobile hero image',
  },
}

export const whyUsBanner = {
  desktopImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardWHY_IQBAR_8c4b6602-7218-4031-a941-a7272ff2cff5_1600x.jpg?v=1594396251',
    altText: 'alt text',
  },
  mobileImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardwhy_iqbar_mobile_82baed6c-bb97-4d35-97b0-8613e5763708_700x.jpg?v=1594396265',
    altText: 'Mobile hero image',
  },
}

export const shopBanner = {
  desktopImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardSHOP_abe662ae-3ad3-42ad-9629-164b5f564c6f_1600x.jpg?v=1592505763',
    alt: 'Desktop hero image',
  },
  mobileImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardSHOP_MOBILE_8b43a7b1-de5a-4210-b88a-66436cd51593_700x.jpg?v=1592505783',
    alt: 'Mobile hero image',
  },
}

export const countriesList = {
  id: 'country',
  name: 'country',
  values: [
    { label: '---', value: 'df' },
    { label: 'Afghanistan', value: 'AF' },
    { label: 'Åland Islands', value: 'AX' },
    { label: 'Albania', value: 'AL' },
    { label: 'Algeria', value: 'DZ' },
    { label: 'American Samoa', value: 'AS' },
    { label: 'AndorrA', value: 'AD' },
    { label: 'Angola', value: 'AO' },
    { label: 'Anguilla', value: 'AI' },
    { label: 'Antarctica', value: 'AQ' },
    { label: 'Antigua and Barbuda', value: 'AG' },
    { label: 'Argentina', value: 'AR' },
    { label: 'Armenia', value: 'AM' },
    { label: 'Aruba', value: 'AW' },
    { label: 'Australia', value: 'AU' },
    { label: 'Austria', value: 'AT' },
    { label: 'Azerbaijan', value: 'AZ' },
    { label: 'Bahamas', value: 'BS' },
    { label: 'Bahrain', value: 'BH' },
    { label: 'Bangladesh', value: 'BD' },
    { label: 'Barbados', value: 'BB' },
    { label: 'Belarus', value: 'BY' },
    { label: 'Belgium', value: 'BE' },
    { label: 'Belize', value: 'BZ' },
    { label: 'Benin', value: 'BJ' },
    { label: 'Bermuda', value: 'BM' },
    { label: 'Bhutan', value: 'BT' },
    { label: 'Bolivia', value: 'BO' },
    { label: 'Bosnia and Herzegovina', value: 'BA' },
    { label: 'Botswana', value: 'BW' },
    { label: 'Bouvet Island', value: 'BV' },
    { label: 'Brazil', value: 'BR' },
    { label: 'British Indian Ocean Territory', value: 'IO' },
    { label: 'Brunei Darussalam', value: 'BN' },
    { label: 'Bulgaria', value: 'BG' },
    { label: 'Burkina Faso', value: 'BF' },
    { label: 'Burundi', value: 'BI' },
    { label: 'Cambodia', value: 'KH' },
    { label: 'Cameroon', value: 'CM' },
    { label: 'Canada', value: 'CA' },
    { label: 'Cape Verde', value: 'CV' },
    { label: 'Cayman Islands', value: 'KY' },
    { label: 'Central African Republic', value: 'CF' },
    { label: 'Chad', value: 'TD' },
    { label: 'Chile', value: 'CL' },
    { label: 'China', value: 'CN' },
    { label: 'Christmas Island', value: 'CX' },
    { label: 'Cocos (Keeling) Islands', value: 'CC' },
    { label: 'Colombia', value: 'CO' },
    { label: 'Comoros', value: 'KM' },
    { label: 'Congo', value: 'CG' },
    { label: 'Congo, The Democratic Republic of the', value: 'CD' },
    { label: 'Cook Islands', value: 'CK' },
    { label: 'Costa Rica', value: 'CR' },
    { label: "Cote D'Ivoire", value: 'CI' },
    { label: 'Croatia', value: 'HR' },
    { label: 'Cuba', value: 'CU' },
    { label: 'Cyprus', value: 'CY' },
    { label: 'Czech Republic', value: 'CZ' },
    { label: 'Denmark', value: 'DK' },
    { label: 'Djibouti', value: 'DJ' },
    { label: 'Dominica', value: 'DM' },
    { label: 'Dominican Republic', value: 'DO' },
    { label: 'Ecuador', value: 'EC' },
    { label: 'Egypt', value: 'EG' },
    { label: 'El Salvador', value: 'SV' },
    { label: 'Equatorial Guinea', value: 'GQ' },
    { label: 'Eritrea', value: 'ER' },
    { label: 'Estonia', value: 'EE' },
    { label: 'Ethiopia', value: 'ET' },
    { label: 'Falkland Islands (Malvinas)', value: 'FK' },
    { label: 'Faroe Islands', value: 'FO' },
    { label: 'Fiji', value: 'FJ' },
    { label: 'Finland', value: 'FI' },
    { label: 'France', value: 'FR' },
    { label: 'French Guiana', value: 'GF' },
    { label: 'French Polynesia', value: 'PF' },
    { label: 'French Southern Territories', value: 'TF' },
    { label: 'Gabon', value: 'GA' },
    { label: 'Gambia', value: 'GM' },
    { label: 'Georgia', value: 'GE' },
    { label: 'Germany', value: 'DE' },
    { label: 'Ghana', value: 'GH' },
    { label: 'Gibraltar', value: 'GI' },
    { label: 'Greece', value: 'GR' },
    { label: 'Greenland', value: 'GL' },
    { label: 'Grenada', value: 'GD' },
    { label: 'Guadeloupe', value: 'GP' },
    { label: 'Guam', value: 'GU' },
    { label: 'Guatemala', value: 'GT' },
    { label: 'Guernsey', value: 'GG' },
    { label: 'Guinea', value: 'GN' },
    { label: 'Guinea-Bissau', value: 'GW' },
    { label: 'Guyana', value: 'GY' },
    { label: 'Haiti', value: 'HT' },
    { label: 'Heard Island and Mcdonald Islands', value: 'HM' },
    { label: 'Holy See (Vatican City State)', value: 'VA' },
    { label: 'Honduras', value: 'HN' },
    { label: 'Hong Kong', value: 'HK' },
    { label: 'Hungary', value: 'HU' },
    { label: 'Iceland', value: 'IS' },
    { label: 'India', value: 'IN' },
    { label: 'Indonesia', value: 'ID' },
    { label: 'Iran, Islamic Republic Of', value: 'IR' },
    { label: 'Iraq', value: 'IQ' },
    { label: 'Ireland', value: 'IE' },
    { label: 'Isle of Man', value: 'IM' },
    { label: 'Israel', value: 'IL' },
    { label: 'Italy', value: 'IT' },
    { label: 'Jamaica', value: 'JM' },
    { label: 'Japan', value: 'JP' },
    { label: 'Jersey', value: 'JE' },
    { label: 'Jordan', value: 'JO' },
    { label: 'Kazakhstan', value: 'KZ' },
    { label: 'Kenya', value: 'KE' },
    { label: 'Kiribati', value: 'KI' },
    { label: "Korea, Democratic People'S Republic of", value: 'KP' },
    { label: 'Korea, Republic of', value: 'KR' },
    { label: 'Kuwait', value: 'KW' },
    { label: 'Kyrgyzstan', value: 'KG' },
    { label: "Lao People'S Democratic Republic", value: 'LA' },
    { label: 'Latvia', value: 'LV' },
    { label: 'Lebanon', value: 'LB' },
    { label: 'Lesotho', value: 'LS' },
    { label: 'Liberia', value: 'LR' },
    { label: 'Libyan Arab Jamahiriya', value: 'LY' },
    { label: 'Liechtenstein', value: 'LI' },
    { label: 'Lithuania', value: 'LT' },
    { label: 'Luxembourg', value: 'LU' },
    { label: 'Macao', value: 'MO' },
    { label: 'Macedonia, The Former Yugoslav Republic of', value: 'MK' },
    { label: 'Madagascar', value: 'MG' },
    { label: 'Malawi', value: 'MW' },
    { label: 'Malaysia', value: 'MY' },
    { label: 'Maldives', value: 'MV' },
    { label: 'Mali', value: 'ML' },
    { label: 'Malta', value: 'MT' },
    { label: 'Marshall Islands', value: 'MH' },
    { label: 'Martinique', value: 'MQ' },
    { label: 'Mauritania', value: 'MR' },
    { label: 'Mauritius', value: 'MU' },
    { label: 'Mayotte', value: 'YT' },
    { label: 'Mexico', value: 'MX' },
    { label: 'Micronesia, Federated States of', value: 'FM' },
    { label: 'Moldova, Republic of', value: 'MD' },
    { label: 'Monaco', value: 'MC' },
    { label: 'Mongolia', value: 'MN' },
    { label: 'Montserrat', value: 'MS' },
    { label: 'Morocco', value: 'MA' },
    { label: 'Mozambique', value: 'MZ' },
    { label: 'Myanmar', value: 'MM' },
    { label: 'Namibia', value: 'NA' },
    { label: 'Nauru', value: 'NR' },
    { label: 'Nepal', value: 'NP' },
    { label: 'Netherlands', value: 'NL' },
    { label: 'Netherlands Antilles', value: 'AN' },
    { label: 'New Caledonia', value: 'NC' },
    { label: 'New Zealand', value: 'NZ' },
    { label: 'Nicaragua', value: 'NI' },
    { label: 'Niger', value: 'NE' },
    { label: 'Nigeria', value: 'NG' },
    { label: 'Niue', value: 'NU' },
    { label: 'Norfolk Island', value: 'NF' },
    { label: 'Northern Mariana Islands', value: 'MP' },
    { label: 'Norway', value: 'NO' },
    { label: 'Oman', value: 'OM' },
    { label: 'Pakistan', value: 'PK' },
    { label: 'Palau', value: 'PW' },
    { label: 'Palestinian Territory, Occupied', value: 'PS' },
    { label: 'Panama', value: 'PA' },
    { label: 'Papua New Guinea', value: 'PG' },
    { label: 'Paraguay', value: 'PY' },
    { label: 'Peru', value: 'PE' },
    { label: 'Philippines', value: 'PH' },
    { label: 'Pitcairn', value: 'PN' },
    { label: 'Poland', value: 'PL' },
    { label: 'Portugal', value: 'PT' },
    { label: 'Puerto Rico', value: 'PR' },
    { label: 'Qatar', value: 'QA' },
    { label: 'Reunion', value: 'RE' },
    { label: 'Romania', value: 'RO' },
    { label: 'Russian Federation', value: 'RU' },
    { label: 'RWANDA', value: 'RW' },
    { label: 'Saint Helena', value: 'SH' },
    { label: 'Saint Kitts and Nevis', value: 'KN' },
    { label: 'Saint Lucia', value: 'LC' },
    { label: 'Saint Pierre and Miquelon', value: 'PM' },
    { label: 'Saint Vincent and the Grenadines', value: 'VC' },
    { label: 'Samoa', value: 'WS' },
    { label: 'San Marino', value: 'SM' },
    { label: 'Sao Tome and Principe', value: 'ST' },
    { label: 'Saudi Arabia', value: 'SA' },
    { label: 'Senegal', value: 'SN' },
    { label: 'Serbia and Montenegro', value: 'CS' },
    { label: 'Seychelles', value: 'SC' },
    { label: 'Sierra Leone', value: 'SL' },
    { label: 'Singapore', value: 'SG' },
    { label: 'Slovakia', value: 'SK' },
    { label: 'Slovenia', value: 'SI' },
    { label: 'Solomon Islands', value: 'SB' },
    { label: 'Somalia', value: 'SO' },
    { label: 'South Africa', value: 'ZA' },
    { label: 'South Georgia and the South Sandwich Islands', value: 'GS' },
    { label: 'Spain', value: 'ES' },
    { label: 'Sri Lanka', value: 'LK' },
    { label: 'Sudan', value: 'SD' },
    { label: 'Suriname', value: 'SR' },
    { label: 'Svalbard and Jan Mayen', value: 'SJ' },
    { label: 'Swaziland', value: 'SZ' },
    { label: 'Sweden', value: 'SE' },
    { label: 'Switzerland', value: 'CH' },
    { label: 'Syrian Arab Republic', value: 'SY' },
    { label: 'Taiwan, Province of China', value: 'TW' },
    { label: 'Tajikistan', value: 'TJ' },
    { label: 'Tanzania, United Republic of', value: 'TZ' },
    { label: 'Thailand', value: 'TH' },
    { label: 'Timor-Leste', value: 'TL' },
    { label: 'Togo', value: 'TG' },
    { label: 'Tokelau', value: 'TK' },
    { label: 'Tonga', value: 'TO' },
    { label: 'Trinidad and Tobago', value: 'TT' },
    { label: 'Tunisia', value: 'TN' },
    { label: 'Turkey', value: 'TR' },
    { label: 'Turkmenistan', value: 'TM' },
    { label: 'Turks and Caicos Islands', value: 'TC' },
    { label: 'Tuvalu', value: 'TV' },
    { label: 'Uganda', value: 'UG' },
    { label: 'Ukraine', value: 'UA' },
    { label: 'United Arab Emirates', value: 'AE' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'United States', value: 'US' },
    { label: 'United States Minor Outlying Islands', value: 'UM' },
    { label: 'Uruguay', value: 'UY' },
    { label: 'Uzbekistan', value: 'UZ' },
    { label: 'Vanuatu', value: 'VU' },
    { label: 'Venezuela', value: 'VE' },
    { label: 'Viet Nam', value: 'VN' },
    { label: 'Virgin Islands, British', value: 'VG' },
    { label: 'Virgin Islands, U.S.', value: 'VI' },
    { label: 'Wallis and Futuna', value: 'WF' },
    { label: 'Western Sahara', value: 'EH' },
    { label: 'Yemen', value: 'YE' },
    { label: 'Zambia', value: 'ZM' },
    { label: 'Zimbabwe', value: 'ZW' },
  ],
}

export const usStates = {
  id: 'state',
  name: 'state',
  values: [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'American Samoa', value: 'AS' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'District Of Columbia', value: 'DC' },
    { label: 'Federated States Of Micronesia', value: 'FM' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Guam', value: 'GU' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Marshall Islands', value: 'MH' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Northern Mariana Islands', value: 'MP' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Palau', value: 'PW' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Puerto Rico', value: 'PR' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virgin Islands', value: 'VI' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' },
  ],
}

export const aboutUsPage = {
  desktopHeroImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardabout_us_1eb84790-8817-479e-84f7-8fbba181d1d5_1600x.jpg?v=1594396303',
    altText: 'alt',
  },
  mobileHeroImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardabout_us_mobile_8d59196a-4bda-4900-a6b9-bf15b67c4264_700x.jpg?v=1594396315',
    altText: 'alt',
  },
  aboutUsContent: [
    {
      image: {
        url:
          'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/About1.svg?v=14209667136057949764',
        altText: 'alt',
      },
      text:
        'While studying psychology and neuroscience as a Harvard undergrad, I became fascinated with the human brain and how it functions.',
      paragraph: true,
    },
    {
      image: {
        url:
          'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/About2.svg?v=17241191729928395287',
        altText: 'alt',
      },
      text:
        'After graduating and settling into long workdays selling and marketing software, I experienced failings with my own brain. Mental fatigue and headaches became daily struggles.',
      paragraph: true,
    },
    {
      image: {
        url:
          'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/About3.svg?v=6141588718709028390',
        altText: 'alt',
      },
      text:
        'Eventually, I identified my carb-packed diet as the culprit. By eliminating high-carb staples from my regimen and consuming vastly more fats and anti-inflammatory compounds, I experienced an astounding recovery in my mental energy and clarity.',
      paragraph: true,
    },
    {
      image: {
        url:
          'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/About4.svg?v=7779015416736652260',
        altText: 'alt',
      },
      text:
        'Elation soon gave way to frustration as I struggled to find ready-to-eat options that fit my new diet and my hectic lifestyle. The fact that no food product centering on brain and body nutrition existed astounded me.',
      paragraph: true,
    },
    {
      image: {
        url:
          'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/About5.svg?v=3561270368287852354',
        altText: 'alt',
      },
      firstText:
        'After hearing similar frustrations from others on a low-carb regimen, I thought:',
      secondText: '“Why don’t I create that product?"',
      thirdText:
        'Before long, I was spending nights and weekends researching esoteric nutrients and “prototyping” in my apartment kitchen.',
      dialogue: true,
    },
    {
      image: {
        url:
          'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/OurStory-Six.png?v=14126893207822201278',
        altText: 'alt',
      },
      text:
        'After countless iterations over the course of a year, I launched a Kickstarter campaign in late 2017 and the first version of IQBAR was born.',
      alt: 'alt',
      paragraph: true,
    },
  ],
}
export const pdpSkuData = {
  sku: '',
}
export const customizedProductDescription = {
  images: [
    'https://cdn.shopify.com/s/files/1/1682/9837/products/bundleswithdiscountbadge-06.png?v=1590778372',
    'https://cdn.shopify.com/s/files/1/1682/9837/products/AMAZONNUTRITIONFACTS-08_9a01cca5-7f2d-43c0-965b-2fe68dee4650.png?v=1590778372',
    'https://cdn.shopify.com/s/files/1/1682/9837/products/AMAZONNUTRITIONFACTS-09_7e29fe26-7c39-438d-ab13-cf2ae30ec979.png?v=1590778372',
    'https://cdn.shopify.com/s/files/1/1682/9837/products/DSC01605.jpg?v=1589569053',
  ],
  subscribeItems: [
    {
      id: 2,
      label: 'Ship Every Week',
      value: 'ShipEveryWeek',
      disabled: false,
    },
    {
      id: 3,
      label: 'Ship Every 2 Week',
      value: 'ShipEvery2Week',
      disabled: false,
    },
    {
      id: 4,
      label: 'Ship Every 3 Week',
      value: 'ShipEvery3Week',
      disabled: false,
    },
    {
      id: 5,
      label: 'Ship Every 4 Week',
      value: 'ShipEvery4Week',
      disabled: false,
    },
  ],
  detailsKey: ['description', 'ingredients', 'netCarbs'],
  product: {
    description: {
      title: 'Description',
      description:
        'This bundle contains 3 boxes: 1 box of 12 Chocolate Sea Salt bars, 1 box of 12 Peanut Butter Chip bars, and 1 box of 12 Almond Butter Chip bars. Satisfy your savory nuts and chocolate dessert cravings without the added guilt!',
    },
    ingredients: {
      title: 'Ingredients',
      ingredients: [
        [
          {
            title: 'Almond Butter Chip Ingredients',
            color: '#783F2D',
            description:
              "Almonds, Soluble Tapioca Fiber, Pea Protein, Protein Crisps (Pea Protein, Tapioca Starch), Allulose, Chocolate Chips (Chocolate, Allulose, Cocoa Butter, Stevia Extract), Water, Natural Flavors, Gum Acacia, Flaxseeds, Coconut Oil, Sea Salt, Sunflower Lecithin, Stevia Extract, Lion's Mane Extract, Vitamin E",
          },
          {
            title: 'Almond Butter Chip Allergens',
            color: '#783F2D',
            description: 'Almonds, Coconut',
          },
        ],
        [
          {
            title: 'Chocolate Sea Salt Ingredients',
            color: '#65493B',
            description:
              "Almonds, Soluble Tapioca Fiber, Allulose, Pea Protein, Protein Crisps (Pea Protein, Tapioca Starch), Chocolate Chips (Chocolate, Allulose, Cocoa Butter, Stevia Extract), Water, Cocoa Powder, Natural Flavors, Flaxseeds, Gum Acacia, Cocoa Extract, Coconut Oil, Sea Salt, Sunflower Lecithin, Stevia Extract, Lion's Mane Extract, Vitamin E",
          },
          {
            title: 'Chocolate Sea Salt Allergens',
            color: '#65493B',
            description: 'Almonds, Coconut',
          },
        ],
      ],
    },
    netCarbs: {
      title: 'Nutrients & Carbs',
      images: [
        'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/nutritionfacts-abc-desktop.png?v=14108304472421026226',
        'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/nutritionfacts-css-desktop.png?v=12550476319516524908',
      ],
    },
  },

  sizeOptions: [
    {
      label: 'XS',
      value: 'xs',
    },
    {
      label: 'S',
      value: 's',
    },
    {
      label: 'M',
      value: 'm',
    },
    {
      label: 'L',
      value: 'l',
    },
  ],

  customCaseS: {
    total: 6,
    title: 'Customize(Boxes of 12)',
    flavors: [
      {
        flavor: 'Chocolate Sea Salt',
        quantity: 1,
        unit: 'Box',
      },
      {
        flavor: 'Peanut Butter Chip',
        quantity: 1,
        unit: 'Box',
      },
      {
        flavor: 'Almond Butter Chip',
        quantity: 1,
        unit: 'Box',
      },
      {
        flavor: 'Chocolate Sea Salt',
        quantity: 1,
        unit: 'Box',
      },
      {
        flavor: 'Chocolate Sea Salt',
        quantity: 1,
        unit: 'Box',
      },
      {
        flavor: 'Chocolate Sea Salt',
        quantity: 1,
        unit: 'Box',
      },
      {
        flavor: 'Chocolate Sea Salt',
        quantity: 0,
        unit: 'Box',
      },
    ],
  },
}
export const PressKit = {
  desktopImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardpress_7bec63db-f986-4968-91a5-d2b5a9ca63a8_1600x.jpg?v=1594396406',
    altText: 'alt',
  },
  mobileImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardpress_mobile_275c32a5-4d84-42d2-aa5b-98152ee1ad24_700x.jpg?v=1594396417',
    altText: 'alt',
  },
  tabs: [
    {
      tabImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/longevity_solution_LOGO_300x.png?v=1567295412',
      tabDescLink:
        'https://www.amazon.com/Longevity-Solution-Dr-James-DiNicolantonio/dp/1628603798/',
      tabDescImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/longevity_solution_LOGO_300x.png?v=1567295412',
      tabDescText:
        'Dr. Jason Fung endorses IQ BAR in his book, claiming it is a great plant protein bar',
    },
    {
      tabImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/LOGO_-_VOGUE_6x-8_f19e18d3-48dc-4dfe-80bd-d7c407aff722_300x.png?v=1567297095',
      tabDescLink: 'https://www.vogue.com/article/on-the-go-travel-snacks',
      tabDescImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/LOGO_-_VOGUE_6x-8_f19e18d3-48dc-4dfe-80bd-d7c407aff722_300x.png?v=1567297095',
      tabDescText: 'Stay sharp with a snack that boosts your mental energy.',
    },
    {
      tabImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/LOGO_-_SN_6x-8_fa4241e0-947f-4d3e-be90-538f76069f92_300x.png?v=1567297028',
      tabDescLink: 'https://snacknation.com/blog/iq-bar-will-nitze/',
      tabDescImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/LOGO_-_SN_6x-8_fa4241e0-947f-4d3e-be90-538f76069f92_300x.png?v=1567297028',
      tabDescText: 'IQ Bars are on another level entirely.',
    },
    {
      tabImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/SHAPE_LOGO_300x.png?v=1567295518',
      tabDescLink:
        'https://www.shape.com/healthy-eating/meal-ideas/best-keto-snacks-amazon',
      tabDescImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/SHAPE_LOGO_300x.png?v=1567295518',
      tabDescText: 'A perfect keto-friendly choice for snackers on the go.',
    },
    {
      tabImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/the_thirty_300x.png?v=1592852920',
      tabDescLink: 'https://thethirty.whowhatwear.com/iq-bars-keto',
      tabDescImage:
        'https://cdn.shopify.com/s/files/1/1682/9837/files/the_thirty_300x.png?v=1592852920',
      tabDescText:
        'It’s pretty clear this bar is something to pay attention to.',
    },
  ],
  imagesAndLinks: [
    {
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/Press-TeamPhotos.png?v=15503001964905436099',
      imageAlt: 'Team Photos',
      linkText: 'Team Photos',
      link:
        'https://www.dropbox.com/sh/so150jz9ly7xyrd/AAANlxEQb1WndMP22S31tKo0a?dl=0',
    },
    {
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/Press-Logos.png?v=8296231648861317758',
      imageAlt: 'Press Logos',
      linkText: 'Logos',
      link:
        'https://www.dropbox.com/sh/uprh2by2emuhtzn/AABOsc9Y6jxOpEkF1aS4v-e5a?dl=0',
    },
    {
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/Press-ProductImages.png?v=11254373560229789032',
      imageAlt: 'Product Images',
      linkText: 'Product Images',
      link:
        'https://www.dropbox.com/sh/r9c0pip04mtcho7/AACtpZvesIFxvSnz34tBL4zZa?dl=0',
    },
  ],
  headingParagraphs: [
    {
      heading: 'INQUIRIES',
      firstPart: 'For press inquiries, please contact',
      linkText: 'jess@eatiqbar.com',
      linkUrl: 'mailto:jess@eatiqbar.com',
      secondPart: 'We’re happy to provide additional materials.',
      bgColor: true,
    },
    {
      heading: 'PRODUCT OVERVIEW',
      firstPart: 'For an overview of our products, visit',
      linkText: 'Why IQBAR ',
      linkUrl: '/pages/why-iqbar',
      secondPart: '',
      bgColor: false,
    },
  ],
}
export const subscribeItems = [
  {
    // id: 0,
    label: 'One-Time Purchase',
    // value: 'oneTimePurchase',
    disabled: false,
  },
  {
    // id: 1,
    label: 'Subscribe & Save 10%',
    // value: 'subscribe&save10',
    disabled: true,
  },
  // {
  //   id: 2,
  //   label: 'Ship Every Week',
  //   value: 'ShipEveryWeek',
  //   disabled: false,
  // },
  // {
  //   id: 3,
  //   label: 'Ship Every 2 Week',
  //   value: 'ShipEvery2Week',
  //   disabled: false,
  // },
  // {
  //   id: 4,
  //   label: 'Ship Every 3 Week',
  //   value: 'ShipEvery3Week',
  //   disabled: false,
  // },
  // {
  //   id: 5,
  //   label: 'Ship Every 4 Week',
  //   value: 'ShipEvery4Week',
  //   disabled: false,
  // },
]
export const newsletterData = {
  title: 'Join our newsletter!',
  subTitle:
    'All the best news articles, life hacks and interesting facts that you can fit into your brain today.',
  image: '/static/images/news-letter-modal.png',
  alertTitle: 'Sign up and get 15% OFF your next order!',
  successImage: '/static/images/newsletter-success.gif',
  successAlertText: 'You are on your way to savings!',
  successCode: 'IQNEWS15AYOC',
}
export const MainPageHeroData = {
  desktopVideo:
    'https://cdn.shopify.com/s/files/1/1682/9837/files/bgVideoDesktop.mp4?v=15147493154089671140',
  mobileVideo:
    'https://cdn.shopify.com/s/files/1/1682/9837/files/bgVideoMobile.mp4?v=3175919428150438853',
  heroImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/t/93/assets/BlakFridaybar.gif?v=244636036816050620',
    altText: 'alt',
  },
  firstDesktopHeading: 'CLEAN, KETO, VEGAN',
  secondDesktopHeading: 'PLANT PROTEIN BARS',
  mobileHeading: 'KETO PROTEIN BARS',
  bulletPoints: [
    {
      bulletUrl:
        'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/thick_tick.svg?v=14629134178705490140',
      bulletPoint: '6 Brain Nutrients + 12g Plant Protein',
    },
    {
      bulletUrl:
        'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/thick_tick.svg?v=14629134178705490140',
      bulletPoint: '1-1g Sugar + 3g Net Carbohydrates',
    },
    {
      bulletUrl:
        'https://cdn.shopify.com/s/files/1/1682/9837/t/94/assets/thick_tick.svg?v=14629134178705490140',
      bulletPoint: 'Paleo Friendly + Zero Sugar Alcohols',
    },
  ],
  buttonText: 'Shop IQBAR',
  buttonLink: '/collections/all-bars',
}
export const OrderDetailsData = {
  data: [
    {
      name: 'Chocolate',
      quantity: '1 x 60.72',
      price: 60.72,
      shipping: '--',
      discount: -0.0,
      tax: '--',
      total: 60.72,
    },
  ],
}

export const PSusbcribed = {
  id: 'fake-item-id',
  title: 'CHOCOLATE LOVERS BUNDLE',
  link: '/products?sku=CHOCOLATELOVERS',
  price: 202,
  image: {
    src:
      'https://cdn.shopify.com/s/files/1/1682/9837/products/bundleswithdiscountbadge-06_17e26c10-406c-4486-b4f3-8bec772da3f6.png?v=1610656741',
    alt: 'image alt',
  },
}

export const PProductsData = [
  {
    id: 'fake-item-id-1',
    title: 'CUSTOM CASE',
    link: '/products?sku=CUSTOMCASE',
    price: 65,
    image: {
      src:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/bundleswithdiscountbadge-08_1576bc74-b9d5-4e86-a3b2-e17676249162.png?v=1590779828',
      alt: 'image alt',
    },
  },
  {
    id: 'fake-item-id-2',
    title: 'ALMOND BUTTER CHIP & BANANA NUT',
    link: '/products?sku=ALMONDBUTTERCHIPBANANANUT',
    price: 56,
    image: {
      src:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/bundleswithdiscountbadge-04_64efd66c-1d92-4871-83ea-8b2386351c09.png?v=1610656459',
      alt: 'image alt',
    },
  },
  {
    id: 'fake-item-id-3',
    title: 'ALMOND BUTTER CHIP & PEANUT BUTTER CHIP',
    link: '/products?sku=ALMONDBUTTERPEANUTBUTTER',
    price: 78,
    image: {
      src:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/bundleswithdiscountbadge-05_879dfcf8-6033-45c5-a207-71d443572543.png?v=1610656594',
      alt: 'image alt',
    },
  },
  {
    id: 'fake-item-id-4',
    title: 'CHOCOLATE LOVERS & FRUIT LOVERS',
    link: '/products?sku=CHOCOLATELOVERFRUITLOVER',
    price: 94,
    image: {
      src:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/bundleswithdiscountbadge-01.png?v=1590778332',
      alt: 'image alt',
    },
  },
  {
    id: 'fake-item-id-5',
    title: 'FRUIT LOVERS BUNDLE',
    link: '/products?sku=FRUITLOVERS',
    price: 94,
    image: {
      src:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/bundleswithdiscountbadge-07_00b10e4b-35c0-4291-850c-a494322152b3.png?v=1590778400',
      alt: 'image alt',
    },
  },
  {
    id: 'fake-item-id-7',
    title: '7 Bar Sampler',
    link: '/products?sku=7BARSAMPLER',
    price: 94,
    image: {
      src:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/SamplerMainImage_17e01fb1-7123-423f-b2fa-eb105d6ce96d.png?v=1601044575',
      alt: 'image alt',
    },
  },
  {
    id: 'fake-item-id-8',
    title: 'PEANUT BUTTER CHIP',
    link: '/products?sku=PEANUTBUTTERCHIP',
    price: 94,
    image: {
      src:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/PeanutButterChip.png?v=1606770218',
      alt: 'image alt',
    },
  },
  {
    id: 'fake-item-id-9',
    title: 'CHOCOLATE SEA SALT',
    link: '/products?sku=CHOCOLATESEASALT',
    price: 94,
    image: {
      src:
        'https://cdn.shopify.com/s/files/1/1682/9837/products/singlebars-012.png?v=1606770039',
      alt: 'image alt',
    },
  },
]

export const PSusbcribeNewItem = {
  id: 'fake-item-id',
  title: 'ALMOND BUTTER CHIP & BANANA NUT',
  link: '/products?sku=ALMONDBUTTERCHIPBANANANUT',
  price: 500,
  image: {
    src:
      'https://cdn.shopify.com/s/files/1/1682/9837/products/bundleswithdiscountbadge-04_64efd66c-1d92-4871-83ea-8b2386351c09.png?v=1610656459',
    alt: 'image alt',
  },
  itemScheduleList: [
    {
      id: 0,
      label: '1 week',
      value: '1 week',
    },
    {
      id: 1,
      label: '2 weeks',
      value: '2 weeks',
    },
    {
      id: 3,
      label: '3 weeks',
      value: '3 weeks',
    },
  ],
}

export const PurchaseHistory = {
  label: 'PURCHASE HISTORY',
  orders: [
    {
      orderDate: 'January 18, 2021',
      orderId: '42535',
      amount: '60.72',
    },
    {
      orderDate: 'March 28, 2021',
      orderId: '89562',
      amount: '689.72',
    },
  ],
}

export const subscriptionBillingInfo = {
  cardInfo: {
    cardProvider: 'mastercard',
    cardIdentifier: '1480',
    expiryDate: '11/2024',
  },
  billingInfo: {
    firstName: 'Ali',
    lastName: 'Raza',
    company: 'Fabric',
    address: '1049-CEL Monte Suite',
    state: 'California',
    country: 'United States',
    zipCode: 94040,
    email: 'hussam.butt"fabric.inc',
  },
}

export const DeliveryStatus = {
  label: 'CHOCOLATE LOVERS',
  varient: '36 Bars',
  chargeDate: 'May 10, 2021',
  quantity: '1',
  frequency: '8 weeks',
  cardProvider: 'mastercard',
  cardIdentifier: '1480',
  expiryDate: '11 / 2024',
  shipping: {
    firstName: 'Ali',
    lastName: 'Aziz',
    company: 'Fabric',
    address: '1049-CEL Monte Suite',
    city: 'California',
    state: 'California',
    country: 'United States',
    zipCode: 94040,
    email: 'hussam.butt"fabric.inc',
  },
}

export const EditShipingBillingAddress = {
  formBgColor: 'white',
  requestForms: [
    {
      formInputs: [
        [
          {
            id: 'firstName',
            label: 'FIRST NAME',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
          {
            id: 'lastName',
            label: 'LAST NAME',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'addressLine1',
            label: 'Address Line 1',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'addressLine2',
            label: 'Address Line 2',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'companyName',
            label: 'COMPANY NAME',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'country',
            label: 'Country',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
          {
            id: 'state',
            label: 'State',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'city',
            label: 'City',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
          {
            id: 'zipCode',
            label: 'Zip Code',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'phone',
            label: 'Phone',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: true,
              asterisk: false,
            },
          },
        ],
      ],
    },
    {
      formInputs: [
        [
          {
            id: 'firstName',
            label: 'FIRST NAME',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
          {
            id: 'lastName',
            label: 'LAST NAME',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'addressLine1',
            label: 'Address Line 1',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'addressLine2',
            label: 'Address Line 2',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'companyName',
            label: 'COMPANY NAME',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'country',
            label: 'Country',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
          {
            id: 'state',
            label: 'State',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'city',
            label: 'City',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
          {
            id: 'zipCode',
            label: 'Zip Code',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: false,
              asterisk: false,
            },
          },
        ],
        [
          {
            id: 'phone',
            label: 'Phone',
            validations: {
              isRequired: true,
              isEmail: false,
              isPhoneNo: true,
              asterisk: false,
            },
          },
        ],
      ],
    },
  ],
}

export const cancelSubData = {
  sidebarData: {
    headingText: 'Ali Aziz',
    firstBtnTxt: 'Delivery schedule subscriptions',
    secondBtnTxt: 'Billing information purchase history',
  },
  headingText: 'Cancel chocolate lovers bundle (subscription)',
  secondaryText:
    "Please help us process your request by telling us why you're cancelling",
  swapProductBtnTxt: 'Swap product',
  cancelSubBtnTxt: 'Cancel my subscription',
  reasonsText: 'Select a reason for cancelling your subscription',
  reasonsList: [
    'This is too expensive',
    'This was created by accident',
    'I already have more than I need',
    'I need it sooner',
    'I no longer want this product',
    'I want a different flavor delivered',
    'Other Reason ',
  ],
}
export const SingleOrderDetails = {
  orderID: '5450',
  orderDate: 'January 18, 2021 5:23PM',
  productTitle: 'CHOCOLATE LOVERS BUNDLE',
  sku: '58267',
  price: '$62.25',
  quantity: '4',
  total: '$62.25',
  subtotal: '$62.25',
  finalTotal: '$62.25',
  subTitle: 'ORDER HISTORY',
  billingAddress: 'Billing Address',
  paymentLabel: 'Payment Status',
  paymentStatus: 'Paid',
  shippingAddress: 'Shipping Address',
  fullfillmentLabel: 'Fulfillment Status',
  fullfillmentStatus: 'Unfulfilled',
  cutomerFirstName: 'Ali',
  cutomerLastName: 'Aziz',
  companyName: 'Fabric',
  streetAddress: '1049-C EL Monte Avenu',
  suiteAddress: 'Suit C 710',
  city: 'California',
  state: 'CA ',
  zipCode: '94094',
  country: 'United Satate',
}

export const subscriptionOrderDetails = {
  cutomerFirstName: 'Ali',
  cutomerLastName: 'Aziz',
  Orderaddress: '1049-C EL MONTE AVENUE SUITE C 710 California CA 94040',
  productTitle: 'Chocolate Lovers Bundle (Subscription) -36 Bars',
  quantity: '2',
  price: '60.72',
  frequency: '8 Weeks',
  chargeDate: 'Monday March 16',
}

export const simpleFormData = {
  buttonLabel: 'Send Message',
  formTitle: 'Contact Us',
  mobileFormTitle: 'Contact Us',
  subtitle: `<p class="big-margin-b">Use the form below, or feel free to reach out to us any time at <a class="bold" href="mailto:info@eatiqbar.com">info@eatiqbar.com</a>, even just to say "hey"!</p>`,
  formInputs: [
    {
      formRow: [
        {
          id: 'firstName',
          label: 'FIRST NAME',
          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          asterisk: true,
        },
        {
          id: 'lastName',
          label: 'LAST NAME',
          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          asterisk: true,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'email',
          label: 'EMAIL',
          validations_isRequired: true,
          validations_isEmail: true,
          validations_isPhoneNo: false,
          asterisk: true,
        },
        {
          id: 'phoneNumber',
          label: 'PHONE NUMBER',
          validations_isRequired: false,
          validations_isEmail: false,
          validations_isPhoneNo: true,
          asterisk: false,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'reasonForMsg',
          label: 'REASON FOR MESSAGE',
          fieldType: 'select',
          optionsType: 'message-reasons',
          validations_isRequired: true,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          asterisk: true,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'message',
          label: 'MESSAGE',
          fieldType: 'textarea',
          validations_isRequired: false,
          validations_isEmail: false,
          validations_isPhoneNo: false,
          asterisk: false,
        },
      ],
    },
  ],
}

export const contactUsBanner = {
  desktopImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardCONTACT_a7bbfb38-067c-4ed5-8298-962a160c8354_1600x.jpg?v=1594396470',
    altText: 'Desktop hero image',
  },
  mobileImage: {
    url:
      'https://cdn.shopify.com/s/files/1/1682/9837/files/hero_images_artboardcontact_us_mobile_4284eafc-d172-43d4-9635-8a4925454e98_700x.jpg?v=1594396483',
    altText: 'Mobile hero image',
  },
}

export const policyData = {
  page: `<div class="shopify-policy__container">
  <div class="shopify-policy__title">
    <h1>Text Marketing and notifications: By subscribing to text notifications you agree to receive recurring automated marketing messages at the phone number provided. Consent is not a condition of purchase. You are always able to reply STOP to unsubscribe.</h1>
  </div>

  <div class="shopify-policy__body">
    <div class="rte">
        <span>Text Marketing and notifications: By subscribing to text notifications you agree to receive recurring automated marketing messages at the phone number provided. Consent is not a condition of purchase. Reply STOP to unsubscribe. HELP for help. Msg &amp; Data rates may apply. More info view Privacy Policy and ToS.</span>
    </div>
  </div>
</div>`,
}

export const emptyCartData = {
  emptyCartPageTitle: 'SHOPPING CART',
  emptyCartPageSubtitle: 'Your cart is currently empty.',
  emptyCartBtnText: 'SHOP NOW',
  emptyCartBtnLink: '/collections/all-bars',
}

export const termOfService = `
TERMS OF SERVICE
<br />
<br />
-----
<br />
<br />
OVERVIEW
<br />
<br />
This website is operated by IQBAR. Throughout the site, the terms “we”, “us” and “our” refer to IQBAR. IQBAR offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
<br />
<br />
By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
<br />
<br />
Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
<br />
<br />
Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
<br />
<br />
Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.
<br />
<br />
SECTION 1 - ONLINE STORE TERMS
<br />
<br />
By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
You must not transmit any worms or viruses or any code of a destructive nature.
A breach or violation of any of the Terms will result in an immediate termination of your Services.
<br />
<br />
SECTION 2 - GENERAL CONDITIONS
<br />
<br />
We reserve the right to refuse service to anyone for any reason at any time.
You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
<br />
<br />
SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
<br />
<br />
We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
<br />
<br />
SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES
<br />
<br />
Prices for our products are subject to change without notice.
We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
<br />
<br />
SECTION 5 - PRODUCTS OR SERVICES (if applicable)
<br />
<br />
Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.
We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
<br />
<br />
SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION
<br />
<br />
We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e‑mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
<br />
<br />
You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
<br />
<br />
For more detail, please review our Returns Policy.
<br />
<br />
SECTION 7 - OPTIONAL TOOLS
<br />
<br />
We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.
You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.
Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).
We may also, in the future, offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.
<br />
<br />
SECTION 8 - THIRD-PARTY LINKS
<br />
<br />
Certain content, products and services available via our Service may include materials from third-parties.
Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.
We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
<br />
<br />
SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
<br />
<br />
If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.
You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e‑mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
<br />
<br />
SECTION 10 - PERSONAL INFORMATION
<br />
<br />
Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.
<br />
<br />
SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS
<br />
<br />
Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).
We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.
<br />
<br />
SECTION 12 - PROHIBITED USES
<br />
<br />
In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
<br />
<br />
SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
<br />
<br />
We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.
You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.
You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement.
In no case shall IQBAR, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
<br />
<br />
SECTION 14 - INDEMNIFICATION
<br />
<br />
You agree to indemnify, defend and hold harmless IQBAR and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.
<br />
<br />
SECTION 15 - SEVERABILITY
<br />
<br />
In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
<br />
<br />
SECTION 16 - TERMINATION
<br />
<br />
The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.
These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.
If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
<br />
<br />
SECTION 17 - ENTIRE AGREEMENT
<br />
<br />
The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).
Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
<br />
<br />
SECTION 18 - GOVERNING LAW
<br />
<br />
These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of IQBAR, Inc., 208 Commonwealth Avenue, Apt A, Boston MA 02116, United States.
<br />
<br />
SECTION 19 - CHANGES TO TERMS OF SERVICE
<br />
<br />
You can review the most current version of the Terms of Service at any time at this page.
We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
<br />
<br />
SECTION 20 - CONTACT INFORMATION
<br />
<br />
Questions about the Terms of Service should be sent to us at info@eatiqbar.com.
<br />
<br />
-----
`

export const refundPolicy = `
Refunds:
              <br />
              While we do not issue refunds based on personal preference (we
              highly recommend you start with our 7 Bar Sampler if you're new to
              IQBAR), please reach out to our team at info@eatiqbar.com if your
              order is damaged or defective in some way - we'll make it right!
              <br />
              If you're approved for a refund and haven't received your money,
              first check your bank account again. Then, contact your credit
              card company - it may take some time before the refund is posted.
              Finally, contact your bank - there is often processing time with
              refunds. If you’ve done all this and still have not received your
              refund, please contact us at info@eatiqbar.com.
              <br />
              Returns:
              <br />
              Because IQBARs are a food product, we cannot accept returns of
              opened boxes and/or boxes containing fewer than 12 bars. If you're
              truly unhappy with the quality of the product you receive, please
              reach out at info@eatiqbar.com and we'll work with you to find a
              solution!
              <br />
              If you do have unopened boxes with 12 bars you'd like to return,
              please reach out to info@eatiqbar.com to coordinate shipping back
              to IQBAR. Please note, you'll be responsible for paying for your
              own shipping costs for returning your item.
              <br />
              Purchases From 3rd Party Retailers:
              <br />
              IQBAR cannot guarantee products sold by unauthorized third party
              retail vendors either online or in stores. Authorized retailers
              are responsible for providing their own return/refund policies for
              items they sell, including IQBARs.`

export const textMarketing = `
Text Marketing and notifications: By subscribing to text notifications
you agree to receive recurring automated marketing messages at the phone
number provided. Consent is not a condition of purchase. You are always
able to reply STOP to unsubscribe.
`
