const basicForm = [
  {
    id: 'firstName',
    fieldtype: 'input',
    name: 'First Name',
  },
  {
    id: 'middleName',
    fieldtype: 'input',
    name: 'Middle Name',
  },
  {
    id: 'lastName',
    fieldtype: 'input',
    name: 'Last Name',
  },
  {
    id: 'email',
    fieldtype: 'input',
    name: 'Email',
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

const additionalForm = [
  {
    id: 'gender',
    fieldtype: 'input',
    name: 'Gender',
  },
  {
    id: 'degree',
    fieldtype: 'input',
    name: 'Degree',
  },
  {
    id: 'field',
    fieldtype: 'input',
    name: 'Field',
  },
  {
    id: 'skills',
    fieldtype: 'tagInput',
    name: 'Skills',
    values: ['hi', 'hello', 'hey'],
  },
  // profilePicuture
  // skills
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

const advancedForm = [
  {
    id: 'experience',
    fieldtype: 'input',
    name: 'Experience',
  },
  {
    id: 'products',
    fieldtype: 'input',
    name: 'Products',
  },
  {
    id: 'onlinePortals',
    fieldtype: 'input',
    name: 'Online Portals',
  },
  {
    id: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

export { basicForm, additionalForm, advancedForm };
