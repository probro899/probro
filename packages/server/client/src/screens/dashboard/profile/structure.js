const bioSchema = (bio) => [
  { id: 'bio', val: bio, fieldtype: 'textarea', name: 'Bio', placeholder: 'Tell world about you...', required: true },
  { id: 'submit', fieldtype: 'button', type: 'submit', text: 'Submit' },
];

const educationSchema = [
  { id: 'degree', fieldtype: 'input', name: 'Name of the degree', placeholder: 'Ex, Bachelors in IT', required: true },
  { id: 'address', fieldtype: 'input', name: 'Address', required: true, placeholder: 'Address of your institute' },
  { id: 'startTime', fieldtype: 'date', name: 'Start Date', required: true },
  { id: 'endTime', fieldtype: 'date', name: 'End Date', required: true },
  { id: 'submit', fieldtype: 'button', text: 'Submit', type: 'submit' },
];

const experienceSchema = [
  { id: 'title', fieldtype: 'input', name: 'Title', required: true, placeholder: 'Ex, Software Developer' },
  { id: 'company', fieldtype: 'input', name: 'Organization', required: true, placeholder: 'Ex, Tesla' },
  { id: 'startTime', fieldtype: 'date', name: 'Start Date', required: true },
  { id: 'current', fieldtype: 'checkbox', name: 'Currently working here' },
  { id: 'endTime', fieldtype: 'date', name: 'End Date', required: false },
  { id: 'summary', fieldtype: 'textarea', name: 'Summary', placeholder: 'Write here about what your role was...' },
  { id: 'submit', fieldtype: 'button', text: 'Submit', type: 'submit' },
];


export { bioSchema, educationSchema, experienceSchema };
