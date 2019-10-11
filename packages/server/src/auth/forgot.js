import uuid from 'uuid/v4';
import db from '../db';
import cache from '../cache';
import mailer from '../mailer';

const RESET_TOKEN_AGE = 1 * 60 * 60 * 1000; // 1 hour

const domain = process.env.RESTRO_DOMAIN || 'https://properclass.com';

export default async function forgot(username) {

  const user = await db.execute(({ findOne }) => findOne('User', { email: username }));

  if (!user) {
    throw new Error('Unknown username');
  }

  const resetToken = uuid();

  // Include a reset token on cache

  cache.users.set(resetToken, user.id, RESET_TOKEN_AGE);
  mailer({
    from: 'ProperClass<noreply@properclass.com>',
    to: user.email,
    subject: 'Password reset',
    text: `Please use the following link to reset your password ${domain}/reset/${resetToken}`
  });
  return user;
}
