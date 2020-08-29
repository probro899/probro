import path from 'path';
import sqlite from 'sqlite';
import Promise from 'bluebird';
import insert from './insert';
import find from './find';
import findOne from './findOne';
import update from './update';
import deleteQuery from './deleteQuery';
import exec from './exec';
import query from './query';
import upsert from './upsert';

export const dbPromise = sqlite.open('properclass.sqlite', { Promise });

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
    deleteQuery: deleteQuery.bind(null, db),
    exec: exec.bind(null, db),
    query: query.bind(null, db),
    upsert: upsert.bind(null, db),
  };
  return dbInstance;
};

export const init = async () => {
  const dbInstanceRes = await getInstance();
  if (dbInstanceRes) {
    return true;
  }
};
export default {
  execute: async (func) => {
    const db = await getInstance();
    const res = await func(db);
    return res;
  },
};
