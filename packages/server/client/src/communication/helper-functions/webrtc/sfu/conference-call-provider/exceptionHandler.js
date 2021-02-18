/* eslint-disable import/no-cycle */
import attachPlugin from './attachPlugin';
import initCall from './initCall';
import store from '../../../../../store';
import exceptionReport from '../exceptionReporter';
import initJanus from '../init';

const attachPlugInHandler = async (props) => {
  // console.log('attach plugin called');
  await attachPlugin(props);
  const { webRtc } = store.getState();
  const { mediaType } = webRtc.localCallHistory;
  if (mediaType) {
    initCall(mediaType, props);
  }
};

const initJanusHandler = async (errorObj, props) => {
  exceptionReport(errorObj);
  setTimeout(() => {
    initJanus(props);
  }, 5000);
};

const screenShareBlockErrorHandler = (errorObj) => {
  const { error } = errorObj;
  const isNotAllowMediaError = error.includes('NotAllowedError');
  const { dispatch } = store;
  if (isNotAllowMediaError) {
    dispatch({ type: 'updateWebRtc', schema: 'screenShareNotAllowed', payload: true });
  }
};

export default async (errorObj, props) => {
  console.log('conference exception handler', errorObj);
  try {
    const { errorCode } = errorObj;
    if (errorCode) {
      switch (errorCode) {
        case 107:
          attachPlugInHandler(props);
          break;
        case 108:
          attachPlugInHandler(props);
          break;
        case 109:
          attachPlugInHandler(props);
          break;
        case 200:
          initJanusHandler(errorObj, props);
          break;
        case 143:
          screenShareBlockErrorHandler(errorObj);
          break;
        default:
          exceptionReport(errorObj);
      }
    }
  } catch (e) {
    exceptionReport({ error: JSON.stringify(e), errorCode: 145 });
  }
};
