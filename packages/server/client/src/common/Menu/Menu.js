import React from 'react'

const Menu = ({ children }) => {
    return (
        <>
            <ul className="pc-menu">
                {children}
            </ul>
        </>
    )
}

export default Menu
