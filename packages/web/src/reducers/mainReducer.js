import { UPDATE_MAIN_VALUE, RESET_MAIN_VALUE } from '../actions/types';

const initialState = {
  user: {},
  activeNav: { name: 'Profile' },
  mainNav: { active: 'properClass' },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAIN_VALUE:
      return {
        ...state,
        [action.payload.schema]: { ...state[action.payload.schema], ...action.payload.data },
      };
    case RESET_MAIN_VALUE:
      return {
        ...state,
        [action.payload.schema]: action.payload.data,
      };
    default:
      return state;
  }
};
