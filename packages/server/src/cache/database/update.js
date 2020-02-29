import database from './cache';

export default (tabelId, action) => {
  const state = database.get(tabelId);
  console.log('previousState', action, state);
  const newState = () => {
    switch (action.type) {
      case 'schema.add':
        return !Array.isArray(action.payload)
          ? [...state, action.payload]
          : [...state, ...action.payload];
      case 'schema.update':
        // console.log('update cache schema called', action, state[action.schema]);
        return state.map(obj => (obj.id === action.payload.id ? { ...obj, ...action.payload } : obj));
      case 'schema.remove':
        return state.filter(obj => obj.id !== action.payload.id);
      default:
        return state;
    }
  };
  // console.log('new State', newState());
  database.set(tabelId, newState());
};
