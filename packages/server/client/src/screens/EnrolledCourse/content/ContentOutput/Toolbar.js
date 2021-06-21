import React from 'react';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import { GoReport } from 'react-icons/go';
import { Tooltip } from '../../../../common/Form/Tooltip';

const Toolbar = ({ toggleMaximization }) => {
    return (
        <div className="lecture-tools-container">
            <div className="tools-wrapper">
                <Tooltip content="Report">
                    <Button
                        onClick={() => { }}
                        type="button"
                        buttonStyle="btn-drawing-icon"
                        buttonSize="btn--small"
                        icon={<GoReport size={20} />}
                    />
                </Tooltip>
                <Tooltip content="Fullscreen">
                    <Button
                        onClick={toggleMaximization}
                        type="button"
                        buttonStyle="btn-drawing-icon"
                        buttonSize="btn--small"
                        icon={<AiOutlineExpandAlt size={20} />}
                    />
                </Tooltip>
            </div>
        </div>
    )
}

export default Toolbar;
