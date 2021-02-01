/* eslint-disable import/no-cycle */
import attachPlugin from './attachPlugin';
import store from '../../../../../store';
import exceptionReport from '../exceptionReporter';

// const attachPlugInHandler = async (props) => {
//   await attachPlugin(props);
//   const { webRtc } = store.getState();
//   const { mediaType } = webRtc.localCallHistory;
//   if (mediaType) {
//     initCall(mediaType, props);
//   }
// };

export default async (errorObj, props) => {
  console.log('streamer error', errorObj);
};
