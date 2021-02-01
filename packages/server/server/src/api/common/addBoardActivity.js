/* eslint-disable import/no-cycle */
import sendNotificationHelper from './sendNotificationHelper';
import { globalAgent } from 'http';

export default function addBoardActivity(context, db, record) {
  try {
    sendNotificationHelper(context, record);
    db.execute(async ({ insert }) => {
      insert('BoardActivity', record);
    });
  } catch (e) {
    console.error('Error in board acitiviy handler', e);
  }
}