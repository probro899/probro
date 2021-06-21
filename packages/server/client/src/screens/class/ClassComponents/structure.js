export default (organizations, classInstance) => {
  let fields = [{ id: 'name', fieldtype: 'input', val: classInstance ? classInstance.name : '', required: true, name: 'Name', placeholder: '' }]

  if (!classInstance && organizations.length > 0) {
    let options = [{ label: '---', value: '' }];
    organizations.map(o => {
      options.push({ label: o.name, value: o.id });
    });
    fields = [
      ...fields,
      { id: 'oId', fieldtype: 'select', required: false, name: 'Organization', options },
      { id: 'refCode', fieldtype: 'input', required: false, name: 'Ref. Code' },
    ]
  }

  fields.push({ id: 'submit', fieldtype: 'button', type: 'submit', text: 'Submit', fill: 'fill', intent: 'success', large: 'large' });
  return fields;
}

const addUserToBoard = [
  { id: 'email', fieldtype: 'input', name: 'Email', required: true, placeholder: 'Example: nabin@properclass.com' },
  { id: 'submit', fieldtype: 'button', type: 'submit', text: 'Send Request', fill: 'fill', intent: 'success', large: 'large' },
];

const columnSchema = (column=null) => [
    { id: 'name', fieldtype: 'input', val: column ? column.name : '', name: 'Name', required: true },
    { id: 'submit', fieldtype: 'button', type: 'submit', text: 'Submit' },
];

const taskSchema = () => [
    { id: 'name', fieldtype: 'input', name: 'Name', required: true },
    { id: 'submit', fieldtype: 'button', type: 'submit', text: 'Submit' },
];

export { addUserToBoard, columnSchema, taskSchema };
