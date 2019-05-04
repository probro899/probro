import bcrypt from 'bcrypt';

const saltRound = 10;

export const genHashPassword = plainTextPassword => bcrypt.hash(plainTextPassword, saltRound);

export const checkPassword = (plainTextPassword, hashedPassword) => bcrypt.compare(plainTextPassword, hashedPassword);
