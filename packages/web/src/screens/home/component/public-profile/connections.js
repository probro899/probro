import React from 'react';
import { Button } from '@blueprintjs/core';
import ConnectionElement from './ConnectionElement';

class Connections extends React.Component {
  state = {
    type: '',
  };

  componentDidMount() {
    this.checkConnection();
  }

  componentWillReceiveProps() {
    this.checkConnection();
  }

  sendMessage = () => {
    const { updateWebRtc } = this.props;
    updateWebRtc('showCommunication', true);
    updateWebRtc('communicationContainer', 'history');
  }

  connectMentor = async (type) => {
    const { apis, account, details, database } = this.props;
    const userId = account.user.id;
    const guestId = details.id;
    let existingCon = null;
    database.UserConnection.allIds.map((id) => {
      const obj = database.UserConnection.byId[id];
      if ((userId === obj.userId || userId === obj.mId) && (guestId === obj.userId || guestId === obj.mId)) {
        existingCon = obj;
      }
    });
    switch (type) {
      case 'request':
        if (existingCon) {
          await apis.updateUserConnection({
            userId: account.user.id,
            mid: details.id,
            status: 'pending',
            id: existingCon.id,
          });
        } else {
          await apis.connectUser({
            userId: account.user.id,
            mid: details.id,
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
        }, { id: existingCon.id }]);
        this.setState({
          type: 'connected',
        });
        break;
      default:
        return;
    }
  }

  checkConnection = () => {
    const { database, details, account } = this.props;
    const userId = account.user.id;
    const guestId = details.id;
    let type = '';
    database.UserConnection.allIds.map((id) => {
      const obj = database.UserConnection.byId[id];
      if ((userId === obj.userId || userId === obj.mId) && (guestId === obj.userId || guestId === obj.mId)) {
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
    console.log(this.props.database.UserConnection);
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

export default Connections;
