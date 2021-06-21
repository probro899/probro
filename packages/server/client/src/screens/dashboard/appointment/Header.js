import React, { useState } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { Button } from '../../../common/utility-functions/Button/Button';
import Popup from '../../../common/Form/Popup';
import AddAppointments from './AddAppointments';

const Header = ({ heading, subHeading, buttonText, createAppointment, classrooms }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => setIsOpen(!isOpen);

    const callback = async (data) => {
        const res = await createAppointment(data);
        if (res) {
            togglePopup();
        }
    }

    return (
        <>
            <div className="header">
                <div className="title-header">
                    <span className="title">{heading} </span>
                    <small>{subHeading}</small>
                </div>
                <div className="add-new-btn">
                    <Button
                        onClick={togglePopup}
                        type="button"
                        buttonStyle="btn--primary--solid"
                        buttonSize="btn--small"
                        title={buttonText}
                    />
                </div>
            </div>
            <Popup isOpen={isOpen} onClose={togglePopup} title="Create Appoinment" icon={<FaRegCalendarCheck size={20} />} width='650px'>
                <AddAppointments callback={callback} classrooms={classrooms} />
            </Popup>
        </>
    )
}

export default Header;
