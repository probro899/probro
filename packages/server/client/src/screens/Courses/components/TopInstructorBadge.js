import React from 'react';
import { Tooltip } from '../../../common/Form/Tooltip';

const TopInstructorBadge = ({ title, content }) => {
    return (
        <>
            <Tooltip content={content}>
                <div className="mentor-badge">
                    <span>{title}</span>
                </div>
            </Tooltip>
        </>
    )
}

export default TopInstructorBadge;
