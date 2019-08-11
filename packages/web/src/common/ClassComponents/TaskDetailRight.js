import React from 'react';
import { Button } from '@blueprintjs/core';

class TaskDetailRight extends React.Component {
  state = {};

  render() {
    return (
      <div className="right">
        <div className="rt-in">
          <div style={{ padding: '5px' }}>
            <span style={{ color: '#696969' }}>Tools</span>
          </div>
          <div className="rt-tools">
            <Button
              alignText="left"
              icon="tag"
              text="Tag"
            />
            <Button
              alignText="left"
              icon="upload"
              text="Attachment"
            />
          </div>
          <div style={{ padding: '5px' }}><span style={{ color: '#696969' }}>Actions</span></div>
          <div className="rt-actions">
            <Button
              alignText="left"
              icon="move"
              text="Move card"
            />
            <Button
              alignText="left"
              icon="trash"
              text="delete"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskDetailRight;
