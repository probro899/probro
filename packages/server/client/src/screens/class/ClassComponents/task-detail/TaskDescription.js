import React, { useState } from 'react';
import _ from 'lodash';
import { MdEdit } from "react-icons/md";
import { Button } from '../../../../common/utility-functions/Button/Button';
import { FormTextArea } from '../../../../common/Form/FormTextArea';
import formatDescription from './helper-functions/formatDescription';

const Description = ({ account, task, description, apis, updateDatabaseSchema, addDatabaseSchema, boardId }) => {
  const [taskDescription, onChange] = useState(description ? description.title : '');
  const [isEdit, toggleEdit] = useState(false);
  const changed = (e) => {
    if (e.keyCode === 13) {
      onChange(e.target.value + "\n");
    } else {
      onChange(e.target.value);
    }
  };

  const saveDescription = async () => {
    try {
      const obj = {
        boardColumnCardId: task.id,
        title: taskDescription,
        timeStamp: Date.now(),
        userId: account.user.id,
      };
      if (!description || (description && description.id && _.isString(description.id))) {
        const res = await apis.addBoardColumnCardDescription({ ...obj, broadCastId: `Board-${boardId}` });
        addDatabaseSchema('BoardColumnCardDescription', { ...obj, id: res });
        updateDatabaseSchema('BoardColumnCard', { id: task.id, description: { ...obj, id: res } });
        toggleEdit(false);
      } else {
        const res = await apis.updateBoardColumnCardDescription([{ ...obj, broadCastId: `Board-${boardId}` }, { id: description.id }]);
        updateDatabaseSchema('BoardColumnCardDescription', { ...obj, id: description.id });
        toggleEdit(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getDescription = () => {
    return formatDescription(taskDescription);
  };

  return (
    <div className="overlay-description">
      <div className="desc-head">
        <span>Description</span>
        {!isEdit && <div className="edit-icon">
          <MdEdit size={20} onClick={() => toggleEdit(true)} />
        </div>
        }
      </div>
      <div className="desc">
        {isEdit ? <> <FormTextArea resizable spellCheck value={taskDescription} className="pc-text-area" onChange={changed} /><span className="buttons-group">
          <Button type="button" buttonStyle="btn--primary--solid" buttonSize="btn--small" title="save" onClick={saveDescription}
          />
          <Button type="button" buttonStyle="btn--danger--outline" buttonSize="btn--small" title="cancel" onClick={() => toggleEdit(false)}
          />
        </span>  </> : getDescription()}
      </div>
    </div>
  );
};

export default Description;
