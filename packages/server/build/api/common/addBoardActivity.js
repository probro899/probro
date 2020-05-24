'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addBoardActivity;

var _sendNotificationHelper = require('./sendNotificationHelper');

var _sendNotificationHelper2 = _interopRequireDefault(_sendNotificationHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addBoardActivity(context, db, record) {
  try {
    (0, _sendNotificationHelper2.default)(context, record);
    db.execute(async ({ insert }) => {
      insert('BoardActivity', record);
    });
  } catch (e) {
    console.error('Error in board acitiviy handler', e);
  }
}