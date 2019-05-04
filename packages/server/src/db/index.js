import path from 'path';
import sqlite from 'sqlite';
import Promise from 'bluebird';
import insert from './insert';
import find from './find';
import findOne from './findOne';
import update from './update';

export const dbPromise = sqlite.open('redirector.sqlite', { Promise });

let dbInstance = null;
const getInstance = async () => {
  if (dbInstance !== null) {
    return dbInstance;
  }

  const db = await dbPromise;
  await db.migrate({ migrationsPath: path.resolve(__dirname, 'migrations') });
  dbInstance = {
    insert: insert.bind(null, db),
    find: find.bind(null, db),
    findOne: findOne.bind(null, db),
    update: update.bind(null, db),
  };
  return dbInstance;
};

export const init = async () => {
  await getInstance();
};
export default {
  execute: async (func) => {
    const db = await getInstance();
    const res = await func(db);
    return res;
  },
};
