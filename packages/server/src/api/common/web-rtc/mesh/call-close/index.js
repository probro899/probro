/* eslint-disable import/no-cycle */
import db from '../../../../../db';
import userCallCloseHandler from './userCallCloseHandler';
import boardCallCloseHandler from './boardCallClose';

export default async function callClose(data) {
  // console.log('call close method called', data);
  const { session } = this;
  // console.log('sesssion', session);
  const { callCloseDetail, userList } = data;
  const res = db.execute(async ({ insert }) => {
    if (callCloseDetail.type === 'user') {
      await userCallCloseHandler(insert, callCloseDetail, userList, session);
    }
    if (callCloseDetail.type === 'board') {
      await boardCallCloseHandler(callCloseDetail, session);
    }
  });
}
