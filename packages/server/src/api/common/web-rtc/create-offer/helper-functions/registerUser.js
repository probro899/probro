/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../../cache';

const heartbitChecker = (session, boardId) => {
  console.log('ping method called', boardId);
  const liveBoardChannel = session.channel(`Board-live-${boardId}`);
  liveBoardChannel.emit('ping');
};

const initializeUser = (boardId, userId, pcId, session) => {
  if (!liveBoard.getBoard(boardId)) {
    liveBoard.setBoard(boardId, { users: [], heartbitChecker: setInterval(() => heartbitChecker(session, boardId), 20000) });
  }

  if (!liveBoard.getUser(boardId, userId)) {
    liveBoard.setUser(boardId, userId, { });
  }

  if (!liveBoard.getPc(boardId, userId, pcId)) {
    liveBoard.setPc(boardId, userId, pcId, { });
  }
};

export default (offerDetail, userId, session) => {
  const { broadCastId, uid, isLive } = offerDetail;
  // console.log('User registercalled', liveBoard.getBoard(broadCastId), uid, userId, isLive);
  // initialize fUser

  initializeUser(broadCastId, uid, userId, session);

  // initialize tUser
  initializeUser(broadCastId, userId, uid);
  const board = liveBoard.getBoard(broadCastId);
  const allUser = Object.keys(board[uid]);
  allUser.forEach((pcId) => {
    liveBoard.updatePc(broadCastId, uid, pcId, { ...liveBoard.getPc(broadCastId, userId, pcId), callClose: false });
  });

  // checking is tuser made offer to me
  const { callClose } = liveBoard.getPc(broadCastId, userId, uid);

  // const { offer } = liveBoard.getPc(broadCastId, userId, uid);
  // console.log('offer and callClose', offer, callClose);

  if (callClose) {
    return false;
  }

  if (isLive && !callClose) {
    return true;
  }

  return true;
};
