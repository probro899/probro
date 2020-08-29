'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function createOffer(data) {
  // console.log('Create offer api called');
  const { session } = this;
  const { offerDetail } = data;
  if (offerDetail.broadCastType === 'UserConnection') {
    const channel = session.channel(`${offerDetail.broadCastType}-${offerDetail.broadCastId}`);
    channel.emit('offer', data.offerDetail, data.userList);
  }
  if (offerDetail.broadCastType === 'Board') {
    (0, _board2.default)(session, data);
  }
};