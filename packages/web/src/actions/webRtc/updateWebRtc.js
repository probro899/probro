import { UPDATE_WEBRTC } from '../types';

export default (schema, data) => async (dispatch, getState) => {
  // console.log('data in udpte webRtc action', data, dispatch, getState());
  dispatch({
    type: UPDATE_WEBRTC,
    payload: data,
    schema,
  });
};
