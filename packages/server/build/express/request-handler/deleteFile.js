'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _validateToken = require('../../auth/validateToken');

var _validateToken2 = _interopRequireDefault(_validateToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async (req, res) => {
  // console.log('delete handler called', req.body);
  const { token, content, fileName } = req.body;
  try {
    const user = (0, _validateToken2.default)(token);
    if (user) {
      if (Array.isArray(fileName)) {
        // console.log('iniside array del', fileName);
        const deletePromises = fileName.map(name => _fs2.default.unlinkSync(_path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content, name)));
        const delResponse = await Promise.all(deletePromises);
        if (delResponse) {
          res.status(200);
          res.send('file successfully deleted');
        } else {
          res.status(201);
          res.send('faild to delete file not found');
        }
      } else {
        _fs2.default.unlink(_path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content, fileName), err => {
          // console.log('file deleted', err);
          if (!err) {
            res.status(200);
            res.send('file successfully deleted');
          } else {
            res.status(201);
            res.send('faild to delete file not found');
          }
        });
      }
    }
  } catch (e) {
    res.status(201);
    res.send(JSON.stringify(e.message));
  }
};