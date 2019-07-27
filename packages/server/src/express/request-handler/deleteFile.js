import fs from 'fs';
import path from 'path';
import validateToken from '../../auth/validateToken';

export default (req, res) => {
  // console.log('delete handler called', req.body);
  const { token, content, fileName } = req.body;
  try {
    const user = validateToken(token);
    if (user) {
      fs.unlink(path.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content, fileName), (err) => {
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
  } catch (e) {
    res.status(201);
    res.send(JSON.stringify(e.message));
  }
};
