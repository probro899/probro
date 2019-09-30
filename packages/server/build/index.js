'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _appNode = require('app-node');

var _appNode2 = _interopRequireDefault(_appNode);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express3 = require('./express');

var _express4 = _interopRequireDefault(_express3);

var _db = require('./db');

var _socket = require('./socket');

var _validateToken = require('./auth/validateToken');

var _validateToken2 = _interopRequireDefault(_validateToken);

var _api = require('./api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 4001;
const app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ limit: '10mb', extended: false }));
app.use(_bodyParser2.default.json({ limit: '10mb', extended: true }));
const server = _http2.default.createServer(app);
(0, _appNode2.default)(async nodeApp => {
  // define web socket url
  const url = '/shocked/:origin/:token';
  // initialise database
  await (0, _db.init)();
  // starting socket

  const socket = (0, _socket.start)({ server, url }, async session => {
    const { origin, token } = session.params;
    if (origin === 'web') {
      try {
        // validate user either login or not
        const user = (0, _validateToken2.default)(token);

        // set the user in session
        session.set('user', user);
        await _api.initUser.call({ session }, user.id);
        // send data to client loginSuccess
        session.dispatch({ type: 'LOGIN', payload: user });

        // return socket to evrything is ok
        return true;
      } catch (err) {
        console.log('error', err);
        session.dispatch({ type: 'LOGOUT' });
        session.emit('logout');
        // return socket user not validated
        return false;
      }
    }
  });

  // setup authentication route
  (0, _express4.default)(app);

  // Start listening for http request
  server.listen(port);
  console.log(`Server Sarted at ${port} `);
  // Setup exit for socket and server
  nodeApp.addExitHandler(() => {
    socket.stop();
    server.close();
  });
});