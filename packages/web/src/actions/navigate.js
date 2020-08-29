import { UPDATE_NAV } from './types';

export default data => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_NAV,
    payload: data,
  });
};
