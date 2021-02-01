const NameSchema = [
  {
    id: 'firstName',
    fieldtype: 'input',
    name: 'First Name',
    placeholder: '',
    required: true,
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
    required: true,
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

const AddressSchema = [
  {
    id: 'address',
    fieldtype: 'input',
    name: 'Address',
    placeholder: '',
    required: true,
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

const CountrySchema = [
  {
    id: 'country',
    fieldtype: 'select',
    options: [{ label: '---', value: null }],
    name: 'Country',
    placeholder: '',
    required: true,
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
    required: true,
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

const HeadlineSchema = [
  {
    id: 'headline',
    fieldtype: 'input',
    name: 'Headline',
    placeholder: 'Eg. Software Developer',
    required: true,
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

export { NameSchema, GenderSchema, AddressSchema, CountrySchema, HeadlineSchema };
