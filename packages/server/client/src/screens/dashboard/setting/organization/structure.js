const OrganizationScheme = [
    {
        id: 'name',
        fieldtype: 'input',
        name: 'Name',
        placeholder: 'Test Organization',
        required: true,
    },
    {
        id: 'headline',
        fieldtype: 'input',
        name: 'Headline',
        placeholder: 'Engineering Institute',
    },
    {
        id: 'profilepic',
        fieldtype: 'input',
        name: 'Profile Picture',
        placeholder: '',
    },
    {
        id: 'address',
        fieldtype: 'input',
        name: 'Address',
        placeholder: 'Kathmandu, Nepal',
        required: true,
    },
    {
        id: 'supportnumber',
        fieldtype: 'input',
        name: 'Support Number',
        placeholder: '+14 123 5489',
        required: true,
    },
    {
        id: 'supportemail',
        fieldtype: 'input',
        name: 'Support Email',
        placeholder: 'test@support.com',
        required: true,
    },
    {
        id: 'websiteurl',
        fieldtype: 'input',
        name: 'Website URL',
        placeholder: 'testorg.com',
        required: true,
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
export { OrganizationScheme };