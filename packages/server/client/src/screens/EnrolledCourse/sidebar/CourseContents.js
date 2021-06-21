import React from 'react';
import ContentList from './ContentList';

const CourseContents = ({ toggleLectureCompletion, switchLecture, lectures, activeLecture }) => {
  return (
    <ul className="content-list">
      {lectures.map((obj, idx) => <ContentList toggleLectureCompletion={toggleLectureCompletion} active={activeLecture.id === obj.id} switchLecture={switchLecture} lecture={obj} key={`lecture-${obj.id}`} idx={idx+1} />)}
    </ul>
  )
}

export default CourseContents;
