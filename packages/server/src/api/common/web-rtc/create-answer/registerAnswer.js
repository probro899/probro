/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../cache';

export default (answerDetail, userId) => {
  const { broadCastId, uid } = answerDetail;
  const pc = liveBoard.getPc(broadCastId, userId, uid);
  // setting fuser is making offer to tuser
  liveBoard.updatePc(broadCastId, userId, uid, { ...pc, offer: false, callClose: false });
  // console.log(`${userId})REGISTER OFFER`, liveBoard.getBoard(broadCastId));
  // console.log(`${userId}) REGISTER ANSWER`, liveBoard.getBoard(broadCastId));
};
