import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import * as actions from '../../actions';
import client from '../../socket';
import ChatList from './ChatList';
import ChatHistory from './ChatHistory';
import CallScreen from './CallScreen';
import IncomingCallScreen from './IncomingCallScreen';
import { socketListner, callHandler, answerHandler, closeHandler } from './helper-functions';

class Communication extends React.Component {
  state = {
    minimize: false,
    apis: {},
  };

  async componentWillMount() {
    const apisRes = await client.scope('Mentee');
    this.setState({ apis: apisRes });
    socketListner(this.props, this.state);
  }

  toggleMinMax = () => {
    const { minimize } = this.state;
    this.setState({
      minimize: !minimize,
    });
  }

  cutWindow = () => {
    const { updateWebRtc } = this.props;
    updateWebRtc('showCommunication', false);
  }

  switchScreen = (target) => {
    const { updateWebRtc } = this.props;
    updateWebRtc('communicationContainer', target);
  }

  render() {
    const { minimize, apis } = this.state;
    const { webRtc, database, account, updateWebRtc } = this.props;
    return (
      <div
        className="communicate"
        style={
          {
            height: minimize ? '31px' : '75%',
            animationName: minimize ? 'slideDown' : 'slideUp',
            animationDuration: '0.3s',
            display: !webRtc.showCommunication ? 'none' : 'block',
          }
        }
      >
        <div className="header">
          <div className="win-title">
            Chat Window
          </div>
          <div className="control-icons">
            { minimize ? <Icon icon="expand-all" style={{ cursor: 'pointer' }} onClick={this.toggleMinMax} />
              : <Icon icon="minus" style={{ cursor: 'pointer' }} onClick={this.toggleMinMax} />
            }
            <Icon icon="maximize" style={{ cursor: 'pointer' }} iconSize={14} />
            <Icon icon="small-cross" style={{ cursor: 'pointer' }} onClick={this.cutWindow} />
          </div>
        </div>
        <div
          className="content"
        >
          <ChatList
            style={webRtc.communicationContainer === 'list' ? { display: 'block' } : { display: 'none' }}
            change={this.switchScreen}
            database={database}
            account={account}
            webRtc={webRtc}
            updateWebRtc={updateWebRtc}
          />
          <ChatHistory
            style={webRtc.communicationContainer === 'history' ? { display: 'flex' } : { display: 'none' }}
            change={this.switchScreen}
            _callHandler={callHandler(this.props, this.state)}
            apis={apis}
            webRtc={webRtc}
            account={account}
            database={database}
          />
          <CallScreen
            style={webRtc.communicationContainer === 'call' ? { display: 'block' } : { display: 'none' }}
            change={this.switchScreen}
            webRtc={webRtc}
            account={account}
          />
          <IncomingCallScreen
            style={webRtc.communicationContainer === 'incoming' ? { display: 'flex' } : { display: 'none' }}
            change={this.switchScreen}
            webRtc={webRtc}
            answerHandler={answerHandler(this.props, this.state)}
            apis={apis}
            closeHandler={closeHandler(this.props, this.state)}
          />
        </div>
      </div>
    );
  }
}

Communication.propTypes = {
  webRtc: PropTypes.objectOf(PropTypes.any).isRequired,
  database: PropTypes.objectOf(PropTypes.any).isRequired,
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  updateWebRtc: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Communication);
