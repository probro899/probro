export default [
  {
    id: 'email',
    fieldtype: 'input',
    name: 'Email',
    placeholder: 'Eg, alex@gmail.com',
  },
  {
    id: 'password',
    fieldtype: 'input',
    hidden: true,
    name: 'Password',
    placeholder: 'Eg, ........',
    icon: {
      side: 'right',
      name: 'eye-open',
    },
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
