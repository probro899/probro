import { UPDATE_CLASS_VALUE } from './types';

export const updateClassValue = (schema, data) => (
  {
    type: UPDATE_CLASS_VALUE,
    payload: { schema, data },
  }
);

export default updateClassValue;
