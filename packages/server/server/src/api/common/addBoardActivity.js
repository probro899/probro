/* eslint-disable import/no-cycle */
import sendNotificationHelper from './sendNotificationHelper';

export default function addBoardActivity(context, db, record) {
  try {
    const { notiOnly } = record;
    delete record.notiOnly;
    sendNotificationHelper(context, record);
    if (!notiOnly) {
      db.execute(async ({ insert }) => {
        insert('BoardActivity', record);
      });
    }
  } catch (e) {
    console.error('Error in board acitiviy handler', e);
  }
}