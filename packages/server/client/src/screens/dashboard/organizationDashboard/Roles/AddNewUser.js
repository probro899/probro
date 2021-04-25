import React from 'react';
import { Form } from '../../../../common';
import RoleSchema from './structure';


const AddNewUser = () => {

    const addRole = (data) => {
        return { response: 200, message: "Role added successfully" };
    }

    return (
        <div className="pc-add-new-user">
            <Form data={RoleSchema} callback={addRole.bind(this)} />
        </div>
    )
}

export default AddNewUser;
