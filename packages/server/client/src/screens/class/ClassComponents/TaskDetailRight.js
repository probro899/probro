import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '../../../common';
import DeletePopOver from '../../../common/DeletePopOver';
import { Attachment } from './attachment';
import SelectColumn from './SelectColumn';
import { Button } from '../../../common/utility-functions/Button/Button';
import { AiOutlineTags, AiOutlineFieldTime, AiOutlinePaperClip, AiFillCopy, AiTwotoneDelete } from "react-icons/ai";
import Tag from '../../../common/Tag';
import Popover from '../../../common/Popover';

const TagPopover = ({ tags, addTag }) => {
  const tagNames = ['red', 'green', 'blue','yellow'];
  return (
    <div style={{ padding: '5px', minWidth: '250px' }}>
      <div style={{ padding: '5px', textAlign: 'center', fontSize: '15px', fontWeight: 'bold' }}>
        <span>Select Tags</span>
      </div>
      <div className="tagform">
        {
        tagNames.map((obj, index) => {
            const tick = tags.find(o => o.tag === obj);
            return (
              <Tag
                type="flat"
                color={obj}
                tick={tick}
                key={index}
                onClick={() => addTag(obj, tick)}
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
      description,
      attachments,
      task,
      tags,
    } = this.props;
    try {
      await apis.copyBoardColumnCard({
        card: { ...task, userId: account.user.id, timeStamp: Date.now() },
        description: description && { ...description, userId: account.user.id, timeStamp: Date.now() },
        attachments: attachments.map(obj => ({ ...obj, userId: account.user.id, timeStamp: Date.now() })),
        tags: tags.map(obj => ({ ...obj, userId: account.user.id })),
        boardId: arg.class,
        columnId: arg.column,
      });
      return { response: 200, message: 'Copied!' };
    } catch (e) {
      return { response: 400, error: 'Could not copy' };
    }
  }

  addTag = async (name, aord) => {
    const {
      task, apis, tags, addDatabaseSchema,
      deleteDatabaseSchema,
      account,
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
        cardId: task.id,
      });
      deleteDatabaseSchema('BoardColumnCardTag', { id: tag.id });
      return;
    }
    const res = await apis.addBoardColumnCardTag({
      broadCastId: `Board-${boardId}`,
      userId: account.user.id,
      boardColumnCardId: task.id,
      tag: name,
    });
    addDatabaseSchema('BoardColumnCardTag', { id: res, userId: account.user.id, tag: name, boardColumnCardId: task.id });
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
    // console.log('screen width', this.getScreenWidth());
    const screenWidth = screen.width;
    const { deleteCardPopover } = this.state;
    const {
      task, tags, addDatabaseSchema, apis,
      account,
      boardId,
      database,
    } = this.props;
    return (
      <div className="right-part">
        <div className="rt-in">
          <div className="tool-header">Tools</div>
          <div className="rt-tools">
            <Popover
              yAlign="bottom"
              xAlign={screenWidth < 580 ? "left" : "right"}
              hPosition={screenWidth < 580 ? "right" : "left"}
              content={<TagPopover addTag={this.addTag} tags={tags} />}
            >
              <Button
                type="button"
                buttonStyle="btn--primary--outline"
                buttonSize="btn--medium"
                title="Tag"
                icon={<AiOutlineTags />}
              />
            </Popover>
            <Popover
              yAlign="bottom"
              xAlign="right"
              hPosition={screenWidth < 580 ? "center" : "left"}
              content={<DeadLinePopOver callback={this.uploadDeadLine} />}
            >
              <Button
                icon={<AiOutlineFieldTime />}
                title="Deadline"
                type="button"
                buttonStyle="btn--primary--outline"
                buttonSize="btn--medium"
              />
            </Popover>
            <Popover
              yAlign="bottom"
              xAlign={screenWidth < 430 ? "left" : "right"}
              hPosition={screenWidth < 430 ? "right" : "left"}
              content={(
                <Attachment
                  boardId={boardId}
                  account={account}
                  task={task}
                  apis={apis}
                  addDatabaseSchema={addDatabaseSchema}
                  database={database}
                />
              )}
            >
              <Button
                icon={<AiOutlinePaperClip />}
                title="Attachment"
                type="button"
                buttonStyle="btn--primary--outline"
                buttonSize="btn--medium"
              />
            </Popover>
          </div>
          <div className="tool-header">Actions</div>
          <div className="rt-actions">
            <Popover
              content={<SelectColumn callback={this.copyCard} database={database} />}
              yAlign="top"
              xAlign={screenWidth < 580 ? "right" : "left"}
              vPosition="center"
              hPosition={screenWidth < 580 ? "right": "left"}
            >
              <Button
                icon={<AiFillCopy />}
                title="Copy"
                type="button"
                buttonStyle="btn--primary--outline"
                buttonSize="btn--medium"
              />
            </Popover>
            <Button
              icon={<AiTwotoneDelete />}
              title="Delete"
              onClick={this.toggleDeleteCard}
              type="button"
              buttonStyle="btn--danger--outline"
              buttonSize="btn--medium"
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
  database: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TaskDetailRight;
