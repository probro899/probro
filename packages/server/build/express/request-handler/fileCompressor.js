'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _schema = require('@probro/common/src/schema');

var _schema2 = _interopRequireDefault(_schema);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _validateToken = require('../../auth/validateToken');

var _validateToken2 = _interopRequireDefault(_validateToken);

var _db = require('../../db');

var _db2 = _interopRequireDefault(_db);

var _cache = require('../../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (body, fileName) => {
  // console.log('param in file compressor', body, fileName);
  const { token, content } = body;
  if (content === 'profile') {
    const user = await (0, _validateToken2.default)(token);
    const inputFile = _path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content, fileName);
    const thumbnailName = `thumbnail-${Date.now()}.jpeg`;
    const outputFile = _path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content, thumbnailName);
    (0, _sharp2.default)(inputFile).resize(150, 150).jpeg({ quality: 50 }).toFile(outputFile).then(() => {
      // console.log('update thumbnail database');
      _db2.default.execute(async ({ insert, findOne, update }) => {
        const findOneRes = await findOne('UserDetail', { userId: user.id });
        // console.log('userFound', findOneRes);
        if (findOneRes) {
          // console.log('inside update user in thumnbnail');
          update('UserDetail', { thumbnail: thumbnailName, image: fileName }, { id: findOneRes.id });
          _cache.database.update('UserDetail', _schema2.default.update('UserDetail', _extends({}, findOneRes, { thumbnail: thumbnailName, image: fileName })));
        } else {
          // console.log('inside insert thumbnail');
          const insertRes = await insert('UserDetail', { userId: user.id, thumbnail: thumbnailName, image: fileName });
          _cache.database.update('UserDetail', _schema2.default.add('UserDetail', { id: insertRes, userId: user.id, thumbnail: thumbnailName, image: fileName }));
        }
      });
      // output.png is a 200 pixels wide and 300 pixels high image
      // containing a nearest-neighbour scaled version
      // contained within the north-east corner of a semi-transparent white canvas
    });
  }
};