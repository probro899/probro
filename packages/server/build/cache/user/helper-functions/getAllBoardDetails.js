'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _api = require('../../../api');

var _flat = require('../../../api/flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findBoardActiveStatus = (session, boardId) => {
  const liveBoardSessions = session.getChannel(`Board-live-${boardId}`) || [];
  // console.log('Live Board Sessions', liveBoardSessions);
  if (liveBoardSessions.length > 1) {
    const { activeStatus } = liveBoardSessions[0].userData.Board.find(b => b.id === boardId);
    // console.log('session to be extracted', anySession);
    return activeStatus;
  }
  return false;
};

exports.default = async (find, findOne, id, session) => {
  const BoardMember = await find('BoardMember', { tuserId: id });
  const Board = await find('Board', { userId: id });
  const boardPromises = [];
  BoardMember.forEach(bm => boardPromises.push(findOne('Board', { id: bm.boardId })));
  const allBoardsTemp = await Promise.all(boardPromises);
  const allBoards = allBoardsTemp.filter(b => b).map(b => _extends({}, b, { activeStatus: findBoardActiveStatus(session, b.id) }));
  // console.log('all board', allBoards);

  const boardMessagePromises = [];
  allBoards.forEach(b => boardMessagePromises.push(find('BoardMessage', { boardId: b.id })));
  const BoardMessage = await Promise.all(boardMessagePromises);
  const boardMessageSeenStatusPromises = [];
  (0, _flat2.default)(BoardMessage).forEach(msg => boardMessageSeenStatusPromises.push(find('BoardMessageSeenStatus', { bmId: msg.id })));
  const BoardMessageSeenStatus = await Promise.all(boardMessageSeenStatusPromises);
  // console.log('BoardMessage', BoardMessage);

  const boardDetailsPromises = [];
  allBoards.forEach(b => {
    boardDetailsPromises.push((0, _api.findBoardDetail)(b.id));
  });

  const boardUserPromises = [];
  allBoards.forEach(b => {
    boardUserPromises.push(find('BoardMember', { boardId: b.id }));
    // boardUserPromises.push(find('Board', { id: b.id }));
  });

  const allBoardMembers = await Promise.all(boardUserPromises);
  // console.log('all Board Member', allBoardMembers.flat());
  const allBoardUserList = _lodash2.default.uniq((0, _flat2.default)(allBoardMembers).map(obj => obj.tuserId));

  // console.log('uniqUser and BoarUserDetails', uniqUsers, allBoardUserDetails);
  const boardDetails = await Promise.all(boardDetailsPromises);
  // console.log('boardDetails', JSON.stringify(boardDetails));
  const BoardColumn = (0, _flat2.default)(boardDetails.map(obj => obj.boardColumn));
  const BoardColumnCard = (0, _flat2.default)((0, _flat2.default)(boardDetails.map(obj => obj.boardColumnCard)));
  const BoardColumnCardAttachment = (0, _flat2.default)((0, _flat2.default)(boardDetails.map(obj => obj.boardColumnCardAttachment)));
  const BoardColumnCardComment = (0, _flat2.default)((0, _flat2.default)(boardDetails.map(obj => obj.boardColumnCardComment)));
  // console.log('board columnCardAttachment', boardColumnCardComment);
  const BoardColumnCardDescription = (0, _flat2.default)((0, _flat2.default)(boardDetails.map(obj => obj.boardColumnCardDescription)));
  const BoardColumnCardTag = (0, _flat2.default)((0, _flat2.default)(boardDetails.map(obj => obj.boardColumnCardTag)));

  return { allBoards, allBoardMembers, BoardMessage, BoardMessageSeenStatus, allBoardUserList, BoardColumnCardTag, BoardColumn, BoardColumnCard, BoardColumnCardAttachment, BoardColumnCardComment, BoardColumnCardDescription };
};