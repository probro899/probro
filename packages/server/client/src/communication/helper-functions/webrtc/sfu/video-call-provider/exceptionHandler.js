/* eslint-disable import/no-cycle */
import attachPlugin from './attachPlugin';
import initCall from './initCall';
import store from '../../../../../store';
import exceptionReport from '../exceptionReporter';

const attachPlugInHandler = async (props) => {
  await attachPlugin(props);
  const { webRtc } = store.getState();
  const { mediaType } = webRtc.localCallHistory;
  if (mediaType) {
    initCall(mediaType, props);
  }
};

const blockingError = (errorObj) => {
  const { error } = errorObj;
  // console.log('blocking message', JSON.parse(error));
  const isNotAllowMediaError = error.includes('NotAllowedError');
  console.log('error name', isNotAllowMediaError);
  const { dispatch } = store;
  if (isNotAllowMediaError) {
    console.log('update store for notification about blocking');
    dispatch({ type: 'updateWebRtc', schema: 'deviceNotAllowed', payload: true });
  }
};

export default async (errorObj, props) => {
  console.log('video call error', errorObj);
  try {
    const { errorCode } = errorObj;
    if (errorCode) {
      switch (errorCode) {
        case 136:
          attachPlugInHandler(props);
          break;
        case 131:
          blockingError(errorObj);
          break;
        case 134:
          blockingError(errorObj);
          break;
        default:
          exceptionReport(errorObj);
      }
    }
  } catch (e) {
    exceptionReport({ error: JSON.stringify(e), errorCode: 146 });
  }
};
