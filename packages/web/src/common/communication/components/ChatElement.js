import React from 'react';
import { TextArea, Button } from '@blueprintjs/core';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class ChatElement extends React.Component {
  state = {
    message: '',
  };

  onMessageType = (e) => {
    this.setState({
      message: e.target.value,
    });
  }

  handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const { message } = this.state;
      const { apis, account } = this.props;
      try {
        await apis.addBoardMessage({
          boardId: 1,
          message,
          userId: account.user.id,
          timeStamp: Date.now(),
          url: null,
          remarks: null,
          broadCastId: 'Board-1',
        });
      } catch (err) {
        console.error('Error in sending message', err);
      }
      this.setState({ message: '' });
    }
  }

  addDatabase = () => {
    const { addDatabaseSchema } = this.props;
    addDatabaseSchema('UserSkill', { id: 1, skill: 'JavaSrcipt', userId: 12343 });
  }

  sendMessage = async () => {
    const { message } = this.state;
    const { account, apis } = this.props;
    try {
      await apis.addBoardMessage({
        boardId: 1,
        message,
        userId: account.user.id,
        timeStamp: Date.now(),
        url: null,
        remarks: null,
        broadCastId: 'Board-1',
      });
    } catch (err) {
      console.error('Error in sending message', err);
    }
    this.setState({ message: '' });
  }

  render() {
    const { message } = this.state;
    console.log('props in chatelemnt', this.props);
    return (
      <div className="chat-box">
        <TextArea
          placeholder="Type here something..."
          onChange={this.onMessageType}
          value={message}
          onKeyPress={this.handleKeyPress}
        />
        <Button
          icon="send-to"
          intent="primary"
          text="send"
          onClick={this.sendMessage}
        />
        <Button text="AddData" onClick={this.addDatabase} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ ...state, ownProps });

export default connect(mapStateToProps, { ...actions })(ChatElement);
