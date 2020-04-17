/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../../cache';

const initializeUser = (boardId, userId, pcId) => {
  if (!liveBoard.getBoard(boardId)) {
    liveBoard.setBoard(boardId, { });
  }

  if (!liveBoard.getUser(boardId, userId)) {
    liveBoard.setUser(boardId, userId, { });
  }

  if (!liveBoard.getPc(boardId, userId, pcId)) {
    liveBoard.setPc(boardId, userId, pcId, { });
  }
};

export default (offerDetail, userId) => {
  const { broadCastId, uid, isLive } = offerDetail;
  // console.log('User registercalled', broadCastId, uid, userId, isLive);
  // initialize fUser
  initializeUser(broadCastId, uid, userId);

  // initialize tUser
  initializeUser(broadCastId, userId, uid);

  // checking is tuser made offer to me
  const { callClose } = liveBoard.getPc(broadCastId, userId, uid);

  const { offer } = liveBoard.getPc(broadCastId, userId, uid);
  // console.log('offer and callClose', offer, callClose);

  if (callClose) {
    return false;
  }

  if (isLive) {
    return true;
  }

  return !offer;
};
