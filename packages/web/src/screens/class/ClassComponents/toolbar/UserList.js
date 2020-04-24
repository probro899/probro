import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover } from '@blueprintjs/core';
import { IoIosMore } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';

const UserDetail = (props) => {
  const { detail } = props;
  return (
    <div style={{ padding: '10px 5px 5px 5px' }}>
      <div style={{ padding: '2px' }}>
        <Link to={`/user/${detail.slug}`}>
          {detail.middleName ? `${detail.firstName} ${detail.middleName} ${detail.lastName}` : `${detail.firstName} ${detail.lastName}`}
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

const AllUsers = ({ userList, boardMembers, boardId, apis, account }) => {
  return (
    <div className="all-users">
      <div className="header">Members</div>
      <div className="user-con">
        {
          Object.values(boardMembers.byId).filter(o => o.boardId === boardId).filter(obj => !obj.deleteStatus && obj.tuserId !== account.user.id).map((o) => {
            return (
              <div className="user">
                <Link to={`/user/${userList.byId[o.tuserId].slug}`}>
                  {userList.byId[o.tuserId].middleName ? `${userList.byId[o.tuserId].firstName} ${userList.byId[o.tuserId].middleName} ${userList.byId[o.tuserId].lastName}` : `${userList.byId[o.tuserId].firstName} ${userList.byId[o.tuserId].lastName}`}
                </Link>
                {userList.byId[o.tuserId].activeStatus && <span className="active" />}
                <div className="remover">
                  <MdDeleteForever onClick={() => deleteBoardMember(o, apis)} />
                </div>
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
  userList: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

class UserList extends React.Component {
  state = {};

  getSmallList = () => {
    const { boardId, boardMembers, userList } = this.props;
    const thisBoardMembers = Object.values(boardMembers.byId).filter(o => o.boardId === boardId).slice(0, 4).filter(o => !o.deleteStatus);
    return thisBoardMembers.map((o, index) => {
      return (
        <Popover
          position="bottom"
          content={<UserDetail detail={userList.byId[o.tuserId]} />}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <div className="i-user">
            {userList.byId[o.tuserId].firstName[0]}
            {userList.byId[o.tuserId].lastName[0]}
            {userList.byId[o.tuserId].activeStatus && <span className="green-dot" />}
          </div>
        </Popover>
      );
    });
  }

  render() {
    const { userList, boardMembers, boardId, apis, account } = this.props;
    return (
      <div className="each-item user-list">
        {this.getSmallList()}
        <Popover
          position="right-top"
          content={
            (
              <AllUsers
                userList={userList}
                boardMembers={boardMembers}
                boardId={boardId}
                apis={apis}
                account={account}
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
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserList;
