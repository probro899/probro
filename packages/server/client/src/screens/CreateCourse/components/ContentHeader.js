import React from 'react';
import { Button } from '../../../common/utility-functions/Button/Button';
import { AiOutlinePlus } from "react-icons/ai";

const ContentHeader = ({ title, buttonTitle, showButton, buttonClickAction }) => {
    return (
        <>
            <div className="header-wrapper">
                <div className="header-wrapper-container">
                    <h2 className="header-title">{title}</h2>
                </div>
                {
                    showButton && <div className="button-section">
                        <Button onClick={buttonClickAction} type="button" buttonStyle="btn--primary--solid" buttonSize="btn--small" icon={<AiOutlinePlus />} title={buttonTitle} />
                    </div>
                }
            </div>
        </>
    )
}

ContentHeader.defaultProps = {
    showButton: false
}

export default ContentHeader;
