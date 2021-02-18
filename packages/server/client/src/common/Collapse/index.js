import React from 'react';

export const Collapse = ({ children, isOpen }) => {
    const cssClasses = ['pc-collapse'];
    if (isOpen) {
        cssClasses.push('open');
    } else {
        cssClasses.push('close');
    }
    return (
        <>
            <div className={cssClasses.join(' ')}>
                <div className='pc-collapse-body'>
                    {children}
                </div>
            </div>
        </>
    )
}


