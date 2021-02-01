import React from 'react'

function Popover({ content, children, isOpen }) {
    return (
        <div className="pc-popover-container">
            <div className="pc-popover-wrapper">
                {isOpen && <div className="pc-content-container">
                    <div className="pc-popover">
                        <div className="pc-popover-arrow"></div>
                        <div className="pc-popover-content">
                            {content}
                        </div>
                    </div>

                </div>}
                <div className="pc-popover-button">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Popover
