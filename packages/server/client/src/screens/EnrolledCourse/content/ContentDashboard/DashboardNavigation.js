import React from 'react';
import { NavLink } from 'react-router-dom';

const navMenus = [
    {
        name: 'Overview',
    },
    {
        name: 'Q&A',
    },
    {
        name: 'Notes',
    },
    {
        name: 'Announcements',
    },
]

const DashboardNavigation = () => {
    const url = "/enrolled";
    return (
        <div className="section-nav-menu">
            <nav className="section-nav">
                <ul className="nav-ul">
                    {
                        navMenus.map((navMenu) => (
                            <li className="nav-item">
                                <NavLink to={`${url}/${navMenu.name.toLowerCase()}`} activeClassName='is-active' >{navMenu.name}</NavLink >
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default DashboardNavigation;
