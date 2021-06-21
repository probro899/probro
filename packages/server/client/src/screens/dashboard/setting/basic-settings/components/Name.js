import React from 'react';
import { NameSchema } from '../structure';
import { Form } from '../../../../../common';

export default ({ callback, instance }) => {
    const schema = NameSchema(instance);
    return (
        <Form data={schema} callback={(data) => callback(data, 'User')} />
    )
}