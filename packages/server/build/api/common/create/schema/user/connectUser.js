'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable import/no-cycle */


var _mailBody = require('../../../../../mailer/html/mailBody');

var _mailBody2 = _interopRequireDefault(_mailBody);

var _mailer = require('../../../../../mailer');

var _mailer2 = _interopRequireDefault(_mailer);

var _findUserDetails = require('../../../findUserDetails');

var _findUserDetails2 = _interopRequireDefault(_findUserDetails);

var _updateUserCache = require('../../../updateUserCache');

var _updateUserCache2 = _interopRequireDefault(_updateUserCache);

var _add = require('../../add');

var _add2 = _interopRequireDefault(_add);

var _cache = require('../../../../../cache/database/cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function connectUser(record) {
  const { session } = this;
  // console.log('record in conectUser', record);

  const connectRes = await _add2.default.call(this, 'UserConnection', record);
  // console.log('User Connection Res', connectRes);
  const allDbUser = _cache2.default.get('User');

  const { mId, userId } = record;
  const fUserDetails = allDbUser.find(u => u.id === userId);
  const tUserDetails = allDbUser.find(u => u.id === mId);

  // console.log('from user', fUserDetails, 'to user', tUserDetails);
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

  const notiId = await _add2.default.call(this, 'Notification', notiData);
  const notiDetails = _extends({ id: notiId }, notiData);
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
}
exports.default = connectUser;