/* eslint-disable import/no-cycle */
import informLiveBoardToClose from './helper-functions/informLiveBoardToClose';
import callClose from './helper-functions/callClose';
import selfClose from './helper-functions/selfClose';
import { liveBoard } from '../../../../cache';

export default async (callCloseDetail, session) => {
  const isCloseCall = informLiveBoardToClose(callCloseDetail.broadCastId, callCloseDetail.uid);
  // console.log('BoardClose Call', liveBoard.getBoard(callCloseDetail.broadCastId), isCloseCall);
  if (!isCloseCall && liveBoard.getBoard(callCloseDetail.broadCastId)) {
    callClose(session, callCloseDetail);
  } else {
    selfClose(session, callCloseDetail);
  }
};
