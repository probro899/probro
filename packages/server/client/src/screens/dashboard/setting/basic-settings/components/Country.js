import React from 'react';
import { CountrySchema } from '../structure';
import { Form } from '../../../../../common';

export default ({ callback, instance }) => {
    const schema = CountrySchema(instance);

    return (
        <Form data={schema} callback={(data) => callback(data, 'UserDetails')} />
    )
}