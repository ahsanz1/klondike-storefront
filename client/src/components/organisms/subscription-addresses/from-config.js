export const shippingAddress = {
  formBgColor: '#fff',
  formTitle: 'SHIPPING ADDRESS',
  mobileFormTitle: 'SHIPPING ADDRESS',
  buttonLabel: 'Save',
  formInputs: [
    {
      formRow: [
        {
          id: 'firstName',
          label: 'First Name',
          validations_isRequired: true,
        },
        {
          id: 'lastName',
          label: 'Last Name',
          validations_isRequired: true,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'address1',
          label: 'Address line 1',
          validations_isRequired: true,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'address2',
          label: 'Address line 2',
        },
      ],
    },
    // {
    //   formRow: [
    //     {
    //       id: 'company',
    //       label: 'company',
    //     },
    //   ],
    // },
    {
      formRow: [
        {
          id: 'country',
          label: 'country',
          validations_isRequired: true,
          fieldType: 'select',
          optionsType: 'usa',
        },
        {
          id: 'state',
          label: 'state',
          fieldType: 'select',
          validations_isRequired: true,
          optionsType: 'states',
        },
      ],
    },
    {
      formRow: [
        {
          id: 'city',
          label: 'city',
          validations_isRequired: true,
        },
        {
          id: 'zipCode',
          label: 'Zip code',
          validations_isRequired: true,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'phone',
          label: 'phone',
          validations_isPhoneNo: true,
        },
      ],
    },
  ],
}

export const billingAddress = {
  formBgColor: '#fff',
  formTitle: 'BILLING ADDRESS',
  mobileFormTitle: 'BILLING ADDRESS',
  buttonLabel: 'Save',
  formInputs: [
    {
      formRow: [
        {
          id: 'firstName',
          label: 'First Name',
          validations_isRequired: true,
        },
        {
          id: 'lastName',
          label: 'Last Name',
          validations_isRequired: true,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'address1',
          label: 'Address line 1',
          validations_isRequired: true,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'address2',
          label: 'Address line 2',
        },
      ],
    },
    // {
    //   formRow: [
    //     {
    //       id: 'company',
    //       label: 'company',
    //     },
    //   ],
    // },
    {
      formRow: [
        {
          id: 'country',
          label: 'country',
          validations_isRequired: true,
          fieldType: 'select',
          optionsType: 'countries',
        },
        {
          id: 'state',
          label: 'state',
          fieldType: 'select',
          optionsType: 'states',
          validations_isRequired: true,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'city',
          label: 'city',
          validations_isRequired: true,
        },
        {
          id: 'zipCode',
          label: 'Zip code',
          validations_isRequired: true,
        },
      ],
    },
    {
      formRow: [
        {
          id: 'phone',
          label: 'phone',
          validations_isPhoneNo: true,
        },
      ],
    },
  ],
}
