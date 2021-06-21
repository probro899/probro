import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import Popover from '../../../../common/Popover';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { HiCheck } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import { getName, getProfileImage } from '../../../../common/utility-functions';

const Participants = ({ participants, members, addParticipant }) => {
  const [loading, setLoading] = useState(false);
  const participantIds = participants.map(o=>o.participantId);

  const onClick = async (item) => {
    if (loading) return;
    setLoading(true);
    const res = await addParticipant(participantIds.includes(item.id) ? 'delete' : 'add', item.id)
    if (res) setLoading(false);
  }

  return (
    <div className="participant-section">
      <div className="header-title">Member Name</div>
      <div className="participant-list">
        <ul className="p-list">
          {
            members && members.map((item, idx) => (
              <li className="list-item" key={`part-${idx}`} onClick={() => onClick(item)}>
                <figure className="image">
                  <img src={getProfileImage(item.user.userDetail)} alt={item.user.user.firstName} />
                </figure>
                <p className="name">{getName(item.user.user)}</p>
                {participantIds.includes(item.id) && <IconContext.Provider value={{ color: '#000', className: 'tag-icon' }}>
                    <HiCheck size={20} />
                  </IconContext.Provider>
                }
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default ({ task, account, apis, classId, screenWidth, participants, deleteDatabaseSchema, addDatabaseSchema,  members }) => {
  const addParticipant = async (type, boardMemberId) => {
    if (type === 'add') {
      const data = {
        taskId: task.id,
        userId: account.user.id,
        participantId: boardMemberId, // boardMemberId
        broadCastId: `Board-${classId}`,
      }
      const res = await apis.addTaskParticipant(data);
      addDatabaseSchema('TaskParticipant', { ...data, id: res });
      return { success: true };
    }
    let participantId = participants.find(o => o.participantId === boardMemberId).id;
    await apis.deleteTaskParticipant({
      id: participantId,
      taskId: task.id,
      broadCastId: `Board-${classId}`,
    });
    deleteDatabaseSchema('TaskParticipant', { id: participantId });
    return { success: true };
  }
  return (
    <Popover
      yAlign="bottom"
      xAlign={screenWidth < 580 ? "left" : "right"}
      hPosition={screenWidth < 580 ? "right" : "left"}
      content={<Participants
          addParticipant={addParticipant}
          members={members}
          participants={participants}
          addTag={addParticipant}
        />
      }
    >
      <Button
        type="button"
        buttonStyle="btn--primary--outline"
        buttonSize="btn--medium"
        title="Participants"
        icon={<BiUser />}
      />
    </Popover>
  );
}
