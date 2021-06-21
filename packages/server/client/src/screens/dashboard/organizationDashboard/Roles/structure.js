export default [
  {
    id: 'email',
    fieldtype: 'input',
    name: 'Email',
    specialType: 'email',
    placeholder: 'Eg, john@properclass.com',
    required: true,
  },
  {
    id: 'type',
    fieldtype: 'select',
    name: 'Type',
    required: true,
    val: 'manager',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'Manager', value: 'manager' },
      { label: 'Mentor', value: 'mentor' },
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
