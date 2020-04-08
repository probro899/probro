import { liveBoard } from '../../../../../cache';

const initializeUser = (boardId, userId, pcId) => {
  if (!liveBoard.getBoard(boardId)) {
    liveBoard.setBoard(boardId, {});
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
  // console.log('User registercalled', broadCastId, uid, userId);
  // initialize fUser
  initializeUser(broadCastId, uid, userId);

  // initialize tUser
  initializeUser(broadCastId, userId, uid);

  // checking is tuser made offer to me
  const { offer, callClose } = liveBoard.getPc(broadCastId, userId, uid);
  if (!offer) {
    // setting fuser is making offer to tuser
    liveBoard.updatePc(broadCastId, uid, userId, { offer: true });
  }
  // console.log('Current Board Live Details', liveBoard.getBoard(broadCastId), 'doOffer', offer);
  if (isLive) {
    return true;
  }

  if (callClose) {
    return true;
  }

  return !offer;
};
