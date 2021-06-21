import React from 'react';
import moment from 'moment';
import { AiOutlineFieldTime } from 'react-icons/ai';
import Popover from '../../../../common/Popover';
import { Form } from '../../../../common';
import { Button } from '../../../../common/utility-functions/Button/Button';

const DeadLinePopOver = ({ callback, deadline }) => {
  let structure = [
    { id: 'deadline', val: moment(deadline), fieldtype: 'date', name: 'Deadline', required: true },
    { id: 'submit', fieldtype: 'button', type: 'submit' },
  ];

  return (
    <div className="pc-task-deadline">
      <Form callback={callback} data={structure} />
      <div className="remove-btn">
        {
          deadline && (
            <Button
              onClick={() => callback({ deadline: null })}
              title="Remove"
              buttonStyle="btn--danger--outline"
            />
          )
        }
      </div>
    </div>
  );
};

export default ({ screenWidth, uploadDeadLine, task }) => {
  return (
    <Popover
      yAlign="bottom"
      xAlign="right"
      hPosition={screenWidth < 580 ? "center" : "left"}
      content={<DeadLinePopOver deadline={task.Deadline} callback={uploadDeadLine} />}
    >
      <Button
        icon={<AiOutlineFieldTime />}
        title="Deadline"
        type="button"
        buttonStyle="btn--primary--outline"
        buttonSize="btn--medium"
      />
    </Popover>
  )
}
