import React, { useState } from 'react';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import { FormSelectField } from '../../../../common/Form/FormSelectField';
import { Form } from '../../../../common';

const Filter = ({ search, date, select }) => {
    const [name, setName] = useState('');
    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const structure = [
        {
            id: 'filterDate',
            fieldtype: 'date',
        },
    ];
    const options = [
        {
            label: 'admin',
            value: 1
        },
        {
            label: 'manager',
            value: 2
        },
        {
            label: 'mentor',
            value: 3
        },
        {
            label: 'student',
            value: 4
        },
    ]
    return (
        <div className="pc-role-filter">
            {
                date && <Form callback={() => { }} data={structure} />
            }
            {
                select && <FormSelectField
                    options={options}
                    onChange={() => { }}
                    value=""
                />
            }
            {
              search && <FormTextInput
                  placeholder="Search members"
                  onChange={onNameChange}
                  value={name}
                  className="pc-input-group"
              />
            }
        </div>
    )
}

Filter.defaultProps = {
    search: true,
    date: true
};

export default Filter;
