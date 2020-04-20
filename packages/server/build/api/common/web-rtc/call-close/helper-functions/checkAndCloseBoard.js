'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _flat = require('../../../../flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkCallCloseStatus = pcs => {
  const allPcs = Object.values(pcs);

  const closeStatus = allPcs.find(pc => !pc.callClose);

  return closeStatus;
};

const isAnyoneConnected = allpcs => {
  const eachUserPcsStatus = (0, _flat2.default)(allpcs.map(pcs => Object.values(pcs))).map(s => s.status);
  // console.log('Each Array Pc Status', eachUserPcsStatus);
  const isConnected = eachUserPcsStatus.find(s => s === 'connected');
  return !isConnected;
};

const isOffererHandler = pcs => {
  // console.log('isOfferer handler called', pcs);
  const allPcs = Object.values(pcs);
  const isOfferer = allPcs.find(pc => !pc.offer);
  return !isOfferer;
};

exports.default = (liveBoard, boardId, userId) => {

  const board = liveBoard.getBoard(boardId);

  const eachUserPcs = Object.values(board);

  const allUser = Object.keys(board[userId]);

  const isAnyoneConnectedRes = isAnyoneConnected(eachUserPcs);

  const isOfferes = _lodash2.default.isObject(board[userId]) ? isOffererHandler(board[userId]) : false;

  allUser.forEach(uid => {
    liveBoard.updatePc(boardId, userId, uid, _extends({}, liveBoard.getPc(boardId, userId, uid), { offer: false }));
  });

  allUser.filter(uid => parseInt(uid, 10) !== userId).forEach(uid => {
    liveBoard.updatePc(boardId, uid, userId, _extends({}, liveBoard.getPc(boardId, uid, userId), { offer: false }));
  });

  // console.log('Is anyone Connected', isAnyoneConnectedRes, 'isOfferer', isOfferes, userId);
  if (isOfferes && isAnyoneConnectedRes) {
    return false;
  }

  const callCloseSatus = eachUserPcs.filter(obj => _lodash2.default.isObject(obj)).map(pcs => checkCallCloseStatus(pcs));

  return callCloseSatus.filter(cs => cs).length;
};