import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <div className="navbar-center">
      <NavLink to="/courses">
        <div className="navbar-item">
          <span>Courses</span>
        </div>
      </NavLink>
      <NavLink to="/archive">
        <div className="navbar-item">
          <span>Archive</span>
        </div>
      </NavLink>
      <NavLink to="/search">
        <div className="navbar-item">
          <span>Find Mentor</span>
        </div>
      </NavLink>
      <NavLink to="/pricing">
        <div className="navbar-item">
          <span>Pricing</span>
        </div>
      </NavLink>
    </div>
  );
}
