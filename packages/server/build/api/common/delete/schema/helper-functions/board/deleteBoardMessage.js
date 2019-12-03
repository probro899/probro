'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../../../../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function deleteBoardMessage(Delete, record) {
  const boardMessageseenPromises = [];
  const { broadCastId } = record;

  const boardMessageRes = await _db2.default.execute(async ({ find }) => {
    const allboardMssage = await find('BoardMessage', { boardId: record.boardId });
    return allboardMssage;
  });
  boardMessageRes.forEach(bm => {
    boardMessageseenPromises.push(Delete('BoardMessageSeenStatus', { bmId: bm.id, broadCastId }));
  });
  await Promise.all(boardMessageseenPromises);
  await Delete('BoardMessage', { boardId: record.broadId, broadCastId });
};