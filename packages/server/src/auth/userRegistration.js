/* eslint-disable import/no-cycle */
import uuid from 'uuid/v4';
import db from '../db';
import { genHashPassword } from './passwordHandler';
import mailer from '../mailer';
import htmlString from '../mailer/html/mailBody';
import cache from '../cache';

const RESET_TOKEN_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

export default async (record) => {
  try {
    const token = await uuid();
    const result = await db.execute(async ({ insert, findOne }) => {
      const findUserEmailRes = await findOne('User', { email: record.email });
      const htmlStringValue = await htmlString(token);
      if (findUserEmailRes) {
        throw new Error('Email is already taken');
      }
      const hasPassword = await genHashPassword(record.password);
      const insertRes = await insert('User', { ...record, password: hasPassword, verify: false, verificationToken: token });
      if (insertRes) {
        cache.users.set(token, record.email, RESET_TOKEN_AGE);
        await mailer({
          from: 'ProperClass<probro899@gmail.com>',
          to: `<${record.email}>`,
          subject: 'User email confirmation',
          text: 'No reply',
          html: htmlStringValue,
        });
        return insertRes;
      }
      throw new Error('Registration faild');
    });
    return result;
  } catch (e) {
    console.log('error in userRegistration api', e);
    throw e;
  }
};
