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
    id: 'profilePicture',
    fieldtype: 'input',
    name: 'Profile Picture',
  },
  {
    id: 'skills',
    fieldtype: 'input',
    name: 'Skills',
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
