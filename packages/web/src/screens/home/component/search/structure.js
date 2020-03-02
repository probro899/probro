const filterSchema = [
  {
    id: 'country',
    fieldtype: 'select',
    options: [
      { label: '---', value: '' },
      { label: 'Nepal', value: 'nepal' },
      { label: 'India', value: 'india' },
      { label: 'US', value: 'us' },
      { label: 'Australia', value: 'australia' },
    ],
    val: '',
  },
  {
    id: 'key',
    fieldtype: 'input',
    placeholder: 'Ex, CEO, Professor',
  },
  {
    id: 'industry',
    fieldtype: 'select',
    options: [
      { label: '---', value: '' },
      { label: 'Engineering', value: 'engineering' },
      { label: 'Accounting', value: 'accounting' },
      { label: 'Medical', value: 'medical' },
    ],
    val: '',
  },
  {
    id: 'apply',
    text: 'Apply',
    fieldtype: 'button',
    type: 'submit',
  },
];

export default filterSchema;
