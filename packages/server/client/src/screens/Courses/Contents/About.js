import React, { useState } from 'react';

const DESCRIPTION_MAX_LENGTH = 1500;

const About = ({ course }) => {
  const [showMore, setShowMore] = useState(false);
  const lengthOfDescription = course.description ? course.description.length : 0;
  let currentDescription = '';
  if (lengthOfDescription !== 0) {
    if (showMore) {
      currentDescription = course.description;
    } else {
      currentDescription = lengthOfDescription > DESCRIPTION_MAX_LENGTH ? course.description.substr(0, DESCRIPTION_MAX_LENGTH) : course.description;
    }
  }
  return (
    <div id="about" className="section-about-container">
      <h2 className="about-header">About this course</h2>
      <p className="course-views">{course.rating.noOfRating} total reviews</p>
      <div className="course-description">
        <div className="course-description-content" dangerouslySetInnerHTML={{ __html: currentDescription }}></div>
        {lengthOfDescription > DESCRIPTION_MAX_LENGTH && <span className="show-more" onClick={() => setShowMore(!showMore)}>{showMore ? 'show less' : 'show more'}</span>}
      </div>
      <div className="skills-to-learn">
        <h3 className="skill-heading">skills you will gain</h3>
        <div className="skills-pills">
          {JSON.parse(course.skill).map(skill => <span className="skill-pill">{skill}</span>)}
        </div>
      </div>
    </div>
  )
}

export default About;
