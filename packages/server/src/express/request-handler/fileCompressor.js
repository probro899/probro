import sharp from 'sharp';
import schema from '@probro/common/src/schema';
import path from 'path';
import validateToken from '../../auth/validateToken';
import db from '../../db';
import { database } from '../../cache';

export default async (body, fileName) => {
  // console.log('param in file compressor', body, fileName);
  const { token, content, type } = body;
  if (content === 'profile' && type === 'profilePic') {
    const user = await validateToken(token);
    const inputFile = path.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content, fileName);
    const thumbnailName = `thumbnail-${Date.now()}.jpeg`;
    const outputFile = path.join(__dirname, '..', '..', 'public', 'user', `${10000000 + parseInt(user.id, 10)}`, content, thumbnailName);
    sharp(inputFile)
      .resize(400, 400).jpeg({ quality: 50 })
      .toFile(outputFile)
      .then(() => {
        // console.log('update thumbnail database');
        db.execute(async ({ insert, findOne, update }) => {
          const findOneRes = await findOne('UserDetail', { userId: user.id });
          // console.log('userFound', findOneRes);
          if (findOneRes) {
            // console.log('inside update user in thumnbnail');
            update('UserDetail', { thumbnail: fileName, image: thumbnailName }, { id: findOneRes.id });
            database.update('UserDetail', schema.update('UserDetail', { ...findOneRes, thumbnail: fileName, image: thumbnailName }));
          } else {
            // console.log('inside insert thumbnail');
            const insertRes = await insert('UserDetail', { userId: user.id, thumbnail: fileName, image: thumbnailName });
            database.update('UserDetail', schema.add('UserDetail', { id: insertRes, userId: user.id, thumbnail: fileName, image: thumbnailName }));
          }
        });
      });
  }
};
