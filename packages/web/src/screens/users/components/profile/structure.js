const bioSchema = [
  {
    id: 'bio',
    fieldtype: 'textarea',
    name: 'Bio',
    placeholder: 'Tell world about you...',
    required: true,
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

const educationSchema = [
  {
    id: 'degree',
    fieldtype: 'input',
    name: 'Name of the degree',
    placeholder: 'Ex, Bachelors in IT',
    required: true,
  },
  {
    id: 'address',
    fieldtype: 'input',
    name: 'Address',
    required: true,
    placeholder: 'Address of your institute',
  },
  {
    id: 'startTime',
    fieldtype: 'date',
    // required: true,
    name: 'Start Date',
  },
  {
    id: 'endTime',
    fieldtype: 'date',
    name: 'End Date',
    // required: true,
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    type: 'submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

const experienceSchema = [
  {
    id: 'title',
    fieldtype: 'input',
    name: 'Title',
    required: true,
    placeholder: 'Ex, Software Developer',
  },
  {
    id: 'company',
    fieldtype: 'input',
    name: 'Organization',
    required: true,
    placeholder: 'Ex, Tesla',
  },
  {
    id: 'startTime',
    fieldtype: 'date',
    name: 'Start Date',
  },
  {
    id: 'endTime',
    fieldtype: 'date',
    name: 'End Date',
  },
  {
    id: 'summary',
    fieldtype: 'textarea',
    name: 'Summary',
    // required: true,
    placeholder: 'Write here about what your role was...',
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    type: 'submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

const portalSchema = [
  {
    id: 'title',
    fieldtype: 'input',
    name: 'Title',
    placeholder: 'Your product name',
    required: true,
  },
  {
    id: 'attachment',
    fieldtype: 'image',
    name: 'Attachment',
    text: 'Choose a file...',
  },
  {
    id: 'description',
    fieldtype: 'textarea',
    name: 'Description',
    placeholder: 'Tell about your product',
  },
  {
    id: 'link',
    fieldtype: 'input',
    name: 'Link',
    placeholder: 'Write a link to your product',
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    type: 'submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

export { bioSchema, educationSchema, experienceSchema, portalSchema };
