import schemaRedux from '@probro/common/src/schema';

export default function schemaReducer(...schemes) {
  const structure = schemes.reduce((res, scheme) => {
    res[scheme] = {
      byId: {},
      allIds: [],
    };
    return res;
  }, {});

  return (state = structure, action) => {

    const { schema } = action;
    // Only process actions that have schema
    if (!schema || !state[schema]) {
      return state;
    }

    switch (action.type) {

      // Initialise the reducer with initial value
      case schemaRedux.init.TYPE:
        return {
          ...state,
          [schema]: action.payload.reduce((res, item) => {
            res.byId[item.id] = item;
            res.allIds.push(item.id);
          }, { byId: {}, allIds: [] }),
        };

      // Add the data according to schema
      case schemaRedux.add.TYPE:
        return {
          ...state,
          [schema]: {
            byId: { ...state[schema].byId, [action.payload.id]: action.payload },
            allIds: state[schema].allIds.concat(action.payload.id),
          },
        };

      // Remove the data from specific schema
      case schemaRedux.remove.TYPE:
        // eslint-disable-next-line
        const temp = Object.assign({}, state[schema].byId);
        delete temp[action.payload.id];
        return {
          ...state,
          [schema]: {
            allIds: state[schema].allIds.filter(id => id !== action.payload.id),
            byId: temp,
          },
        };

      // Update the data of specific schema
      case schemaRedux.update.TYPE:
        return {
          ...state,
          [schema]: {
            byId: {
              ...state[schema].byId,
              [action.payload.id]: {
                ...state[schema].byId[action.payload.id],
                ...action.payload,
              },
            },
            allIds: state[schema].allIds,
          },
        };

      // Return initial structure if no case found
      default:
        return state;
    }
  };
}