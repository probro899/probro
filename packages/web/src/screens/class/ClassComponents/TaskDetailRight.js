import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, Tag } from '@blueprintjs/core';
import Form from '../../../common/Form';
import DeletePopOver from '../../../common/DeletePopOver';
import Attachment from './Attachment';
import SelectColumn from './SelectColumn';

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

  uploadDeadLine = async (data) => {
    const { apis, task, updateDatabaseSchema, boardId } = this.props;
    const deadline = new Date(data.deadline).getTime();
    await apis.updateBoardColumnCard([{ Deadline: deadline, broadCastId: `Board-${boardId}` }, { id: task.id }]);
    updateDatabaseSchema('BoardColumnCard', { id: task.id, Deadline: deadline });
    return { response: 200, message: 'Deadline added' };
  }

  copyCard = async (arg) => {
    const {
      apis,
      account,
      addDatabaseSchema,
      description,
      attachments,
      task,
      tags,
    } = this.props;
    console.log(this.props);
    try {
      const res = await apis.copyBoardColumnCard({
        card: { ...task, userId: account.user.id, timStamp: Date.now() },
        description: { ...description, userId: account.user.id, timStamp: Date.now() },
        attachments: attachments.map(obj => ({ ...obj, userId: account.user.id, timStamp: Date.now() })),
        tags: tags.map(obj => ({ ...obj, userId: account.user.id })),
        boardId: arg.class,
        columnId: arg.column,
      });
      console.log(res);
      return { response: 200, message: 'Copied!' };
    } catch (e) {
      return { response: 400, error: 'Could not copy' };
    }
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
    const {
      task, tags, addDatabaseSchema, apis,
      account,
      boardId,
      database,
    } = this.props;
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
              content={(
                <Attachment
                  boardId={boardId}
                  account={account}
                  task={task}
                  apis={apis}
                  addDatabaseSchema={addDatabaseSchema}
                />
              )}
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
            <Popover content={<SelectColumn callback={this.copyCard} database={database} />}>
              <Button
                alignText="left"
                icon="move"
                text="Copy"
              />
            </Popover>
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
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
};

export default TaskDetailRight;
