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

const TagPopover = ({ tags, addTag }) => {
  const tagNames = ['primary', 'warning', 'success', 'danger'];
  return (
    <div style={{ padding: '5px', minWidth: '250px' }}>
      <div style={{ padding: '5px', textAlign: 'center', fontSize: '15px', fontWeight: 'bold' }}>
        <span>Select Tags</span>
      </div>
      <div>
        {
          tagNames.map((type, index) => {
            let tick = false;
            tags.map((obj) => {
              if (obj.tag === type) {
                tick = true;
              }
            });
            return (
              <Tag
                key={index}
                onClick={() => addTag(type, tick)}
                fill
                large
                intent={type}
                interactive
                style={{ margin: '5px 0px' }}
                icon={tick ? 'tick' : null}
              />
            );
          })
        }
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
    // console.log(id, file);
  }

  uploadDeadLine = async (data) => {
    const { apis, task, updateDatabaseSchema, boardId } = this.props;
    const deadline = new Date(data.deadline).getTime();
    await apis.updateBoardColumnCard([{ Deadline: deadline, broadCastId: `Board-${boardId}` }, { id: task.id }]);
    updateDatabaseSchema('BoardColumnCard', { id: task.id, Deadline: deadline });
    return { response: 200, message: 'Deadline added' };
  }

  addTag = async (name, aord) => {
    const {
      task, apis, tags, addDatabaseSchema,
      deleteDatabaseSchema,
      boardId,
    } = this.props;
    if (aord) {
      let tag;
      tags.map((obj) => {
        if (obj.tag === name) {
          tag = obj;
        }
      });
      await apis.deleteBoardColumnCardTag({
        broadCastId: `Board-${boardId}`,
        id: tag.id,
      });
      deleteDatabaseSchema('BoardColumnCardTag', { id: tag.id });
      return;
    }
    const res = await apis.addBoardColumnCardTag({
      broadCastId: `Board-${boardId}`,
      boardColumnCardId: task.id,
      tag: name,
    });
    addDatabaseSchema('BoardColumnCardTag', { id: res, tag: name, boardColumnCardId: task.id });
  }

  deleteCard = async (type) => {
    const {
      apis,
      deleteDatabaseSchema,
      boardId,
      task,
      onClose,
    } = this.props;
    if (type === 'confirm') {
      this.toggleDeleteCard();
      await apis.deleteBoardColumnCard({ id: task.id, broadCastId: `Board-${boardId}` });
      deleteDatabaseSchema('BoardColumnCard', { id: task.id });
      onClose();
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
    const { task, tags } = this.props;
    return (
      <div className="right">
        <div className="rt-in">
          <div style={{ padding: '5px' }}>
            <span style={{ color: '#696969' }}>Tools</span>
          </div>
          <div className="rt-tools">
            <Popover
              content={<TagPopover addTag={this.addTag} tags={tags} />}
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
              text="Copy"
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
  tags: PropTypes.arrayOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  boardId: PropTypes.number.isRequired,
};

export default TaskDetailRight;
