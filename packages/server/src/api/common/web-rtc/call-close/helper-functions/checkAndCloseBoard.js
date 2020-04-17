import _ from 'lodash';
import flat from '../../../../flat';

const checkCallCloseStatus = (pcs) => {
  const allPcs = Object.values(pcs);

  const closeStatus = allPcs.find(pc => !pc.callClose);

  return closeStatus;
};

const isAnyoneConnected = (allpcs) => {
  const eachUserPcsStatus = flat(allpcs.map(pcs => Object.values(pcs))).map(s => s.status);
  // console.log('Each Array Pc Status', eachUserPcsStatus);
  const isConnected = eachUserPcsStatus.find(s => s === 'connected');
  return !isConnected;
};

const isOffererHandler = (pcs) => {
  // console.log('isOfferer handler called', pcs);
  const allPcs = Object.values(pcs);
  const isOfferer = allPcs.find(pc => !pc.offer);
  return !isOfferer;
};

export default (liveBoard, boardId, userId) => {

  const board = liveBoard.getBoard(boardId);

  const eachUserPcs = Object.values(board);

  const allUser = Object.keys(board[userId]);

  const isAnyoneConnectedRes = isAnyoneConnected(eachUserPcs);

  const isOfferes = _.isObject(board[userId]) ? isOffererHandler(board[userId]) : false;

  allUser.forEach((uid) => {
    liveBoard.updatePc(boardId, userId, uid, { ...liveBoard.getPc(boardId, userId, uid), offer: false });
  });

  allUser.filter(uid => parseInt(uid, 10) !== userId).forEach((uid) => {
    liveBoard.updatePc(boardId, uid, userId, { ...liveBoard.getPc(boardId, uid, userId), offer: false });
  });

  // console.log('Is anyone Connected', isAnyoneConnectedRes, 'isOfferer', isOfferes, userId);
  if (isOfferes && isAnyoneConnectedRes) {
    return false;
  }

  const callCloseSatus = eachUserPcs.filter(obj => _.isObject(obj)).map(pcs => checkCallCloseStatus(pcs));

  return callCloseSatus.filter(cs => cs).length > 1;
};
