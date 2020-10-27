/* eslint-disable import/no-cycle */
import db from '../../../db';

async function errorReporter(record) {
  try {
    const { errorCode } = record;
    const dbRes = await db.execute(async ({ insert }) => {
      const insertRes = await insert('ErrorReport', { ...record, timeStamp: Date.now() });
      return insertRes;
    });
    return { errorCode, status: 200, type: 'error', id: dbRes };
  } catch (e) {
    return { status: 201, error: e };
  }
}

export default [errorReporter];
