import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popover } from '@blueprintjs/core';
import { IoIosMore } from 'react-icons/io';

const UserDetail = (props) => {
  const { detail } = props;
  return (
    <div
      style={{ padding: '10px 5px 5px 5px' }}
    >
      <div
        style={{ padding: '2px' }}
      >
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

const AllUsers = ({ userList, boardMembers, boardId }) => {
  return (
    <div
      style={{
        padding: '10px 0px 5px 0px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{ fontWeight: 600, padding: '2px' }}
      >
        <span>Members</span>
      </div>
      <div
        style={{
          padding: '2px',
        }}
      >
        {
          Object.values(boardMembers.byId).filter(o => o.boardId === boardId).map((o) => {
            return (
              <div
                style={{
                  padding: '5px',
                  position: 'relative',
                }}
              >
                <Link style={{ marginLeft: 10, marginRight: 10 }} to={`/user/${userList.byId[o.tuserId].slug}`}>
                  {userList.byId[o.tuserId].middleName ? `${userList.byId[o.tuserId].firstName} ${userList.byId[o.tuserId].middleName} ${userList.byId[o.tuserId].lastName}` : `${userList.byId[o.tuserId].firstName} ${userList.byId[o.tuserId].lastName}`}
                </Link>
                {
                userList.byId[o.tuserId].activeStatus && (
                  <span
                    style={{
                      position: 'absolute',
                      height: 10,
                      width: 10,
                      backgroundColor: 'green',
                      borderRadius: '50%',
                      top: 8,
                      left: 0,
                    }}
                  />
                )
                }
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
};

class UserList extends React.Component {
  state = {};

  getSmallList = () => {
    const { boardId, boardMembers, userList } = this.props;
    const thisBoardMembers = Object.values(boardMembers.byId).filter(o => o.boardId === boardId).slice(0, 4);
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
    const { userList, boardMembers, boardId } = this.props;
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
};

export default UserList;
