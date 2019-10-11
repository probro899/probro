import users from './cache';

export default (action, session) => {
  const { id } = session.values.user;
  const state = users.get(id);
  // console.log('previousState', action.schema, state, state[action.schema], state[action.schema]);
  const newState = () => {
    switch (action.type) {
      case 'schema.add':
        return !Array.isArray(action.payload) ? {
          ...state,
          [action.schema]: [...state[action.schema], action.payload],
        } : {
          ...state,
          [action.schema]: [...state[action.schema], ...action.payload],
        };
      case 'schema.update':
        // console.log('update cache schema called', action, session);
        return {
          ...state,
          [action.schema]: state[action.schema].map(obj => (obj.id === action.payload.id ? { ...obj, ...action.payload } : obj)),
        };
      case 'schema.remove':
        return {
          ...state,
          [action.schema]: state[action.schema].filter(obj => obj.id !== action.payload.id),
        };
      default:
        return state;
    }
  };
  // console.log('new State', newState());
  users.set(id, newState());
};
