export default [
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
    id: 'confirmPassword',
    fieldtype: 'input',
    hidden: true,
    name: 'Confirm Password',
    placeholder: 'Eg, ........',
    icon: {
      side: 'right',
      name: 'eye-open',
    },
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];
