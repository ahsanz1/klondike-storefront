const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'SimpleForm',
  label: 'Simple Form',
  isGlobal: false,
  description: 'Simple form for contact us etc',
  attributes: {
    buttonLabel: Types.String({ label: 'Button Label' }),
    subtitle: Types.RichText({ label: 'subtitle' }),
    formTitle: Types.String({ label: 'Form Title' }),
    mobileFormTitle: Types.String({ label: 'Mobile ver. Form Title' }),
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
                  label: 'Input type eg: textarea, text, select',
                }),
                optionsType: Types.String({
                  label:
                    "'countries' OR 'message-reasons', in case of Field Type 'select'",
                }),
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
})
