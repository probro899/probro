import React from 'react';
import { Button } from '../../../../common/utility-functions/Button/Button';

const NewSectionForm = ({ title, children, formActionTitle, formAction, onCancel }) => {
    return (
        <div className="new-section-form-wrapper">
            <form className="new-section-form">
                <div className="sec-wrapper">
                    <div className="left-sec">{title}</div>
                    <div className="right-sec">
                        {children}
                        <div className="button-section">
                            {
                                onCancel && (
                                    <Button
                                        onClick={onCancel}
                                        type="button"
                                        buttonStyle="btn--primary--outline"
                                        buttonSize="btn--small"
                                        title="Cancel"
                                    />
                                )
                            }
                            
                            <Button
                                onClick={formAction}
                                type="button"
                                buttonStyle="btn--primary--solid"
                                buttonSize="btn--small"
                                title={formActionTitle}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewSectionForm;
