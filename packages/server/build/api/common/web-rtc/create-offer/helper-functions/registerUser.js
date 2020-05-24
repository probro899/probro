'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _cache = require('../../../../../cache');

var _callClose = require('../../call-close/helper-functions/callClose');

var _callClose2 = _interopRequireDefault(_callClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const heartbitChecker = (session, boardId) => {
  // console.log('ping method called', boardId);
  const board = _cache.liveBoard.getBoard(boardId);
  const liveBoardChannel = session.channel(`Board-live-${boardId}`);
  let isCallClose = false;
  if (Object.keys(board.users).length === 1) {
    // console.log('close the call right now');
    // clearInterval(board.heartbitChecker);
    (0, _callClose2.default)(session, { broadCastId: boardId, uid: session.values.user.id });
    isCallClose = true;
  }
  if (!isCallClose) {
    _cache.liveBoard.setUser(boardId, 'users', {});
    liveBoardChannel.emit('ping', { boardId });
  }
};

const initializeUser = (boardId, userId, pcId, session) => {
  if (!_cache.liveBoard.getBoard(boardId)) {
    _cache.liveBoard.setBoard(boardId, { users: { userId: true, pcId: true }, heartbitChecker: setInterval(() => heartbitChecker(session, boardId), 20000) });
  }

  if (!_cache.liveBoard.getUser(boardId, userId)) {
    _cache.liveBoard.setUser(boardId, userId, {});
  }

  if (!_cache.liveBoard.getPc(boardId, userId, pcId)) {
    _cache.liveBoard.setPc(boardId, userId, pcId, {});
  }
};

exports.default = (offerDetail, userId, session) => {
  const { broadCastId, uid, isLive } = offerDetail;
  // console.log('User registercalled', liveBoard.getBoard(broadCastId), uid, userId, isLive);
  // initialize fUser
  initializeUser(broadCastId, uid, userId, session);

  // initialize tUser
  initializeUser(broadCastId, userId, uid);
  const board = _cache.liveBoard.getBoard(broadCastId);
  const allUser = Object.keys(board[uid]);
  allUser.forEach(pcId => {
    _cache.liveBoard.updatePc(broadCastId, uid, pcId, _extends({}, _cache.liveBoard.getPc(broadCastId, userId, pcId), { callClose: false }));
  });

  // checking is tuser made offer to me
  const { callClose } = _cache.liveBoard.getPc(broadCastId, userId, uid);

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