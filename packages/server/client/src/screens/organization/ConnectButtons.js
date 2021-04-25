import React, { useState } from 'react';
import { Button } from '../../common/utility-functions/Button/Button';
import { BiGlobe } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Popup from '../../common/Form/Popup';
import { FormSelectField } from '../../common/Form/FormSelectField';
import { GoOrganization } from "react-icons/go";

export const ConnectButtons = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const options = [
        {
            label: 'Student',
            value: 1
        },
        {
            label: 'Mentor',
            value: 2
        },
    ]

    return (
        <div className="pc-connect-btns">
            <div className="pc-con">
                <Button
                    onClick={togglePopup}
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--small"
                    title="Join"
                    icon={<AiOutlinePlus size={20} />}
                />
                <Button
                    onClick={() => { }}
                    type="button"
                    buttonStyle="btn--primary--outline"
                    buttonSize="btn--small"
                    title="Website"
                    icon={<BiGlobe size={20} />}
                />
            </div>
            <Popup isOpen={isOpen} onClose={togglePopup} title="Join Organization as:" icon={<GoOrganization size={20} />}>
                <>
                    <FormSelectField
                        options={options}
                        onChange={() => { }}
                        value=""
                    />
                    <Button
                        onClick={() => { }}
                        type="button"
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--medium"
                        title="Join"
                    />
                </>
            </Popup>
        </div>
    )
}
