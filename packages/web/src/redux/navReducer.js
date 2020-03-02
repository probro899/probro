import { UPDATE_NAV } from '../actions/types';

const initialState = {
  sideNav: { name: '' },
  mainNav: { name: '' },
  popNotification: { message: 'Welcome to Properclass', active: false, intent: 'Success' },
  search: { key: '', country: '', industry: '' },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAV:
      return {
        ...state,
        [action.payload.schema]: { ...state[action.payload.schema], ...action.payload.data },
      };
    default:
      return state;
  }
};
