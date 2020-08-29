import schema from '@probro/common/src/schema';

export default (table, data) => async (dispatch, getState) => {
  // console.log('upate dataBaseSchema called', data, dispatch, getState());
  dispatch(schema.update(table, data));
};
