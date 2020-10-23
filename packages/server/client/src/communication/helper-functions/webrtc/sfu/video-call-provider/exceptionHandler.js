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

export default async (errorObj, props) => {
  // console.log('video call error', errorObj);
  try {
    const { errorCode } = errorObj;
    if (errorCode) {
      switch (errorCode) {
        case 136:
          attachPlugInHandler(props);
          break;
        default:
          exceptionReport(errorObj);
      }
    }
  } catch (e) {
    exceptionReport({ error: e, errorCode: 146 });
  }
};
