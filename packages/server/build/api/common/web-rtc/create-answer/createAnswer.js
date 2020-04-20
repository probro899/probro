'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _registerAnswer = require('./registerAnswer');

var _registerAnswer2 = _interopRequireDefault(_registerAnswer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function createAnswer(data) {
  // console.log('createAnswer called', data);
  const { session } = this;
  const { answerDetail } = data;
  if (answerDetail.broadCastType === 'Board') {
    const channel = session.channel(`${answerDetail.broadCastType}-live-${answerDetail.broadCastId}`);
    channel.emit('answer', data.answerDetail, data.userList);
    (0, _registerAnswer2.default)(answerDetail, data.userList[0].userId);
  } else {
    const channel = session.channel(`${answerDetail.broadCastType}-${answerDetail.broadCastId}`);
    channel.emit('answer', data.answerDetail, data.userList);
  }
};