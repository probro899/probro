import React from 'react';
import { GenderSchema } from '../structure';
import { Form } from '../../../../../common';

export default ({ callback, instance }) => {
  const schema = GenderSchema(instance);
  return (
    <Form data={schema} callback={(data) => callback(data, 'UserDetails')} />
  );
};
