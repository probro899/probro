/* eslint-disable import/no-cycle */
import attachPlugin from './attachPlugin';
import initCall from './initCall';
import store from '../../../../../store';
import exceptionReport from '../exceptionReporter';
import initJanus from '../init';

const attachPlugInHandler = async (props) => {
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

export default async (errorObj, props) => {
  // console.log('conference exception handler', errorObj);
  try {
    const { errorCode } = errorObj;
    if (errorCode) {
      switch (errorCode) {
        case 107:
          attachPlugInHandler(props);
          break;
        case 200:
          initJanusHandler(errorObj, props);
          break;
        default:
          exceptionReport(errorObj);
      }
    }
  } catch (e) {
    exceptionReport({ error: JSON.stringify(e), errorCode: 145 });
  }
};
