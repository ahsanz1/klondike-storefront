const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'AccountAddress',
  label: 'Account Address',
  isGlobal: false,
  description: 'Account address component',
  attributes: {
    account_title: Types.String({ label: 'Page Title' }),
    account_subTitle: Types.String({ label: 'Subtitle' }),
    returnToAccountText: Types.String({ label: 'Return to Account Text' }),
    returnToAccountLink: Types.String({ label: 'Return to Account Link' }),
    addNewAddressBtnText: Types.String({ label: 'Add address btn text' }),

    formBgColor: Types.String({ label: 'Background color' }),
    lblInputClass: Types.String({ label: 'Input class' }),
    formTitle: Types.String({ label: 'Form title' }),
    formEditTitle: Types.String({ label: 'Form edit title' }),
    mobileFormTitle: Types.String({ label: 'Mobile form title' }),
    buttonLabel: Types.String({ label: 'Add Btn Text' }),
    cancelButtonLabel: Types.String({ label: 'Cancel Btn Text' }),
    checkboxText: Types.String({ label: 'Set as default address' }),

    formInputs: Types.Array({
      label: 'Form Row',
      children: Types.Shape({
        children: {
          formRow: Types.Array({
            label: 'Form column',
            children: Types.Shape({
              children: {
                id: Types.String({
                  label: 'Unique id for every input in form',
                }),
                label: Types.String({ label: 'Input Label' }),
                fieldType: Types.String({
                  label: 'Field Type (text, select, checkbox or textarea)',
                }),
                optionsType: Types.String({
                  label:
                    "'countries' OR 'message-reasons', in case of Field Type 'select'",
                }),
                placeholder: Types.String({ label: 'Placeholder' }),
                validations_isRequired: Types.Boolean({
                  label: 'is required',
                }),
                validations_isEmail: Types.Boolean({ label: 'is email' }),
                validations_isPhoneNo: Types.Boolean({
                  label: 'is phone number',
                }),
                validations_isPassword: Types.Boolean({
                  label: 'is password',
                }),
              },
            }),
          }),
        },
      }),
    }),
  },
})
