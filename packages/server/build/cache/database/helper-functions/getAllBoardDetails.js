'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _api = require('../../../api');

var _flat = require('../../../api/flat');

var _flat2 = _interopRequireDefault(_flat);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
exports.default = (id, session) => {
  const allDbBoardMembers = _cache2.default.get('BoardMember');
  const allDbBoard = _cache2.default.get('Board');
  const allDbBoardMessageSeenStatus = _cache2.default.get('BoardMessageSeenStatus');
  const allDbBoardMessage = _cache2.default.get('BoardMessage');
  const templatesBoards = allDbBoard.filter(b => b.type === 'template');
  const BoardMember = allDbBoardMembers.filter(bm => bm.tuserId === id && !bm.deleteStatus);
  const Board = allDbBoard.filter(b => b.userId === id);
  const allBoardsTemp = BoardMember.map(bm => allDbBoard.find(b => b.id === bm.boardId));
  const allBoards = [...allBoardsTemp, ...templatesBoards].filter(b => b).filter(b => b.deleteStatus !== 1);
  // console.log('all board', allBoards);

  const BoardMessage = allBoards.map(b => allDbBoardMessage.filter(bm => bm.boardId === b.id));

  const BoardMessageSeenStatus = (0, _flat2.default)(BoardMessage).map(bm => allDbBoardMessageSeenStatus.filter(bms => bms.bmId === bm.id));
  // console.log('BoardMessage', BoardMessage);

  const allBoardMembers = allBoards.map(b => allDbBoardMembers.filter(bm => bm.boardId === b.id));
  // console.log('all Board Member', allBoardMembers.flat());
  const allBoardUserList = _lodash2.default.uniq((0, _flat2.default)(allBoardMembers).map(obj => obj.tuserId));

  // console.log('uniqUser and BoarUserDetails', uniqUsers, allBoardUserDetails);
  const boardDetails = allBoards.map(b => (0, _api.findBoardDetail)(b.id));
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