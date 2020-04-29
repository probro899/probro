/* eslint-disable import/no-cycle */
import { liveBoard } from '../../../../../cache';
import callClose from '../../call-close/helper-functions/callClose';

const heartbitChecker = (session, boardId) => {
  // console.log('ping method called', boardId);
  const board = liveBoard.getBoard(boardId);
  const liveBoardChannel = session.channel(`Board-live-${boardId}`);
  let isCallClose = false;
  if (Object.keys(board.users).length === 1) {
    // console.log('close the call right now');
    // clearInterval(board.heartbitChecker);
    callClose(session, { broadCastId: boardId, uid: session.values.user.id });
    isCallClose = true;
  }
  if (!isCallClose) {
    liveBoard.setUser(boardId, 'users', {});
    liveBoardChannel.emit('ping', { boardId });
  }
};

const initializeUser = (boardId, userId, pcId, session) => {
  if (!liveBoard.getBoard(boardId)) {
    liveBoard.setBoard(boardId, { users: { userId: true, pcId: true }, heartbitChecker: setInterval(() => heartbitChecker(session, boardId), 20000) });
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
