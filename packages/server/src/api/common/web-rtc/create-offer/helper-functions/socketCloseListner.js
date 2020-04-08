/* eslint-disable import/no-cycle */
import boardCallClose from '../../call-close/boardCallClose';
import callEndMessageAnalyser from './callEndMessageAnalyser';

export default function closeSocketListner(session, boardId, userId) {
  return function socketCloseListner() {
    const callCloseDetails = callEndMessageAnalyser(boardId, userId);
    boardCallClose(callCloseDetails, session);
  };
}
