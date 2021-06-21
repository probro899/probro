import React from 'react';
import { NavLink } from 'react-router-dom';

const navMenus = [
  { name: 'About' },
  { name: 'Instructors' },
  { name: 'Syllabus' },
  { name: 'Reviews' },
]

const SectionNavigation = ({ match }) => {
    const { url } = match;
    return (
        <div className="section-nav-menu">
            <nav className="section-nav">
                <ul className="nav-ul">
                    {
                        navMenus.map((navMenu) => (
                            <li className="nav-item">
                                <NavLink replace to={`${url}/${navMenu.name.toLowerCase()}`} activeClassName='is-active' >{navMenu.name}</NavLink >
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default SectionNavigation;
