'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mailBody = require('../../../../../mailer/html/mailBody');

var _mailBody2 = _interopRequireDefault(_mailBody);

var _findBoradDetail = require('../../../findBoradDetail');

var _findBoradDetail2 = _interopRequireDefault(_findBoradDetail);

var _cache = require('../../../../../cache/database/cache');

var _cache2 = _interopRequireDefault(_cache);

var _updateUserCache = require('../../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

var _flat = require('../../../../flat');

var _flat2 = _interopRequireDefault(_flat);

var _update = require('../../../update/update');

var _update2 = _interopRequireDefault(_update);

var _sendNotification = require('../../../sendNotification');

var _sendNotification2 = _interopRequireDefault(_sendNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function deleteBoardMember(record, leave) {
  // console.log('delete Board member called', record);
  const { session } = this;
  const { userId, id, boardId } = record;

  // getting all the Required tables from cache database
  const allDbUsers = _cache2.default.get('User');
  const allDbBoards = _cache2.default.get('Board');

  // finding details of the user that is going to be add in this board
  const user = allDbUsers.find(u => u.id === parseInt(userId, 10));

  // deleting some privated info
  delete user.password;
  delete user.verificationToken;
  delete user.verify;

  // finding info of the user to add the curent user
  const fuser = allDbUsers.find(u => u.id === session.values.user.id);

  // finding current board all info
  const board = allDbBoards.find(b => b.id === parseInt(record.boardId, 10));

  // getting html body for emailing
  const htmlStringValue = await (0, _mailBody2.default)();

  // checking user is valid or not
  if (user) {
    // removing user to the BoardMember
    await _update2.default.call(this, 'BoardMember', { id, broadCastId: `$Board-${boardId}`, deleteStatus: true }, { id });

    // getting all the session for finding tuser is currently active or not
    // Note: it is replace by UserConnection because only connected friend is allowed to add board


    // sending notification to all board members

    const mainchannel = session.getChannel('Main');
    const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);

    const boardChannel = session.getChannel(`Board-${record.boardId}`);
    const dataTobeupdateAllUser = {
      // Notification: notiDetails,
      BoardMember: { id, deleteStatus: true }
    };
    boardChannel.forEach(s => (0, _updateUserCache2.default)(dataTobeupdateAllUser, s, 'update'));

    if (remoteUserSession) {
      const emailObj = {
        html: htmlStringValue.boardNotificationHtml(`You are ${leave ? 'leave' : 'removed from'} the class ${board.name}`, 'Please follow the link to check details', 'https://properclass.com'),
        subject: `You are ${leave ? 'leave' : 'removed from'} the class ${board.name}`
      };

      const notiObj = {
        userId: fuser.id,
        boardId: record.boardId,
        timeStamp: Date.now(),
        body: `You are ${leave ? 'leave' : 'removed from'}  the class ${board.name}`,
        title: 'Member Remove',
        type: 'board',
        typeId: null,
        viewStatus: false,
        imageUrl: null
      };
      (0, _sendNotification2.default)(this, emailObj, notiObj, [remoteUserSession]);

      remoteUserSession.unsubscribe(`Board-${board.id}`);
      const boardDetail = allDbBoards.find(b => b.id === record.boardId);

      // gettting all the board details like column, users, card, attachment every details info
      const boardDetails = await (0, _findBoradDetail2.default)(record.boardId);

      // data to be updated in remote user
      const dataTobeUpdated = {
        BoardColumnCardAttachment: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCardAttachment)),
        BoardColumnCardComment: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCardComment)),
        BoardColumnCardDescription: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCardDescription)),
        BoardColumnCard: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCard)),
        BoardColumn: (0, _flat2.default)(boardDetails.boardColumn),
        Board: boardDetail
      };

      // update remote user cache
      (0, _updateUserCache2.default)(dataTobeUpdated, remoteUserSession, 'remove');
    }

    const sessions = session.getChannel(`Board-${record.boardId}`);
    const finalSessions = sessions.filter(s => s.values.user.id !== session.values.user.id);
    const emailObj = {
      html: htmlStringValue.boardNotificationHtml(`${user.firstName} ${leave ? 'leave' : 'removed from'} the class ${board.name}`, 'Please follow the link to check details', 'https://properclass.com'),
      subject: `${user.firstName} ${leave ? 'leave' : 'removed from'} the class ${board.name}`
    };

    const notiObj = {
      userId: fuser.id,
      boardId: record.boardId,
      timeStamp: Date.now(),
      body: `${user.firstName} ${leave ? 'leave' : 'removed from'}  the class ${board.name}`,
      title: 'Member Remove',
      type: 'board',
      typeId: record.boardId,
      viewStatus: false,
      imageUrl: null
    };
    (0, _sendNotification2.default)(this, emailObj, notiObj, finalSessions);
  } else {
    throw new Error('User Not Found');
  }
  return { status: 200, data: 'User Remove Succefully' };
} /* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
exports.default = deleteBoardMember;