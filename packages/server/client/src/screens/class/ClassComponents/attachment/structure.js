export default [
  {
    id: 'name',
    fieldtype: 'input',
    name: 'Name',
    required: true,
    placeholder: 'Title',
  },
  {
    id: 'attachment',
    fieldtype: 'image',
    name: 'Attachment',
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Upload',
    fill: 'fill',
    intent: 'success',
    large: 'large',
  },
];
