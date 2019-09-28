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
  },
  {
    id: 'address',
    fieldtype: 'input',
    name: 'Address',
    placeholder: 'Address of your institute',
  },
  {
    id: 'startDate',
    fieldtype: 'date',
    name: 'Start Date',
  },
  {
    id: 'endDate',
    fieldtype: 'date',
    name: 'End Date',
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
    placeholder: 'Ex, Software Developer',
  },
  {
    id: 'company',
    fieldtype: 'input',
    name: 'Organization',
    placeholder: 'Ex, Tesla',
  },
  {
    id: 'startDate',
    fieldtype: 'date',
    name: 'Start Date',
  },
  {
    id: 'endDate',
    fieldtype: 'date',
    name: 'End Date',
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
