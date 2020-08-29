'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _getFolderSize = require('get-folder-size');

var _getFolderSize2 = _interopRequireDefault(_getFolderSize);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _validateToken = require('../../auth/validateToken');

var _validateToken2 = _interopRequireDefault(_validateToken);

var _uploadFile = require('../../api/uploadFile');

var _uploadFile2 = _interopRequireDefault(_uploadFile);

var _fileCompressor = require('./fileCompressor');

var _fileCompressor2 = _interopRequireDefault(_fileCompressor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer2.default.diskStorage({
  destination: async (request, file, cb) => {
    const { token, content } = JSON.parse(request.body.data);
    const user = (0, _validateToken2.default)(token);
    if (!_fs2.default.existsSync(_path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`))) {
      // console.log('iniside making userid directory');
      _fs2.default.mkdirSync(_path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`));
    }
    if (!_fs2.default.existsSync(_path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content))) {
      // console.log('iniside making content directory');
      _fs2.default.mkdirSync(_path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content));
    }
    // console.log('close to return');
    // calculating per user space exist or not
    (0, _getFolderSize2.default)(_path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`), (err, size) => {
      if (err) {
        throw err;
      }
      // console.log((size / 1000 / 1000).toFixed(2), 'mb');
      if ((size / 1000 / 1000 / 1000).toFixed(2) > 5) {
        return cb({ Error: 'No file slected', message: 'Your total upload file limit exit.' });
      }
    });
    return cb(null, _path2.default.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content));
  },
  filename: (request, file, cb) => {
    const { fileType } = JSON.parse(request.body.data);
    return cb(null, `${fileType}-${Date.now()}${_path2.default.extname(file.originalname)}`);
  }
});

const checkFileType = (req, file, cb) => {
  const { token, fileType } = JSON.parse(req.body.data);
  // console.log(data);
  // check file type

  const user = (0, _validateToken2.default)(token);

  if (user) {
    let checkFileReg = null;
    switch (fileType) {
      case 'image':
        checkFileReg = /jpeg|jpg|gif|png|bmp/;
        break;
      case 'video':
        checkFileReg = /avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4|webm|mkv|MKV|WEBM|x-matroska/;
        break;
      case 'audio':
        checkFileReg = /mp3/;
        break;
      case 'application':
        checkFileReg = /pdf|txt/;
        break;
      default:
        break;
    }
    // check ext
    const extname = checkFileReg.test(_path2.default.extname(file.originalname).toLocaleLowerCase());
    // check mime type
    const mimetype = checkFileReg.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb({ Error: 'No file slected', message: 'Invalid file format' });
  }
  return cb({ Error: 'User verification Faild', message: 'User verification faild' });
};

const upload = (0, _multer2.default)({
  storage,
  limits: { fileSize: 1000000000 },
  fileFilter: (req, file, cb) => checkFileType(req, file, cb)
}).single('file');

exports.default = async (req, res) => {
  try {
    upload(req, res, async err => {
      if (err) {
        res.statusCode = 201;
        res.send(err.message);
      } else {
        delete req.body.token;
        (0, _fileCompressor2.default)(JSON.parse(req.body.data), req.file.filename);
        const updateRes = await (0, _uploadFile2.default)(_extends({}, req.body, { image: req.file.filename }));
        if (updateRes) {
          res.statusCode = 200;
          res.send(JSON.stringify(updateRes));
        } else {
          throw new Error('User validation faild');
        }
      }
    });
  } catch (e) {
    res.statusCode = 400;
    res.send(JSON.stringify(e));
  }
};