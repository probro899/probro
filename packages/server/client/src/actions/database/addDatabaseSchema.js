import schema from '@probro/common/src/schema';

export default (table, data) => async (dispatch, getState) => {
  dispatch(schema.add(table, data));
};
