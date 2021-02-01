import React, { useState } from 'react';
import PropTypes from 'prop-types';
export function Tooltip({
    content, position, delay,
    children
}) {
    let timeout;
    const [active, setActive] = useState(false);
    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true);
        }, delay || 200);
    };

    const hideTip = () => {
        clearInterval(timeout);
        setActive(false);
    };
    return (
        <>
            <div className="tooltip"
                onMouseEnter={showTip}
                onMouseLeave={hideTip}
            >{children}
                {
                    active &&
                    <span className={`tooltiptext ${position}`}>{content}</span>
                }
            </div>
        </>
    )
}

Tooltip.defaultProps = {
    position: 'top',
};
