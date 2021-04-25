import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import AddNewSectionButton from './AddNewSectionButton';
import SectionContentList from './SectionContentList';
import NewSectionForm from './NewSectionForm';
import { FormTextInput } from '../../../../common/Form/FormTextInput';
import LectureHeader from './LectureHeader';


export default ({ item, section, addLecture }) => {
    const [lectureState, lectureStateToggle] = useState('first');
    const [title, onChangeTitle] = useState('');

    const submitForm = () => {
        lectureStateToggle('first');
        onChangeTitle('');
        addLecture(item.id, { title });
    }
    
    return (
        <li className="syllabus-item">
            <div className="syllabus-list-item-wrap">
                <div className="list-item-section-wrapper">
                    <SectionHeader title={item.title} section={section} />
                    <ul>
                        {
                            item.lectures.map((obj, idx) => <li key={obj.id}><LectureHeader index={idx + 1} item={obj} /></li>)
                        }
                        <li className="add-section-item inner-add-content">
                            <AddNewSectionButton toggleContent={() => lectureStateToggle(lectureState === 'first' ? 'second' : 'first')} showContent={lectureState !== 'first'} />
                        </li>
                        <li>
                            {lectureState === 'second' && <SectionContentList toggleLecture={lectureStateToggle} />}
                        </li>
                        <li>
                            {lectureState === 'third' && (
                                <div className="add-new-lecture">
                                    <NewSectionForm title="New Lecture" formActionTitle="Add Lecture" formAction={submitForm}>
                                        <div className="form-group">
                                            <FormTextInput value={title} name="title" onChange={(e) => onChangeTitle(e.target.value)} placeholder="Enter a title" />
                                        </div>
                                    </NewSectionForm>
                                </div>)
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    )
}