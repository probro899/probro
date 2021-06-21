import React from 'react';
import Card from '../../../../common/Card';
import IncludesSection from './IncludesSection';
import { ENDPOINT } from '../../../../config';
import EnrollSection from './EnrollSection';

const CourseSidebar = ({ course, onEnroll, enrolled }) => {
  const thumbnail = course.logo ? `${ENDPOINT}/assets/user/${10000000 + parseInt(course.createdBy, 10)}/course/${course.logo}` : '/assets/graphics/course.png';
  return (
    <div className="pcc-left-section">
      <Card>
        <figure className="pcc-thumbnail">
          <img src={thumbnail} />
        </figure>
        <EnrollSection
          enrolled={enrolled}
          course={course}
          onEnroll={onEnroll}
        />
        <div className="pcc-money-back">
          <span className="money-back">1 Week Money-Back Guarantee</span>
        </div>
        <IncludesSection course={course} />
      </Card>
    </div>
  );
};

export default CourseSidebar;
