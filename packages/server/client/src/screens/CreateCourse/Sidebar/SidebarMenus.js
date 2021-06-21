import React from 'react';
import { NavLink } from 'react-router-dom';

const getSideMenus = (course) => {
  const menus = [
    {
      mainTitle: 'Performance',
      navItems: [
        { name: 'Overview', courseIdSensitive: true },
        { name: 'Students', courseIdSensitive: true },
        { name: 'Reviews', courseIdSensitive: true },
      ],
    },
    {
      mainTitle: 'Plan your course',
      navItems: [
        { name: 'About', courseIdSensitive: false },
        { name: 'Syllabus', courseIdSensitive: true },
        { name: 'Pricing', courseIdSensitive: true },
      ],
    },
    {
      mainTitle: 'Manage your Projects',
      navItems: [
        { name: 'Project', courseIdSensitive: true },
      ],
    },
  ];
  if (course.status !== 'publish') menus.splice(0, 1);
  return menus;
};

const SidebarMenus = ({ userId, course }) => {
  const { courseId } = course;
  let url = '';
  if (courseId) {
    url = `/edit-course/${userId}/${courseId}`;
  } else {
    url = `/create-course/${userId}`;
  }

  const handleClick = (e) => {
    if (!courseId) e.preventDefault();
  };

  const sideMenus = getSideMenus(course);
  return (
    <div className="nav-container">
      <ul className="ul-steps">
        {
          sideMenus.map((sideMenu, idx) => (
            <li className="sub-nav" key={`main-${idx}`}>
              <strong className="sub-nav-title">{sideMenu.mainTitle}</strong>
              <div className="nav-container">
                <ul className="nav">
                  {
                    sideMenu.navItems.map((navItem) => (
                      <li key={`lat-${navItem.name}`} className="nav-items">
                        <NavLink replace onClick={handleClick} to={`${url}/${navItem.name.toLowerCase()}`} className={`nav-link ${navItem.courseIdSensitive && !courseId ? 'is-disabled' : ''} `} activeClassName='is-active'>{navItem.name}</NavLink >
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
  );
};

export default SidebarMenus;
