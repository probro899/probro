import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import AddNewSectionButton from './AddNewSectionButton';
import NewSectionForm from './NewSectionForm';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import { LectureHeader } from './lecture-components';

export default ({ apis, updateSection, updateLecture, item, section, startDeletion, uploadLectureVideo, addLecture }) => {
  const [lectureState, lectureStateToggle] = useState(false);
  const [title, onChangeTitle] = useState('');

  const submitForm = () => {
    lectureStateToggle(false);
    onChangeTitle('');
    addLecture(item.id, { title });
  };

  return (
    <li className="syllabus-item">
      <div className="syllabus-list-item-wrap">
        <div className="list-item-section-wrapper">
          <SectionHeader updateSection={updateSection} sectionObj={item} startDeletion={() => startDeletion('section', item.id, null)} title={item.title} section={section} />
          <ul>
            {
              item.lectures.map((obj, idx) => (
                <li key={obj.id}>
                  <LectureHeader
                    uploadLectureVideo={uploadLectureVideo}
                    updateLecture={updateLecture}
                    startDeletion={startDeletion}
                    index={idx + 1}
                    item={obj}
                    apis={apis}
                  />
                </li>
              ))
            }
            <li className="add-section-item inner-add-content">
              <AddNewSectionButton toggleContent={() => lectureStateToggle(!lectureState)} showContent={lectureState} />
            </li>
            <li>
              {lectureState && (
                <div className="add-new-lecture">
                  <NewSectionForm title="New Lecture" formActionTitle="Add Lecture" formAction={submitForm}>
                    <div className="form-group">
                      <FormTextInput value={title} name="title" onChange={(e) => onChangeTitle(e.target.value)} placeholder="Enter a title" />
                    </div>
                  </NewSectionForm>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
};
