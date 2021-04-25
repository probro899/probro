import React from 'react';
import { FormTextInput } from '../../../common/Form/FormTextInput';
import { FormSelectField } from '../../../common/Form/FormSelectField';
import DateField from '../../../common/DateField';
import { Button } from '../../../common/utility-functions/Button/Button';

const AddAppointments = () => {
    const classrooms = [
        {
            value: 'class',
            label: 'class'
        },
        {
            value: 'classroom',
            label: 'classroom'
        },
        {
            value: 'classroom',
            label: 'classroom'
        },

    ]
    return (
        <div className="add-appointment">
            <FormTextInput label="Name" name="name" />
            <FormSelectField
                options={classrooms}
                onChange={() => { }}
                name="Select Classroom"
                value={'test'}
            />
            <DateField onChange={() => { }} data={{ name: 'From' }} />
            <DateField onChange={() => { }} data={{ name: 'To' }} />
            <div className="submit-btn">
                <Button
                    onClick={() => { }}
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--small"
                    title='Add'
                />
            </div>
        </div>
    )
}

export default AddAppointments;
