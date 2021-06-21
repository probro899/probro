import React from 'react';
import Toolbar from './Toolbar';
import PrevAndNext from './PrevAndNext';
import { Spinner } from '../../../../common';
import { minimizeElement, maximizeElement } from '../../../dashboard/drawing-board/helper-functions';
import TextOutput from './TextOutput';
import VideoOutput from './VideoOutput';
import ProjectOutput from './ProjectOutput';

class ContentDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { maximize: false };
  }

  componentDidMount() {
    document.getElementById('pcLectureContentSection').addEventListener('fullscreenchange', this.changeFullScreen);
  }

  componentWillUnmount() {
    document.getElementById('pcLectureContentSection').removeEventListener('fullscreenchange', this.changeFullScreen);
  }

  changeFullScreen = (e) => {
    if (!document.fullscreenElement) {
      this.setState({ maximize: false });
    }
  }

  toggleMaximization = () => {
    const { maximize } = this.state;
    if (!maximize) {
      maximizeElement(document.getElementById('pcLectureContentSection'));
    } else {
      minimizeElement();
    }
    this.setState({ maximize: !maximize });
  }

  getContent = () => {
    const { lecture } = this.props;
    if (lecture.resources) {
      const video = lecture.resources.find(o => o.type === 'video');
      if (video) return <VideoOutput video={video} />;
      const project = lecture.resources.find((o) => o.type === 'project');
      if (project) return <ProjectOutput lecture={lecture} project={project} />;
    }
    return <TextOutput lecture={lecture} />;
  }

  render() {
    const { lecture, changeLecture, controlLectures } = this.props;
    if (!lecture) return <Spinner />;
    console.log('this props in contend display', this.props);
    return (
      <>
        <div className="course-view-container">
          <div className="lecture-viewer-wrapper" id="pcLectureContentSection">
            <div className="lecture-viewer-container">
              {this.getContent()}
            </div>
          </div>
          <Toolbar toggleMaximization={this.toggleMaximization} />
        </div>
        <PrevAndNext changeLecture={changeLecture} controlLectures={controlLectures} lecture={lecture} />
      </>
    );
  }
}

export default ContentDisplay;
