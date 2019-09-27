'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

var _db = require('../../../../../db');

var _db2 = _interopRequireDefault(_db);

var _mailBody = require('../../../../../mailer/html/mailBody');

var _mailBody2 = _interopRequireDefault(_mailBody);

var _mailer = require('../../../../../mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _findBoradDetail = require('../../../findBoradDetail');

var _findBoradDetail2 = _interopRequireDefault(_findBoradDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addBoard(record) {
  const { session } = this;
  const boardId = await _add2.default.call(this, 'Board', record);
  await _add2.default.call(this, 'BoardMember', { boardId, tuserId: record.userId, fuserId: record.userId, joinStatus: true, timeStamp: Date.now(), userType: 'creator' });
  session.subscribe(`Board-${boardId}`);
  console.log('boardid in addBorad', boardId);
  return boardId;
}

async function addBoardColumn(record) {
  const res = await _add2.default.call(this, 'BoardColumn', record);
  return res;
}

async function addBoardColumnCard(record) {
  const res = await _add2.default.call(this, 'BoardColumnCard', record);
  return res;
}

async function addBoardColumnCardAttachment(record) {
  const res = await _add2.default.call(this, 'BoardColumnCardAttachment', record);
  return res;
}

async function addBoardColumnCardComment(record) {
  const res = _add2.default.call(this, 'BoardColumnCardComment', record);
  return res;
}

async function addBoardColumnCardDescription(record) {
  const res = await _add2.default.call(this, 'BoardColumnCardDescription', record);
  return res;
}

async function addBoardMember(record) {
  const { session } = this;
  const { email } = record;
  let currentBoardChannel = null;

  const res = await _db2.default.execute(async ({ findOne, insert, find }) => {
    const user = await findOne('User', { email });
    delete user.password;
    delete user.verificationToken;
    delete user.verify;
    const fuser = await findOne('User', { id: record.fuserId });
    const board = await findOne('Board', { id: record.boardId });
    const htmlStringValue = await (0, _mailBody2.default)();
    let addMemberRes = null;
    if (user) {
      const boardMember = await findOne('BoardMember', { boardId: record.boardId, tuserId: user.id });
      if (boardMember) {
        return { status: 201, message: 'User is already added to this board' };
      }
      delete record.email;
      addMemberRes = await insert('BoardMember', _extends({}, record, { tuserId: user.id }));
      (0, _mailer2.default)({
        from: 'ProperClass<probro899@gmail.com>',
        to: `<${email}>`,
        subject: `Board inivitation from ${fuser.firstName} `,
        text: 'No reply',
        html: htmlStringValue.boardMemberInvitationHtmlString
      });
      const notiData = {
        userId: user.id,
        boardId: record.boardId,
        timeStamp: Date.now(),
        body: `Added ${user.firstName} to the board ${board.name}`,
        title: 'Board Invitation',
        type: 'board',
        viewStatus: false,
        imageUrl: null
      };

      const notiId = await insert('Notification', notiData);
      const notiDetails = await findOne('Notification', { id: notiId });
      const mainchannel = session.getChannel('Main');

      const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);
      console.log('remote User session', remoteUserSession);
      currentBoardChannel = session.channel(`Board-${board.id}`);
      if (remoteUserSession) {
        remoteUserSession.subscribe(`Board-${board.id}`);
        const boardDetail = await findOne('Board', { id: record.boardId });
        const boardDetails = await (0, _findBoradDetail2.default)(record.boardId);
        // console.log('boardDetails to be dispatch in user', boardDetails);

        const boardMembers = await find('BoardMember', { boardId: record.boardId });
        const boardMemberPromises = [];

        boardMembers.forEach(b => boardMemberPromises.push(findOne('User', { id: b.userId || b.tuserId })));
        const allBoardUsers = await Promise.all(boardMemberPromises);

        const boardChannel = session.getChannel(`Board-${record.boardId}`);

        const finalUserList = allBoardUsers.map(u => {
          for (let i = 0; i < boardChannel.length; i += 1) {
            if (boardChannel[i].values.user.id === u.id) {
              return _extends({}, u, { activeStatus: true });
            }
          }
          return _extends({}, u, { activeStatus: false });
        });

        const allBoardMemberDetailPromises = [];
        finalUserList.forEach(u => allBoardMemberDetailPromises.push(findOne('UserDetail', { userId: u.id })));
        const allBoardUserDetails = await Promise.all(allBoardMemberDetailPromises);
        remoteUserSession.dispatch(_schema2.default.add('Board', boardDetail));
        remoteUserSession.dispatch(_schema2.default.add('BoardColumn', boardDetails.boardColumn.flat()));
        remoteUserSession.dispatch(_schema2.default.add('BoardColumnCard', boardDetails.boardColumnCard.flat().flat()));
        remoteUserSession.dispatch(_schema2.default.add('BoardColumnCardAttachment', boardDetails.boardColumnCardAttachment.flat().flat()));
        remoteUserSession.dispatch(_schema2.default.add('BoardColumnCardComment', boardDetails.boardColumnCardComment.flat().flat()));
        remoteUserSession.dispatch(_schema2.default.add('BoardColumnCardDescription', boardDetails.boardColumnCardDescription.flat().flat()));
        remoteUserSession.dispatch(_schema2.default.add('BoardMember', boardMembers));
        remoteUserSession.dispatch(_schema2.default.add('User', finalUserList));
        remoteUserSession.dispatch(_schema2.default.add('UserDetail', allBoardUserDetails));
        currentBoardChannel.dispatch(_schema2.default.add('Notification', notiDetails));
        currentBoardChannel.dispatch(_schema2.default.add('User', _extends({}, user, { activeStatus: true })));
      } else {
        currentBoardChannel.dispatch(_schema2.default.add('Notification', notiDetails));
        currentBoardChannel.dispatch(_schema2.default.add('User', _extends({}, user, { activeStatus: false })));
      }
    } else {
      throw new Error('User Not Found');
    }
    return { status: 200, data: addMemberRes };
  });
  return res;
}

async function addBoardMessage(record) {
  const res = await _add2.default.call(this, 'BoardMessage', record);
  return res;
}

exports.default = [addBoard, addBoardColumn, addBoardColumnCard, addBoardColumnCardAttachment, addBoardColumnCardComment, addBoardColumnCardDescription, addBoardMember, addBoardMessage];