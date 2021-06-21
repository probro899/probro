import { UPDATE_COURSE, RESET_COURSE } from './types';

export const resetCourse = (data) =>  async (dispatch, getState) => {
  dispatch({ type: RESET_COURSE, payload: data });
}

export default (data) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_COURSE, payload: data });
};
