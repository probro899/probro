export default (instance) => {
  return [
    { id: 'name', val: instance ? instance.name : '', fieldtype: 'input', name: 'Name', required: true, placeholder: 'Name of the project' },
    { id: 'submit', fieldtype: 'button', type: 'submit' },
  ];
};
