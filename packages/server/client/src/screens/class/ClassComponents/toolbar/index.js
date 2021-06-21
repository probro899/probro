import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoGraph } from 'react-icons/go';
import * as actions from '../../../../actions';
import UserList from './UserList';
import AddUser from './add-user';
import Report from '../../report';
import { Button } from '../../../../common/utility-functions/Button/Button';
import { getDeviceType } from '../../../../common/utility-functions';
import { Tooltip } from '../../../../common/Form/Tooltip';
import { AiFillMessage } from "react-icons/ai";
import AppointmentDetail from '../../appointment/AppointmentDetail';
import { sortAppointmentAsc } from '../../../../common/utility-functions/sortAppointments';

class ToolBar extends React.Component {
  state = { showReport: null };

  toggleAddUser = () => {
    const { addUser } = this.state;
    this.setState({ addUser: !addUser });
  }

  onChat = () => {
    const { updateWebRtc, boardId, webRtc } = this.props;
    if (!webRtc.localCallHistory.callType) {
      updateWebRtc('showCommunication', boardId);
      updateWebRtc('peerType', 'board');
      updateWebRtc('communicationContainer', 'history');
      updateWebRtc('minimize', false);
      updateWebRtc('chatHistory', { type: 'board', user: { user: null }, connectionId: boardId });
    }
  }

  generateReportHandler = () => this.setState({ showReport: window.location.pathname });
  reportCloseHandler = () => this.setState({ showReport: null });

  render() {
    const { boards, boardId, users, boardMembers, account, apis, database, UserDetail } = this.props;
    const extUser = Object.values(UserDetail.byId).find(obj => obj.userId === account.user.id);
    const board = Object.values(boards.byId).find(obj => obj.id === boardId);
    const { showReport } = this.state;
    const appointment = board.appointments.filter(o => o.startDate > Date.now()).sort(sortAppointmentAsc)[0];
    return (
      <div className="tool-bar">
        <Report isOpen={showReport} onClose={this.reportCloseHandler} boardId={boardId} {...this.props} boards={boards} apis={apis} users={users} />
        <div className="pc-board-name-mobile">{board.name}</div>
        <div className="toolbar-container">
          <div className="left-tools">
            <div className="class-name each-item">{board.name}</div>
            <UserList extUser={extUser} userList={users} boardId={boardId} boardMembers={boardMembers} apis={apis} account={account} />
          </div>
          <div className="right-tools">
            <Tooltip content={<span>Add user to this class</span>}>
              <AddUser
                apis={apis}
                users={database.User.byId}
                connections={Object.values(database.UserConnection.byId)}
                account={account}
                boardId={boardId}
              />
            </Tooltip>
            <Tooltip
              content={<span>Chat</span>}
            >
              <Button
                onClick={this.onChat}
                icon={<AiFillMessage size={15} />}
                type="button"
                buttonStyle="btn-circle"
                buttonSize="btn--small"
              />
            </Tooltip>
            {getDeviceType() === 'Desktop' &&
              (<Tooltip
                content={<span>Generate Report</span>}
              >
                <Button
                  onClick={this.generateReportHandler}
                  icon={<GoGraph size={15} />}
                  type="button"
                  buttonStyle="btn-circle"
                  buttonSize="btn--small"
                />
              </Tooltip>)
            }
          </div>
          {appointment && <AppointmentDetail appointment={appointment} />}
        </div>
      </div>
    );
  }
}

ToolBar.propTypes = {
  boards: PropTypes.objectOf(PropTypes.any).isRequired,
  boardId: PropTypes.number.isRequired,
  users: PropTypes.objectOf(PropTypes.any).isRequired,
  UserDetail: PropTypes.objectOf(PropTypes.any).isRequired,
  boardMembers: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { database, account, webRtc } = state;
  return {
    boards: database.Board,
    UserDetail: database.UserDetail,
    users: database.User,
    boardMembers: database.BoardMember,
    account,
    database,
    webRtc,
  };
};
export default connect(mapStateToProps, { ...actions })(ToolBar);
