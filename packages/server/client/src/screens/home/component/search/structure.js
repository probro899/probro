import countryList from 'react-select-country-list';

export default () => ({
  countryOptions: countryList().getData().map(obj => ({ label: obj.label, value: obj.label })),
  industryOptions: [
    { label: 'Pick Expertise', value: '' },
    { label: 'Software Engineering', value: 'softwareEngineering' },
    { label: 'Software Designing', value: 'softwareDesigning' },
    { label: 'Machine Learning', value: 'machineLearning' },
    { label: 'System Engineer', value: 'systemEngineer' },
    { label: 'Database Engineer', value: 'databaseEngineer' },
  ],
  skillOptions: [
    { label: 'Pick Skill', value: '' },
    { label: 'Python', value: 'python' },
    { label: 'Javascript', value: 'javascript' },
    { label: 'Web Development', value: 'webDevelopment' },
    { label: 'Data Science', value: 'dataScience' },
    { label: 'Mobile Development', value: 'mobileDevelopment' },
  ]
});
