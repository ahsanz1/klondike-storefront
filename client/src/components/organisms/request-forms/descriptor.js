const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'RequestForms',
  label: 'Request Form',
  isGlobal: false,
  description: 'Request wholesale account and sample',
  attributes: {
    formBgColor: Types.String({ label: 'form section bg color' }),
    requestForms: Types.Array({
      label: 'Form',
      children: Types.Shape({
        children: {
          title: Types.String({ label: 'Tab title' }),
          buttonLabel: Types.String({ label: 'Button Label' }),
          formTitle: Types.String({ label: 'Form Title' }),
          mobileFormTitle: Types.String({ label: 'Mobile ver. Form Title' }),
          formButtonLabel: Types.String({ label: 'Form Button label' }),
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
                      asterisk: Types.Boolean({
                        label: 'Show asterisk with this field or not',
                      }),
                    },
                  }),
                }),
              },
            }),
          }),
        },
      }),
    }),
  },
})
