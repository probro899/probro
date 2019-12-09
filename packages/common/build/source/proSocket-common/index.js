'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _METHOD_MAPS;

exports.PKT_RPC_REQUEST = PKT_RPC_REQUEST;
exports.PKT_RPC_RESPONSE = PKT_RPC_RESPONSE;
exports.PKT_EVENT = PKT_EVENT;
exports.PKT_ACTION = PKT_ACTION;
exports.PKT_SCOPE_REQUEST = PKT_SCOPE_REQUEST;
exports.PKT_SCOPE_RESPONSE = PKT_SCOPE_RESPONSE;
exports.PKT_CALL = PKT_CALL;
exports.createParser = createParser;

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TYPE_RPC_REQUEST = 1;
var TYPE_RPC_RESPONSE = 2;
var TYPE_EVENT = 3;
var TYPE_ACTION = 4;
var TYPE_SCOPE_REQUEST = 5;
var TYPE_SCOPE_RESPONSE = 6;
var TYPE_CALL = 7;

var METHOD_MAPS = (_METHOD_MAPS = {}, _defineProperty(_METHOD_MAPS, TYPE_RPC_REQUEST, 'onRpcRequest'), _defineProperty(_METHOD_MAPS, TYPE_RPC_RESPONSE, 'onRpcResponse'), _defineProperty(_METHOD_MAPS, TYPE_EVENT, 'onEvent'), _defineProperty(_METHOD_MAPS, TYPE_ACTION, 'onAction'), _defineProperty(_METHOD_MAPS, TYPE_SCOPE_REQUEST, 'onScopeRequest'), _defineProperty(_METHOD_MAPS, TYPE_SCOPE_RESPONSE, 'onScopeResponse'), _defineProperty(_METHOD_MAPS, TYPE_CALL, 'onCall'), _METHOD_MAPS);

function PKT_RPC_REQUEST(tracker, scope, api, args) {
  // console.log('args in common', args);
  return JSON.stringify([TYPE_RPC_REQUEST, tracker, scope, api, args]);
}

function PKT_RPC_RESPONSE(tracker, success, result) {
  return JSON.stringify([TYPE_RPC_RESPONSE, tracker, success, result]);
}

function PKT_EVENT(name, data) {
  return JSON.stringify([TYPE_EVENT, name, data]);
}

function PKT_ACTION(action) {
  return JSON.stringify([TYPE_ACTION, action]);
}

function PKT_SCOPE_REQUEST(tracker, name, version) {
  return JSON.stringify([TYPE_SCOPE_REQUEST, tracker, name, version]);
}

function PKT_SCOPE_RESPONSE(tracker, success, result) {
  return JSON.stringify([TYPE_SCOPE_RESPONSE, tracker, success, result]);
}

function PKT_CALL(scope, api, args) {
  return JSON.stringify([TYPE_CALL, scope, api, args]);
}

function createParser() {
  var parser = {
    parse: function parse(message) {
      // console.log('message', message);
      try {
        var data = JSON.parse(message);
        // console.log('data', data);
        if (!Array.isArray(data)) {
          throw new Error('Invalid message format');
        }

        var _data = _toArray(data),
            type = _data[0],
            other = _data.slice(1);

        var method = METHOD_MAPS[type];
        if (!method) {
          throw new Error('Unknown message type - ' + type);
        }

        if (!parser[method]) {
          throw new Error('No parser defined for - ' + method);
        }

        try {
          parser[method].apply(null, other);
        } catch (err) {
          throw new Error('Error executing parser - ' + method + ' - ' + err.message);
        }
      } catch (err) {
        if (parser.onError) {
          parser.onError(err);
        } else {
          // eslint-disable-next-line no-console
          console.error('Error parsing message', err);
        }
      }
    }
  };

  return parser;
}