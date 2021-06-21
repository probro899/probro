export default [
  {
    id: 'email',
    fieldtype: 'input',
    name: 'Email',
    placeholder: 'Eg, alex@gmail.com',
    specialType: 'email',
    required: true,
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