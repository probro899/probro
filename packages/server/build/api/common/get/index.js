'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getBoardActivity(record) {
  // console.log('getBoard Actificyt api called', record);
  const { boardId } = record;
  const res = await _db2.default.execute(async ({ find }) => {
    const boardActivities = await find('BoardActivity', { boardId });
    const boardCommunicationActivities = await find('BoardMessage', { boardId });
    return { boardActivities, boardCommunicationActivities };
  });
  return res;
}

async function getCardActivity(record) {
  const { cardId } = record;
  const res = await _db2.default.execute(async ({ find }) => {
    const cardActivities = await find('BoardActivity', { cardId });
    return { cardActivities };
  });
  return res;
}

exports.default = [getBoardActivity, getCardActivity];