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
        // console.log('schema initcalled', action);
        return {
          ...state,
          [schema]: action.payload.reduce((res, item) => {
            // console.log(res, item);
            res.byId[item.id] = item;
            res.allIds.push(item.id);
            return res;
          }, { byId: {}, allIds: [] }),
        };

      // Add the data according to schema
      case schemaRedux.add.TYPE:
        return !Array.isArray(action.payload) ? {
          ...state,
          [schema]: {
            byId: { ...state[schema].byId, [action.payload.id]: action.payload },
            allIds: state[schema].allIds.concat(action.payload.id),
          },
        } : {
          ...state,
          [schema]: {
            allIds: [...state[schema].allIds, ...action.payload.map(obj => obj.id)],
            byId: {
              ...state[schema].byId,
              ...action.payload.reduce((mainObj, obj) => {
                mainObj[obj.id] = obj;
                return mainObj;
              }, {}),
            },
          },
        };

      // Remove the data from specific schema
      case schemaRedux.remove.TYPE:
        // eslint-disable-next-line
        const tempObj = Object.assign({}, state[schema].byId);
        let tempArr = [];

        if (Array.isArray(action.payload)) {
          action.payload.forEach((p) => {
            delete tempObj[p.id];
          });
          tempArr = state[schema].allIds.filter(id => !action.payload.find(p => p.id === id));
        } else {
          delete tempObj[action.payload.id];
          tempArr = state[schema].allIds.filter(id => id !== action.payload.id);
        }

        return {
          ...state,
          [schema]: {
            allIds: tempArr,
            byId: tempObj,
          },
        };

      // Update the data of specific schema
      case schemaRedux.update.TYPE:
        console.log('update called', schema, action);
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
