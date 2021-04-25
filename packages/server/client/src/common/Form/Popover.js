import React, { useState } from 'react'

function Popover({ content, children, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const tooggleOpen = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className={`pc-popover-container ${className}`}>
            <div className="pc-popover-wrapper">
                {isOpen && <div className="pc-content-container">
                    <div className="pc-popover">
                        <div className="pc-popover-arrow"></div>
                        <div className="pc-popover-content">
                            {content}
                        </div>
                    </div>
                </div>}
                <div className="pc-popover-button" onClick={tooggleOpen}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Popover
