import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiMoreHorizontal } from 'react-icons/fi';
import { getName } from '../../../common/utility-functions';
import { DeletePopOver } from '../../../common';
import { RoundPicture } from '../../../components';
import { ENDPOINT } from '../../../config';
import { Button } from '../../../common/utility-functions/Button/Button';
import { BiMessageAlt } from "react-icons/bi";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import Popover from '../../../common/Popover';

const DeleteButtonContainer = ({ callback }) => {
  return (
    <div className="pc-del-btn">
      <Button
        onClick={callback}
        type="button"
        buttonStyle="btn--danger--solid"
        buttonSize="btn--small"
        title="Remove"
      />
    </div>
  );
};

class Connecte extends React.Component {
  state = { loading: false, isOpen: false, deletePopover: false };

  getImage = (userDetail, user, activeStatus) => {
    const imgUrl = userDetail && userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(userDetail.userId, 10)}/profile/${userDetail.image}` : '/assets//graphics/user.svg';
    return (
      <div className="img-con">
        <RoundPicture imgUrl={imgUrl} />
        {activeStatus && <span className="green-dot" />}
      </div>
    );
  }

  sendMessage = () => {
    const { updateWebRtc, id, user, webRtc } = this.props;
    if (!webRtc.localCallHistory.callType) {
      updateWebRtc('showCommunication', id);
      updateWebRtc('peerType', 'user');
      updateWebRtc('communicationContainer', 'history');
      updateWebRtc('connectionId', id);
      updateWebRtc('chatHistory', { type: 'user', user: { user: user.user, userDetails: user.userDetail }, connectionId: id });
    }
  };

  deleteRequest = async () => {
    const { id, apis, deleteDatabaseSchema } = this.props;
    this.setState({ loading: true });
    await apis.deleteUserConnection({ id });
    deleteDatabaseSchema('UserConnection', { id });
    this.setState({ loading: false });
  };

  acceptRequest = async () => {
    const { apis, updateDatabaseSchema, id, userId, mId } = this.props;
    this.setState({ loading: true });
    await apis.updateUserConnection([{ status: 'connected', mId, userId }, { id }]);
    updateDatabaseSchema('UserConnection', { id, status: 'connected' });
    this.setState({ loading: false });
  };

  removeConnection = async (e) => {
    if (e === 'confirm') {
      const { apis, updateDatabaseSchema, id, userId, mId } = this.props;
      await apis.updateUserConnection([{ status: 'deleted', mId, userId }, { id }]);
      updateDatabaseSchema('UserConnection', { id, status: 'deleted' });
    }
    this.setState({ deletePopover: false, isOpen: false });
  }

  getConfigButtons = () => {
    const { account, userId, status } = this.props;
    const { loading } = this.state;
    if (account.user.id === userId) {
      if (status === 'pending') {
        return (
          <div className="con-buttons">
            <Button
              title="pending"
              // onClick={this.deleteRequest}
              buttonSize="btn--small"
            />
            <Button
              title="cancel"
              buttonSize="btn--small"
              loading={loading}
              buttonStyle="btn--danger--outline"
              onClick={this.deleteRequest}
            />
          </div>
        );
      }
    }
    if (status === 'pending') {
      return (
        <div className="con-buttons">
          <Button
            onClick={this.deleteRequest}
            type="button"
            buttonStyle="btn--danger--outline"
            buttonSize="btn--small"
            loading={loading}
            title="Decline"
            icon={<RiUserUnfollowFill />}
          />
          <Button
            onClick={this.acceptRequest}
            type="button"
            buttonStyle="btn--success--outline"
            buttonSize="btn--small"
            loading={loading}
            title="Accept"
            icon={<RiUserFollowFill />}
          />
        </div>
      );
    }
    return (
      <div className="con-buttons">
        {/* <Button text="Message" icon="chat" onClick={this.sendMessage} /> */}
        <Button
          onClick={this.sendMessage}
          type="button"
          buttonStyle="btn--primary--outline"
          buttonSize="btn--small"
          loading={false}
          disabled={false}
          title="Message"
          icon={<BiMessageAlt />}
        />
        <Popover
          content={<DeleteButtonContainer callback={this.toggleDeletePopover} />}
          vPosition="top"
          hPosition="left"
          xAlign="right"
          yAlign="top"
        >
          <div className="add-user-btn"  >
            <div className="pc-rm-btn">
              <FiMoreHorizontal size={30} color="#1d4354" />
            </div>
          </div>
        </Popover>
      </div >
    );
  }

  tooggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    })
  }

  toggleDeletePopover = () => {
    const { deletePopover } = this.state;
    this.setState({ deletePopover: !deletePopover });
  }

  render() {
    const { user, activeStatus } = this.props;
    const { userDetail } = user;
    const { deletePopover } = this.state;
    return (
      <div className="i-wrapper">
        <DeletePopOver
          isOpen={deletePopover}
          action={this.removeConnection}
          name={`${user.user.firstName} as your connection`}
        />
        <div className="i-result">
          {this.getImage(userDetail, user, activeStatus)}
          <div className="desc-con">
            <p className="name">
              {
              }
              <Link to={`/user/${user.user.slug}/`}>
                {getName(user.user)}
              </Link>
            </p>
            <p className="position">{userDetail && userDetail.headLine}</p>
            <p className="location">{userDetail && userDetail.address ? userDetail.address : 'Kathmandu, Nepal'}</p>
            <div className="con-config">{this.getConfigButtons()}</div>
          </div>
        </div>
      </div>
    );
  }
}

Connecte.propTypes = {
  id: PropTypes.number.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  userId: PropTypes.number.isRequired,
  mId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};


export default Connecte;
