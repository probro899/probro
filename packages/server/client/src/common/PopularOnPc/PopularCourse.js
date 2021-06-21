import React from 'react';
import { Link } from 'react-router-dom';
import { StarDisplay } from '../StarRating'
import { getName } from '../utility-functions';
import { ENDPOINT } from '../../config';

const CourseSection = ({ course }) => {
  const thumbnail = course.logo ? `${ENDPOINT}/assets/user/${10000000 + parseInt(course.creator.id, 10)}/course/${course.logo}` : '/assets/graphics/course.png';
  return (
    <div className="popular-course">
      <figure className="course-thumbnail">
        <img src={thumbnail} />
      </figure>
      <div className="course-description">
        <Link className="course-title" to={`/course/${course.id}/about`}>{course.title}</Link>
        <Link to="#">{getName(course.creator)}</Link>
        <div className="course-rating">
          <StarDisplay star={Number(course.rating.avgRating)} />
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
