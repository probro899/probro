import { UPDATE_COURSE, RESET_COURSE } from '../actions/types';

const initialState = {
  courseId: null,
  title: null,
  subTitle: null,
  description: null,
  logo: {},
  skill: [],
  level: null,
  domain: null,
  subDomain: null,
  syllabusList: [],
  status: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COURSE:
      return { ...state, ...action.payload }
    case RESET_COURSE:
      return initialState;
    default:
      return state;
  }
};
