const NameSchema = [
  {
    id: 'firstName',
    fieldtype: 'input',
    name: 'First Name',
    placeholder: '',
  },
  {
    id: 'middleName',
    fieldtype: 'input',
    name: 'Middle Name',
    placeholder: '',
  },
  {
    id: 'lastName',
    fieldtype: 'input',
    name: 'Last Name',
    placeholder: '',
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    type: 'submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

const GenderSchema = [
  {
    id: 'gender',
    fieldtype: 'select',
    name: 'Gender',
    options: [
      { label: '---', value: '' },
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Others', value: 'others' },
    ],
  },
  {
    id: 'submit',
    fieldtype: 'button',
    type: 'submit',
    text: 'Submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

const CarrierSchema = [
  {
    id: 'interest',
    fieldtype: 'tagInput',
    name: 'Career Interests',
    placeholder: 'Ex, publicspeaking',
    values: [],
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    type: 'submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

export { NameSchema, GenderSchema, CarrierSchema };
