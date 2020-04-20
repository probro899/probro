'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _mailBody = require('../../../../../mailer/html/mailBody');

var _mailBody2 = _interopRequireDefault(_mailBody);

var _mailer = require('../../../../../mailer');

var _mailer2 = _interopRequireDefault(_mailer);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addBoardMember(record) {
  const { session } = this;
  const { email } = record;
  let currentBoardChannel = null;

  const allDbUsers = _cache2.default.get('User');
  const allDbBoards = _cache2.default.get('Board');
  const allDbBaordMembers = _cache2.default.get('BoardMember');
  const allDbUserDetails = _cache2.default.get('UserDetail');

  const user = allDbUsers.find(u => u.email === email);
  delete user.password;
  delete user.verificationToken;
  delete user.verify;
  const fuser = allDbUsers.find(u => u.id === record.fuserId);
  const board = allDbBoards.find(b => b.id === record.boardId);
  const htmlStringValue = await (0, _mailBody2.default)();
  let addMemberRes = null;
  if (user) {
    const boardMember = allDbBaordMembers.find(bm => bm.boardId === record.boardId && bm.tuserId === user.id);
    // await findOne('BoardMember', { boardId: record.boardId, tuserId: user.id });
    if (boardMember) {
      return { status: 201, message: 'User is already added to this board' };
    }
    delete record.email;
    addMemberRes = await _add2.default.call(this, 'BoardMember', _extends({}, record, { tuserId: user.id }));
    (0, _mailer2.default)({
      from: 'ProperClass<probro899@gmail.com>',
      to: `<${email}>`,
      subject: `Board inivitation from ${fuser.firstName} `,
      text: 'No reply',
      html: htmlStringValue.boardMemberInvitationHtmlString(board, fuser, user)
    });
    const notiData = {
      userId: user.id,
      boardId: record.boardId,
      timeStamp: Date.now(),
      body: `Added ${user.firstName} to the board ${board.name}`,
      title: 'Board Invitation',
      type: 'board',
      typeId: record.boardId,
      viewStatus: false,
      imageUrl: null
    };

    const notiId = await _add2.default.call(this, 'Notification', notiData);
    const notiDetails = _extends({ id: notiId }, notiData);
    // await findOne('Notification', { id: notiId });
    const mainchannel = session.getChannel('Main');

    const remoteUserSession = mainchannel.find(s => s.values.user.id === user.id);
    // console.log('remote User session', remoteUserSession);
    currentBoardChannel = session.channel(`Board-${board.id}`);
    if (remoteUserSession) {
      remoteUserSession.subscribe(`Board-${board.id}`);
      const boardDetail = allDbBoards.find(b => b.id === record.boardId);
      //  await findOne('Board', { id: record.boardId });
      const boardDetails = await (0, _findBoradDetail2.default)(record.boardId);
      // console.log('boardDetails to be dispatch in user', boardDetails);

      const boardMembers = allDbBaordMembers.filter(bm => bm.boardId === record.boardId);
      //  await find('BoardMember', { boardId: record.boardId });
      // const boardMemberPromises = [];

      // boardMembers.forEach(b => boardMemberPromises.push(findOne('User', { id: b.userId || b.tuserId })));
      const allBoardUsers = boardMembers.map(bm => allDbUsers.find(u => u.id === bm.userId || u.id === bm.tuserId));
      //  await Promise.all(boardMemberPromises);

      const boardChannel = session.getChannel(`Board-${record.boardId}`);

      const finalUserList = allBoardUsers.map(u => {
        for (let i = 0; i < boardChannel.length; i += 1) {
          if (boardChannel[i].values.user.id === u.id) {
            return _extends({}, u, { activeStatus: true });
          }
        }
        return _extends({}, u, { activeStatus: false });
      });

      // const allBoardMemberDetailPromises = [];
      // finalUserList.forEach(u => allBoardMemberDetailPromises.push(findOne('UserDetail', { userId: u.id })));
      const allBoardUserDetails = finalUserList.map(fu => allDbUserDetails.find(ud => ud.userId === fu.id));
      // await Promise.all(allBoardMemberDetailPromises);

      const dataTobeUpdated = {
        Board: boardDetail,
        BoardColumn: (0, _flat2.default)(boardDetails.boardColumn),
        BoardColumnCard: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCard)),
        BoardColumnCardAttachment: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCardAttachment)),
        BoardColumnCardComment: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCardComment)),
        BoardColumnCardDescription: (0, _flat2.default)((0, _flat2.default)(boardDetails.boardColumnCardDescription)),
        BoardMember: boardMembers,
        User: finalUserList,
        UserDetail: allBoardUserDetails
      };
      (0, _updateUserCache2.default)(dataTobeUpdated, remoteUserSession, 'add');
      const dataTobeupdateAllUser = {
        Notification: notiDetails,
        User: _extends({}, user, { activeStatus: true }),
        BoardMember: _extends({ id: addMemberRes }, record, { tuserId: user.id })
      };
      boardChannel.forEach(s => (0, _updateUserCache2.default)(dataTobeupdateAllUser, s, 'add'));
    } else {
      const boardChannel = session.getChannel(`Board-${record.boardId}`);
      const dataTobeupdateAllUser = {
        Notification: notiDetails,
        User: _extends({}, user, { activeStatus: false }),
        BoardMember: _extends({ id: addMemberRes }, record, { tuserId: user.id })
      };
      boardChannel.forEach(s => (0, _updateUserCache2.default)(dataTobeupdateAllUser, s, 'add'));
    }
  } else {
    throw new Error('User Not Found');
  }
  return { status: 200, data: addMemberRes };
}
exports.default = addBoardMember;