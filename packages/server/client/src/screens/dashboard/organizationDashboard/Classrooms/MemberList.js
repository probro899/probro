import React from 'react';
import Popup from '../../../../common/Form/Popup';
import { RoundPicture } from '../../../../components';
import { ENDPOINT } from '../../../../config';
import { FiUsers } from 'react-icons/fi';

const getImage = (userDetail, activeStatus) => {
  const imgUrl = userDetail && userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(userDetail.userId, 10)}/profile/${userDetail.image}` : '/assets//graphics/user.svg';
  return (
    <div className="img-con">
      <img src={imgUrl} alt="user image" />
      {activeStatus && <span className="green-dot" />}
    </div>
  );
};

const getUser = (user, userDetail, activeStatus) => {
  return (
    <div className="class-members-wrapper">
      <ul className="classroom-members">
        <li className="cm-item">
          <div className="cm-image">{getImage(userDetail, true)}</div>
          <div className="cm-name">
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default (props) => {
  const { database, classId, isOpen, onClose } = props;
  const allBoardMembers = Object.values(database.BoardMember.byId).filter(bm => bm.boardId === classId);
  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Members List" icon={<FiUsers size={20} />} >
      {allBoardMembers && allBoardMembers.map(bm => getUser(bm.user.user, bm.user.userDetail, bm.activeStatus))}
    </Popup>
  );
};
