'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deleteBoardColumnCard = require('./deleteBoardColumnCard');

var _deleteBoardColumnCard2 = _interopRequireDefault(_deleteBoardColumnCard);

var _db = require('../../../../../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function deleteColumn(Delete, record) {
  console.log('deleteColumn', Delete, record, this);
  const { broadCastId } = record;
  const boardColumnId = await _db2.default.execute(async ({ find }) => {
    const boardColumn = await find('BoardColumn', { boardId: record.boardId });
    // console.log('boardColumn data', boardColumn);
    return boardColumn.map(obj => ({ boardColumnId: obj.id, broadCastId }));
  });
  // console.log('column id', boardColumnId);
  if (boardColumnId.length > 0) {
    await (0, _deleteBoardColumnCard2.default)(Delete, boardColumnId);
    await Delete('BoardColumn', record);
  } else {
    return true;
  }
  return true;
};