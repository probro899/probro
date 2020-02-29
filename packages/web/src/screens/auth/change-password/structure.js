// this is used when user forget password and can't login
export const forgetForm = [
  {
    id: 'newPassword',
    fieldtype: 'input',
    hidden: true,
    name: 'New Password',
    placeholder: 'Eg, Xyz@123peQ',
    required: true,
    icon: {
      side: 'right',
      name: 'eye-open',
    },
  },
  {
    id: 'confirmPassword',
    fieldtype: 'input',
    required: true,
    hidden: true,
    name: 'Confirm Password',
    placeholder: 'Eg, Xyz@123peQ',
    icon: {
      side: 'right',
      name: 'eye-open',
    },
  },
  {
    id: 'submit',
    type: 'submit',
    fieldtype: 'button',
    text: 'Submit',
    fill: 'fill',
    intent: 'primary',
    large: 'large',
  },
];

// this is used when user wants to change password after he is logged in
export const changeForm = [
  {
    id: 'oldPassword',
    fieldtype: 'input',
    hidden: true,
    name: 'Old Password',
    placeholder: 'Eg, ........',
    icon: {
      side: 'right',
      name: 'eye-open',
    },
  },
  {
    id: 'newPassword',
    fieldtype: 'input',
    hidden: true,
    name: 'New Password',
    placeholder: 'Eg, ........',
    icon: {
      side: 'right',
      name: 'eye-open',
    },
  },
  {
    id: 'confirmPassword',
    fieldtype: 'input',
    hidden: true,
    name: 'Confirm Password',
    placeholder: 'Eg, ........',
    icon: {
      side: 'right',
      name: 'eye-open',
    },
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
