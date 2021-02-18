import React from 'react'
import { Button } from '../../common/utility-functions/Button/Button';
import { BiGlobe } from "react-icons/bi";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
export const Support = () => {
    return (
        <div className="pc-support-container">
            <div className="pc-suppoer-header">
                <h3 className="pc-support-header-title">Need Help?</h3>
            </div>
            <div className="pc-support-content">
                <Button
                    onClick={() => { }}
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--small"
                    title="+124 54578 658"
                    icon={<AiOutlinePhone size={20} />}
                />
                <Button
                    onClick={() => { }}
                    type="button"
                    buttonStyle="btn--primary--solid"
                    buttonSize="btn--small"
                    title="test@test.com"
                    icon={<AiOutlineMail size={20} />}
                />
            </div>
        </div>
    )
}
