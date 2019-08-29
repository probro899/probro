import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, Tag } from '@blueprintjs/core';
import Fileinput from '../FormFileInput';
import Form from '../Form';
import DeletePopOver from '../DeletePopOver';

const PopoverContent = ({ callback }) => {
  const data = {
    id: 'file',
    required: true,
    name: 'Attachment',
    placeholder: 'Choose an Image',
  };

  return (
    <div style={{ padding: '5px', minWidth: '300px' }}>
      <Fileinput onChange={callback} value={{}} data={data} />
    </div>
  );
};

PopoverContent.propTypes = {
  callback: PropTypes.func.isRequired,
};

const TagPopover = () => {
  return (
    <div style={{ padding: '5px', minWidth: '250px' }}>
      <div style={{ padding: '5px', textAlign: 'center', fontSize: '15px', fontWeight: 'bold' }}>
        <span>Select Tags</span>
      </div>
      <div>
        <Tag
          fill
          large
          intent="primary"
          interactive
          style={{ margin: '5px 0px' }}
          icon="tick"
        />
        <Tag
          fill
          large
          interactive
          intent="warning"
          style={{ margin: '5px 0px' }}
        />
        <Tag
          fill
          large
          interactive
          intent="success"
          style={{ margin: '5px 0px' }}
        />
        <Tag
          fill
          large
          interactive
          intent="danger"
          style={{ margin: '5px 0px' }}
        />
      </div>
    </div>
  );
};

const DeadLinePopOver = ({ callback }) => {
  const structure = [
    {
      id: 'deadline',
      fieldtype: 'date',
      name: 'Deadline',
    },
    {
      id: 'submit',
      fieldtype: 'button',
      type: 'submit',
      text: 'ADD',
      fill: 'fill',
      intent: 'success',
      large: 'large',
    },
  ];
  return (
    <div style={{ padding: '5px', minWidth: '300px' }}>
      <Form callback={callback} data={structure} />
    </div>
  );
};

DeadLinePopOver.propTypes = {
  callback: PropTypes.func.isRequired,
};

class TaskDetailRight extends React.Component {
  state = {
    deleteCardPopover: false,
  };

  uploadAttachment = (id, file) => {
    console.log(id, file);
  }

  uploadDeadLine = (data) => {
    console.log(data);
  }

  deleteCard = (type) => {
    if (type === 'confirm') {
      this.toggleDeleteCard();
    } else {
      this.toggleDeleteCard();
    }
  }

  toggleDeleteCard = () => {
    const { deleteCardPopover } = this.state;
    this.setState({
      deleteCardPopover: !deleteCardPopover,
    });
  }

  render() {
    const { deleteCardPopover } = this.state;
    const { task } = this.props;
    return (
      <div className="right">
        <div className="rt-in">
          <div style={{ padding: '5px' }}>
            <span style={{ color: '#696969' }}>Tools</span>
          </div>
          <div className="rt-tools">
            <Popover
              content={<TagPopover />}
              position="left-top"
            >
              <Button
                alignText="left"
                icon="tag"
                text="Tag"
              />
            </Popover>
            <Popover
              content={<DeadLinePopOver callback={this.uploadDeadLine} />}
              position="left-top"
            >
              <Button
                alignText="left"
                icon="outdated"
                text="Deadline"
              />
            </Popover>
            <Popover
              content={<PopoverContent callback={this.uploadAttachment} />}
              position="left-top"
            >
              <Button
                alignText="left"
                icon="paperclip"
                text="Attachment"
              />
            </Popover>
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
              onClick={this.toggleDeleteCard}
            />
            <DeletePopOver isOpen={deleteCardPopover} action={this.deleteCard} name={task.name} />
          </div>
        </div>
      </div>
    );
  }
}

TaskDetailRight.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default TaskDetailRight;
