import React from 'react'
import { Button } from '../../common/utility-functions/Button/Button';
import { BiGlobe } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
export const ConnectButtons = () => {
    return (
        <div className="pc-connect-btns">
            <div className="pc-con">
                <Button
                    onClick={() => { }}
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
        </div>
    )
}
