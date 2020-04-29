/* eslint-disable import/no-cycle */
import updateUserData from './udpateUserData';
import { liveBoard } from '../../../../../cache';

export default (session, callCloseDetail) => {
  console.log('Self close called', callCloseDetail);
  if (liveBoard.getBoard(callCloseDetail.broadCastId)) {
    session.unsubscribe(`${callCloseDetail.broadCastType}-live-${callCloseDetail.broadCastId}`);
    updateUserData(callCloseDetail, session);
  }
};
