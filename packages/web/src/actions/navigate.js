import { UPDATE_NAV } from './types';

const updateNav = data => (
  {
    type: UPDATE_NAV,
    payload: data,
  }
);

export { updateNav };
