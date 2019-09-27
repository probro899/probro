'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = start;

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _urlPattern = require('url-pattern');

var _urlPattern2 = _interopRequireDefault(_urlPattern);

var _Session = require('./Session');

var _Session2 = _interopRequireDefault(_Session);

var _Channel = require('./Channel');

var _Channel2 = _interopRequireDefault(_Channel);

var _defaultChannelProvider = require('./defaultChannelProvider');

var _defaultChannelProvider2 = _interopRequireDefault(_defaultChannelProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function noop() {}

function beat() {
  this.isAlive = true;
}

function start(options, validateSession, pulseRate = 30000) {
  // console.log('socked npm called', validateSession);
  const { url, channelProvider } = options,
        other = _objectWithoutProperties(options, ['url', 'channelProvider']);

  // Use the channel provider
  _Channel2.default.setProvider(channelProvider || (0, _defaultChannelProvider2.default)());
  // console.log('chanelProvider', channelProvider);
  const urlPattern = url ? new _urlPattern2.default(options.url) : null;
  // console.log('urlPattern', urlPattern);
  const wsOptions = _extends({}, other, {
    verifyClient: (info, cb) => {
      // match the url pattern if available
      const params = urlPattern ? urlPattern.match(info.req.url) : {};
      // console.log('verifyclient param', params);
      if (params === null) {
        cb(false, 404, `Can't serve ${info.req.url}`);
        return;
      }
      // eslint-disable-next-line no-param-reassign
      info.req.params = params;
      cb(true);
    }
  });

  // console.log('wsOption', wsOptions);

  const wss = new _ws2.default.Server(wsOptions);
  // console.log('wss', wss);
  wss.on('connection', (ws, req) => {
    // console.log('try to connect', req.params);
    // Create a new session object, in transmit mode, until validated
    const session = new _Session2.default(req, req.params, ws);
    // console.log('session', session);

    Promise.resolve(validateSession(session)).catch(err => {
      // console.log('session', session);
      session.emit('error', err.message);
      ws.close();
    }).then(res => {
      // console.log('res', res);
      if (res || res === undefined) {
        // Enable reception mode
        session.activate(ws);
        // Add heart beat
        if (pulseRate) {
          ws.isAlive = true; // eslint-disable-line no-param-reassign
          ws.on('pong', beat);
        }

        // TODO: How to handle error condition
        ws.on('error', err => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
      } else {
        ws.close();
      }
    });
  });

  function keepAlive() {
    wss.clients.forEach(ws => {
      if (!ws.isAlive) {
        console.log('conneciton failed');
        return ws.terminate();
      }

      // eslint-disable-next-line no-param-reassign
      ws.isAlive = false;
      return ws.ping(noop);
    });
  }

  const heartBeat = pulseRate > 0 ? setInterval(keepAlive, pulseRate) : null;

  // Return an instance of server
  return {
    stop: () => {
      if (heartBeat) {
        clearInterval(heartBeat);
      }

      // Close all client connections
      wss.clients.forEach(ws => ws.close());

      // Close the server
      wss.close();
    },

    length: () => wss.clients.size()
  };
}