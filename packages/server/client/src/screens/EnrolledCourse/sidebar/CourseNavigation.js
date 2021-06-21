import React from 'react';
import Accordion from '../../../common/Accordion';
import CourseContents from './CourseContents';

export default class CourseNavigation extends React.Component {
  state = {};

  render() {
    const { activeLecture, course, toggleLectureCompletion, switchLecture } = this.props;
    return (
      <>
        <h2 className="sidebar-header">{course.title}</h2>
        {
          course.courseSection.map((sec, idx) => {
            return (
              <Accordion
                active={sec.id === activeLecture.sectionId}
                idx={idx + 1}
                title={sec.title}
                key={`section-${sec.id}`}
                content={
                  <CourseContents
                    toggleLectureCompletion={toggleLectureCompletion} 
                    activeLecture={activeLecture}
                    switchLecture={switchLecture}
                    lectures={sec.lectures}
                  />
                }
              />
            )
          })
        }
      </>
    )
  }
}
