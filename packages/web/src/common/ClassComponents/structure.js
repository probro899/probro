export default [
  {
    id: 'name',
    fieldtype: 'input',
    name: 'Name',
    placeholder: '',
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    fill: 'fill',
    intent: 'success',
    large: 'large',
  },
];

const addUserToBoard = [
  {
    id: 'email',
    fieldtype: 'input',
    name: 'Email',
    placeholder: 'Example: nabin@properclass.com',
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Send Request',
    fill: 'fill',
    intent: 'success',
    large: 'large',
  },
];

export { addUserToBoard };
