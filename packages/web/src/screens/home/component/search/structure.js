const filterSchema = [
  {
    id: 'location',
    fieldtype: 'select',
    options: [{ label: 'Nepal', value: 'Nepal' }],
  },
  {
    id: 'title',
    fieldtype: 'input',
    placeholder: 'Ex, CEO, Professor',
  },
  {
    id: 'industry',
    fieldtype: 'select',
    options: [{ label: 'Engineering', value: 'engineering' }],
  },
  {
    id: 'apply',
    text: 'Apply',
    fieldtype: 'button',
    type: 'submit',
  },
];

export default filterSchema;
