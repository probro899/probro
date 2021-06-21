import React, { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { FaProjectDiagram } from 'react-icons/fa';
import { RiArticleLine } from 'react-icons/ri';
import Accordion from '../../../common/Accordion';

const LectureIcon = ({ lecture }) => {
  if (lecture.resources && lecture.resources.filter(o => o.type === 'video').length > 0) return <AiFillPlayCircle size={20} />;
  if (lecture.resources && lecture.resources.filter((o) => o.type === 'project').length > 0) return <FaProjectDiagram size={20} />;
  return <RiArticleLine size={20} />;
};

const SyllabusContent = ({ lectures }) => {
  return (
    <ul className="content-list">
      {
        lectures.map((obj, idx) => {
          return (
            <li key={`lecture-${idx}`}>
              <div className="preview-item">
                <div className="item-content">
                  <div className="item-content-title">
                    <LectureIcon lecture={obj} />
                    <span>{obj.title}</span>
                  </div>
                  <span className="content-time">
                    {obj.duration || '00:00'}
                  </span>
                </div>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
};

const Syllabus = ({ course }) => {
  const [expand, setExpand] = useState(false);
  const { courseSection } = course;
  const noOfLectures = course.courseSection.reduce((a, b) => a + b.lectures.length, 0);
  const noOfSections = course.courseSection.length;
  return (
    <div className="syllabus-container" id="syllabus">
      <h2 className="syllabus-heading">Course content</h2>
      <div className="syllabus-subhead">
        <div className="subhead-left">
          <span className="syllabus-content-length">{noOfSections} sections • {noOfLectures} lectures</span>
        </div>
        <div className="syllabus-expand-collapse">
          <span onClick={() => setExpand(!expand)}>{expand ? 'Collapse' : 'Expand' } all sections</span>
        </div>
      </div>
      <div>
        {
          courseSection.map((obj, idx) => {
            return (
              <Accordion
                expandAll={expand}
                key={`section - ${idx}`}
                idx={idx + 1}
                title={obj.title}
                content={<SyllabusContent lectures={obj.lectures} />}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Syllabus;
