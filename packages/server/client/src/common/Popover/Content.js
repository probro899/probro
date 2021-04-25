import React, { useEffect } from 'react';

export default ({ content, rect, onClick, hPosition, vPosition, xAlign, yAlign }) => {
    const ref = React.createRef();

    useEffect(() => {
        const click = (e) => {
            if (!ref.current.contains(e.target)) {
                onClick();
            }
        }
        document.addEventListener('mouseup', click);
        return function cleanup() {
          document.removeEventListener('mouseup', click);
        };
    });

    let tx = '0', ty = '0';
    let top = window.scrollY, left = window.scrollX;

    if (hPosition === 'right') {
        tx = '0px';
    } else if (hPosition === 'center') {
        tx = "-50%";
    } else {
        tx = '-100%';
    }

    if (vPosition === 'top') {
        ty = '-100%';
    } else if (vPosition === 'center') {
        ty = '-50%';
    } else {
        ty = '0px';
    }

    if (xAlign === 'right') {
        left = rect.rect.x + rect.rect.width;
    } else {
        left = rect.rect.x;
    }

    if (yAlign === 'top') {
        top += rect.rect.y;
    } else {
        top += (rect.rect.y + rect.rect.height);
    }

    let style = { left, top, transform: `translate3d(${tx}, ${ty}, 0px)` };
    return (
        <div ref={ref} className="pc-portal-overlay">
            <div style={style} className="pc-popover-content">
                {content}
            </div>
        </div>
    )
}