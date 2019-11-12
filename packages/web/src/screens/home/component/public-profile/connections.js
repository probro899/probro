import React from 'react';
import { Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import ConnectionElement from './ConnectionElement';

class Connections extends React.Component {
  state = {
    type: '',
  };

  componentDidMount() {
    this.checkConnection(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkConnection(nextProps);
  }

  sendMessage = async () => {
    const { updateWebRtc, details, database } = this.props;

    const connectionId = Object.values(database.UserConnection.byId).find(con => con.mId === details.id || con.userId === details.id);
    console.log('Connetion id', connectionId);
    updateWebRtc('showCommunication', details.id);
    updateWebRtc('connectionId', connectionId.id);
    updateWebRtc('peerType', 'user');
    updateWebRtc('communicationContainer', 'history');
  }

  connectMentor = async (type) => {
    const { apis, account, details, database } = this.props;
    const userId = account.user.id;
    const guestId = details.id;
    let existingCon = null;
    database.UserConnection.allIds.map((id) => {
      const obj = database.UserConnection.byId[id];
      if ((userId === obj.userId
        || userId === obj.mId)
        && (guestId === obj.userId || guestId === obj.mId)) {
        existingCon = obj;
      }
    });
    switch (type) {
      case 'request':
        if (existingCon) {
          await apis.updateUserConnection([{
            userId: account.user.id,
            mId: details.id,
            status: 'pending',
          }, { id: existingCon.id }]);
        } else {
          await apis.connectUser({
            userId: account.user.id,
            mId: details.id,
            timeStamp: Date.now(),
            status: 'pending',
          });
        }
        this.setState({
          type: 'pending',
        });
        break;
      case 'accept':
        await apis.updateUserConnection([{
          status: 'connected',
          mId: existingCon.mId,
          userId: existingCon.userId,
        }, { id: existingCon.id }]);
        this.setState({
          type: 'connected',
        });
        break;
      default:
    }
  }

  checkConnection = (props) => {
    const { database, details, account } = props;
    const userId = account.user.id;
    const guestId = details.id;
    let type = '';
    database.UserConnection.allIds.map((id) => {
      const obj = database.UserConnection.byId[id];
      if ((userId === obj.userId
        || userId === obj.mId)
        && (guestId === obj.userId || guestId === obj.mId)) {
        if (obj.status === 'connected') {
          type = 'connected';
          return;
        }
        if (userId === obj.userId) {
          type = 'pending';
        } else {
          type = 'incoming';
        }
      }
    });
    this.setState({
      type,
    });
  };

  render() {
    const { moreDetails } = this.props;
    const { type } = this.state;
    return (
      <div className="con">
        {ConnectionElement({
          sendMessage: this.sendMessage,
          connectMentor: this.connectMentor,
          type,
        })}
        { moreDetails && moreDetails.type === 'mentor'
          && (
          <Button
            text="Follow"
            fill
            large
          />
          )
        }
      </div>
    );
  }
}

Connections.propTypes = {
  updateWebRtc: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  moreDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Connections;
