import findUserDetails from '../findUserDetails';

export default (table, record) => {
  try {
    if (table === 'BoardColumnCardAttachment' || table === 'BoardColumnCardComment') {
      if (Array.isArray(record)) {
        return record;
      }
      return { ...record, user: findUserDetails(record.userId) };
    }
    return record;
  } catch (e) {
    console.error('Error in addUserInRecordHelper', e);
  }
};
