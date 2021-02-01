/* eslint-disable no-undef */
import store from '../../../../store';

export default async (report) => {
  console.log('errr reporter', report);
  try {
    const { webRtc, account } = store.getState();
    const { apis, reportedError } = webRtc;
    if (reportedError) {
      const isThisErrorReported = reportedError.find(er => er.errorCode === report.errorCode);
      const { userAgent } = navigator;
      const userId = account.user.id;
      if (!isThisErrorReported) {
        const res = await apis.errorReporter({ ...report, userAgent, userId, timeStamp: Date.now() });
        if (res.status === 200) {
          store.dispatch({ type: 'updateWebRtc', schema: 'reportedError', payload: [...reportedError, res] });
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
};
