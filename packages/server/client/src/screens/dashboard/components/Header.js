import React, { useState } from 'react';
import { Button } from '../../../common/utility-functions/Button/Button';
import Popup from '../../../common/Form/Popup';
import { FaRegCalendarCheck } from 'react-icons/fa';

const Header = ({ heading, subHeading, buttonText, popupContent }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    return (
        <>
            <div className="header">
                <div class="title-header">
                    <span class="title">{heading} </span>
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
                {popupContent}
            </Popup>
        </>
    )
}

export default Header;
