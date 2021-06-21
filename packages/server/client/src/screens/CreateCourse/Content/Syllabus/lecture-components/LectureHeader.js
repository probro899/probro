import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import AddResources from './AddResources';
import NewSectionForm from '../NewSectionForm';
import { FormTextInput } from '../../../../../common/Form/FormTextInput';

const LectureHeader = ({ apis, item, index, startDeletion, updateLecture, uploadLectureVideo }) => {
  const [showIcon, setShowIcon] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [edit, toggleEdit] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(item.title);
  }, [item.title]);

  const submitEdit = () => {
    if (title.trim().length < 1) return;
    updateLecture(item.sectionId, item.id, { title });
    toggleEdit(false);
  };

  if (edit) {
    return (
      <div className="add-new-lecture">
        <NewSectionForm
          onCancel={() => toggleEdit(false)}
          title="Update Lecture"
          formActionTitle="Save"
          formAction={submitEdit}
        >
          <div className="form-group">
            <FormTextInput value={title} name="title" onChange={(e) => setTitle(e.target.value)} placeholder="Enter a title" />
          </div>
        </NewSectionForm>
      </div>
    );
  }

  const toggleShowContent = () => setShowContent(!showContent);
  return (
    <div className="section-editor lecture-header">
      <div className="item-bar-section" onMouseEnter={() => setShowIcon(true)} onMouseLeave={() => setShowIcon(false)}>
        <div className="item-bar-wrapper">
          <div className="item-bar-left">
            <div className="item-bar-left-wrap">
              <span className="item-bar-heading">Lecture {index}:</span>
              <span className="item-bar-title">
                <span className="sec-title">{item.title}</span>
              </span>
              <span onClick={() => toggleEdit(true)} className={`sec-icon edit ${showIcon ? 'show-icon' : 'hidden-icon'} `}>
                <MdEdit size="15" />
              </span>
              <span onClick={() => startDeletion('lecture', item.sectionId, item.id)} className={`sec-icon delete ${showIcon ? 'show-icon' : 'hidden-icon'} `}>
                <MdDelete size="15" />
              </span>
            </div>
          </div>
          <div className="item-bar-right">
            <span className="sec-icon" onClick={toggleShowContent}>
              {showContent ? <FiChevronUp size="15" /> : <FiChevronDown size="15" />}
            </span>
          </div>
        </div>
      </div>
      {showContent && (
        <AddResources
          apis={apis}
          uploadLectureVideo={uploadLectureVideo}
          startDeletion={startDeletion}
          item={item}
          updateLecture={updateLecture}
          showContent={showContent}
        />
      )}
    </div>
  );
};

export default LectureHeader;