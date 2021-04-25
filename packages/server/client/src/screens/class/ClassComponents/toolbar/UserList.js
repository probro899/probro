import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { getName } from '../../../../common/utility-functions';
import Popover from '../../../../common/Popover';

const UserDetail = (props) => {
  const { detail } = props;
  return (
    <div style={{ padding: '10px 5px 5px 5px' }}>
      <div style={{ padding: '2px' }}>
        <Link to={`/user/${detail.user.slug}`}>
          {detail.user.middleName ? `${detail.user.firstName} ${detail.user.middleName} ${detail.user.lastName}` : `${detail.user.firstName} ${detail.user.lastName}`}
        </Link>
      </div>
    </div>
  );
};

UserDetail.propTypes = {
  detail: PropTypes.objectOf(PropTypes.any).isRequired,
};

const deleteBoardMember = (record, apis) => {
  try {
    apis.deleteBoardMember({ boardId: record.boardId, userId: record.tuserId, id: record.id });
  } catch (e) {
    console.error('Error in delete class member', e);
  }
};

const AllUsers = ({ extUser, boardMembers, boardId, apis, account }) => {
  return (
    <div className="all-users">
      <div className="header">Members</div>
      <div className="user-con">
        {
          Object.values(boardMembers.byId).filter(o => o.boardId === boardId).filter(obj => !obj.deleteStatus && obj.tuserId !== account.user.id).map((o) => {
            return (
              <div className="user" key={`user-${o.id}`}>
                <Link to={`/user/${o.user.user.slug}`}>
                  {getName(o.user.user)}
                </Link>
                {o.activeStatus && <span className="active" />}
                {extUser && extUser.type === 'mentor' && (
                  <div className="remover">
                    <MdDeleteForever onClick={() => deleteBoardMember(o, apis)} />
                  </div>
                )}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

AllUsers.propTypes = {
  boardMembers: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  extUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

class UserList extends React.Component {
  state = {};

  getSmallList = () => {
    const { boardId, boardMembers } = this.props;
    const thisBoardMembers = Object.values(boardMembers.byId).filter(o => o.boardId === boardId).slice(0, 4).filter(o => !o.deleteStatus);
    return thisBoardMembers.map((o, index) => {
      return (
        <Popover
          hPosition="right"
          content={<UserDetail detail={o.user} />}
          key={index}
        >
          <div className="i-user">
            {o.user.user.firstName[0]}
            {o.user.user.lastName[0]}
            {o.activeStatus && <span className="green-dot" />}
          </div>
        </Popover>
      );
    });
  }

  render() {
    const { userList, boardMembers, boardId, extUser, apis, account } = this.props;
    return (
      <div className="each-item user-list">
        {this.getSmallList()}
        <Popover
          hPosition="center"
          content={
            (
              <AllUsers
                userList={userList}
                boardMembers={boardMembers}
                boardId={boardId}
                apis={apis}
                account={account}
                extUser={extUser}
              />
          )
        }
        >
          <div className="i-user">
            <IoIosMore size={18} />
          </div>
        </Popover>
      </div>
    );
  }
}

UserList.propTypes = {
  boardMembers: PropTypes.objectOf(PropTypes.any).isRequired,
  userList: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  extUser: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserList;
