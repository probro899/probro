'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (action, session) => {
  const { id } = session.values.user;
  const state = _cache2.default.get(id);
  console.log('previousState', state);
  const newState = () => {
    switch (action.type) {
      case 'schema.add':
        return !Array.isArray(action.payload) ? _extends({}, state, {
          [action.schema]: [...state[action.schema], action.payload]
        }) : _extends({}, state, {
          [action.schema]: [...state[action.schema], ...action.payload]
        });
      case 'schema.update':
        console.log('update cache schema called', action, session);
        return _extends({}, state, {
          [action.schema]: state[action.schema].map(obj => obj.id === action.payload.id ? _extends({}, obj, action.payload) : obj)
        });
      case 'schema.remove':
        return _extends({}, state, {
          [action.schema]: state[action.schema].filter(obj => obj.id !== action.payload.id)
        });
      default:
        return state;
    }
  };
  // console.log('new State', newState());
  _cache2.default.set(id, newState());
};