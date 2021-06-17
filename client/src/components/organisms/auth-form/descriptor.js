const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'AuthForm',
  label: 'Authentication Form',
  description: `Auth form with options for background color, button links and input fields
  with validations`,

  attributes: {
    formBgColor: Types.String({ label: 'Form background color' }),
    formId: Types.String({
      label:
        'Form ID, 1 for Login, 2 for Register, 3 for Forget PW, 4 for Reset PW',
    }),
    formTitle: Types.String({ label: 'Form Title' }),
    mobileFormTitle: Types.String({ label: 'Mobile Form Title' }),
    buttonLabel: Types.String({ label: 'Button Label' }),
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
    links: Types.Array({
      label: 'Links (Login form only)',
      children: Types.Shape({
        children: {
          text: Types.String({ label: 'Text' }),
          to: Types.String({ label: 'Link to' }),
        },
      }),
    }),
    accountResetLink: Types.String({
      label: 'Account Reset Link (Register form only)',
    }),
    resetText: Types.String({
      label: 'Account Reset Text (Register form only)',
    }),
    cancelBtnText: Types.String({
      label: 'Cancel Button Text (Forget pw form only)',
    }),
    cancelBtnLink: Types.String({
      label: 'Cancel Button Link (Forget pw form only)',
    }),
    showCancelBtn: Types.Boolean({
      label: 'Show Cancel Button? (Forget pw form only)',
    }),
    expiredTokenTitle: Types.String({
      label: 'Expired Token Title (Reset pw form only)',
    }),
    expiredTokenDescription: Types.String({
      label: 'Expired Token Description (Reset pw form only)',
    }),
    resetTitle: Types.String({
      label: 'Reset Password Text (Forget pw form only)',
    }),
    resetDetailTitle: Types.String({
      label: 'Reset Password Detail Text (Forget pw form only)',
    }),
  },
})
