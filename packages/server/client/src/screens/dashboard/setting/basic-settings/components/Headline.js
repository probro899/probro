import React from 'react';
import { HeadlineSchema } from '../structure';
import { Form } from '../../../../../common';

export default ({ callback, instance }) => {
    const schema = HeadlineSchema(instance);

    return (
        <Form data={schema} callback={(data) => callback(data, 'UserDetails')} />
    )
}