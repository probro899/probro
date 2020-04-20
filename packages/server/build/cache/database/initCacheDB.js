'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tableList = ['User', 'UserDetail', 'Board', 'BoardColumn', 'BoardColumnCard', 'BoardColumnCardAttachment', 'BoardColumnCardComment', 'BoardColumnCardDescription', 'BoardColumnCardTag', 'Blog', 'BlogComment', 'BlogLike', 'BoardMember', 'UserEducation', 'UserWorkExperience', 'UserPortal', 'UserSkill', 'UserCarrierInterest', 'BoardMessage', 'BoardMessageSeenStatus', 'UserConnection', 'UserMessage', 'UserMessageSeenStatus', 'Notification', 'NotificationReadStatus'];

async function initCacheDB() {
  try {
    await _db2.default.execute(async ({ find }) => {
      const allDbPropmises = tableList.map(table => find(table));
      const allDBValue = await Promise.all(allDbPropmises);
      // setting all table in databse cache
      tableList.forEach((table, idx) => {
        _cache2.default.set(table, allDBValue[idx]);
      });
    });
  } catch (e) {
    console.error('error in init cache', e);
  }
}
exports.default = initCacheDB;