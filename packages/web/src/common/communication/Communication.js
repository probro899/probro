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
import { socketListner, callHandler } from './helper-functions';

class Communication extends React.Component {
  state = {
    minimize: true,
    cut: false,
    screen: 'incoming',
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
    this.setState({
      cut: true,
    });
  }

  switchScreen = (target) => {
    this.setState({
      screen: target,
    });
  }

  render() {
    const { minimize, cut, screen, apis } = this.state;
    const { webRtc, database, account } = this.props;
    return (
      <div
        className="communicate"
        style={
          {
            height: minimize ? '31px' : '75%',
            animationName: minimize ? 'slideDown' : 'slideUp',
            animationDuration: '0.3s',
            display: cut ? 'none' : 'block',
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
            style={screen === 'list' ? { display: 'block' } : { display: 'none' }}
            change={this.switchScreen}
            database={database}
          />
          <ChatHistory
            style={screen === 'history' ? { display: 'flex' } : { display: 'none' }}
            change={this.switchScreen}
            _callHandler={callHandler(this.props, this.state)}
            apis={apis}
            webRtc={webRtc}
            account={account}
            database={database}
          />
          <CallScreen
            style={screen === 'call' ? { display: 'block' } : { display: 'none' }}
            change={this.switchScreen}
          />
          <IncomingCallScreen
            style={screen === 'incoming' ? { display: 'flex' } : { display: 'none' }}
            change={this.switchScreen}
            webRtc={webRtc}
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
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(Communication);
