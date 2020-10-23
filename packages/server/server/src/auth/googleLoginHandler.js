import uuid from 'uuid';
import schema from '@probro/common/src/schema';
import googleTokenVerifier from 'google-id-token-verifier';
import database from '../cache/database';
import { googleClientId } from '../config';
import loginHelper from './loginHelper';
import db from '../db';

const googleLogin = async (grec) => {
  // console.log('user google login called', grec);
  const { record } = grec;
  const { profileObj } = record;
  const { imageUrl, name, givenName, familyName } = profileObj;

  const googleInfo = await new Promise((resolve, reject) => {
    googleTokenVerifier.verify(record.tokenId, googleClientId, (err, info) => {
      if (err) {
        console.error('Google token verification faild', info);
        reject();
        return;
      }
      if (info) {
        resolve(info);
      }
    });
  });

  const { email } = googleInfo;
  const res = await db.execute(async ({ findOne, insert }) => {
    const rec = await findOne('User', { email });
    if (rec) {
      const userDetails = await findOne('UserDetail', { userId: rec.id });
      return loginHelper(rec, userDetails);
    }
    const firstNameLowerCase = `${givenName}`.toLowerCase();
    const lastNameLowerCase = `${familyName}`.toLowerCase();
    const slug = `${firstNameLowerCase}-${lastNameLowerCase}-${Date.now()}`;
    const randomPassword = uuid();
    const addUserRes = await insert('User', { firstName: givenName, lastName: familyName, middleName: '', password: randomPassword, email, verificationToken: null, verify: 1, slug });
    database.update('User', schema.add('User', { id: addUserRes, firstName: givenName, lastName: familyName, middleName: '', password: randomPassword, email, verificationToken: null, verify: 1, slug }));
    // const addUserDetailRes = await insert('UserDetail', { userId: addUserRes, image: picture });
    // database.update('UserDetail', schema.add('UserDetail', { id: addUserDetailRes, userId: addUserRes, image: picture }));
    const finalUserDetailRes = await findOne('UserDetail', { userId: addUserRes });
    const finalUserRes = await findOne('User', { id: addUserRes });
    return loginHelper(finalUserRes, finalUserDetailRes);
  });
  return res;
};

export default googleLogin;
