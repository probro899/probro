'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */


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

var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

var _update = require('../../../update/update');

var _update2 = _interopRequireDefault(_update);

var _sendNotification = require('../../../sendNotification');

var _sendNotification2 = _interopRequireDefault(_sendNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addBoardMember(record) {
  const { session } = this;
  const { userId } = record;

  // getting all the Required tables from cache database
  const allDbUsers = _cache2.default.get('User');
  const allDbBoards = _cache2.default.get('Board');
  const allDbBaordMembers = _cache2.default.get('BoardMember');
  const allDbUserDetails = _cache2.default.get('UserDetail');

  // finding details of the user that is going to be add in this board
  const user = allDbUsers.find(u => u.id === parseInt(userId, 10));

  // deleting some privated info
  delete user.password;
  delete user.verificationToken;
  delete user.verify;

  // finding info of the user to add the curent user
  const fuser = allDbUsers.find(u => u.id === record.fuserId);

  // finding current board all info
  const board = allDbBoards.find(b => b.id === record.boardId);

  // getting html body for emailing
  const htmlStringValue = await (0, _mailBody2.default)();

  let addMemberRes = null;

  // checking user is valid or not
  if (user) {
    const boardMember = allDbBaordMembers.find(bm => bm.boardId === record.boardId && bm.tuserId === user.id);

    // checking user is already in board or not
    if (boardMember) {
      if (!boardMember.deleteStatus) {
        return { status: 201, message: 'User is already added to this board' };
      }
      addMemberRes = boardMember.id;
      await _update2.default.call(this, 'BoardMember', { id: boardMember.id, deleteStatus: false }, { id: boardMember.id });
    } else {
      // adding user to the BoardMember
      delete record.userId;
      addMemberRes = await _add2.default.call(this, 'BoardMember', _extends({}, record, { tuserId: user.id }));
    }

    // getting all the session for finding tuser is currently active or not
    // Note: it is replace by UserConnection because only connected friend is allowed to add board

    const mainchannel = session.getChannel('Main');
    const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);
    if (remoteUserSession) {
      remoteUserSession.subscribe(`Board-${board.id}`);
      const boardDetail = allDbBoards.find(b => b.id === record.boardId);

      // gettting all the board details like column, users, card, attachment every details info
      const boardDetails = await (0, _findBoradDetail2.default)(record.boardId);

      // getting all current board members
      const boardMembers = allDbBaordMembers.filter(bm => bm.boardId === record.boardId);

      // finding details of board members
      const allBoardUsers = boardMembers.map(bm => allDbUsers.find(u => u.id === bm.userId || u.id === bm.tuserId));

      // finding sessions of current active user in board
      const boardChannel = session.getChannel(`Board-${record.boardId}`);

      // finding who is acitve or not
      const finalUserList = allBoardUsers.map(u => {
        for (let i = 0; i < boardChannel.length; i += 1) {
          if (boardChannel[i].values.user.id === u.id) {
            return _extends({}, u, { activeStatus: true });
          }
        }
        return _extends({}, u, { activeStatus: false });
      });

      // finding user details
      const allBoardUserDetails = finalUserList.map(fu => allDbUserDetails.find(ud => ud.userId === fu.id));

      // data to be updated in remote user
      const dataTobeUpdated = {
        User: finalUserList,
        UserDetail: allBoardUserDetails,
        Board: boardDetail,
        BoardColumn: (0, _flat2.default)(boardDetails.boardColumn),
        BoardColumnCard: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCard)),
        BoardColumnCardAttachment: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCardAttachment)),
        BoardColumnCardComment: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCardComment)),
        BoardColumnCardDescription: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCardDescription)),
        BoardMember: boardMembers
      };

      // update remote user cache
      (0, _updateUserCache2.default)(dataTobeUpdated, remoteUserSession, 'add');

      // data tobe update in all all board members
      const dataTobeupdateAllUser = {
        // Notification: notiDetails,
        User: _extends({}, user, { activeStatus: true }),
        BoardMember: _extends({ id: addMemberRes }, record, { tuserId: user.id, deleteStatus: false })
      };
      boardChannel.forEach(s => (0, _updateUserCache2.default)(dataTobeupdateAllUser, s, 'add'));

      const emailObj = {
        email: user.email,
        html: htmlStringValue.boardNotificationHtml(`You are added to the class ${board.name}`, `Please follow the link to join the class ${board.name}.`, `https://properclass.com`),
        subject: `Class inivitation from ${fuser.firstName} `
      };

      const notiObj = {
        userId: user.id,
        boardId: record.boardId,
        timeStamp: Date.now(),
        body: `You are added to the class ${board.name}`,
        title: 'Class Invitation',
        type: 'board',
        typeId: record.boardId,
        viewStatus: false,
        imageUrl: null
      };
      (0, _sendNotification2.default)(this, emailObj, notiObj, [remoteUserSession]);
    } else {
      // data tobe update all board members
      const boardChannel = session.getChannel(`Board-${record.boardId}`);
      const dataTobeupdateAllUser = {
        // Notification: notiDetails,
        User: _extends({}, user, { activeStatus: false }),
        BoardMember: _extends({ id: addMemberRes }, record, { tuserId: user.id, deleteStatus: false })
      };
      boardChannel.forEach(s => (0, _updateUserCache2.default)(dataTobeupdateAllUser, s, 'add'));
    }

    // sending notification to all board members
    const sessions = session.getChannel(`Board-${record.boardId}`);
    let finalSessions = sessions.filter(s => s.values.user.id !== session.values.user.id);
    if (remoteUserSession) {
      finalSessions = finalSessions.filter(s => s.values.user.id !== remoteUserSession.values.user.id);
    }
    const emailObj = {
      email: user.email,
      html: htmlStringValue.boardNotificationHtml(`${user.firstName} added to the class ${board.name}`, `Please follow the link to join the class ${board.name}.`, `https://properclass.com`),
      subject: `Class inivitation from ${fuser.firstName} `
    };

    const notiObj = {
      userId: user.id,
      boardId: record.boardId,
      timeStamp: Date.now(),
      body: `${user.firstName} added to the class ${board.name}`,
      title: 'Class Invitation',
      type: 'board',
      typeId: record.boardId,
      viewStatus: false,
      imageUrl: null
    };
    (0, _sendNotification2.default)(this, emailObj, notiObj, finalSessions);
  } else {
    throw new Error('User Not Found');
  }
  return { status: 200, data: addMemberRes };
}
exports.default = addBoardMember;