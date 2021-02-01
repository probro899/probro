const filterSchema = [
  {
    id: 'country',
    fieldtype: 'select',
    options: [
      { label: '---', value: '' },
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
      { label: 'Management', value: 'management' },
      { label: 'Information Technology', value: 'informationTechnology' },
      { label: 'Astronomy', value: 'astronomy' },
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
