import React from 'react';
import { CareerIntrestSchema } from '../structure';
import { Form } from '../../../../../common';

export default ({ callback, instance }) => {
    const schema = CareerIntrestSchema(instance);

    const submitCareer = async (data) => {
        const res = await callback({ field: JSON.stringify(data.field) }, 'UserDetails');
        return res;
    }

    return (
        <Form data={schema} callback={submitCareer} />
    )
}