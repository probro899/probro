'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

var _db = require('../../../../../db');

var _db2 = _interopRequireDefault(_db);

var _mailBody = require('../../../../../mailer/html/mailBody');

var _mailBody2 = _interopRequireDefault(_mailBody);

var _mailer = require('../../../../../mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _findUserDetails = require('../../../findUserDetails');

var _findUserDetails2 = _interopRequireDefault(_findUserDetails);

var _updateUserCache = require('../../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addUserWorkExperience(record) {
  const res = await _add2.default.call(this, 'UserWorkExperience', record);
  return res;
}

async function addUserEducation(record) {
  const res = await _add2.default.call(this, 'UserEducation', record);
  return res;
}

async function addUserSkill(record) {
  const res = await _add2.default.call(this, 'UserSkill', record);
  return res;
}

async function addUserPortal(record) {
  const res = await _add2.default.call(this, 'UserPortal', record);
  return res;
}

async function addUserMessage(record) {
  const res = await _add2.default.call(this, 'UserMessage', record);
  return res;
}

async function addUserMessageSeenStatus(record) {
  const res = await _add2.default.call(this, 'UserMessageSeenStatus', record);
  return res;
}

async function addCarrierInterest(record) {
  const res = await _add2.default.call(this, 'UserCarrierInterest', record);
  return res;
}

async function addNotificationReadStatus(record) {
  const res = await _add2.default.call(this, 'NotificationReadStatus', record);
  return res;
}

async function connectUser(record) {
  const { session } = this;
  // console.log('record in conectUser', record);

  const connectRes = await _add2.default.call(this, 'UserConnection', record);
  // console.log('User Connection Res', connectRes);
  const { mId, userId } = record;
  const bothUserDetails = await _db2.default.execute(async ({ findOne, insert }) => {
    const fUserDetails = await findOne('User', { id: userId });
    const tUserDetails = await findOne('User', { id: mId });

    const htmlStringValue = await (0, _mailBody2.default)();

    (0, _mailer2.default)({
      from: 'ProperClass<probro899@gmail.com>',
      to: `<${tUserDetails.email}>`,
      subject: `Friend request from ${fUserDetails.firstName} `,
      text: 'No reply',
      html: htmlStringValue.friendRequestHtmlString(fUserDetails, tUserDetails)
    });

    const notiData = {
      userId: tUserDetails.id,
      timeStamp: Date.now(),
      body: `You have friend request from ${fUserDetails.firstName}`,
      title: 'Friend request',
      type: 'user',
      typeId: fUserDetails.id,
      viewStatus: false,
      imageUrl: null
    };

    const notiId = await insert('Notification', notiData);
    const notiDetails = await findOne('Notification', { id: notiId });
    const mainchannel = session.getChannel('Main');
    const remoteUserSession = mainchannel.find(s => s.values.user.id === tUserDetails.id);
    // console.log('remote User session', remoteUserSession);
    if (remoteUserSession) {
      const fuserDetailsRes = await (0, _findUserDetails2.default)(fUserDetails.id, true);
      const dataToBeUpdate = {
        User: fuserDetailsRes.user,
        UserDetail: fuserDetailsRes.userDetail,
        UserSkill: fuserDetailsRes.userSkill,
        UserEducation: fuserDetailsRes.userEducation,
        UserWorkExperience: fuserDetailsRes.userWorkExperience,
        UserPortal: fuserDetailsRes.userPortal,
        Notification: notiDetails,
        UserConnection: _extends({}, record, { id: connectRes })
      };
      (0, _updateUserCache2.default)(dataToBeUpdate, remoteUserSession, 'add');
    }
    const tuserDetailsRes = await (0, _findUserDetails2.default)(tUserDetails.id, true);
    const dataToBeUpdate = {
      User: tuserDetailsRes.user,
      UserDetail: tuserDetailsRes.userDetail,
      UserSkill: tuserDetailsRes.userSkill,
      UserEducation: tuserDetailsRes.userEducation,
      UserWorkExperience: tuserDetailsRes.userWorkExperience,
      UserPortal: tuserDetailsRes.userPortal
    };
    (0, _updateUserCache2.default)(dataToBeUpdate, session, 'add');
    session.subscribe(`UserConnection-${fUserDetails.id}`);
    session.subscribe(`UserConnection-${tUserDetails.id}`);

    return connectRes;
  });
  return connectRes;
}

exports.default = [addUserWorkExperience, addUserEducation, addUserSkill, addUserPortal, addUserMessage, addUserMessageSeenStatus, connectUser, addCarrierInterest, addNotificationReadStatus];