import React from 'react';
import _ from 'lodash';
import { Editor } from '../../../../../common';
import NewSectionForm from '../NewSectionForm';
import LectureMenu from './LectureMenu';

export default class AddResource extends React.Component {
  state = { description: '' };

  componentDidMount() {
    const { item } = this.props;
    this.setState({ description: item.description || '' });
  }

  autoSave = _.debounce(() => {
    const { updateLecture, item } = this.props;
    const { description } = this.state;
    updateLecture(item.sectionId, item.id, { description })
  }, 1000);

  onChange = (id, value) => {
    this.setState({ description: value });
    this.autoSave();
  }

  render() {
    const { uploadLectureVideo, startDeletion, item, apis } = this.props;
    const { description } = this.state;
    return (
      <div className="add-resources">
        <NewSectionForm title="">
          <LectureMenu apis={apis} startDeletion={startDeletion} lecture={item} uploadLectureVideo={uploadLectureVideo} />
          <div className="form-group">
            <Editor label="Description" id="lectureDescription" value={description} name="description" onChange={this.onChange} />
          </div>
        </NewSectionForm>
      </div>
    );
  }
}
