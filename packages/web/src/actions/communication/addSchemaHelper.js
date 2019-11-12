/* eslint-disable import/no-cycle */
import store from '../../store';
import { UPDATE_WEBRTC } from '../types';

export default (action) => {
  console.log('action calld in addShchema helper', action);
  const { schema } = action;
  const { webRtc } = store.getState();
  console.log('webRtc value in ')
  if (schema === 'UserMessage') {
    store.dispatch({
      type: UPDATE_WEBRTC,
      payload: { ...webRtc.chatHistory, message: [...webRtc.chatHistory.message, action.payload] },
      schema: 'chatHistory',
    });
  }
};
