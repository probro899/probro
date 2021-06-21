import React from 'react';
import { AddressSchema } from '../structure';
import { Form } from '../../../../../common';

export default ({ callback, instance }) => {
    const schema = AddressSchema(instance);

    return (
        <Form data={schema} callback={(data) => callback(data, 'UserDetails')} />
    )
}