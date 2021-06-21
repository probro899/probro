import countryList from 'react-select-country-list';

const NameSchema = (user) => [
  { id: 'firstName', val: user.firstName, fieldtype: 'input', name: 'First Name', required: true },
  { id: 'middleName', val: user.middleName || '', fieldtype: 'input', name: 'Middle Name' },
  { id: 'lastName', val: user.lastName, fieldtype: 'input', name: 'Last Name', required: true },
  { id: 'submit', fieldtype: 'button', text: 'Submit', type: 'submit' },
];

const AddressSchema = (userDetail) => [
  { id: 'address', val: userDetail.address, fieldtype: 'input', name: 'Address', required: true },
  { id: 'submit', fieldtype: 'button', text: 'Submit', type: 'submit' },
];

const CountrySchema = (userDetail) => {
  const countries = countryList().getData().map((obj) => ({ label: obj.label, value: obj.label }));
  return [
    { id: 'country', label: 'Country', val: userDetail.country, fieldtype: 'select', options: [{ label: '---', value: null }, ...countries], name: 'Country', required: true },
    { id: 'submit', fieldtype: 'button', text: 'Submit', type: 'submit' },
  ];
}

const GenderSchema = (userDetail) => [
  { id: 'gender', label: 'Gender', fieldtype: 'select', name: 'Gender', val: userDetail.gender, required: true,
    options: [
      { label: '---', value: null },
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Others', value: 'others' },
    ],
  },
  { id: 'submit', fieldtype: 'button', text: 'Submit', type: 'submit' },
];

const HeadlineSchema = (userDetail) => [
  { id: 'headline', val: userDetail.headLine, fieldtype: 'input', name: 'Headline', placeholder: 'Eg. Software Developer', required: true },
  { id: 'submit', fieldtype: 'button', text: 'Submit', type: 'submit' },
];

const CareerIntrestSchema = (userDetail) => {
  const val = userDetail.field ? JSON.parse(userDetail.field) : [];
  return [
    { id: 'field', val, name: 'Career Interests', fieldtype: 'tagInput' },
    { id: 'submit', fieldtype: 'button', text: 'Submit', type: 'submit' },
  ]
}

export { NameSchema, CareerIntrestSchema, GenderSchema, AddressSchema, CountrySchema, HeadlineSchema };
