/* eslint-disable no-case-declarations */
import React from 'react';
import PropTypes from 'prop-types';
import ConnectionElement from './ConnectionElement';

class Connections extends React.Component {
  state = {
    type: '',
    loading: false,
  };

  componentDidMount() {
    this.checkConnection(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkConnection(nextProps);
  }

  sendMessage = () => {
    const { updateWebRtc, details, database, account } = this.props;
    const connectionId = Object.values(database.UserConnection.byId).find(con => con.mId === details.id || con.userId === details.id);
    updateWebRtc('showCommunication', details.id);
    updateWebRtc('connectionId', connectionId.id);
    updateWebRtc('peerType', 'user');
    updateWebRtc('communicationContainer', 'history');
    const user = connectionId.userId === account.user.id ? database.User.byId[connectionId.mId] : database.User.byId[connectionId.userId];
    updateWebRtc('chatHistory', { type: 'user', user: { user }, connectionId: connectionId.id });
  }

  connectMentor = async (type) => {
    const {
      apis, account, details, database,
      addDatabaseSchema,
      updateDatabaseSchema,
    } = this.props;
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
        const info = {
          userId: account.user.id,
          mId: details.id,
          timeStamp: Date.now(),
          status: 'pending',
        };
        this.setState({ loading: true });
        try {
          const res = await apis.connectUser(info);
          addDatabaseSchema('UserConnection', { id: res, ...info, user: { user: details, userDetail: details.userDetail } });
          this.setState({
            type: 'pending',
            loading: false,
          });
        } catch (e) {
          console.log('Error =>', e);
        }
        break;
      case 'accept':
        this.setState({ loading: true });
        try {
          await apis.updateUserConnection([{
            status: 'connected',
            mId: existingCon.mId,
            userId: existingCon.userId,
          }, { id: existingCon.id }]);
          updateDatabaseSchema('UserConnection', { id: existingCon.id, status: 'connected' });
          this.setState({
            type: 'connected',
            loading: false,
          });
        } catch (e) {
          console.log('Error =>', e);
        }
        break;
      default:
    }
  }

  checkConnection = (props) => {
    const { database, details, account } = props;
    // console.log('detail and account in connection', details, account);
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
    const { type, loading } = this.state;
    return (
      <div className="con">
        <ConnectionElement
          loading={loading}
          sendMessage={this.sendMessage}
          connectMentor={this.connectMentor}
          type={type}
        />
      </div>
    );
  }
}

Connections.propTypes = {
  updateWebRtc: PropTypes.func.isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  apis: PropTypes.objectOf(PropTypes.any).isRequired,
  updateDatabaseSchema: PropTypes.func.isRequired,
  addDatabaseSchema: PropTypes.func.isRequired,
};

export default Connections;
