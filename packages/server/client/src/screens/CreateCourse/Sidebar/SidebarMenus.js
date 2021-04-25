import React from 'react';
import { NavLink } from 'react-router-dom';

const sideMenus = [
    {
        mainTitle: 'Plan your course',
        navItems: [
            { name: 'About', courseIdSensitive: false },
            { name: 'Syllabus', courseIdSensitive: true },
            { name: 'Pricing', courseIdSensitive: true },
        ]
    },
]

const SidebarMenus = ({ userId, courseId }) => {
    let url = '';
    if (courseId) {
        url = `/edit-course/${userId}/${courseId}`;
    } else {
        url = `/create-course/${userId}`;
    }

    const handleClick = (e) => {
        if (!courseId) e.preventDefault();
    }

    return (
        <>
            <div className="nav-container">
                <ul className="ul-steps">
                    {
                        sideMenus.map((sideMenu) => (
                            <li className="sub-nav">
                                <strong className="sub-nav-title">{sideMenu.mainTitle}</strong>
                                <div className="nav-container">
                                    <ul className="nav">
                                        {
                                            sideMenu.navItems.map((navItem) => (
                                                <li className="nav-items">
                                                    <NavLink replace onClick={handleClick} to={`${url}/${navItem.name.toLowerCase()}`} className={`nav-link ${navItem.courseIdSensitive && !courseId ? 'is-disabled' : ''} `} activeClassName='is-active' >{navItem.name}</NavLink >
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default SidebarMenus;
