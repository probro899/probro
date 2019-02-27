import { UPDATE_MAIN_VALUE } from '../actions/types';

const initialState = {
  user: {},
  activeNav: 'Profile',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MAIN_VALUE:
      return {
        ...state,
        [action.payload.schema]: { ...state[action.payload.schema], ...action.payload.data },
      };
    default:
      return state;
  }
};
