import { UPDATE_FORM_VALUE } from '../actions/types';

const initialState = {
  registerForm: {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
    success: null,
    loading: false,
  },
  loginForm:
    {
      email: '',
      password: '',
      error: null,
      success: null,
      loading: false,
    },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_VALUE:
      return {
        ...state,
        [action.payload.schema]: { ...state[action.payload.schema], ...action.payload.data },
      };
    default:
      return state;
  }
};
