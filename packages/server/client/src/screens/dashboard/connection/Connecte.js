import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { getName } from '../../../common/utility-functions';
import { RoundPicture } from '../../../components';
import { ENDPOINT } from '../../../config';

class Connecte extends React.Component {
  state = { loading: false };

  getImage = (userDetail, user, activeStatus) => {
    const imgUrl = userDetail && userDetail.image ? `${ENDPOINT}/assets/user/${10000000 + parseInt(userDetail.userId, 10)}/profile/${userDetail.image}` : '/assets/icons/64w/uploadicon64.png';
    return (
      <div className="img-con">
        <RoundPicture imgUrl={imgUrl} />
        {activeStatus && <span className="green-dot" />}
      </div>
    );
  }

  sendMessage = () => {
    const { updateWebRtc, id, user } = this.props;
    updateWebRtc('showCommunication', id);
    updateWebRtc('peerType', 'user');
    updateWebRtc('communicationContainer', 'history');
    updateWebRtc('connectionId', id);
    // connection.userId === account.user.id ? database.User.byId[connection.mId] : database.User.byId[connection.userId];
    updateWebRtc('chatHistory', { type: 'user', user: { user: user.user, userDetails: user.userDetail }, connectionId: id });
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

  getConfigButtons = () => {
    const { account, userId, status } = this.props;
    const { loading } = this.state;
    if (account.user.id === userId) {
      if (status === 'pending') {
        return (
          <div className="con-buttons">
            <Button text="Requested" icon="follower" onClick={this.deleteRequest} />
          </div>
        );
      }
    }
    if (status === 'pending') {
      return (
        <div className="con-buttons">
          <Button
            text="Decline"
            icon="delete"
            intent="danger"
            loading={loading}
            disabled={loading}
            onClick={this.deleteRequest}
          />
          <Button
            loading={loading}
            disabled={loading}
            text="Accept"
            icon="following"
            className="pc-accept"
            intent="success"
            onClick={this.acceptRequest}
          />
        </div>
      );
    }
    return (
      <div className="con-buttons">
        <Button text="Message" icon="chat" onClick={this.sendMessage} />
      </div>
    );
  }

  render() {
    const { user, activeStatus } = this.props;
    // const user = database.User.byId[id];
    const { userDetail } = user;
    return (
      <div className="i-result">
        {
          this.getImage(userDetail, user, activeStatus)
        }
        <div className="desc-con">
          <p className="name">
            {
            }
            <Link to={`/user/${user.user.slug}/`}>
              {getName(user.user)}
            </Link>
          </p>
          <p className="location">{userDetail && userDetail.address ? userDetail.address : '---'}</p>
          <div className="con-config">
            {
              this.getConfigButtons()
            }
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
