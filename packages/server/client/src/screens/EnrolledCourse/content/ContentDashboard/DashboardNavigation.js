import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNavigation = ({ setCurrent, current, lecture, courseNavigator }) => {
  let navMenus = [{ title: 'Overview', name: 'overview' }];
  if (lecture.resources && lecture.resources.filter(o => o.type === 'video').length > 0) {
    navMenus = [{ title: 'Description', name: 'description' }, ...navMenus];
  }
  if (courseNavigator) {
    navMenus = [{ title: 'Course content', name: 'courseContent' }, ...navMenus];
  }

  return (
    <div className="section-nav-menu">
      <nav className="section-nav">
        <ul className="nav-ul">
            {
              navMenus.map((navMenu, idx) => (
                <li className={`nav-item ${current === navMenu.name ? 'active' : ''}`} key={`nav-${idx}`}>
                  <Link to="#" onClick={() => setCurrent(navMenu.name)}>{navMenu.title}</Link >
                </li>
              ))
            }
        </ul>
      </nav>
    </div>
  )
}

export default DashboardNavigation;
