import schema from '@probro/common/src/schema';

export default (table, data) => async (dispatch, getState) => {
  // console.log('delete dataBaseSchema called', data, dispatch, getState());
  dispatch(schema.remove(table, data));
};
