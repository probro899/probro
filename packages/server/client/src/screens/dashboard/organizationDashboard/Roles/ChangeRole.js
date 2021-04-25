import React, { useState } from 'react';
import { FormSelectField } from '../../../../common/Form/FormSelectField';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { SwitchButton } from '../../../../common/Form/SwitchButton';


const ChangeRole = () => {
    const [active, setActive] = useState(false);
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
    ]

    const changeActiveStatus = () => {
        setActive(!active);
    }

    return (
        <>
            <FormSelectField
                options={options}
                name="Role"
                onChange={() => { }}
                value=""
            />
            {/* <FormSelectField
                options={options2}
                name="Status"
                onChange={() => { }}
                value=""
            /> */}
            <div className="pc-change-active">
                <span>Status - <strong>{active ? 'active' : 'inactive'}</strong> </span>
                <SwitchButton
                    onChange={changeActiveStatus}
                    checked={active}
                />
            </div>
            <Button
                onClick={() => { }}
                type="button"
                buttonStyle="btn--primary--solid"
                buttonSize="btn--medium"
                title="Submit"
            />
        </>
    )
}

export default ChangeRole;
