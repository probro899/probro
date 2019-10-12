import path from 'path';
import getFolderSize from 'get-folder-size';
import multer from 'multer';
import fs from 'fs';
import validateToken from '../../auth/validateToken';
import uploadFile from '../../api/uploadFile';

const storage = multer.diskStorage({
  destination: async (request, file, cb) => {
    const { token, content } = JSON.parse(request.body.data);
    const user = validateToken(token);
    if (!fs.existsSync(path.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`))) {
      // console.log('iniside making userid directory');
      fs.mkdirSync(path.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`));
    }
    if (!fs.existsSync(path.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content))) {
      // console.log('iniside making content directory');
      fs.mkdirSync(path.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content));
    }
    // console.log('close to return');
    // calculating per user space exist or not
    getFolderSize(path.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`), (err, size) => {
      if (err) { throw err; }
      // console.log((size / 1000 / 1000).toFixed(2), 'mb');
      if ((size / 1000 / 1000 / 1000).toFixed(2) > 5) {
        return cb({ Error: 'No file slected', message: 'Your total upload file limit exit.' });
      }
    });
    return cb(null, path.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content));
  },
  filename: (request, file, cb) => {
    const { fileType } = JSON.parse(request.body.data);
    return cb(null, `${fileType}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const checkFileType = (req, file, cb) => {
  const { token, fileType } = JSON.parse(req.body.data);
  // console.log(data);
  // check file type

  const user = validateToken(token);

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
    const extname = checkFileReg.test(path.extname(file.originalname).toLocaleLowerCase());
    // check mime type
    const mimetype = checkFileReg.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb({ Error: 'No file slected', message: 'Invalid file format' });
  }
  return cb({ Error: 'User verification Faild', message: 'User verification faild' });
};

const upload = multer({
  storage,
  limits: { fileSize: 1000000000 },
  fileFilter: (req, file, cb) => checkFileType(req, file, cb),
}).single('file');

export default async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        res.statusCode = 201;
        res.send(err.message);
      } else {
        delete req.body.token;
        const updateRes = await uploadFile({ ...req.body, image: req.file.filename });
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
