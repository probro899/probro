/* eslint-disable import/no-cycle */
import uuid from 'uuid/v4';
import schema from '@probro/common/src/schema';
import db from '../db';
import { genHashPassword } from './passwordHandler';
import mailer from '../mailer';
import htmlString from '../mailer/html/mailBody';
import cache from '../cache';
import database from '../cache/database';

const RESET_TOKEN_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

export default async (record) => {
  try {
    const token = await uuid();
    const result = await db.execute(async ({ insert, findOne }) => {
      const findUserEmailRes = await findOne('User', { email: record.email });
      const htmlStringValue = await htmlString();
      if (findUserEmailRes) {
        throw new Error('Emailisalreadytaken');
      }
      const hasPassword = await genHashPassword(record.password);
      const firstNameLowerCase = `${record.firstName}`.toLowerCase();
      const lastNameLowerCase = `${record.lastName}`.toLowerCase();
      const insertRes = await insert('User', { ...record, password: hasPassword, verify: false, verificationToken: token, slug: `${firstNameLowerCase}-${lastNameLowerCase}-${Date.now()}` });
      database.update('User', schema.add('User', { id: insertRes, ...record, password: hasPassword, verify: false, verificationToken: token, slug: `${firstNameLowerCase}-${lastNameLowerCase}-${Date.now()}` }));
      if (insertRes) {
        cache.users.set(token, record.email, RESET_TOKEN_AGE);
        mailer({
          from: 'ProperClass<probro899@gmail.com>',
          to: `<${record.email}>`,
          subject: 'User email confirmation',
          text: 'No reply',
          html: htmlStringValue.registrationHtmlString(token),
        });
        return insertRes;
      }
      throw new Error('Registration faild');
    });
    return result;
  } catch (e) {
    console.log('error in userRegistration api', e);
    throw new Error(e.message);
  }
};
