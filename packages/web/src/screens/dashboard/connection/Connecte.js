import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { RoundPicture } from '../../../components';
import { ENDPOINT } from '../../../config';

const icon = require('../../../assets/icons/64w/uploadicon64.png');

class Connecte extends React.Component {
  state = { loading: false };

  getImage = (userDetail, user) => {
    const imgUrl = userDetail && userDetail.image ? `${ENDPOINT}/user/${10000000 + parseInt(userDetail.userId, 10)}/profile/${userDetail.image}` : icon;
    return (
      <div className="img-con">
        <RoundPicture imgUrl={imgUrl} />
        {user.activeStatus && <span className="green-dot" />}
      </div>
    );
  }

  sendMessage = () => {
    const { updateWebRtc, id, database, account, connection } = this.props;
    updateWebRtc('showCommunication', id);
    updateWebRtc('peerType', 'user');
    updateWebRtc('communicationContainer', 'history');
    updateWebRtc('connectionId', connection.id);
    const user = connection.userId === account.user.id ? database.User.byId[connection.mId] : database.User.byId[connection.userId];
    updateWebRtc('chatHistory', { type: 'user', user: { user }, connectionId: connection.id });
  };

  deleteRequest = async () => {
    const { id, apis, deleteDatabaseSchema, connection } = this.props;
    this.setState({ loading: true });
    await apis.deleteUserConnection({ id });
    deleteDatabaseSchema('UserConnection', { id: connection.id });
    this.setState({ loading: false });
  };

  acceptRequest = async () => {
    const { apis, updateDatabaseSchema, connection } = this.props;
    this.setState({ loading: true });
    await apis.updateUserConnection([{ status: 'connected', mId: connection.mId, userId: connection.userId }, { id: connection.id }]);
    updateDatabaseSchema('UserConnection', { id: connection.id, status: 'connected' });
    this.setState({ loading: false });
  };

  getConfigButtons = () => {
    const { account, connection } = this.props;
    const { loading } = this.state;
    if (account.user.id === connection.userId) {
      if (connection.status === 'pending') {
        return (
          <div className="con-buttons">
            <Button text="Requested" icon="follower" onClick={this.deleteRequest} />
          </div>
        );
      }
    }
    if (connection.status === 'pending') {
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
    const { id, database } = this.props;
    const user = database.User.byId[id];
    const userDetail = Object.values(database.UserDetail.byId).find(obj => id === obj.userId);
    return (
      <div className="i-result">
        {
          this.getImage(userDetail, user)
        }
        <div className="desc-con">
          <p className="name">
            {
            }
            <Link to={`/user/${user.slug}/`}>
              {user.middleName ? `${user.firstName} ${user.middleName} ${user.lastName}` : `${user.firstName} ${user.lastName}`}
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
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  connection: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteDatabaseSchema: PropTypes.func.isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
};


export default Connecte;
