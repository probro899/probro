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
    type: 'submit',
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
    type: 'submit',
    text: 'Send Request',
    fill: 'fill',
    intent: 'success',
    large: 'large',
  },
];

export { addUserToBoard };
