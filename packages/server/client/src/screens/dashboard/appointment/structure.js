import moment from 'moment';

export default (classrooms, instance) => {
  let schema = [
    { id: 'title', val: instance ? instance.title : '', fieldtype: 'input', name: 'Appointment Title', required: true },
    { id: 'classId', val: instance ? String(instance.classId) : '', options: [{ label: '----', value: '' }, ...classrooms.map(o => ({ label: o.name, value: o.id }))], fieldtype: 'select', label: 'Classroom', name: 'Classroom', required: true },
    { id: 'startDate', val: instance ? moment(instance.startDate) : '', fieldtype: 'date', name: 'Start Datetime', time: true, required: true },
    { id: 'endDate', val: instance ? moment(instance.endDate) : '', fieldtype: 'date', name: 'End Datetime', time: true },
    { id: 'description', val: instance ? instance.description : '', fieldtype: 'textarea', name: 'Appointment Notes' },
    { id: 'submit', fieldtype: 'button', type: 'submit', text: 'Save', intent: 'primary' },
  ];
  return schema;
}
