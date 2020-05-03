
export default [
  {
    id: 'user',
    fieldtype: 'select',
    options: [
      { label: '---', value: '' },
    ],
    required: true,
    name: 'Add new member',
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
