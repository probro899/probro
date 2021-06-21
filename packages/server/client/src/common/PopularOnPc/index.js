/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import PopularBlog from './PopularBlog';
import PopularUser from './PopularUser';
import PopularCourse from './PopularCourse';
import PopularItemWrapper from './PopularItemWrapper';
import PopularOrg from './PopularOrg';

const PopularOnPc = ({ blogs, mentors, courses, user, organizations }) => {
  const blogItems = blogs && blogs.map((obj, idx) => <PopularBlog obj={obj} key={`bl-${idx}`} />);
  const mentorItems = mentors && mentors.map((obj, idx) => <PopularUser obj={obj} key={`men-${idx}`} />);
  const orgItems = organizations && organizations.map((obj, idx) => <PopularOrg org={obj} key={`org-${idx}`} />);
  const courseItems = courses && courses.map((obj, idx) => <PopularCourse course={obj} key={`co-${idx}`} />);
  return (
    <div className="ar-right">
      <div className="popular-on-pc">
        {courses && courses.length > 0 && <PopularItemWrapper content={courseItems} title={`courses by ${user.firstName}`} />}
        {blogs && blogs.length > 0 && <PopularItemWrapper content={blogItems} title={user ? `blogs by ${user.firstName}` : "popular blogs"} />}
        {mentors && mentors.length > 0 && <PopularItemWrapper content={mentorItems} title="popular mentors" />}
        {organizations && organizations.length > 0 && <PopularItemWrapper content={orgItems} title="popular organizations" />}
      </div>
    </div>
  );
};

PopularOnPc.defaultProps = {
  blogs: null,
  mentors: null,
  organizations: null,
  courses: null,
};

PopularOnPc.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.any),
  mentors: PropTypes.arrayOf(PropTypes.any),
  organizations: PropTypes.arrayOf(PropTypes.any),
  courses: PropTypes.arrayOf(PropTypes.any),
};

export default PopularOnPc;
