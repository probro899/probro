import React, { useState } from 'react';
import { Button } from '../../../common/utility-functions/Button/Button';
import { FormTextInput } from '../../../common/Form/FormTextInput';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';

const BasicSettingContainer = ({ title, subtitle }) => {
    const [showContent, setShowContent] = useState(false);
    const toggleshowContent = () => setShowContent(!showContent);

    return (
        <div className="basic-setting-container">
            <div className="settings-wrapper">
                <div className="setting-header">
                    <div className="left-section">
                        <p className="setting-title">
                            {title}
                        </p>
                        <p className="setting-description">{subtitle}</p>
                    </div>
                    <div className="right-section">
                        <Button
                            onClick={toggleshowContent}
                            type="button"
                            buttonStyle="btn--primary--outline"
                            buttonSize="btn--small"
                            icon={showContent ? <FaChevronCircleUp size={20}/> : <FaChevronCircleDown size={20}/>}
                        />
                    </div>
                </div>
                {
                    showContent && <div className="setting-edit-container">
                        <FormTextInput />
                        <FormTextInput label="Middle Name" />
                        <FormTextInput label="Last Name" />
                        <div className="submit-button">
                            <Button
                                onClick={() => { }}
                                type="button"
                                buttonStyle="btn--primary--solid"
                                buttonSize="btn--small"
                                title="Submit"
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default BasicSettingContainer;
